import React from 'react';
import { Link } from 'react-router-dom';
import cssStyle from './Footer.module.scss';
const Footer = () => {
    return (
        <footer className={cssStyle.FooterSection}>
            <Link className={`nav-link text-danger`} to="/sitemap.xml">Sitemap</Link>
            <Link className={`nav-link text-danger`} to="/privacy-policy.php">Privacy Policy</Link>
            <Link className={`nav-link text-danger`} to="/disclaimer.php">Disclaimer</Link>
            <Link className={`nav-link text-danger`} to="/faq.php">FAQ</Link>
            <Link className={`nav-link text-danger`} to="/term&amp;condition.php">Terms &amp; Conditions</Link>
            <Link  style={{paddingTop: "10px"}} to="https://www.dmca.com/Protection/Status.aspx?ID=30be0e5e-d3e9-48f2-9be3-fa72b25d4f33&amp;refurl=https://satta-king.in/index.php" title="DMCA.com Protection Status" className="dmca-badge">
                <img src="https://images.dmca.com/Badges/dmca_copyright_protected150a.png?ID=30be0e5e-d3e9-48f2-9be3-fa72b25d4f33" alt="DMCA.com Protection Status" />
            </Link>
            <p className={`text-center text-light`} style={{paddingTop: "10px"}}>
                © 2023 SATTA KING COMPANY LIMITED
                <br />
                All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;