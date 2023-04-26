export type Nullable<T> = null | T

export type TimeoutType = ReturnType<typeof setTimeout> | undefined

export type OffsetType = Nullable<{ top: number, left: number }>

export type DebounceType = string | number | TimeoutType
