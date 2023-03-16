export const addressToUrl = (formatted_address: string) => {
    const encodedAddress = formatted_address.replace(/ #/g, '---').replace(/, /g, '--').replace(/ /g, '-');
    return encodedAddress;
}

export const urlToAddress = (url: string) => {
    const originalAddress = url.toString().replace(/---/g, ' #').replace(/--/g, ', ').replace(/-/g, ' ');
    return originalAddress;
}