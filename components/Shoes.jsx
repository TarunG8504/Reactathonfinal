import React from 'react'
import { useState } from 'react'
import Axios from 'axios'
import './card.css'
const pro=[
    {
        _id:10,
        title:"Adidas PRo",
        brand:"ADIDAS",
        image:"data:image/jpeg;base64,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",
        price:2000,
        count:0
    },
    {
        _id:11,
        title:"Nike",
        brand:"NIKE",
        image:"data:image/jpeg;base64,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",
        price:1500,
        count:0
    },
    {
        _id:12,
        title:"Puma Light",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbCZAyI-AGsucfeIHBwDqxF0OYtgVhYSm9Eg&usqp=CAU",
        brand:"PUMA",
        price:10000,
        count:0
    }
]
export default function Shoes() {
    const [quan, setQuan] = useState(Array(pro.length).fill(0));
    const inc = (index) => {
        setQuan(prevQuan => {
            const newQuan = [...prevQuan];
            newQuan[index]++;
            return newQuan;
        });
    };

    const dec = (index) => {
        setQuan(prevQuan => {
            const newQuan = [...prevQuan];
            if (newQuan[index] > 0) {
                newQuan[index]--;
            }
            return newQuan;
        });
    };
    const fun = (item, index) => {
        if (quan[index] > 0) {
            item.count += quan[index];
            //localStorage.setItem(item._id, JSON.stringify(item));
            Axios.post('http://localhost:4000/get', { id: item._id })
                .then((res) => {
                    let ack=res.data;
                    if (ack ==="found") {
                        Axios.post('http://localhost:4000/update', { id:item._id,count:item.count})
                            .then((res2) => {
                                let ack2=res2.data;
                                if (ack2==="success") {
                                    alert("Updated in cart");
                                } else {
                                    alert("Error in updation");
                                }
                            })
                            .catch((err2) => {
                                alert("Error in update")
                                alert(err2);
                            });
                    } else{
                        Axios.post('http://localhost:4000/ins', { fdata: item })
                            .then((res) => {
                                let ack3=res.data;
                                console.log("Insert");
                                if (ack3 === "success") {
                                    alert('Added to Cart');
                                } else {
                                    alert('Not Added to Cart');
                                }
                            })
                            .catch((error) => {
                                alert("Error in insert");
                                alert(error);
                            });
                    }
                })
                .catch((err3) => {
                    alert("Error in get");
                    alert(err3);
                });

            setQuan((prevQuan) => {
                const newQuan = [...prevQuan];
                newQuan[index] = 0;
                return newQuan;
            });
        }
    };

       return (
        <>
            <h2>HOME</h2>
            <div className='box-1'>
                {pro.map((item, index) => (
                    <div className='category' key={item._id}>
                        <h3>{item.title}</h3>
                        <img src={item.image} alt='img' />
                        <h3>{item.brand}</h3>
                        <h4>₹{item.price}</h4>
                        <button className='btn-card' onClick={() => fun(item, index)}>Add to Cart</button>
                        <br></br>
                        <button className='btn-card' onClick={() => inc(index)}>+</button>
                        <span>{quan[index]}</span>
                        <button className='btn-card' onClick={() => dec(index)}>-</button>
                    </div>
                ))}
            </div>
        </>
    );

}

