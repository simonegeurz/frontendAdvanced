import React, { } from "react";
import '../sass/_footer.css';
import { useTranslation } from "react-i18next";
import logo from "../../images/full.jpg";


function Footer() {
    const { t, i18n } = useTranslation();

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    return (
        <div className="footer">
            <p>footer</p>
        </div> 
    );
}

export default Footer;
