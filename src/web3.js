import Web3 from 'web3';
import EEAClient from 'web3-eea';

function createHttpProvider(jwtToken, besuNodeUrl) {
    const httpProviderWithJwt = new Web3.providers.HttpProvider(besuNodeUrl, {
        headers: [
            {
                name: "Authorization",
                value: `Bearer ${jwtToken}`
            }
        ]
    });
    return httpProviderWithJwt;
}

async function eeaClient(access_token, rpcendpoint) {
    const provider = createHttpProvider(access_token, rpcendpoint)

    const web3or = new Web3(provider)

    const chainId = await web3or.eth.getChainId()

    const web3 = new EEAClient(web3or, chainId)
    return web3;
}

async function normalClient(access_token, rpcendpoint) {
    const provider = createHttpProvider(access_token, rpcendpoint)

    const web3 = new Web3(provider)

    return web3;
}

async function simpleEEAClient(rpcendpoint) {
    const web3or = new Web3(rpcendpoint);

    const chainId = await web3or.eth.getChainId();

    const web3 = new EEAClient(web3or, chainId);

    return web3;
}

function simpleClient(rpcendpoint) {
    const web3 = new Web3(rpcendpoint)

    return web3;
}

 export {simpleClient, simpleEEAClient, normalClient, eeaClient};