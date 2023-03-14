export const addressToUrl = (formatted_address: string) => {
    const encodedAddress = formatted_address.replace(/, /g, '_').replace(/ /g, '-');
    return encodedAddress;
}

export const urlToAddress = (url: string) => {
    const originalAddress = url.toString().replace(/_/g, ', ').replace(/-/g, ' ');
    return originalAddress;
}