const express = require('express');
const cookieParser = require('cookie-parser');

const User = require('../models/User');
const auth = require('../middleware/auth');

var ObjectId = require('mongodb').ObjectID;

const Product = require('../models/Product');
const Payment = require('../models/Payment');

const async = require('async');

const router=express.Router();
router.use(cookieParser());

router.get('/',(req,res)=>{
    res.send('hi');
})

router.get('/auth',auth,(req,res)=>{
    // console.log('came');
    res.status(200).json({
        "_id":req.user._id,
        "isAdmin": req.user.role === 0 ? false : true,
        "isAuth":true,
        "email":req.user.email,
        "name":req.user.name,
        "role":req.user.role,
        "cart":req.user.cart,
        "history":req.user.history
    })
})

router.post('/register',async(req,res)=>{

    const user = new User(req.body);

    user.save((err,docs)=>{
        if(!docs)return res.json({registerSuccess:false,err});

        return res.status(200).json({
            registerSuccess:true
        });
    })


});

router.post('/login',(req,res)=>{

    // console.log('hello')

    User.findOne({email:req.body.email},(err,user)=>{
        if(!user){
            return res.json({
                loginSuccess:false,
                message:'Email not found'
            })
        }
        // console.log("came");

        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(err || !isMatch){
                return res.json({
                    loginSuccess:false,
                    message:'wrong password'
                })
            }
            console.log("came");
            user.generateToken((err,user)=>{
                if(err){
                    return res.json({
                        loginSuccess:false,
                        message:'Auth failed'
                    })
                }
                // console.log(user.token)
                res.cookie("x_authExp", user.tokenExp);
                return res.cookie('x_auth', user.token)
                .status(200)
                .json({
                    loginSuccess:true,
                    _id:user.id,
                    name:user.name
                })
            })
            console.log('skipped');
        })

    })
    // res.json('fail');

});

router.get('/logout',auth,(req,res)=>{
    res.clearCookie('x_auth');
    res.clearCookie('x_authExp');
    User.findOneAndUpdate({_id:req.user._id},{token:"", tokenExp: ""},(err,docs)=>{
        if(err)return res.json({
            logoutSuccess:false
        });
        return res.status(200).json({
            logoutSuccess:true
        })
    })
})

router.post('/addToCart',auth,(req,res)=>{

    const userId = req.user._id;
    
    const productId =ObjectId.createFromHexString(req.body.productId);

    User.findOne({_id:userId},(err,user)=>{
        
        let duplicate = false;
        // console.log(user);
        user.cart.forEach(item=>{
            if(item.id.toString()==productId.toString())duplicate=true;
        })

     console.log(duplicate)

    if(duplicate===true){
        console.log('duplicate');
        User.findOneAndUpdate({_id:userId,"cart.id":productId },
        { $inc: { "cart.$.quantity": 1 } },
        { new: true },
        (err, userInfo) => {
            if (err) return res.json({ success: false, err });
            res.status(200).json({success:true,cart:userInfo.cart})
        }
    )
    }

    else{
        User.findOneAndUpdate(
            { _id: req.user._id },
            {
                $push: {
                    cart: {
                        id: productId,
                        quantity: 1,
                        date: Date.now()
                    }
                }
            },
            { new: true },
            (err, userInfo) => {
                if (err) return res.json({ success: false, err });
                res.status(200).json({success:true,cart:userInfo.cart})
            }
        )
    }
})
})

router.post('/removeCartItem',auth,(req,res)=>{
    const Id = ObjectId.createFromHexString(req.body.id);

    // console.log(req.user);
    // console.log(Id);

    const userId = req.user._id;

    User.findOneAndUpdate({
        "_id":userId
    },{
        $pull:{
            cart:{
                id:Id
            }
        }
    }, { new: true },(err,userInfo)=>{
        
        let cart = userInfo.cart;
        console.log(cart)
        let array = cart.map(item => {
            return item.id
        })
        Product.find({ '_id': { $in: array } })
        .exec((err, cartDetails) => {
            // console.log(cart);
            return res.status(200).json({
                cartDetails,
                cart
            })
        })
    })

})


router.post('/successBuy',auth,(req,res)=>{

    let history = [];
    let transactionData = {};

    //1.Put brief Payment Information inside User Collection 
    req.body.cartDetail.forEach((item) => {
        history.push({
            dateOfPurchase: Date.now(),
            name: item.title,
            id: item._id,
            price: item.price,
            quantity: item.quantity,
            paymentId: req.body.paymentData.paymentID
        })
    })

    //2.Put Payment Information that come from Paypal into Payment Collection 
    transactionData.user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }

    transactionData.data = req.body.paymentData;
    transactionData.product = history

    User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { history: history }, $set: { cart: [] } },
        { new: true },
        (err, user) => {
            if (err) return res.json({ success: false, err });

            const payment = new Payment(transactionData)
            payment.save((err, doc) => {
                if (err) return res.json({ success: false, err });

                //3. Increase the amount of number for the sold information 

                //first We need to know how many product were sold in this transaction for 
                // each of products

                let products = [];
                doc.product.forEach(item => {
                    products.push({ id: item.id, quantity: item.quantity })
                })

                // first Item    quantity 2
                // second Item  quantity 3
                console.log("came00");

                async.eachSeries(products, (item, callback) => {
                    Product.updateOne(
                        { _id: item.id },
                        {
                            $inc: {
                                "sold": item.quantity
                            }
                        },
                        { new: false },
                        callback
                    )
                }, (err) => {
                    if (err) return res.json({ success: false, err })
                    res.status(200).json({
                        success: true,
                        cart: [],
                        cartDetail: []
                    })
                })

            })
        }
    )
})

router.get('/getHistory',auth,(req,res)=>{
    User.findOne({_id:req.user._id},(err,docs)=>{
        if(err){
            return res.json({
                success:false,
                err
            })
        }
        return res.json({
            success:true,
            history:docs.history
        })
    })
})

module.exports=router;