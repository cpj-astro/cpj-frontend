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
            <section class="faq-sec pt-15">
				<div class="container">
					<div class="row">
						<div class="col-lg-12">
							<div class="accordion" id="accordion">
								<div class="accordion-item">
									<h5 class="" data-toggle="collapse" data-target="#hoodie" aria-expanded="true">Question 1</h5>
									<div id="hoodie" class="collapse show" data-parent="#accordion">
										<div class="acr-body">
											<div class="card mb-0">
												<p>
													Lorem ipsum dolor sit amet, consectetur adipiscing elit in, sed diam nonumy eirmod tempor invid id elit sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod.
												</p>
											</div>
										</div>
									</div>
								</div>
								<div class="accordion-item">
									<h5 class="collapsed" data-toggle="collapse" data-target="#sneakers" aria-expanded="false">Question 2</h5>
									<div id="sneakers" class="collapse" data-parent="#accordion">
										<div class="acr-body">
											<div class="card mb-0">
												<p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit in, sed diam nonumy eirmod tempor invid id elit sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod.
												</p>
											</div>
										</div>
									</div>
								</div>
								<div class="accordion-item">
									<h5 class="collapsed" data-toggle="collapse" data-target="#jg-hoddies" aria-expanded="false">Question 3</h5>
									<div id="jg-hoddies" class="collapse" data-parent="#accordion">
										<div class="acr-body">
											<div class="card mb-0">
												<p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit in, sed diam nonumy eirmod tempor invid id elit sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod..
												</p>
											</div>
										</div>
									</div>
								</div>
								<div class="accordion-item">
									<h5 class="collapsed" data-toggle="collapse" data-target="#alc_sneakers" aria-expanded="false">Question 4</h5>
									<div id="alc_sneakers" class="collapse" data-parent="#accordion">
										<div class="acr-body">
											<div class="card mb-0">
												<p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit in, sed diam nonumy eirmod tempor invid id elit sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod sed diam nonumy eirmod.
												</p>
											</div>
										</div>
									</div>
								</div>
								<div class="accordion-item">
									<h5 class="collapsed" data-toggle="collapse" data-target="#alc_shoes" aria-expanded="false">Question 5</h5>
									<div id="alc_shoes" class="collapse" data-parent="#accordion">
										<div class="acr-body">
											<div class="card mb-0">
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
