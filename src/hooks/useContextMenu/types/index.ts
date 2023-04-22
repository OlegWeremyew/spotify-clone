import {ForwardedRef, MouseEvent} from "react";

export type ReturnUseContextMenuType = {
  openContextMenu: (event: MouseEvent<HTMLAnchorElement>) => void
  isContextMenuOpen: boolean
  contextMenuRef: ForwardedRef<HTMLUListElement>
}

export type ClickPositionType = {
  x: number
  y: number
}