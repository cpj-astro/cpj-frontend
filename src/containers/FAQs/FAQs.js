import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function FAQs() {
  return (
    <>
        <Header/>
        <div id="main" className="main-container faqs">
            <div className="container breadcrumb-area">
                <div className="breadcrumb">
                    <a href="/">Home</a>
                    <span>FAQ</span>
                </div>
                <h2>FAQ</h2>
            </div>
            <section className="faq-sec pt-15">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="accordion" id="accordion">
								<div className="accordion-item">
									<h5 className="" data-toggle="collapse" data-target="#hoodie" aria-expanded="true">Question 1</h5>
									<div id="hoodie" className="collapse show" data-parent="#accordion">
										<div className="acr-body">
											<div className="card mb-0">
												<p>
													Lorem ipsum dolor sit amet, consectetur adipiscing elit in, sed diam nonumy eirmod tempor invid id elit sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod.
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className="accordion-item">
									<h5 className="collapsed" data-toggle="collapse" data-target="#sneakers" aria-expanded="false">Question 2</h5>
									<div id="sneakers" className="collapse" data-parent="#accordion">
										<div className="acr-body">
											<div className="card mb-0">
												<p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit in, sed diam nonumy eirmod tempor invid id elit sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod.
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className="accordion-item">
									<h5 className="collapsed" data-toggle="collapse" data-target="#jg-hoddies" aria-expanded="false">Question 3</h5>
									<div id="jg-hoddies" className="collapse" data-parent="#accordion">
										<div className="acr-body">
											<div className="card mb-0">
												<p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit in, sed diam nonumy eirmod tempor invid id elit sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod..
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className="accordion-item">
									<h5 className="collapsed" data-toggle="collapse" data-target="#alc_sneakers" aria-expanded="false">Question 4</h5>
									<div id="alc_sneakers" className="collapse" data-parent="#accordion">
										<div className="acr-body">
											<div className="card mb-0">
												<p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit in, sed diam nonumy eirmod tempor invid id elit sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod.
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className="accordion-item">
									<h5 className="collapsed" data-toggle="collapse" data-target="#alc_shoes" aria-expanded="false">Question 5</h5>
									<div id="alc_shoes" className="collapse" data-parent="#accordion">
										<div className="acr-body">
											<div className="card mb-0">
												<p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit in, sed diam nonumy eirmod tempor invid id elit sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod.
												</p>
											</div>
										</div>
									</div>
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
