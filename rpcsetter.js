import Web3 from 'web3'

const settings = {
    protocol: 'http',
    host: 'localhost',
    port: '21115'
    // port: '8545'
}

export function provider() {
    return new Web3(new Web3.providers.HttpProvider(`${settings.protocol}://${settings.host}:${settings.port}`))
}
