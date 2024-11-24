import React from 'react';
import avataHeader from '/assets/FoodAppimages/man.png';

const Header = ({title,description}) => {
    return (
        <div className='header-container  p-5 row  rounded-5 m-4  align-items-center  '>
            <div className="caption w-50 col-md-6 text-white ">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
            <div className="header-img col-md-6  img-fluid img-header text-end ">
                <img src={avataHeader} className=' img-fluid' alt="avataHeader" />
            </div>
        </div>
    );
}

export default Header;
