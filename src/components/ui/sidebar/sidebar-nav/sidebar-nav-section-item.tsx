"use client";

import { cva } from "class-variance-authority";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, {
  ButtonHTMLAttributes,
  ComponentPropsWithRef,
  ElementType,
  forwardRef,
  ReactNode,
  useState,
} from "react";

import { cn } from "@/lib/utils";

import {
  SidebarNavSectionItemContext,
  SidebarNavSectionItemContextProvider,
  useSidebarNavSectionItemContext,
} from "./sidebar-nav-context";
import { useSidebarContext } from "../sidebar-context";
import Collapse from "../../collapse/collapse";

const navSectionItemWrapper = cva(["cursor-pointer"], {
  variants: {
    opened: {
      true: ["px-[8px]"],
      false: ["px-3"],
    },
  },
});

const navSectionItem = cva(
  [
    "group",
    "relative",
    "truncate",
    "w-full",
    "flex",
    "items-center",
    "outline-none",
    "ring-inset",
    "focus-visible:ring-2",
    "focus-visible:rounded",
    "py-2.5",
    "gap-x-[10px]",
    "hover:bg-wpc-primary/5",
  ],
  {
    variants: {
      active: {
        true: [],
        false: [""],
      },
      expanded: {
        true: [],
        false: [],
      },
      opened: {
        true: ["px-6", "rounded-[8px]"],
        false: ["justify-start", "px-1", "rounded"],
      },
    },
    compoundVariants: [
      {
        active: true,
        opened: true,
        className: ["bg-wpc-primary/10 text-wpc-primary font-semibold"],
      },
    ],
  }
);

const navSectionItemIcon = cva([
  "w-6",
  "h-6",
  "flex-none",
  "flex",
  "items-center",
  "justify-center",
]);

const navSectionItemLabelWrapper = cva(
  [
    "transition-opacity",
    "duration-1500",
    "flex",
    "items-center",
    "justify-between",
    "w-full",
  ],
  {
    variants: {
      opened: {
        true: ["opacity-100"],
        false: ["opacity-0"],
      },
    },
  }
);

const navSectionItemLabel = cva(["text-left"]);

const navSectionItemCollapseIcon = cva(
  [
    "transition",
    "transform",
    "duration-250",
    "ease-in-out",
    "h-4",
    "w-4",
    "ml-auto",
  ],
  {
    variants: {
      collapsed: {
        true: [],
        false: ["rotate-180"],
      },
    },
  }
);

export type SidebarNavSectionItemType = {
  as?: ElementType;
  asProps?: Record<string, any>;
  href?: `/${string}` | `https://${string}` | "#";
  icon?: ReactNode | ((props: any) => JSX.Element);
  activeIcon?: ReactNode | ((props: any) => JSX.Element);
  label: string;
  active?: boolean;
  collapsed?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
};

export interface SidebarNavSectionItemProps
  extends SidebarNavSectionItemType,
    ComponentPropsWithRef<"li"> {}

const SidebarNavSectionItem = forwardRef<
  HTMLLIElement,
  SidebarNavSectionItemProps
>((props, ref) => {
  const {
    active,
    children,
    className,
    as: Comp = Link,
    asProps,
    href = "#",
    label,
    icon,
    activeIcon,
    collapsed = true,
    onClick,
    type = "button",
    ...additionalProps
  } = props;
  const { expanded, hovered } = useSidebarContext();
  const opened = expanded || hovered;
  const [isCollapsed, setIsCollapsed] = useState<boolean>(
    opened === false ? true : collapsed
  );

  const compProps = Comp === "button" ? { type } : { href };

  const contextValue: SidebarNavSectionItemContext = {
    childrenCollapsed: isCollapsed,
  };
  const { childrenCollapsed } = useSidebarNavSectionItemContext();

  const curPath = usePathname();
  const isActive = curPath === href;

  return (
    <li
      ref={ref}
      className={cn(
        navSectionItemWrapper({
          opened,
        })
      )}
      {...additionalProps}
    >
      <Comp
        {...compProps}
        {...asProps}
        className={cn(
          navSectionItem({
            active: isActive,
            opened,
          }),
          className
        )}
        onClick={(event: any) => {
          setIsCollapsed(!isCollapsed);

          if (onClick) {
            onClick(event);
          }
        }}
        tabIndex={childrenCollapsed ? -1 : 0}
      >
        {(icon || activeIcon) && (
          <span className={navSectionItemIcon()}>
            {isActive && activeIcon
              ? typeof activeIcon === "function"
                ? React.createElement(activeIcon, {})
                : activeIcon
              : typeof icon === "function"
                ? React.createElement(icon, {})
                : icon}
          </span>
        )}

        <div className={navSectionItemLabelWrapper({ opened })}>
          <span className={navSectionItemLabel()}>{label}</span>

          {children && (
            <Image
              src="/svgs/arrow-down.svg"
              width={24}
              height={24}
              alt="index-isAnswer"
              className={navSectionItemCollapseIcon({ collapsed: isCollapsed })}
            />
          )}
        </div>
      </Comp>
      {children && opened && (
        <SidebarNavSectionItemContextProvider value={contextValue}>
          <Collapse isOpen={!isCollapsed}>{children}</Collapse>
        </SidebarNavSectionItemContextProvider>
      )}
    </li>
  );
});

SidebarNavSectionItem.displayName = "SidebarNavSectionItem";

export { SidebarNavSectionItem };
