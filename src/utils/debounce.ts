import {TimeoutType} from "../types";

let debounceTimer: string | number | TimeoutType = undefined

export function debounce(callback: Function, delay: number): void {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(callback, delay)
}