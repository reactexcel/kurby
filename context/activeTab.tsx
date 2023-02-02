import { atom } from "recoil";

export const activeTabState = atom<Tab | null>({
    key: 'tab',
    default: 'home'
})

export type Tab = "home" | "nearby" | "neighborhood" | "utility";