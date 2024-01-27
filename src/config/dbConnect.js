const { Client } = require('pg')

const getConnection = async () => {
    const client = new Client({
        user: process.env.USER,
        host: process.env.HOST,
        database: process.env.DATABASE,
        password: process.env.PASSWORD,
        port: process.env.DB_PORT
    })

    return new Promise((resolve, reject) => {
        client.connect(function (err) {
            if (err) {
                reject(err)
            } else {
                resolve(client)
            }
        })
    })
}


const runQuery = async (query, params) => {
    const connection = await getConnection();
    console.log('Connected to database....');
    try {
        const results = await new Promise((resolve, reject) => {
            connection.query(query, params, function (error, results) {
                if (error) {
                    reject(error);
                } else {
                    resolve({
                        error: false,
                        msg: 'ok',
                        data: results
                    });
                }
            });
        });
        return results;
    } catch (err) {
        console.log('Error', err);
    }
    finally {
        connection.end();
        console.log('Disconnected....');
    }
};

module.exports = { runQuery };









// const runQuery = async (query, params) => {
//     const connection = await getConnection();
//     console.log('Connected to database....');
//     return new Promise((resolve, reject) => {
//         connection.query(query, params, function (error, results) {
//             if (error) reject(error);
//             else {
//                 resolve({
//                     error: false,
//                     msg: 'ok',
//                     data: results
//                 })
//             }
//             connection.end();
//             console.log('disconnected....');
//         })
//     })
// }