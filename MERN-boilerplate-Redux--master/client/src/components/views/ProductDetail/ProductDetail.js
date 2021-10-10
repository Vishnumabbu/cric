import React, { useEffect, useState } from 'react';
import ImageSlider from '../../utils/ImageSlider';
import axios from 'axios';
import { addToCart } from '../../../Actions/actions';
import { Card,Descriptions,Button } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


function ProductDetail(props){

    const history = useHistory();

    const [Product,setProduct] = useState([]);

    const dispatch = useDispatch();

    const addToCartHandler = ()=>{
        console.log('Cart');

        dispatch(addToCart(Product[0]._id)).then(res=>{
            console.log(res.payload.data.success);
            history.push('/cart');
        }
        );

    }

    useEffect(()=>{

        const Id = props.location.pathname;

        const array = Id.split('/');

        axios.post('/api/product/getDetail',{id:array[2]}).then(res=>{
            if(res.data.success){
                console.log(res.data.product[0],'hi');
                 setProduct([res.data.product[0]]);
            }
            else{
                console.log('Error ');
            }
        })

    },[]);

    return(
        <div style={{marginTop : 130,marginBottom: 30,display:"flex",justifyContent:'center',alignItems:'center'}}>
            {Product.length===0?<div>{console.log('hello')}</div>:
            <div style={{marginTop:"90px",width:"350px"}}>
                <h1>{Product[0].title}</h1>
                <Card
                hoverable={true}
                cover={ <ImageSlider images={Product[0].images} /> }
                >
                </Card>

            <Descriptions title="Product Info">
                <Descriptions.Item label="Price"> ${Product[0].price}</Descriptions.Item>
                <Descriptions.Item label="Sold">{Product[0].sold}</Descriptions.Item>
              
                <Descriptions.Item label="Description"> {Product[0].description}</Descriptions.Item>
            </Descriptions>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="danger"
                    onClick={()=>addToCartHandler(Product[0])}
                >
                    Add to Cart
                    </Button>
            </div>
           </div>
            }
        </div>
    )


}

export default ProductDetail;