import React from "react";
import "./Button.css";

function Button({ onClick, className, children, ...rest }) {
	return (
		<button onClick={onClick} className={`default ${className}`} {...rest}>
			{children}
		</button>
	);
}

export default Button;
