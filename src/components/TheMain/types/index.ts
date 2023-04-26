export type PlaylistsType = {
  classes: string,
  title: string,
  description: string,
  coverUrl: string,
}

export interface IMain {
  toggleScrolling: (isEnable: boolean) => void
  showToast: (message: string) => void
}
