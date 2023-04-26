import {ReactNode} from "react";
import {Nullable} from "types";

export interface INavItemType {
  classes: string,
  icon: ReactNode,
  children: string,
  onClick: (target: Nullable<HTMLSpanElement>) => void,
}
