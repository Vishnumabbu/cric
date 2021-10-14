import React, { useEffect, useState } from 'react';
import './LandingPage.css';
import axios from 'axios';
import { Row,Col,Card,Checkbox,Input,Button } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';

import ImageSlider from '../../utils/ImageSlider';

const { Meta } = Card;

const { Search } = Input;

function LandingPage(){

    const [Products,setProducts] = useState([]);
    const [start,setStart] = useState([])
    const [sort,setSort] = useState(false);
    const [filter,setFilter] = useState([1,2,3,4]);
    const [search,setSearch] = useState("");
    const [loading,setLoading] = useState(true);

    const sortChange = ()=>{

         setSort(!sort);

         // to escape async js I need to do the opposite
        if(sort==true){
            setProducts([...Products]);
            return;
        }

        const Dummy =[... Products];

        Dummy.sort((a,b)=>a.price - b.price);

        setProducts(Dummy);

    }

    useEffect(()=>{

        axios.post('api/product/getProducts').then(res=>{
       
            if(res.data.success){
                setProducts([...Products,...res.data.products]);
                setStart([...Products,...res.data.products]);
                // start=res.data.products;
                // console.log(start)
                setLoading(false);
            }
            else{
                alert('Failed to load Products');
            }
        })

    },[])

    const renderCards = Products.map((product,index)=>{

        return <Col lg={6} md={8} xs={24}>
            <Card
                hoverable={true}
                cover={<a href={`/product/${product._id}`} ><ImageSlider images={product.images} /></a> }
            >
                <Meta
                    title={product.title}
                    description={`$ ${product.price}`}
                />
               
            </Card>
        </Col>


    })

    const handleChange = (num)=>{

        setSort(false);
        var help = [...filter];
        if(filter.indexOf(num)=== -1)help.push(num);

        else help.splice(filter.indexOf(num),1);

        // console.log(help);

        setFilter([...help]);
        const change = [...start];

        const arrange=[];

        for(let i=0;i<change.length;i++){
            if(change[i].types === "bat" && help.indexOf(1)===-1)continue;
            else if(change[i].types === 'ball' && help.indexOf(2)===-1)continue;
            else if(change[i].types === 'stumps' && help.indexOf(3)===-1)continue;
            else if(change[i].types === 'gloves' && help.indexOf(4)===-1)continue;

            else arrange.push(change[i]);

        }

        setProducts([...arrange]);

    }

    const searchChange = (e)=>{
        setSearch(e.target.value)

        axios.post('api/product/getProducts',{term:e.target.value}).then(res=>{
       
            if(res.data.success){
                setProducts([...res.data.products]);
                setStart([...res.data.products]);
            }
            else{
                alert('Failed to load Products');
            }
        })
    }
  

    return (
    
        <div  style={{ width: '75%', margin: '0rem auto',marginTop:"160px",marginBottom:30 }}>
            {loading?<Button type="primary" icon={<PoweroffOutlined />} loading />:(<div>
            <div style={{ textAlign: 'center'}}>
                <h2>    Products  </h2>
            </div>

            <div style={{marginTop:"30px"}} >
                <Checkbox type="checkbox" checked={filter.indexOf(1)===-1?false:true} onChange={()=>handleChange(1)}>Bat</Checkbox>
                <Checkbox type="checkbox" checked={filter.indexOf(2)===-1?false:true} onChange={()=>handleChange(2)}>Ball</Checkbox>
                <Checkbox type="checkbox" checked={filter.indexOf(3)===-1?false:true} onChange={()=>handleChange(3)}>Stumps</Checkbox>
                <Checkbox type="checkbox" checked={filter.indexOf(4)===-1?false:true} onChange={()=>handleChange(4)}>Gloves</Checkbox>
            </div>

            <Search
                placeholder="Search"
                value={search}
                onChange={(e)=>searchChange(e)}
                style={{width:"250px"}}
            >

            </Search>

           {Products.length==0?

                <div>
                    No posts yet...
                </div>
            :
                <div>
                   

                    <Checkbox type="checkbox" checked={sort}onChange={()=>sortChange()}>Sort by prices</Checkbox>
               
                   <Row style={{marginTop:"70px"}}gutter={[16, 16]}>
                   

                        {renderCards}

                    </Row>
                </div>

           }
          </div>)
        }
        </div>
    )
}

export default LandingPage;