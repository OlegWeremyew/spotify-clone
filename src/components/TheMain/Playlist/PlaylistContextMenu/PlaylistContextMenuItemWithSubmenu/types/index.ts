import {Nullable} from "types";
import {SubMenuItem} from "../../../types";

export interface IMenuItemWithSubmenu {
  children: string
  subMenuItems?: Nullable<SubMenuItem[]>
  onMouseEnter: () => void
}
