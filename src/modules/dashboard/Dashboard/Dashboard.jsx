import React from 'react';
import Header from '../../shared/components/Header/Header';

const Dashboard = ( {loginData}) => {
    return (
        <div>
            <Header 
            title={`Welcome ${loginData?.userName}`}
            
            />
        </div>
    );
}

export default Dashboard;
