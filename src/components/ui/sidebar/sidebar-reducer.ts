import {
  SidebarAction,
  sidebarActionEnum,
  SidebarState,
} from "./sidebar-types";

export const sidebarReducer = (state: SidebarState, action: SidebarAction) => {
  switch (action.type) {
    case sidebarActionEnum.hover:
      return {
        ...state,
        hovered: action.payload.hovered,
      };
    case sidebarActionEnum.toggle:
      return {
        ...state,
        expanded: !state.expanded,
        hovered: false,
      };

    case sidebarActionEnum.expand:
      return {
        ...state,
        expanded: action.payload.expanded,
      };
  }
};
