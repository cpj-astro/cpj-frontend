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
						<div className="col-md-6">
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
						<div className="col-md-6">
							<div className="foo-widget foo-navigation">
								<h3 className="widget-title">Quick Links</h3>
								<ul>
									<li><a href="/about-us">About us</a></li>
									<li><a href="/contact-us">Contact us</a></li>
									{/* <li><a href="/faqs">Frequently Asked Questions</a></li> */}
									<li><a href="/disclaimer">Disclaimer</a></li>
									<li><a href="/terms">Terms & Conditions</a></li>
									<li><a href="/privacy">Privacy Policy</a></li>
								</ul>
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
				</div>
			</div>
		</footer>
    );
}

export default Footer;
