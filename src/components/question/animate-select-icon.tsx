import { motion } from "framer-motion";
import * as React from "react";

import { cn } from "@/lib/utils";

interface IAnimatieSelectIconProps {
  className?: string;
}

const AnimatieSelectIcon: React.FunctionComponent<IAnimatieSelectIconProps> = ({
  className,
}) => {
  return (
    <div className={cn(className)}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="rounded-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.circle
          cx="12"
          cy="12"
          r="12"
          fill="#6377DD"
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
        />
        <motion.path
          d="M6.00001 11.426L10.6379 16.2856L18 8.57129"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{
            opacity: 0,
            pathLength: 0,
          }}
          animate={{
            opacity: 1,
            pathLength: 1,
          }}
          transition={{
            delay: 0.1,
            duration: 0.3,
          }}
        />
      </svg>
    </div>
  );
};

export default AnimatieSelectIcon;
