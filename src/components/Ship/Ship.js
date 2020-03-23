import React from 'react';
import { useForm } from 'react-hook-form';
import './Ship.css';

const Ship = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => { console.log(data) }

  
    return (
      <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
        <input name="name" ref={register({ required: true })} placeholder="Your Name"/>
        {errors.name && <span>Name is required</span>}

        <input name="email" ref={register({ required: true })} placeholder="Your Email"/>
        {errors.email && <span>Email is required</span>}

        <input name="AddressLine1" ref={register({ required: true })} placeholder="Address Line 1"/>
        {errors.AddressLine1 && <span>Address is required</span>}

        <input name="AddressLine2" ref={register} placeholder="Address Line 2"/>

        <input name="City" ref={register({ required: true })} placeholder="City"/>
        {errors.City && <span>City is required</span>}

        <input name="country" ref={register({ required: true })} placeholder="Country"/>
        {errors.country && <span>Country is required</span>}

        <input name="zipcode" ref={register({ required: true })} placeholder="Zip Code" />
        {errors.zipcode && <span>Zipcode is required</span>}
        
        <input type="submit" />
      </form>
    )
};

export default Ship;