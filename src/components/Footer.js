import React, { useEffect, useState } from 'react';

function Footer() {
	const [year, setYear] = useState(null);

	useEffect(() => {
		let currentDate = new Date(); 
		setYear(currentDate.getFullYear());  
	}, [])
	
    return (
        <footer className="footer">
			<div className="footer-top">
				<div className="container">
					<div className="row">
						<div className="col-md-6 col-lg-3">
							<div className="foo-widget foo-text mb-40">
								<div className="foo-text-content">
									<a href="homepage.html" className="logo">
										<img src="/assets/images/logo.png" alt="Cricnotch" />
									</a>
									<p>
										It's not like Smith needed to augment his batting arsenal, but the erstwhile captain has now. It's not like Smith needed to augment his batting arsenal, but the
										erstwhile captain has now. It's not like Smith needed to augment his batting arsenal, but the erstwhile.
									</p>
								</div>
							</div>
							<div className="foo-widget foo-social">
								<a href="#"><i className="fab fa-facebook-f"></i></a><a href="#"><i className="fab fa-twitter"></i></a><a href="#"><i className="fab fa-instagram"></i></a
								><a href="#"><i className="fab fa-pinterest-p"></i></a>
							</div>
						</div>
						<div className="col-md-6 col-lg-3">
							<div className="foo-widget foo-recent-post">
								<h3 className="widget-title">Hot Topics</h3>
								<ul>
									<li>
										<div className="post-thumb">
											<img src="/assets/images/posts/thumbs/1.jpg" alt="" />
										</div>
										<div className="rc-post-inner">
											<h5><a href="#">Strength to smarts: How Smith has levelled up</a></h5>
											<a href="#" className="post-meta">02 hours ago</a>
										</div>
									</li>
									<li>
										<div className="post-thumb">
											<img src="/assets/images/posts/thumbs/2.jpg" alt="" />
										</div>
										<div className="rc-post-inner">
											<h5><a href="#">Strength to smarts: How Smith has levelled up</a></h5>
											<a href="#" className="post-meta">02 hours ago</a>
										</div>
									</li>
									<li>
										<div className="post-thumb">
											<img src="/assets/images/posts/thumbs/3.jpg" alt="" />
										</div>
										<div className="rc-post-inner">
											<h5><a href="#">Strength to smarts: How Smith has levelled up</a></h5>
											<a href="#" className="post-meta">02 hours ago</a>
										</div>
									</li>
								</ul>
							</div>
						</div>
						<div className="col-md-6 col-lg-3">
							<div className="foo-widget foo-navigation">
								<h3 className="widget-title">Quick Links</h3>
								<ul>
									<li><a href="/about-us">About us</a></li>
									<li><a href="/contact-us">Contact us</a></li>
									<li><a href="/faqs">Frequently Asked Questions</a></li>
									<li><a href="/disclaimer">Disclaimer</a></li>
									<li><a href="/terms">Terms & Conditions</a></li>
									<li><a href="/privacy">Privacy Policy</a></li>
								</ul>
							</div>
						</div>
						<div className="col-md-6 col-lg-3">
							<div className="foo-widget foo-newsletter">
								<h3 className="widget-title">newsletter</h3>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
								<form action="index.html">
									<input type="text" placeholder="Email Address" />
									<button type="submit">Subscribe</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="footer-copyright">
				<div className="row">
					<div className="col-md-6">
						<p><a href="#">CricketPanditJi</a> &copy; {year} &nbsp;|&nbsp; All Rights Reserved</p>
					</div>
					<div className="col-md-6 text-md-right">
						<a href="#"><img src="/assets/images/payments/01.png" alt="" /></a><a href="#"><img src="/assets/images/payments/02.png" alt="" /></a
						><a href="#"><img src="/assets/images/payments/03.png" alt="" /></a><a href="#"><img src="/assets/images/payments/04.png" alt="" /></a
						><a href="#"><img src="/assets/images/payments/05.png" alt="" /></a><a href="#"><img src="/assets/images/payments/06.png" alt="" /></a>
					</div>
				</div>
			</div>
		</footer>
    );
}

export default Footer;
