import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function ContactUs() {
  return (
    <>
        <Header/>
        <div id="main" className="main-container contactus">
            <div className="container breadcrumb-area">
                <div className="breadcrumb">
                    <a href="/">Home</a>
                    <span>Contact Us</span>
                </div>
                <h2>Contact Us</h2>
            </div>
            <section className="contact-sec pt-15">
                <div className="container">
                <div className="card card-shadow px-30 py-30">
                    <div className="row">
                    <div className="col-md-12">
                        <div className="comment-form p-0">
                        <h3 className="widget-title">Send Us Messages</h3>
                        <p className="mb-20">
                            Our Office timings are <p><strong>Mondays to Fridays: 9:00am to 12:00pm </strong></p>
                        </p>
                        <hr/>
                        <form action="blog-details.html">
                            <div className="form-row">
                            <div className="col-md-6">
                                <div className="input-field">
                                <label htmlFor="username">Your name</label>
                                <input id="username" type="text" name="name" placeholder="Enter name" required />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="input-field">
                                <label htmlFor="useremail">Email address</label>
                                <input id="useremail" type="email" name="email" placeholder="Enter email" required />
                                </div>
                            </div>
                            </div>
                            <div className="input-field textarea">
                            <label htmlFor="usercmmnt">Your Comment</label>
                            <textarea id="usercmmnt" name="commnets" placeholder="Write your comment" defaultValue={""} />
                            </div>
                            <button type="submit" className="cricnotch-btn btn-filled radius-5">Send Message</button>
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </section>
        </div>
        <Footer/>
    </>
  )
}
