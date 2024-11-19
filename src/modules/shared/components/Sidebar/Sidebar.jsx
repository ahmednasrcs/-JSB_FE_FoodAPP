import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import log from '/assets/FoodAppimages/3.png'


const SideBar = () => {

    const [iSCollapse, setISCollapse] =useState(true);
    let toggleCollpase=()=>{
        setISCollapse(!iSCollapse)
    }
    return (
        <>
            <div className='sidebar-container h-100  '>
                <Sidebar collapsed={iSCollapse} >
                    <Menu onClick={toggleCollpase} >
                       
                        <MenuItem 
                        
                        icon={  <img className='img' src={log} /> }
                         className=' my-5  ps-1  logo-sidebar logo-menu-item'
                        ></MenuItem>

                        <MenuItem icon={<i className ="fa-solid fa-house mx-3"></i>} component={<Link to={'/dashboard'} />}>Home </MenuItem>
                        <MenuItem icon={<i className="fa-solid fa-user  mx-3"></i>} component={<Link to={'/dashboard/users'} />}>Users </MenuItem>
                        <MenuItem icon={<i className="fa-solid fa-shapes  mx-3"></i>} component={<Link to={'/dashboard/recipes'} />}>Recipes </MenuItem>
                        <MenuItem icon={<i className="fa-regular fa-calendar-days  mx-3"></i>} component={<Link to={'/dashboard/Categories'} />}>Categories </MenuItem>
                        <MenuItem icon={<i className="fa-solid fa-unlock-keyhole  mx-3"></i>} >Change Passowrd </MenuItem>
                        <MenuItem icon={<i className="fa-solid fa-right-from-bracket  mx-3"></i>} component={<Link to={'/login'} />}>Logout </MenuItem>

                    </Menu>
                </Sidebar>;
            </div>

        </>
    );
}

export default SideBar;
