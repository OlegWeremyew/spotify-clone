export type SubMenuItem = {
  label: string
  subMenuItems: null | SubMenuItem[]
  classes?: string
  action?: () => void
}

