"use client";

import { cva, VariantProps } from "class-variance-authority";
import {
  ComponentPropsWithRef,
  forwardRef,
  MouseEvent,
  useEffect,
  useReducer,
  useRef,
} from "react";

import { cn } from "@/lib/utils";

import {
  SidebarContextProvider,
  SidebarDispatchContextProvider,
} from "./sidebar-context";
import { SidebarHead } from "./sidebar-head/sidebar-head";
import { SidebarNav } from "./sidebar-nav/sidebar-nav";
import { sidebarReducer } from "./sidebar-reducer";
import { SidebarSeparator } from "./sidebar-seperator";
import { sidebarActionEnum, SidebarState } from "./sidebar-types";

const sidebarVariants = cva(
  "relative transition-all ease-in-out duration-300 flex flex-col overflow-hidden h-fit bg-[#F8F7FD] z-10 w-0 py-[17px]",
  {
    variants: {
      expanded: {
        true: ["md:min-w-[204px] rounded-[18px] min-h-[256px]"],
        false: ["rounded-[28px]"],
      },
      hovered: {
        true: ["md:min-w-[204px] rounded-[18px] min-h-[256px]"],
        false: [],
      },
      fixed: {
        true: ["fixed", "top-0", "left-0"],
      },
    },
    compoundVariants: [
      {
        expanded: false,
        hovered: false,
        className: ["md:min-w-[56px]"],
      },
    ],
  }
);

export interface SidebarProps extends ComponentPropsWithRef<"aside"> {
  expanded?: boolean;
  onToggle?(state: SidebarState): void;
}

const SidebarRoot = forwardRef<
  HTMLElement,
  SidebarProps & VariantProps<typeof sidebarVariants>
>((props, ref) => {
  const {
    children,
    expanded = true,
    className,
    onToggle,
    fixed,
    ...additionalProps
  } = {
    ...props,
  };
  const mounted = useRef(false);

  const [state, dispatch] = useReducer(sidebarReducer, {
    hovered: false,
    expanded,
  });

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }

    if (typeof onToggle !== "function") {
      return;
    }

    onToggle(state);
  }, [state, onToggle]);

  const handleMouseEnter = (e: MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;

    if (target.dataset.role === "sidebar-head-toggle") return;
    if (state.expanded) return;

    dispatch({ type: sidebarActionEnum.hover, payload: { hovered: true } });
  };

  const handleMouseLeave = () => {
    if (state.expanded) return;

    dispatch({ type: sidebarActionEnum.hover, payload: { hovered: false } });
  };

  return (
    <aside
      ref={ref}
      className={cn(
        sidebarVariants({
          expanded: state.expanded,
          hovered: state.hovered,
          fixed,
        }),
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...additionalProps}
    >
      <SidebarContextProvider value={state}>
        <SidebarDispatchContextProvider value={dispatch}>
          {children}
        </SidebarDispatchContextProvider>
      </SidebarContextProvider>
    </aside>
  );
});

SidebarRoot.displayName = "Sidebar";

const Sidebar = Object.assign(SidebarRoot, {
  Head: SidebarHead,
  Nav: SidebarNav,
  Separator: SidebarSeparator,
});

export default Sidebar;
