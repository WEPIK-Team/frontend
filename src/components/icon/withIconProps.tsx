import React from "react";

interface IconProps {
  color?: string;
  size?: number;
  className?: string;
}

const withIconProps = <P extends React.SVGProps<SVGSVGElement>>(
  Component: React.ComponentType<P>
): React.FC<P & IconProps> => {
  return ({
    color = "currentColor",
    size = 24,
    className = "",
    ...props
  }: IconProps) => (
    <Component
      color={color}
      width={size}
      height={size}
      className={className}
      {...(props as P)}
    />
  );
};

export default withIconProps;
