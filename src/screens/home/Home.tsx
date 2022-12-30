import React, { useState } from 'react';
import CrudComponent from '../../components/CrudComponent/CrudComponent';
import Header from '../../components/Header/Header';
import './Home.css';

const Home = () => {

    return (
        <div>
            <Header />
            <div className='body'>
                <div className='left-crud'><CrudComponent resourceName="Cidade"/></div>    
                <div className='right-crud'><CrudComponent resourceName="Cliente"/></div>            
            </div>
        </div>
    );
};

export default Home;