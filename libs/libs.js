// import { connection } from '/database/dbConnection'
// DATABASE connection is optional 

export function log(msg, type = 'd', tag = '') {

    let style

    switch ( type ) {
        case 'd':
            style = `\x1b[45m%s\x1b[0m\x1b[337m %s\x1b[0m`
            tag = tag == '' ? 'System': ''
            break
        case 'i':
            style = `\x1b[44m%s\x1b[0m\x1b[34m %s\x1b[0m`
            tag = tag == '' ? 'Info': ''
            break
        case 'w':
            style = `\x1b[43m%s\x1b[0m\x1b[33m %s\x1b[0m`
            tag = tag == '' ? 'Warning': ''
            break
        case 'e':
            style = `\x1b[41m%s\x1b[0m\x1b[31m %s\x1b[0m`
            tag = tag == '' ? 'Error': ''
            break
    }

    // eslint-disable-next-line no-console
    console.log(style, tag, msg)

    return
}
