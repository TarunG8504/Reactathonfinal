import React, { useState, useEffect } from 'react';
import Axios from 'axios';

export default function Cart() {
    const [quan, setQuan] = useState(0);
    // const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     const storedProducts = [];
    //     for (let i = 0; i < localStorage.length; i++) {
    //         const key = localStorage.key(i);
    //         const value = localStorage.getItem(key);
    //         storedProducts.push(JSON.parse(value));
    //     }
    //     setProducts(storedProducts);
    // }, []);
    const [products1,setProducts1]=useState([]);
    useEffect(()=>{
        Axios.get('http://localhost:4000/getAll')
      .then(response => {
        console.log(response.data);
        setProducts1(response.data);
      })
      .catch(error => {
        console.error('Error retrieving documents:', error);
      });
  }, []);
    const inc = () => {
        setQuan(quan + 1);
    };

    const dec = () => {
        if (quan >= 1)
            setQuan(quan - 1);
    };

    // const deleteItem = async (itemId) => {
        
    // };
    
    const fun = (item) => {
        // Send only the _id of the item to be deleted
        Axios.post("http://localhost:4000/delete", { id: item._id }).then((res) => {
            let ack = res.data;
            if (ack === "success") {
                alert("Data deletion successful");
            } else {
                alert("Data deletion unsuccessful");
            }
        }).catch((error) => {
            console.error("Error deleting data:", error);
            alert("Error deleting data");
        });
        //localStorage.removeItem(item._id);
        alert('Removed from cart');
    };
    
    return (
        <>
            <h2>Cart</h2>
            <div className='box-1'>
                {products1.map((item, index) => (
                    <div className='category' key={index}>
                        <h3>{item.title}</h3>
                        <img src={item.image} alt='img' />
                        <h3>{item.brand}</h3>
                        <h4>₹{item.price}</h4>
                        <button className='btn-card' onClick={() => fun(item)}>Remove from Cart</button>
                        <button className='btn-card' onClick={() => alert("Order Placed")}>Buy</button>
                        <br></br>
                        <button className='btn-card' onClick={inc}>+</button>
                        <span>{item.count + quan}</span>
                        <button className='btn-card' onClick={dec}>-</button>
                    </div>
                ))}
            </div>
        </>
    );
}
