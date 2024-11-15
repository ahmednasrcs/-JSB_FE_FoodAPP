import React from 'react';
import avatar from '/assets/FoodAppimages/avatar.png';

const Navbar = ({loginData}) => {

    return (
        <div className=' bg-white d-flex justify-content-end py-3 navbar align-items-center'>
            <img className=' img-fluid  avatar m-1' src={avatar} alt="user image" />
            <span className='my-2 mx-3'>{loginData?.userName}</span>
           
        </div>
    );
}

export default Navbar;
