import React, { useState, useEffect } from 'react';
import Axios from 'axios';
export default function Cart() {
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
    let [products1,setProducts1]=useState([]);
    let [quan, setQuan] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    useEffect(()=>{
        fetchcount();
    }
    )
    let fetchData=()=>{
        Axios.get('http://localhost:4000/getAll')
      .then(response => {
        console.log(response.data);
        setProducts1(response.data);
      })
      .catch(error => {
        console.error('Error retrieving documents:', error);
      });
  };
  const fetchcount=()=>
  {
    let count=products1.map(item=>item.count);
    setQuan(count);
  };
    useEffect(()=>{
        let count=products1.map(item=>item.count);
        setQuan(count);
    },[products1]);
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
    const order=(item,index)=>{
        if (quan[index] > 0) {
            item.count = quan[index];
            //localStorage.setItem(item._id, JSON.stringify(item));
            Axios.post('http://localhost:4000/ins1', { fdata: item })
                .then((res) => {
                    let ack3=res.data;
                    if (ack3 === "success") {
                        alert('Order Placed');
                    } else {
                        alert('Error Placing Order');
                    }
                })
                .catch((error) => {
                    alert("Error Placing order");
                    alert(error);
                });
            Axios.post("http://localhost:4000/delete", { id: item._id }).then((res) => {
            let ack = res.data;
            if (ack === "success") {
                fetchData();
                fetchcount();
                products1[index].count=0;
            }
        }).catch((error) => {
            console.error("Error deleting data:", error);
            alert("Error deleting data");
        });
            setQuan((prevQuan) => {
                const newQuan = [...prevQuan];
                newQuan[index] = 0;
                return newQuan;
            });
    };
}
    const fun = (item,index) => {
        // Send only the _id of the item to be deleted
        Axios.post("http://localhost:4000/delete", { id: item._id }).then((res) => {
            let ack = res.data;
            if (ack === "success") {
                alert("Removed from Cart");
                products1[index].count=0;
                fetchData();
                fetchcount();
            } else {
                alert("Not removed from Cart");
            }
        }).catch((error) => {
            console.error("Error deleting data:", error);
            alert("Error deleting data");
        });

        //localStorage.removeItem(item._id);
        
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
                        <button className='btn-card' onClick={() => fun(item,index)}>Remove from Cart</button>
                        <button className='btn-card' onClick={() => order(item,index)}>Buy</button>
                        <br></br>
                        <button className='btn-card' onClick={()=>inc(index)}>+</button>
                        <span>{quan[index]}</span>
                        <button className='btn-card' onClick={()=>dec(index)}>-</button>
                    </div>
                ))}
            </div>
        </>
    );
}
