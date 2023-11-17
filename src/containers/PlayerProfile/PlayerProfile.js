import React from 'react';
import axios from 'axios';
import HeaderTwo from '../../components/HeaderTwo';
import Footer from '../../components/Footer';
import { useParams } from 'react-router-dom';

function PlayerProfile() {
    return (
        <>
            <HeaderTwo/>
            <div id="main" className="main-container">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="filter-nav card card-shadow p-0 mb-20">
                                <ul className="nav nav-tabs mb-0">
                                    <li><a className="active" href="#">Overview</a></li>
                                    <li><a href="#">Related News</a></li>
                                    <li><a href="#">Gallery</a></li>
                                    <li><a href="#">Contact</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-9">
                            <section className="player-contact pt-0">
                                <div className="card card-shadow">
                                    <div className="player-profile">
                                        <figure className="player-avatar">
                                            <img src="/assets/images/avatars/player-1.jpg" alt="" />
                                        </figure>
                                        <div className="player-info">
                                            <div className="info-header">
                                                <div>
                                                    <h2>
                                                        Mahmudullah Riyad &nbsp;
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="19.636" height="24" viewBox="0 0 19.636 24">
                                                            <path
                                                                id="Icon_material-verified-user"
                                                                data-name="Icon material-verified-user"
                                                                d="M14.318,1.5,4.5,5.864v6.545c0,6.055,4.189,11.716,9.818,13.091,5.629-1.375,9.818-7.036,9.818-13.091V5.864ZM12.136,18.955,7.773,14.591l1.538-1.538,2.825,2.815,7.189-7.189,1.538,1.549Z"
                                                                transform="translate(-4.5 -1.5)"
                                                                fill="#3a5ae5"
                                                            />
                                                        </svg>
                                                    </h2>
                                                    <div className="country-info align-items-center">
                                                        <div className="flag-avatar mr-05">
                                                            <figure className="avatar-28">
                                                                <img src="/assets/images/flags/bangladesh.png" alt="" />
                                                            </figure>
                                                        </div>
                                                        <span className="country-name text-13">bangladesh</span>
                                                    </div>
                                                </div>
                                                <div className="social-share">
                                                    <a href="#"><i className="fab fa-facebook-f"></i></a><a href="#"><i className="fab fa-twitter"></i></a><a href="#"><i className="fab fa-instagram"></i></a>
                                                </div>
                                            </div>

                                            <div className="info-body">
                                                <ul className="list-striped mr-05">
                                                    <li>
                                                        <span>Date of birth</span>
                                                        <p>Feb 04, 1986</p>
                                                    </li>
                                                    <li>
                                                        <span>Birth place</span>
                                                        <p>Mymensingh</p>
                                                    </li>
                                                    <li>
                                                        <span>Height</span>
                                                        <p>175 cm</p>
                                                    </li>
                                                    <li>
                                                        <span>Role</span>
                                                        <p>Batting Allrounder</p>
                                                    </li>
                                                </ul>
                                                <ul className="list-striped">
                                                    <li>
                                                        <span>Batting Style</span>
                                                        <p>Right Handed Bat</p>
                                                    </li>
                                                    <li>
                                                        <span>Bowling Style</span>
                                                        <p>Right-arm offbreak</p>
                                                    </li>
                                                    <li>
                                                        <span>Current age</span>
                                                        <p>31 years 300 days</p>
                                                    </li>
                                                    <li>
                                                        <span>Relation</span>
                                                        <p>
                                                            Mushfiqur Rahim
                                                            <small> (Brother-in-law)</small>
                                                        </p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="widget">
                                    <h3 className="widget-title">Write a Comment</h3>
                                    <div className="card card-shadow comment-form">
                                        <p className="mb-20">
                                            It's not like Smith needed to augment his batting arsenal, but the erstwhile captain has now. It's not like Smith needed to augment his batting arsenal, but the
                                            erstwhile captain has now.
                                        </p>
                                        <form action="blog-details.html">
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="input-field">
                                                        <label for="username">Your name</label>
                                                        <input id="username" type="text" name="name" placeholder="Enter name" required />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="input-field">
                                                        <label for="useremail">Email address</label>
                                                        <input id="useremail" type="email" name="email" placeholder="Enter email" required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="input-field textarea">
                                                <label for="usercmmnt">Your Comment</label>
                                                <textarea id="usercmmnt" name="commnets" placeholder="Write your comment"></textarea>
                                            </div>
                                            <button type="submit" className="cricnotch-btn btn-filled">Submit now</button>
                                        </form>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div className="col-lg-3">
                            <aside className="sidebar right-sidebar">
                                <div className="widget widget-latest-news">
                                    <h3 className="widget-title">Popular News</h3>

                                    <div className="card card-shadow">
                                        <div className="content-card card-grid">
                                            <figure>
                                                <img src="/assets/images/posts/thumbs/1.jpg" alt="" />
                                            </figure>
                                            <div className="content-block">
                                                <h3>
                                                    <a href="#">Strength to smarts: How Smith has levelled up</a>
                                                </h3>
                                                <a href="#" className="post-meta">02 hours ago</a>
                                            </div>
                                        </div>
                                        <div className="content-card card-grid">
                                            <figure>
                                                <img src="/assets/images/posts/thumbs/2.jpg" alt="" />
                                            </figure>
                                            <div className="content-block">
                                                <h3>
                                                    <a href="#">Strength to smarts: How Smith has levelled up</a>
                                                </h3>
                                                <a href="#" className="post-meta">02 hours ago</a>
                                            </div>
                                        </div>
                                        <div className="content-card card-grid">
                                            <figure>
                                                <img src="/assets/images/posts/thumbs/3.jpg" alt="" />
                                            </figure>
                                            <div className="content-block">
                                                <h3>
                                                    <a href="#">Strength to smarts: How Smith has levelled up</a>
                                                </h3>
                                                <a href="#" className="post-meta">02 hours ago</a>
                                            </div>
                                        </div>
                                        <div className="content-card card-grid">
                                            <figure>
                                                <img src="/assets/images/posts/thumbs/4.jpg" alt="" />
                                            </figure>
                                            <div className="content-block">
                                                <h3>
                                                    <a href="#">Strength to smarts: How Smith has levelled up</a>
                                                </h3>
                                                <a href="#" className="post-meta">02 hours ago</a>
                                            </div>
                                        </div>
                                        <div className="content-card card-grid">
                                            <figure>
                                                <img src="/assets/images/posts/thumbs/5.jpg" alt="" />
                                            </figure>
                                            <div className="content-block">
                                                <h3>
                                                    <a href="#">Strength to smarts: How Smith has levelled up</a>
                                                </h3>
                                                <a href="#" className="post-meta">02 hours ago</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}
    
export default PlayerProfile;