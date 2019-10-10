import React from 'react'
import {Link} from 'react-router-dom'
import { Row, Col} from 'antd';
import cards from './static/cards.png'
import './styles.scss'

export const Footer = () => {

    const date = new Date()
    const year = date.getFullYear()

    return (
        <section className="footer-section">
            <Row gutter={16}>
                <Col xs={24} sm={24} md={12} lg={12} xl={6} >
                    <div className="footer-logo text-center">
                        <Link to='/'><span className='site-logo'>MUZ-SHOP</span></Link>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={6} >
                    <div className="footer-widget about-widget">
                        <h2 className="footer-header">About</h2>
                        <p>Donec vitae purus nunc. Morbi faucibus erat sit amet congue mattis. Nullam frin-gilla faucibus urna, id dapibus erat iaculis ut. Integer ac sem.</p>
                        <img src={cards}></img>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={6} >
                    <div className="footer-widget about-widget">
                        <h2 className="footer-header">Authors:</h2>
                        <ul className="footer-list">
                            <li className="footer-list__item"><a href="/" >Andrew Polishuk</a></li>
                            <li className="footer-list__item"><a href="/" >Maksim Popov</a></li>
                            <li className="footer-list__item"><a href="/" >Dima Polikarpov</a></li>
                            <li className="footer-list__item"><a href="/" >Tatyana</a></li>
                            <li className="footer-list__item"><a href="/" >Vasiliy Tsyvinskyi</a></li>
                            <li className="footer-list__item"><a href="/" >Ivan Bohatov</a></li>
                            <li className="footer-list__item"><a href="/" >Nazar Senychak</a></li>
                        </ul>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={6} >
                    <div className="footer-widget contact-widget">
                        <h2 className="footer-header">Address</h2>
                        <div className="contact-info"><span>C.</span><p>Your Company Ltd </p></div>
                        <div className="contact-info"><span>B.</span><p>1481 Creekside Lane Avila Beach</p></div>
                        <div className="contact-info"><span>T.</span><p>+53 345 7953 32453</p></div>
                        <div className="contact-info"><span>E.</span><p>office@youremail.com</p></div>
                    </div>
                </Col>
            </Row>
            <div className="footer-social-links">
                <div className="container">
                    <div className="social-links">
                        <a href="" className="instagram"><i className="fab fa-instagram"></i><span className="soc-link-text">instagram</span></a>
                        <a href="" className="google-plus"><i className="fab fa-google-plus"></i><span className="soc-link-text">g+plus</span></a>
                        <a href="" className="pinterest"><i className="fab fa-pinterest"></i><span className="soc-link-text">pinterest</span></a>
                        <a href="" className="facebook"><i className="fab fa-facebook"></i><span className="soc-link-text">facebook</span></a>
                        <a href="" className="twitter"><i className="fab fa-twitter"></i><span className="soc-link-text">twitter</span></a>
                        <a href="" className="youtube"><i className="fab fa-youtube"></i><span className="soc-link-text">youtube</span></a>
                        <a href="" className="tumblr"><i className="fab fa-tumblr-square"></i><span className="soc-link-text">tumblr</span></a>
                    </div>
                </div>
                <p className="subfooter-text text-white">Copyright © { year } All rights reserved | Created by: DAN-IT Monster-Students
                </p>

            </div>
        </section>
    )
};