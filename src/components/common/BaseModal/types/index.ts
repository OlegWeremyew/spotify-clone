import {ReactNode} from "react";

export interface IBaseModal {
  onClose: () => void
  children : ReactNode
  classes: string
}
