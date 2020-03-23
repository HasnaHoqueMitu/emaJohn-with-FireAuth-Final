import React from 'react';



const Cart = (props) => {
    const cart = props.cart;
    

    //const totalprice= cart.reduce((total, prd) => total + prd.price, 0);
    let totalPrice = 0;
    for(let i = 0; i< cart.length; i++){
        const product = cart[i];
        totalPrice= totalPrice + product.price * product.quantity;
    }

    return (
        <div>
            <h4>Order Summery</h4>
            <p>Items Ordered: {cart.length}</p>
            <p>total price: {totalPrice}</p>
            <br/>
            {props.children}
        </div>
    );
};

export default Cart;