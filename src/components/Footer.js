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
						<div className="col-md-3">
							<div className="foo-widget foo-text">
								<div className="foo-text-content">
									<a href="/" className="f-logo m-0">
										<img src="/assets/images/logo.png" alt="Cricnotch" />
									</a>
								</div>
							</div>
						</div>
						<div className="col-md-9">
							<div className="display-set mt-5" style={{flexWrap: 'wrap'}}>
								<span className='ml-5 text-white'><a href="/contact-us">Contact us</a></span>
								<span className='ml-5 text-white'><a href="/feedback">Feedback</a></span>
								<span className='ml-5 text-white'><a href="/disclaimer">Disclaimer</a></span>
								<span className='ml-5 text-white'><a href="/terms">Terms & Conditions</a></span>
								<span className='ml-5 text-white'><a href="/privacy">Privacy Policy</a></span>
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
