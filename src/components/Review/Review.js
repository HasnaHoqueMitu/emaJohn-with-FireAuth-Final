import React, { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { Link } from 'react-router-dom';
import { useAuth } from '../LogIn/useAuth';

const Review = () => {
    const [cart, setCart] =useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const auth = useAuth();

    const handlePlaceOrder = () => {
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }

    const removeProduct = (productKey) =>{
        console.log('remove clicked', productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(()=>{
        //cart
        const savedcart = getDatabaseCart();
        const productkeys = Object.keys(savedcart);
        
        const cartProducts = productkeys.map ( key => {
            const product = fakeData.find( pd => pd.key ===key);
            product.quantity = savedcart[key];
            return product;
        });

        setCart(cartProducts);
    }, [])

    let thankyou;
    if(orderPlaced){
        thankyou = <img src={happyImage} alt=""/>;
    } 
    return (
        <div className="twin-container">
            <div className = "product-container">
                {
                    cart.map(pd => <ReviewItem 
                        key = {pd.key}
                        removeProduct = {removeProduct}
                        product = {pd}></ReviewItem>)
                } 
                {
                    thankyou
                }
                {
                    !cart.length && <h1>Your cart is empty.<a href="/shop">Keep Shoping</a></h1>
                } 
            </div>
            <div className="cart-container">
                <Cart cart = {cart}>
                    <Link to="ship">
                        {   
                            auth.user ?
                            <button className="main-button">Proceed Checkout</button>
                            :
                            <button className="main-button">Login to proceed</button>
                        }
                    </Link>
                </Cart>
            </div>         
        </div>
    );
};

export default Review;