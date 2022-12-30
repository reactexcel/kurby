export default async (req: {place_id: string, fields: string[]}) => {
    if(!req.place_id) {
        return false;
    }

    const res = await fetch('/api/details/', {
        method: 'POST',
        body: JSON.stringify(req),
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const parsedResult = await res.json();
    if (res.ok) {
        return parsedResult.result;
    }
    console.error(`Retreiving details for place ${req.place_id} failed with error "${parsedResult.error_message}"`)
}