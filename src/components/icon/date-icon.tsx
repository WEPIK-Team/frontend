import React from "react";

import withIconProps from "./withIconProps";

const DateIconComponents: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg viewBox="0 0 18 18" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 3.25H4C2.48122 3.25 1.25 4.48122 1.25 6V14C1.25 15.5188 2.48122 16.75 4 16.75H14C15.5188 16.75 16.75 15.5188 16.75 14V6C16.75 4.48122 15.5188 3.25 14 3.25ZM4 2C1.79086 2 0 3.79086 0 6V14C0 16.2091 1.79086 18 4 18H14C16.2091 18 18 16.2091 18 14V6C18 3.79086 16.2091 2 14 2H4Z"
        fill={props.color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.25 0.625V4.075C6.25 4.42018 5.97018 4.7 5.625 4.7C5.27982 4.7 5 4.42018 5 4.075V0.625C5 0.279822 5.27982 0 5.625 0C5.97018 0 6.25 0.279822 6.25 0.625Z"
        fill={props.color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.25 0.625V4.075C13.25 4.42018 12.9702 4.7 12.625 4.7C12.2798 4.7 12 4.42018 12 4.075V0.625C12 0.279822 12.2798 0 12.625 0C12.9702 0 13.25 0.279822 13.25 0.625Z"
        fill={props.color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 7.625L0 7.625L0 6.375L18 6.375V7.625Z"
        fill={props.color}
      />
    </svg>
  );
};

const DateIcon = withIconProps(DateIconComponents);
export default DateIcon;
