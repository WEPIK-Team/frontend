import { Pencil2Icon } from "@radix-ui/react-icons";

import Heading from "@/components/common/heading";

interface HeadingProps {
  title: string;
  description: string;
}

export const ManageHeader: React.FC<HeadingProps> = ({
  title,
  description,
}) => {
  return (
    <div className="space-y-[12px]">
      <div className="flex items-center gap-x-[10px] text-wpt-2xl font-semibold text-primary">
        <Pencil2Icon className="h-6 w-6" color="#6377DD" />
        <Heading as="h2">{title}</Heading>
      </div>
      <p className="text-wpt-base-1 text-wpc-gray">{description}</p>
    </div>
  );
};
