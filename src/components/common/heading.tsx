import { forwardRef, HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export type HeadingElements = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingElements;
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  const { as: Type = "h1", className, ...rest } = props;

  return <Type ref={ref} {...rest} className={cn(className)} />;
});

export default Heading;
