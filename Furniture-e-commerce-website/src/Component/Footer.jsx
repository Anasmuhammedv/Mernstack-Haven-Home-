import React from 'react';
import '../Css Files/Footer.css'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h3>About Us</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <div className="col-md-4">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><Link to={"#"}>Home</Link></li>
                            <li><Link to={"#"}>About</Link></li>
                            <li><Link to={"#"}>Services</Link></li>
                            <li><Link to={"#"}>Contact</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h3>Contact Us</h3>
                        <p>123 Street Name, City, Country</p>
                        <p>Email: info@example.com</p>
                        <p>Phone: +123 456 7890</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 text-center">
                        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
