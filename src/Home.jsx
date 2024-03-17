import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import './card.css';

const pro = [
    {
        _id: 1,
        title: 'CLASSIC CABLE KNIT TURTLE NECK SWEATER',
        brand: 'ALLEN',
        image: 'https://www.rareism.com/cdn/shop/files/ALLEN-OFF-WHITE0589HERO_900x.jpg?v=1691154440',
        price: 2000,
        count: 0
    },
    {
        _id: 2,
        title: 'STATEMENT SLEEVE SATIN TOP',
        brand: 'EMM',
        image: 'https://www.rareism.com/cdn/shop/products/IMG_0037_7910c17b-2a0a-48d3-b861-0980efcdf127_1452x1799.jpg?v=1655027894',
        price: 1500,
        count: 0
    },
    {
        _id: 3,
        title: 'Colourblocked Shirt Midi Dress (XS)',
        image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSCh4b4JuzhbbW_EtnRRkn-aE4uXmgpkOe6DglsgC3sMsUN_FDfkby0oxAsVXAxK9GNqcdDQJ9Dj2JAmkMd0-LO3IyZmTcUaj0oM4N-efkqldcEBKzgCDhRwQ&usqp=CAE',
        brand: 'DEBACCO',
        price: 1000,
        count: 0
    },
    {
        _id: 4,
        title: 'FLORAL PRINT SHIRT',
        brand: 'LILIUM',
        image: 'https://thehouseofrare.com/cdn/shop/products/HERO-IMG_0028-CC_1452x1799.jpg?v=1699271463',
        price: 1500,
        count: 0
    },
    {
        _id: 5,
        title: 'ILLUSIVE GEOMETRIC PRINT SHIRT',
        brand: 'HEXA',
        image: 'https://thehouseofrare.com/cdn/shop/products/DSC_0622_900x.jpg?v=1663778205',
        price: 2000,
        count: 0
    },
    {
        _id: 6,
        title: 'Plain Shirt With Mandarin Collar - Pista ',
        brand: 'AUSTIN',
        image: 'https://poe.net.in/cdn/shop/files/IMG_3677_e2e5dd0e-b8e0-4216-bb4e-8774ef417096_3000x.jpg?v=1700483242',
        price: 1500,
        count: 0
    }
];

export default function Home() {
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
    const checkItemExists = async (itemId) => {
        try {
            const response = await Axios.get(`http://localhost:4000/get/${itemId}`);
            return response.data !== null;
        } catch (error) {
            console.error('Error checking item existence:', error);
            return false;
        }
    };
    
    const fun = (item, index) => {
        if (quan[index] > 0) {
            item.count += quan[index];
            checkItemExists(item._id).then((itemExists) => {
                console.log('Item exists:', itemExists);
                if (itemExists) {
                    Axios.put('http://localhost:4000/update', { fdata: item })
                        .then((res) => {
                            if (res.status === 200) {
                                console.log('Data updated successfully');
                                alert('Added to cart');
                            } else {
                                console.log('Data update failed');
                                alert('Not added to cart');
                            }
                        })
                        .catch((error) => {
                            console.error('Error updating data:', error);
                            alert('Error updating data');
                        });
                } else {
                    localStorage.setItem(item._id, JSON.stringify(item));
                    Axios.post('http://localhost:4000/ins', { fdata: item })
                        .then((res) => {
                            if (res.status === 202) {
                                console.log('Data inserted successfully');
                                alert('Added to wishlist');
                            } else {
                                console.log('Data insertion failed');
                                alert('Not Added to wishlist');
                            }
                        })
                        .catch((error) => {
                            console.error('Error inserting data:', error);
                            alert('Error inserting data');
                        });
                }
            }).catch((error) => {
                console.error('Error checking item existence:', error);
                alert('Error checking item existence');
            });
    
            // Reset the quantity of the item to zero after processing
            setQuan(prevQuan => {
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
