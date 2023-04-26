export type SubMenuItem = {
  label: string
  subMenuItems: null | SubMenuItem[]
  classes?: string
  action?: () => void
}

export interface IList {
  classes: string
  title: string
  description: string
  coverUrl: string
  toggleScrolling: (isEnable: boolean) => void
  showToast: (message: string) => void
}


