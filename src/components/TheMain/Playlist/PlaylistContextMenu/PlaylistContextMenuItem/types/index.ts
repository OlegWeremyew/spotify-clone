export interface IMenuItem {
  children: string
  onMouseEnter: () => void,
  classes?: string
  onClick?: () => void
}
