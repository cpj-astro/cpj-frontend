import React from 'react'

export default function FooterV2() {
  return (
    <footer>
        <div className="container">
            <div className="cp__fotter-report d-flex flex-wrap align-items-center  justify-content-between" data-aos="zoom-in">
            <div className="cp__report-desc col-lg-7 col-sm-12">
                <h4>Unlock Success: Try our report to increase your winning chances</h4>
            </div>
            <div className="text-center col-lg-5 col-sm-12">
                <a href="#" className="cp__fill-btn">Only 51/-</a>
            </div>
            </div>
            <div className="d-flex flex-wrap justify-content-between cp__footer-main">
            <div className="col-lg-5 col-sm-12 cp__logo-block" data-aos="fade-up">
                <div className="cp__logo" data-aos="zoom-in">
                    <a href="/"><img src="/assets/images/logo.png" alt="logo" /></a>
                </div>
                <p>Welcome to cricket panditji, your ultimate destination for astrology enthusiasts seeking cosmic guidance and insights into the mystical world of celestial influences.</p>
                <div className="cp__social-link">
                <a href="#"><img src="/assets/images/insta.svg" alt="logo" /></a>
                <a href="#"><img src="/assets/images/facebook.svg" alt="logo" /></a>
                <a href="#"><img src="/assets/images/tweeter.svg" alt="logo" /></a>
                </div>
            </div>
            <div className="col-lg-4 col-sm-12" data-aos="fade-up">
                <h3>Use Full Links</h3>
                <ul>
                <li><a href="/disclaimer">Disclaimer</a></li>
                <li><a href="/terms">Terms &amp; Conditions</a></li>
                <li><a href="/privacy">Privacy Policy</a></li>
                </ul>
            </div>
            <div className="col-lg-3 col-sm-12" data-aos="fade-up">
                <h3>Contact</h3>
                <div className="cp__contact">
                {/* <p><img src="/assets/images/home.svg" alt="logo" />No 58A, Baltimore Street, USA</p> */}
                <a href="mailto:cricketpanditji.astro@gmail.com"><img src="/assets/images/mail.svg" alt="logo" />cricketpanditji.astro@gmail.com</a>
                <a href="/contact-us"><img src="/assets/images/phone.svg" alt="logo" />Contact Us</a>
                </div>
            </div>
            </div>
            <div className="cp__copywrite-txt">
                <p>CricketPanditJi ©2024 | All Rights Reserved</p>
            </div>
        </div>
    </footer>
  )
}
