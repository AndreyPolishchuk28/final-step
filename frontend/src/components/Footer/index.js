import React from 'react'
import {Link} from 'react-router-dom'

import logoLight from './static/logo-light.png'
import cards from './static/cards.png'
import './styles.scss'

export const Footer = () => {
    const date = new Date()
    const year = date.getFullYear()
    console.log(year)
    return (
        <section class="footer-section">
            <div className="container">
                <div className="footer-logo text-center">
                    <Link to="/" ><img src={logoLight} alt="logo"/></Link>
                </div>
                <div className="row">
                    <div className="col-lg-3 col-sm-6">
                        <div className="footer-widget about-widget">
                            <h2 className="footer-header">About</h2>
                            <p>Donec vitae purus nunc. Morbi faucibus erat sit amet congue mattis. Nullam frin-gilla faucibus urna, id dapibus erat iaculis ut. Integer ac sem.</p>
                            <img src={cards}></img>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="footer-widget about-widget">
                            <h2 className="footer-header">Questions</h2>
                            <ul className="footer-list">
                                <li className="footer-list__item"><a href="/" >Some Text</a></li>
                                <li className="footer-list__item"><a href="/" >Some Text</a></li>
                                <li className="footer-list__item"><a href="/" >Some Text</a></li>
                                <li className="footer-list__item"><a href="/" >Some Text</a></li>
                            </ul>
                            <ul className="footer-list">
                                <li className="footer-list__item"><a href="/" >Some Text</a></li>
                                <li className="footer-list__item"><a href="/" >Some Text</a></li>
                                <li className="footer-list__item"><a href="/" >Some Text</a></li>
                                <li className="footer-list__item"><a href="/" >Some Text</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="footer-widget about-widget">
                            <h2 className="footer-header">Questions</h2>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="footer-widget contact-widget">
                            <h2 className="footer-header">Questions</h2>
                            <div className="contact-info"><span>C.</span><p>Your Company Ltd </p></div>
                            <div className="contact-info"><span>B.</span><p>1481 Creekside Lane  Avila Beach, CA 93424, P.O. BOX 68 </p></div>
                            <div className="contact-info"><span>T.</span><p>+53 345 7953 32453</p></div>
                            <div className="contact-info"><span>E.</span><p>office@youremail.com</p></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-social-links">
                <div className="container">
                <div className="social-links">
					<a href="" className="instagram"><i className="fab fa-instagram"></i><span>instagram</span></a>
					<a href="" className="google-plus"><i className="fab fa-google-plus"></i><span>g+plus</span></a>
					<a href="" className="pinterest"><i className="fab fa-pinterest"></i><span>pinterest</span></a>
					<a href="" className="facebook"><i className="fab fa-facebook"></i><span>facebook</span></a>
					<a href="" className="twitter"><i className="fab fa-twitter"></i><span>twitter</span></a>
					<a href="" className="youtube"><i className="fab fa-youtube"></i><span>youtube</span></a>
					<a href="" className="tumblr"><i className="fab fa-tumblr-square"></i><span>tumblr</span></a>
				</div>

                </div>
                <p className="text-white text-center mt-5">Copyright © { year } All rights reserved | Created by: DAN-IT Monster-Students
            </p>

            </div>
	    </section>        
    )
};