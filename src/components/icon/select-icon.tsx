import React from "react";

import withIconProps from "./withIconProps";

const SelectIconComponents: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => {
  return (
    <svg viewBox="0 0 18 18" fill="none" {...props}>
      <path
        d="M12.2783 1.7004C11.2779 1.25038 10.1682 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17C12.9056 17 16.1575 14.2013 16.8596 10.5"
        stroke={props.color}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M6 8.76391L9.1579 12L17 4"
        stroke={props.color}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
};

const SelectIcon = withIconProps(SelectIconComponents);
export default SelectIcon;
