export interface Walkscore {
    walk: number,
    transit: number,
    bike: number,
    error?: {
        message: string,
        code: number
    }
}