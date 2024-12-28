export type PageStatus = "locked" | "unlocked" | "completed";
export type PageType = "enigma" | "reward" | "neutral";

export type EnigmaId = string
export type EnigmaNode = {
    id: EnigmaId
    title: string
    type: PageType
    status: PageStatus
    url: string
    lockedBy: EnigmaId[]
    unlocks?: EnigmaId[]
    rank?: number
}