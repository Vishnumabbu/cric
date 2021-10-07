import React from 'react';
import { Carousel } from 'antd';

function ImageSlider(props){

    return (

        <Carousel autoplay>
          {console.log(props.images)}
            {props.images[0].map((image, index) => (
                    <div key={index}>
                        <img style={{ width: '100%', maxHeight: '150px' }}
                          
                            src={`http://192.168.1.6:5000/${image}`} alt="productImage" />
                    </div>
                ))}
        </Carousel>

    )

}
export default ImageSlider;
