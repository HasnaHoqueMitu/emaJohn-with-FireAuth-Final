import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData'
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10= fakeData.slice(0,10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    useEffect(() =>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map( existingKey =>{
            const product = fakeData.find( pd => pd.key === existingKey);
            product.quantity =savedCart[existingKey];
            return product;
        })
        setCart(previousCart);
    }, [])
    const handleAddProduct = (prod) =>{
        const toBeAddedKey = prod.key;
       // console.log('product added', prod);
       const sameProduct = cart.find(pd => pd.key === prod.key);
       let count = 1;
       let newCart;
       if(sameProduct){
           count = sameProduct.quantity+1;
           sameProduct.quantity = count;
           const others = cart.filter(pd => pd.key !== toBeAddedKey);
           newCart = [...others, sameProduct];
       }
       else{
           prod.quantity = 1;
           newCart = [...cart, prod];
       }

        setCart(newCart);
        
        addToDatabaseCart(prod.key, count);
    }

    return (
        <div className="twin-container">
            <div className="product-container">
                    {
                        products.map(pd =><Product 
                            key = {pd.key}
                            showAddToCart = {true}
                            handleAddProduct = {handleAddProduct}
                            prod={pd}
                            ></Product>)
                    }
            </div>
            <div className="cart-container">
               <Cart cart = {cart}>
                    <Link to="/review">
                        <button className="main-button">Review Order</button>
                    </Link>
               </Cart>
            </div>
        </div>
    );
};

export default Shop;