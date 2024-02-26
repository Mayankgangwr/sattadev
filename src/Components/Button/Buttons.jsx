import React from "react";
import cssStyle from "./Buttons.module.scss";

const Button = ({ text, btnClass }) => {
    return (
        <div className={`${cssStyle.Btn}`}>
            <button className={`btn ${btnClass}`}>{text}</button>
        </div>
    );
}

export default Button;
