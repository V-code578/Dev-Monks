import React from 'react';
import Slider from '../inc/Slider'; 
import { NavLink } from 'react-router-dom';

function Home() {
    return (
        <div>
            <Slider />
            <section className="section">
                <div className="container">,
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h3 className="main-heading">
                                Our Company
                            </h3>
                            <div className="underlinemx-auto"></div>
                            <h2>Categories</h2>
                        </div>
                    </div>
                </div>
            </section>
        </div>   
    );
}
export default Home;