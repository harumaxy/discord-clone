import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// ダイナミック・クラスネームの作成に必要
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
