import React, { useEffect, useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { getCartDetails } from '../../../Actions/actions';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { removeCartItem } from '../../../Actions/actions';

function CartPage(){

    const dispatch = useDispatch(); 
    const state = useSelector(state=>state.user);
    const [total, setTotal] = useState(0)

    const history = useHistory();

    useEffect(()=>{
        if(state.userData && state.userData.data.cart){
            // console.log(state.userData)
        dispatch(getCartDetails(state.userData.data.cart)).then(res=>{
            // console.log(res.payload);
            calculateTotal(res.payload)
        });
    }
    },[state.userData]);

    const renderCartImage = (images) => {
        if(images.length > 0) {
            let image = images[0]
            return `http://192.168.1.6:5000/${image}`
        }
    }

    const calculateTotal = (cartDetail) => {
        let tot = 0;

        cartDetail.map(item => {
            tot += parseInt(item.price, 10) * item.quantity
        });

        setTotal(tot)
        // setShowTotal(true)
    }

    const removeItem = (product)=>{
        console.log('Cart Item removed');

        dispatch(removeCartItem(product._id)).then(res=>{
            console.log(res);
        }
            );
    
    }

    const renderItems = (products) => (
      products && products.map(product => (
            <tr key={product._id}>
                <td>
                    <img style={{ width: '100px' }} alt="product" 
                    src={renderCartImage(product.images[0])} />
                </td> 
                <td>{product.quantity} EA</td>
                <td>Rs {product.price} </td>
                <td> <Button size="large" shape="round" type="danger" onClick={()=>removeItem(product)}
                    >Remove
                    </Button></td>

            </tr>
        ))
    )

    return (
        // {state.}
        <div style={{display:"flex",justifyContent:'center'}}>
        <div style={{width: '85%',display:"flex",flexDirection: 'column',justifyContent:'center',marginTop:'100px'}}>
        <h1>My Cart</h1>
            <table >
                <thead>
                    <tr>
                        <th>Product Image</th>
                        <th>Product Quantity</th>
                        <th>Product Price</th>
                        <th>Remove from Cart</th>
                    </tr>
                </thead>
                <tbody>
                    {renderItems(state.cartDetails)}
                </tbody>
            </table>

            <h2>Total Amount: Rs {total}</h2>
            {total==0?'':  <Button style={{marginBottom:'30px'}} onClick={()=>{alert('Successfully purchased');history.push('/')}} size="large" shape="round" type="danger">Purchase</Button>}
          
        </div>
        </div>
    )

}

export default CartPage;