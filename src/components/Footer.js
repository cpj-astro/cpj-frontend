import React, { useEffect, useState } from 'react';

function Footer() {
	const [year, setYear] = useState(null);

	useEffect(() => {
		let currentDate = new Date(); 
		setYear(currentDate.getFullYear());  
	}, [])
	
    return (
        <footer className="footer">
			<div className="footer-copyright text-white">
				<div className="row">
					<div className="col-md-6">
						<a href="/">CricketPanditJi</a> &copy; {year} &nbsp;|&nbsp; All Rights Reserved
					</div>
					<div className="col-md-6">
						<span className='ml-5 text-white'><a href="/contact-us">Contact us</a></span>
						<span className='ml-5 text-white'><a href="/feedback">Feedback</a></span>
						<span className='ml-5 text-white'><a href="/disclaimer">Disclaimer</a></span>
						<span className='ml-5 text-white'><a href="/terms">Terms & Conditions</a></span>
						<span className='ml-5 text-white'><a href="/privacy">Privacy Policy</a></span>
					</div>
				</div>
			</div>
		</footer>
    );
}

export default Footer;
