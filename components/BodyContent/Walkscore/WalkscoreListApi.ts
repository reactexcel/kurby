export default async function WalkScoreListApi(req: {address: string, location: any}) {
    const {address, location} = req;
    const res = await fetch('/api/walkscore/', {
        method:"POST",
        body: JSON.stringify({address, location}),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const parsedResult = await res.json();
    if (res.ok) {
        return {
            walk: parsedResult.walkscore,
            bike: parsedResult.bike.score,
            transit: parsedResult.transit.score
        };
    }
    console.error(`Retreiving details for address ${req.address} failed with error "${parsedResult.error_message}"`)
}