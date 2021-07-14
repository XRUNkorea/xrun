import { get } from 'axios';

export async function getGasPrices() {

    const response = await get('https://ethgasstation.info/json/ethgasAPI.json')

    return {
        low: Math.floor(response.data.safeLow / 10),
        medium: Math.floor(response.data.average / 10),
        high: Math.floor(response.data.fast / 10)
    }
}
