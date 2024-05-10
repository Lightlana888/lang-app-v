import React from 'react';

const Button = React.forwardRef(({ onClick, buttonText, className, disabled }, ref) => {
    const handleClick = () => {
        if (disabled) {
            return;
        }
        onClick();
    };

    return (
        <button ref={ref} className={className} onClick={handleClick} disabled={disabled}>{buttonText}</button>
    );
});

export default Button;
