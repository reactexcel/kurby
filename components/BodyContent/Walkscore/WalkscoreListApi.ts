export default async function WalkScoreListApi(req: {address: string, location: any}) {
    const {address, location} = req;

    try {
        const res = await fetch('/api/walkscore', {
            method:"POST",
            body: JSON.stringify({address, location}),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const parsedResult = await res.json();
        if (!res.ok || parsedResult.error) {
            throw parsedResult.error;
        }
        return {
            types: {
                walk: parsedResult.walkscore,
                bike: parsedResult.bike?.score,
                transit: parsedResult.transit?.score,
            },
            isUSOrCanada: parsedResult.isUSOrCanada
        };
    } catch (error: any) {
        console.error(`Retreiving details for address ${req.address} failed with error "${JSON.stringify(error.message)}"`)
        return {error};
    }
}