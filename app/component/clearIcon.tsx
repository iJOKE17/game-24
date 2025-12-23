import React from "react";

interface ClearIconProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
    color?: string;
}

const ClearIcon: React.FC<ClearIconProps> = ({ className, color = "currentColor", ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 352 512"
        className={className}
        fill={color}
        {...props}
    >
        <path d="M242.7 256l100.1-100.1c12.3-12.3 12.3-32.2 0-44.5s-32.2-12.3-44.5 0L198.2 211.5 98.1 111.4c-12.3-12.3-32.2-12.3-44.5 0s-12.3 32.2 0 44.5L153.7 256 53.6 356.1c-12.3 12.3-12.3 32.2 0 44.5s32.2 12.3 44.5 0l100.1-100.1 100.1 100.1c12.3 12.3 32.2 12.3 44.5 0s12.3-32.2 0-44.5L242.7 256z"/>
    </svg>
);

export default ClearIcon;
