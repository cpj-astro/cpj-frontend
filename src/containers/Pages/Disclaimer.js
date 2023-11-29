import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function Disclaimer() {
  return (
    <>
        <Header/>
        <div className='container mt-30 others'>
            <p><span style={{ fontSize: '18px' }}><strong>Copyright</strong></span></p>

            <p>Cricket Punter Line or all the things in the&nbsp;app is the legal property of our company&nbsp;and we give you
                a
                limited license to access and use the app. Through Cricket Punter Line you can check out all the latest
                updates&nbsp;of the ongoing series as well as the upcoming&nbsp;series and the past series.&nbsp;According to
                U.S.
                law, this factual and&nbsp;statistical information is not copyrightable because the sine qua non of copyright
                is<br />
                originality. The Unites state supreme court&nbsp;treats originality as the sine qua non of&nbsp;copyright. To
                grab
                copyright protection&nbsp;your work must be original and unique. The&nbsp;court only considers the individual
                which
                is not&nbsp;copied from anywhere else. Cricket scores&nbsp;or constitute facts are not original and&nbsp;unique
                therefore they cannot be copyrighted.</p>

            <p><span style={{ fontSize: '16px' }}><strong>Private Ads</strong></span><br />
                Advertisers provide private ads, we are not responsible for any loss and damage etc.</p>
            <br /><br />
        </div>
        <Footer/>
    </>
  )
}
