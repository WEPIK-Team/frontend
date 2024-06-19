import { motion } from "framer-motion";
import React from "react";

import { cn } from "@/lib/utils";

const AnimateCheckIcon = ({ className }: Record<string, string>) => {
  return (
    <div className={cn(className)}>
      <svg
        width="12"
        height="8"
        viewBox="0 0 12 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M1 3.2203L4.86487 7L11 1"
          stroke="#6377DD"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          initial={{
            opacity: 0,
            pathLength: 0,
          }}
          animate={{
            opacity: 1,
            pathLength: 1,
          }}
          transition={{
            delay: 0.2,
            duration: 0.5,
          }}
        />
      </svg>
    </div>
  );
};

export default AnimateCheckIcon;
