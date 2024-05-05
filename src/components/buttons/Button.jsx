import React from 'react';

const Button = React.forwardRef(({ onClick, buttonText, className }, ref) => {
    const handleClick = () => {
        onClick();
    };

    return (
        <button ref={ref} className={className} onClick={handleClick}>{buttonText}</button>
    );
});

export default Button;
