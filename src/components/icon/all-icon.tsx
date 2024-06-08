import React from "react";

import withIconProps from "./withIconProps";

const AllIconComponents: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg viewBox="0 0 15 17" fill="none" {...props}>
      <path
        d="M2.6665 8H9.33317"
        stroke={props.color}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 11.3333L6 1.33333L11 11.3333"
        stroke={props.color}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.3335 14.6667L11.0002 16.3333L14.3335 13"
        stroke={props.color}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const AllIcon = withIconProps(AllIconComponents);
export default AllIcon;
