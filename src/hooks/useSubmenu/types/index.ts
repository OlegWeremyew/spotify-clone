import {Nullable} from "types";
import {SubMenuItem} from "components/TheMain/Playlist/types";

export type ReturnUseSubmenuType = {
  isOpen: boolean
  positionClasses: PositionClassesType
  items: Nullable<SubMenuItem[]>
  open: () => void
  close: () => void
}

export type PositionXClassType = "left-full" | "right-full"
export type PositionYClassType = "top-0" | "bottom-0"
export type PositionClassesType = "top-0 left-full" | "top-0 right-full" | "bottom-0 left-full" | "bottom-0 right-full"

export type MenuStateType = {
  isOpen: boolean
  positionClasses: PositionClassesType
}
