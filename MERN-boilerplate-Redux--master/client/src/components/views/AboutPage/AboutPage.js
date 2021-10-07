import React from 'react';
import { Descriptions } from 'antd';

function AboutPage(){

    return(
        <div style={{display:'flex',flexDirection:'column'}}>
            <div style={{display:'flex',marginTop:'100px',flexDirection:'column',alignItems:'center'}}>
                <img style={{width:'200px'}} src={`http://192.168.1.6:5000/uploads/1591784348324_dp.jpg`}></img>
                
            <Descriptions title="About">
                <Descriptions.Item label="Name"> Vishnuvardhan</Descriptions.Item>
                <Descriptions.Item label="Hobbies">Playing Cricket</Descriptions.Item>
                <Descriptions.Item label="Description">We try our best to provide the best product</Descriptions.Item>
                <Descriptions.Item label="Contact">**********</Descriptions.Item>
                <Descriptions.Item label="email">********@*****.com</Descriptions.Item>
                <Descriptions.Item label="Instagram">********** </Descriptions.Item>
            </Descriptions>

            </div>
        </div>
    )

}

export default AboutPage;