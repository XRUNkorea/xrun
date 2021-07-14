import { provider as _provider } from './rpcSetter'

const provider = _provider()

export function checkParamNull(params, validate = Array()) {

    if ( validate.length > 0 && Object.keys(params).length < 1 ) {
        return {
            'msg': 'Parameters are not exists!',
            'errCnt': validate.length
        }
    }

    let message = '',
        stack = 0

    for ( let key of validate ) {
        if ( params[key] == undefined ) {
            message += 'Parameter ' + key + ' is not exists!\n'
            stack++
        }
    }

    return {
        'msg': message,
        'errCnt': stack
    }
}

export function checkAddress(address) {

    if ( provider.utils.isAddress(address) ) {
        return true
    }
}
