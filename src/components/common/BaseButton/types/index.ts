import {ReactNode} from "react";

export interface IBaseButton {
  primary?: boolean
  accent?: boolean
  classes?: string
  onClick?: () => void
  children: ReactNode
  type?: "button" | "submit" | "reset"
  disabled?: boolean
}
