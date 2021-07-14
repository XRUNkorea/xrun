import { provider as _provider } from '../../rpcSetter'
// const BN = require('bn.js')

const provider = _provider()
const abi = [{"constant":false,"inputs":[{"name":"newSellPrice","type":"uint256"},{"name":"newBuyPrice","type":"uint256"}],"name":"setPrices","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"target","type":"address"},{"name":"limitBalance","type":"uint256"}],"name":"setLimit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"sellPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"limitAccount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"target","type":"address"},{"name":"mintedAmount","type":"uint256"}],"name":"mintToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"}],"name":"burnFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"buyPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"buy","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"frozenAccount","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"sell","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"target","type":"address"},{"name":"freeze","type":"bool"}],"name":"freezeAccount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"initialSupply","type":"uint256"},{"name":"tokenName","type":"string"},{"name":"tokenSymbol","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"target","type":"address"},{"indexed":false,"name":"balance","type":"uint256"}],"name":"LimitBalance","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"target","type":"address"},{"indexed":false,"name":"frozen","type":"bool"}],"name":"FrozenFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event"}]

export function getTokenBalance(contract, address, res) {

    new provider.eth.Contract(abi, contract, { from: address }).methods.balanceOf(address).call()
        .then(balance => {

            let temp = provider.utils.toBN(balance).toString()

            res.send({
                code: '1',
                message: 'success',
                response: {
                    balance: provider.utils.fromWei(temp, 'ether')
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.send({
                code: '-1',
                message: err
            })
        })
}

export function amountTest(res, amount) {

    amount = provider.utils.toBN(provider.utils.toWei(amount.toString(), 'ether')).toString()

    res.send(amount)
}

export function sendToken(from, password, contract, to, amount, res) {

    amount = provider.utils.toWei(amount, 'ether')

    let transactionData = {
        from: from
    }

    const gasLimitParams = {
        toBlock: 'latest'
    }

    provider.eth.estimateGas(gasLimitParams)
        .then(gasLimit => {
            transactionData['gas'] = gasLimit

            provider.eth.getGasPrice()
                .then(gasPrice => {
                    transactionData['gasPrice'] = gasPrice

                    console.log(transactionData)

                    provider.eth.personal.unlockAccount(from, password, 3600)
                        .then(result => {
                            const tokenInstance = new provider.eth.Contract(abi, contract, transactionData)

                            tokenInstance.methods.transfer(to, amount).send(transactionData, (errSend, txid) => {
                                if ( errSend ) {
                                    res.send({
                                        code: '-1',
                                        message: errSend
                                    })
                                    return
                                }
                
                                res.send({
                                    code: '1',
                                    message: 'success',
                                    response: {
                                        txid: txid
                                    }
                                })
                                return
                            })
                        })
                        .catch(e => {
                            res.send({
                                code: '-4',
                                message: 'Cannot unlock account'
                            })
                            return
                        })
                })
                .catch(e => {
                    res.send({
                        code: '-3',
                        message: 'Cannot get gas price'
                    })
                    return
                })
        })
        .catch(e => {
            res.send({
                code: '-2',
                message: 'Cannot get gas limit'
            })
            return
        })
}

export function switchToken(address, contract, amount, res) {

    const price = provider.utils.toBN(provider.utils.toWei('3', 'Gwei')).toString()

    const tokenInstance = new provider.eth.Contract(abi, contract, {
        from: '##AS ETHERIUM or ERC20 ADDRESS##',
        gas: 100000,
        gasPrice: price
    })

    amount = provider.utils.toWei(amount, 'ether')

    provider.eth.personal.unlockAccount('##AS ETHERIUM or ERC20 ADDRESS##', '##AS YOUR ACCOUNT##', 60000) // 60000 as wait, to 100000
        .then(result => {
            tokenInstance.methods.transfer(address, amount).send({
                from: '##AS ETHERIUM or ERC20 ADDRESS##',
                gas: 100000,
                gasPrice: price
            }, (errSend, txid) => {
                if ( errSend ) {
                    res.send({
                        code: '-1',
                        message: errSend
                    })
                    return
                }

                res.send({
                    code: '1',
                    message: 'success',
                    response: {
                        txid: txid
                    }
                })
                return
            }) 
        })
        .catch(e => {
            res.send({
                code: '-1',
                message: e
            })
            return
        })
}
