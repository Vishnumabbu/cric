import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';

// import './HistoryPage.css';

const HisoryPage = () => {

    const [History,setHistory] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:5000/users/getHistory').then(res=>{
            if(res.data.success){
                setHistory(res.data.history);
            }
            else{
                alert('Failed to fetch history');
            }
        })
    })

    const user = useSelector(state=>state.user);

    return(
        <div style={{ width: '80%',margin: '0rem auto', marginTop: '160px',marginBottom:'30px' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>History</h1>
            </div>
            <br />

            <table style={{width:'100%'}}>
                <thead>
                    <tr>
                        <th>Payment Id</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Date of Purchase</th>
                    </tr>
                </thead>

                <tbody>

                    {user.userData && user.userData.data && user.userData.data.history &&
                        user.userData.data.history.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>{new Date(item.dateOfPurchase).getMonth()+'/'+new Date(item.dateOfPurchase).getFullYear()}</td>
                            </tr>
                        ))}

                </tbody>
            </table>
        </div>
    )

}

export default HisoryPage;