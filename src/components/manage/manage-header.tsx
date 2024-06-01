import React, { ReactNode } from "react";

import Heading from "@/components/common/heading";

interface HeadingProps {
  title: string;
  icon?: ReactNode | ((props: any) => JSX.Element);
  description: string;
}

export const ManageHeader: React.FC<HeadingProps> = ({
  title,
  icon,
  description,
}) => {
  return (
    <div className="space-y-[12px]">
      <div className="flex items-center gap-x-[10px] text-wpt-2xl font-semibold text-primary">
        {icon && (
          <>
            {typeof icon === "function" ? React.createElement(icon, {}) : icon}
          </>
        )}
        <Heading as="h2">{title}</Heading>
      </div>
      <p className="text-wpt-base-1 text-wpc-gray">{description}</p>
    </div>
  );
};
