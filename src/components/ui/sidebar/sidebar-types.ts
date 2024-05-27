import { ComponentPropsWithRef } from "react";

export type SidebarState = {
  expanded: boolean;
  hovered: boolean;
};

export interface SidebarProps extends ComponentPropsWithRef<"aside"> {
  expanded?: boolean;
  onToggle?(state: SidebarState): void;
}

export enum sidebarActionEnum {
  toggle = "TOGGLE",
  hover = "HOVER",
  expand = "EXPAND",
}

export type SidebarAction =
  | {
      type: sidebarActionEnum.hover;
      payload: {
        hovered: boolean;
      };
    }
  | {
      type: sidebarActionEnum.expand;
      payload: {
        expanded: boolean;
      };
    }
  | {
      type: sidebarActionEnum.toggle;
    };
