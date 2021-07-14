import { createConnection } from 'mysql'

// DATABASE connection is OPTIONAL
// is not use this option, you may use direct connect to 
// etherium network or geth

export function connection() {

    return createConnection({
        host: '',
        user: '',
        password: '',
        database: '',
        port: '3306'
    })
}

export async function liveCheck(conn) {

    const dbConPromise = () =>
        new Promise((resolve, reject) => {

            conn.connect(err => {
		console.log(err)
                if ( err ) {
                    reject(false)
                } else {
                    resolve(true)
                }
            })
        })

    try {
        const result = await dbConPromise(conn)
        return result
    } catch (result) {
        return result
    }
}
