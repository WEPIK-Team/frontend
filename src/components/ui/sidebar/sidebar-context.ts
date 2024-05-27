import { Dispatch } from "react";

import { createElementContext } from "@/hooks/use-element-context";

import { SidebarAction, SidebarState } from "./sidebar-types";

export const [SidebarContextProvider, useSidebarContext] =
  createElementContext<SidebarState>(
    "Sidebar compound component들은 Sidebar component 외부에서 렌더링할 수 없습니다."
  );
export const [SidebarDispatchContextProvider, useSidebarDispatchContext] =
  createElementContext<Dispatch<SidebarAction>>(
    "Sidebar compound component들은 Sidebar component 외부에서 dispatch에 접근할 수 없습니다."
  );
