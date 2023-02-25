export interface Walkscore {
    types: {
        walk: number,
        transit: number,
        bike: number,
    }
    isUSOrCanada: boolean,
    error?: {
        message: string,
        code: number
    }
}