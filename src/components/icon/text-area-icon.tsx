import React from "react";

import withIconProps from "./withIconProps";

const TextAreaIconComponents: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => {
  return (
    <svg viewBox="0 0 18 18" fill="none" {...props}>
      <path
        d="M1 1H17"
        stroke={props.color}
        stroke-width="1.25"
        stroke-linecap="round"
      />
      <path
        d="M1 5.20001H17"
        stroke={props.color}
        stroke-width="1.25"
        stroke-linecap="round"
      />
      <path
        d="M1 9.40002H15"
        stroke={props.color}
        stroke-width="1.25"
        stroke-linecap="round"
      />
      <path
        d="M1 13.6H9"
        stroke={props.color}
        stroke-width="1.25"
        stroke-linecap="round"
      />
    </svg>
  );
};

const TextAreaIcon = withIconProps(TextAreaIconComponents);
export default TextAreaIcon;
