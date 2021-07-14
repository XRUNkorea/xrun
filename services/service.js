import { provider as _provider } from './../../rpcSetter'
import { insertWallet } from './user'

const provider = _provider()

export function getEthBalance(address, res) {

    provider.eth.getBalance(address, (err, balance) => {
        if ( err ) {
            res.send({
                code: '-2',
                message: 'Failed to get balance'
            })
            return
        }

        res.send({
            code: '1',
            message: 'success',
            response: {
                raw: balance,
                toNum: provider.utils.fromWei(balance, 'ether')
            }
        })
    })
}

export function createWallet(userPK, password, res) {

    provider.eth.personal.newAccount(password, (err, account) => {
        if ( err ) {
            res.send({
                'code': '-1',
                'message': 'Failed to create wallet'
            })
            return
        }

        insertWallet(userPK, account, password).then(result => {
            res.send(result)
        }) 
    })
}


export function sendEth(from, password, to, amount, res) {

    amount = provider.utils.toWei(amount, 'ether')

    let transactionData = {
        from: from,
        to: to,
        value: amount
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

                    provider.eth.personal.unlockAccount(from, password, 60000) // 60000 as wait, to 100000
                        .then(result => {
                            provider.eth.sendTransaction(transactionData, (transactionError, txhash) => {
                                if ( transactionError ) {
                                    res.send({
                                        code: '-5',
                                        message: 'Cannot send now. try again later'
                                    })
                                }

                                res.send({
                                    code: '1',
                                    message: 'Success',
                                    response: {
                                        txid: txhash
                                    }
                                })
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

export function switchEth(address, amount, res) {
 
    amount = provider.utils.toWei(amount, 'ether')

    let transactionData = {
        from: '##AS ETHERIUM or ERC20 ADDRESS##',
        to: address,
        value: amount
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

                    provider.eth.personal.unlockAccount('##AS ETHERIUM or ERC20 ADDRESS##', '##AS YOUR ACCOUNT##', 60000) // 60000 as wait, to 100000
                        .then(result => {
                            provider.eth.sendTransaction(transactionData, (transactionError, txhash) => {
                                if ( transactionError ) {
                                    res.send({
                                        code: '-5',
                                        message: 'Cannot send now. try again later'
                                    })
                                }

                                res.send({
                                    code: '1',
                                    message: 'Success',
                                    response: {
                                        txid: txhash
                                    }
                                })
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

export function status(txhash, res) {

    provider.eth.getTransactionReceipt(txhash)
        .then(result => {
            if ( result == null ) {
                res.send({
                    code: '1',
                    message: 'Transaction status: pending',
                    response: {
                        status: '1'
                    }
                })
                return
            }

            if ( result.status ) {
                res.send({
                    code: '1',
                    message: 'Transaction status: success',
                    response: {
                        status: '2'
                    }
                })
                return
            } else {
                res.send({
                    code: '1',
                    message: 'Transaction status: failed',
                    response: {
                        status: '3'
                    }
                })
                return
            }
        })
        .catch(e => {
            res.send({
                code: '-1',
                message: e
            })
            return
        })
}
