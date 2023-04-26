import {ReactNode} from "react";
import {Nullable, OffsetType} from "../../../../types";

export type NavItemType = {
  label: string,
  classes: string,
  icon: ReactNode,
  action?: (target: Nullable<HTMLSpanElement>) => void
}

export interface ITheNav {
  showPopover: (title: string, description: string, target: Nullable<HTMLSpanElement>, offset: OffsetType) => void
}
