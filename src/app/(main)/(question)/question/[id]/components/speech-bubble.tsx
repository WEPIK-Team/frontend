import { cn } from "@/lib/utils";

interface ISpeechBubbleProps {
  children: React.ReactNode;
  className?: string;
}

const SpeechBubble: React.FunctionComponent<ISpeechBubbleProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "relative rounded-[12px] bg-wpc-light-gray px-4 py-2 text-center text-[17px] font-semibold text-wpc-primary",
        className
      )}
    >
      {children}
      <div className="absolute z-10">
        <div className="rounded-sm before:absolute before:-bottom-3 before:left-[14px] before:h-[8px] before:w-[10px] before:-rotate-45 before:transform before:border-l-2 before:border-t-2 before:before:bg-wpc-light-gray before:bg-wpc-light-gray"></div>
      </div>
    </div>
  );
};

export default SpeechBubble;
