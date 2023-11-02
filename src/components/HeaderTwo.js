import React, { useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import HeaderLayer from './HeaderLayer';

function HeaderTwo() {	
    return (
		<>
            <header className="header">
                <HeaderLayer/>                
                <section className="main-header">
                    <div className="container">
                        <nav className="navbar">
                            <div className="nav-menu">
                                <button className="mobile-nav-toggler"><i className="fas fa-bars"></i></button>
                                <ul>
                                    <li><a href="/">Home</a></li>
                                    <li className="has-menu-child">
                                        <a href="#">Features</a>
                                        <ul className="mega-menu mega-full mega-content-box">
                                            <li>
                                                <div className="row align-items-center">
                                                    <div className="col-md-6">
                                                        <figure>
                                                            <img src="/assets/images/posts/2.jpg" alt="" />
                                                        </figure>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="content-block">
                                                            <h3>
                                                                <a href="#">Strength to smarts: How Smith has levelled up</a>
                                                            </h3>
                                                            <a href="#" className="post-meta">02 hours ago</a>
                                                            <p>
                                                                It's not like Smith needed to augment his batting arsenal, but the erstwhile captain has now. Lorem ipsum dolor sit amet consectetur, adipisicing
                                                                elit. Mollitia ipsum dolor ducimus cupiditate eaque natus quidem commodi consequuntur? Qui aperiam dolorem veritatis est magnam, ea fugiat repellat et
                                                                laboriosam omnis?
                                                            </p>
                                                            <a href="#" className="cricnotch-btn btn-filled bg-success">Learn more</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">The Team</a>
                                    </li>
                                    <li className="has-menu-child">
                                        <a href="#">News</a>

                                        <ul className="mega-menu mega-full mega-content-box">
                                            <li>
                                                <div className="row align-items-center">
                                                    <div className="col-md-4">
                                                        <div className="image-card">
                                                            <figure className="overlay">
                                                                <img src="/assets/images/posts/2.jpg" alt="" />
                                                            </figure>

                                                            <div className="image-card-content">
                                                                <h2><a href="#">Strength to smarts: How Smith has levelled up</a></h2>
                                                                <p>
                                                                    It's not like Smith needed to augment his batting arsenal, but the erstwhile captain has now added a power-hitting dimension to his white-ball game
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="image-card">
                                                            <figure className="overlay">
                                                                <img src="/assets/images/posts/2.jpg" alt="" />
                                                            </figure>

                                                            <div className="image-card-content">
                                                                <h2><a href="#">Strength to smarts: How Smith has levelled up</a></h2>
                                                                <p>
                                                                    It's not like Smith needed to augment his batting arsenal, but the erstwhile captain has now added a power-hitting dimension to his white-ball game
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="image-card">
                                                            <figure className="overlay">
                                                                <img src="/assets/images/posts/2.jpg" alt="" />
                                                            </figure>

                                                            <div className="image-card-content">
                                                                <h2><a href="#">Strength to smarts: How Smith has levelled up</a></h2>
                                                                <p>
                                                                    It's not like Smith needed to augment his batting arsenal, but the erstwhile captain has now added a power-hitting dimension to his white-ball game
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="has-menu-child has-submenu">
                                        <a href="#">Shop</a>
                                        <ul className="sub-menu">
                                            <li><a href="#">Item 1</a></li>
                                            <li><a href="#">Item 2</a></li>
                                            <li><a href="#">Item 3</a></li>
                                            <li><a href="#">Item 4</a></li>
                                            <li><a href="#">Item 5</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <div className="header-search">
                                <form action="homepage.html">
                                    <input type="text" placeholder="Search here" required />
                                    <button type="submit"><i className="fas fa-search"></i></button>
                                </form>
                            </div>
                        </nav>
                    </div>
                </section>
                
                {/* <section className="header-breadcrumb">
                    <div className="container">
                        <div className="breadcrumb-area">
                            <div className="breadcrumb">
                                <a href="/">Home</a>
                                <span>Profile</span>
                            </div>
                            <h2>Profile</h2>
                        </div>
                    </div>
                </section> */}
            </header>
		</>
    );
}

export default HeaderTwo;
