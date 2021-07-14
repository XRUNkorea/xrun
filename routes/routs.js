import { getEthBalance, sendEth, createWallet, status, switchEth } from './../services/eth';
import { checkGUID, registerGUID, getWalletAddress, importUser, importUserAfter } from './../services/user'
import { getTokenBalance, switchToken, amountTest, sendToken } from './../services/token';
import { getGasPrices } from '../libs/etherLib';

export default app => {

    // 이더 잔액 조회
    app.get('/eth/balance/:guid', (req, res) => {
        getWalletAddress(req.params.guid, 1).then(result => {
            console.log('debug: ' + result)

            if ( Number(result.code) < 0 ) {
                res.send(result)
            }
            
            getEthBalance(result.response.address, res)
        })
    })

    app.get('/eth/new/:guid', (req, res) => {
        console.log('/eth/new')
        console.log(req.params)
        checkGUID(req.params.guid).then(result => {
            if ( result.code == '-1' ) {
                res.send('등록이 필요합니다.')
                return
            }

            const keyList = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*?'
            let password = '', i

            for ( i=0; i<12; i++ ) {
                password += keyList.charAt(Math.floor(Math.random() * keyList.length))
            }

            createWallet(result.data.pk, password, res)
        })
        // createWallet(res)
    })

    app.get('/eth/send/:guid/:to/:amount', (req, res) => {
        getWalletAddress(req.params.guid, 1).then(result => {
            if ( Number(result.code) < 0 ) {
                res.send(result)
            }

            sendEth(result.response.address, result.response.password, req.params.to, req.params.amount, res)
        })
    })

    app.get('/eth/switch/:guid/:amount', (req, res) => {
        getWalletAddress(req.params.guid, 1).then(result => {
            if ( Number(result.code) < 0 ) {
                res.send(result)
            }

            switchEth(result.response.address, req.params.amount, res)
        })
    })

    app.get('/eth/gas', (req, res) => {
        getGasPrices().then(gas => {
            res.send(gas)
        })
    })

    app.get('/eth/token/balance/:guid/:contract', (req, res) => {
        // getTokenBalance(req.params.contract, req.params.address, res)
        getWalletAddress(req.params.guid, 1).then(result => {
            if ( Number(result.code) < 0 ) {
                res.send(result)
            }

            getTokenBalance(req.params.contract, result.response.address, res)
        })
    })

    app.get('/eth/token/switch/:guid/:contract/:amount', (req, res) => {
        getWalletAddress(req.params.guid, 1).then(result => {
            if ( Number(result.code) < 0 ) {
                res.send(result)
            }

            switchToken(result.response.address, req.params.contract, req.params.amount, res)
        })
    })

    app.get('/eth/token/send/:guid/:contract/:to/:amount', (req, res) => {
        getWalletAddress(req.params.guid, 1).then(result => {
            if ( Number(result.code) < 0 ) {
                res.send(result)
            }

            sendToken(result.response.address, result.response.password, req.params.contract, req.params.to, req.params.amount, res)
        })
    })

    app.get('/eth/transaction/status/:txhash', (req, res) => {
        status(req.params.txhash, res)
    })

    app.get('/test/amount', (req, res) => {
        amountTest(res, 0.00001)
    })

    app.get('/user/add/:guid', (req, res) => {
        console.log('/user/add')
        console.log(req.params)
        checkGUID(req.params.guid).then(result => {
            if ( parseInt(result.code) < 0 ) {
                res.send(result)
                return
            }

            if ( parseInt(result.data.cnt) > 0 ) {
                res.send({
                    code: '-2',
                    message: 'Already registered'
                })
                return
            }

            registerGUID(req.params.guid).then(result => {
                if ( parseInt(result.code) < 0 ) {
                    res.send(result)
                    return
                }

                res.send(result)
            })
        })
    })

    app.get('/user/import/:username/:guid/:type', (req, res) => {
        console.log('Import function')
        console.log(req.params)
        importUser(req.params.username, req.params.guid).then(result => {
            if ( parseInt(result.code) < 0 ) {
                res.send({
                    code: '-1',
                    message: 'Failed to change GUID'
                })
                return
            }

            if ( req.params.type == 'w' ) {
                importUserAfter(req.params.guid).then(result => {
                    if ( parseInt(result.code) < 0 ) {
                        res.send({
                            code: '-1',
                            message: 'Failed to change org GUID'
                        })
                        return
                    }

                    res.send({
                        code: '1',
                        message: 'Success'
                    })
                    return
                })
            }

            res.send({
                code: '1',
                message: 'Success'
            })
            return
        })
    })
}
