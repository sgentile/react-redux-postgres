import React from 'react';

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer>
            <span>
                <strong>Copyright &copy; {year} <a href="http://www.company.com/">Company Name</a>.</strong> All rights reserved.
            </span>
        </footer>
    )
};

export default Footer;