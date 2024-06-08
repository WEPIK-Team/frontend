import React from "react";

import withIconProps from "./withIconProps";

const InputIconComponents: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => {
  return (
    <svg viewBox="0 0 18 12" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M1 1H14"
        stroke={props.color}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M1 6H17"
        stroke={props.color}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M1 11H10"
        stroke={props.color}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
};

const InputIcon = withIconProps(InputIconComponents);
export default InputIcon;
