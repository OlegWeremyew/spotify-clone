import {DebounceType} from "types";

let debounceTimer: DebounceType = undefined

export function debounce(callback: Function, delay: number): void {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(callback, delay)
}
