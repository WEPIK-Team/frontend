import { cva } from "class-variance-authority";
import { motion } from "framer-motion";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface IndexItemProps {
  title: string;
  content?: string;
  isSelected: boolean;
  idx: number;
  onSelect: () => void;
}

const liVariants = cva("relative rounded-[15px] bg-white cursor-pointer", {
  variants: {
    isSelected: {
      true: "border div-border-gradient box-border",
    },
  },
});

const titleVariants = cva("ml-1 break-words text-wpt-md z-10", {
  variants: {
    isAnswer: {
      true: "text-wpc-gray",
      false: "text-black",
    },
    isSelected: {
      true: "font-semibold",
      false: "font-normal",
    },
  },
});

const IndexItem = ({
  title,
  content,
  idx,
  isSelected,
  onSelect,
}: IndexItemProps) => {
  const isAnswer = typeof content === "string" && content.trim().length > 0;

  const motionVariants = {
    selected: { scale: 1.02, transition: { duration: 0.2 } },
    notSelected: { scale: 1, transition: { duration: 0.2 } },
  };

  return (
    <motion.li
      className={cn(liVariants({ isSelected }))}
      onClick={onSelect}
      variants={motionVariants}
      animate={isSelected ? "selected" : "notSelected"}
    >
      <div className="flex items-center p-[16px]">
        {isAnswer ? (
          <div className="w-[32px]">
            <Image
              src="/svgs/sender-check.svg"
              width={24}
              height={24}
              alt="index-isAnswer"
            />
          </div>
        ) : (
          <span className="z-10 w-[40px] flex-shrink-0 text-left text-[20px] font-semibold leading-[22px] text-wpc-primary">{`Q${idx + 1}.`}</span>
        )}

        <span className={titleVariants({ isAnswer, isSelected })}>{title}</span>
      </div>
    </motion.li>
  );
};

export default IndexItem;
