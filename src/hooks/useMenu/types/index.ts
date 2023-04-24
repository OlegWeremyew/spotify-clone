import {ForwardedRef, MouseEvent} from "react";
import {SubMenuItem} from "../../../components/TheMain/Playlist/types";

export type ReturnUseContextMenuType = {
  open: (event: MouseEvent<HTMLAnchorElement>) => void
  isOpen: boolean
  ref: ForwardedRef<HTMLUListElement>
  items: SubMenuItem[]
  close: () => void
}