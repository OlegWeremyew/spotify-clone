import {Nullable} from "../../../../../types";
import {SubMenuItem} from "../../types";
import {ForwardedRef} from "react";

export interface IContextMenu {
  menuItems: Nullable<SubMenuItem[]>
  classes: string
  ref: ForwardedRef<HTMLUListElement>
}
