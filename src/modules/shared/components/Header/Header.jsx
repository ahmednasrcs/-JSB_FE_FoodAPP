import React from 'react';
import avataHeader from '/assets/FoodAppimages/man.png';

const Header = ({title,description}) => {
    return (
        <div className='header-container  p-5 rounded-4 m-2 d-flex justify-content-between align-items-center  '>
            <div className="caption w-50 text-white">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
            <div className="header-img  ">
                <img src={avataHeader} alt="avataHeader" />
            </div>
        </div>
    );
}

export default Header;
