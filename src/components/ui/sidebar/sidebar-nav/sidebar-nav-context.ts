import { createIndependentContext } from "@/hooks/use-independent-context";

export interface SidebarNavSectionItemContext {
  childrenCollapsed: boolean;
}

export const [
  SidebarNavSectionItemContextProvider,
  useSidebarNavSectionItemContext,
] = createIndependentContext<SidebarNavSectionItemContext>();
