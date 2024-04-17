
import React from 'react';


function Button({ onClick, buttonText, className }) {
    const handleClick = () => {
        onClick();
    };

    return (
        <div>
            <button className={className} onClick={handleClick}>{buttonText}</button>
        </div>
    );
}

export default Button;
