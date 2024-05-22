import { cva } from "class-variance-authority";
import Image from "next/image";

interface IndexItemProps {
  title: string;
  isAnswer: boolean;
  isSelected: boolean;
  idx: number;
}

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

const IndexItem = ({ title, isAnswer, idx, isSelected }: IndexItemProps) => {
  return (
    <li className="relative flex items-center rounded-[15px] bg-white p-[16px]">
      {isSelected ? (
        <>
          <div
            className="absolute -inset-px rounded-2xl bg-wpc-primary-grad"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 rounded-2xl bg-white"
            aria-hidden="true"
          />
        </>
      ) : null}
      {isAnswer ? (
        <div className="w-[32px]">
          <Image
            src="/svgs/check-active.svg"
            width={24}
            height={24}
            alt="index-isAnswer"
          />
        </div>
      ) : (
        <span className="z-10 w-[32px] flex-shrink-0 text-left text-[20px] font-semibold leading-[22px] text-wpc-primary">{`Q${idx + 1}.`}</span>
      )}

      <span className={titleVariants({ isAnswer, isSelected })}>{title}</span>
    </li>
  );
};

export default IndexItem;
