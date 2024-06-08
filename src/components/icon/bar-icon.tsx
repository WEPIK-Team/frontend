import React from "react";

import withIconProps from "./withIconProps";

const BarIconComponents: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg viewBox="0 0 20 8" fill="none" {...props}>
      <path
        d="M1 4H7"
        stroke={props.color}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M13 4H19"
        stroke={props.color}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <circle cx="10" cy="4" r="3" stroke={props.color} strokeWidth="1.25" />
    </svg>
  );
};

const BarIcon = withIconProps(BarIconComponents);
export default BarIcon;
