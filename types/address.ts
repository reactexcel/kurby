export type AddressComponentType = {
    long_name?: string
    short_name?: string
    types?: string[]
}

export type CrimeType = {
    violent_crime: number
    property_crime: number
    population: number
}

export type AgencyFBI = {
    ori: string
    latitude: string
    longitude: string
    state_name: string
    county_name: string
    region_desc: string
    division_name: string
    agency_name: string
}

export type CrimeInfoType = {
    national?: CrimeType
    state?: CrimeType
    area?: CrimeType
    localInfo: {
        state: string
        area: string
    }
}

export type OverallCrimeInfo = {
    violentIncidents: number
    violentNationalRate: number
    violentStateRate: number
    violentAreaRate: number
    propertyIncidents: number
    propertyNationalRate: number
    propertyStateRate: number
    propertyAreaRate: number
    violentAreaPerNational: number
    propertyAreaPerNational: number
    localInfo?: {
        state: string
        area: string
    }
}