import mysql from 'serverless-mysql';

const host = process.env.DB_HOST;
const name = process.env.DB_NAME;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const db = mysql({
    config: {
        host: host,
        database: name,
        user: user,
        password: password,
    },
});

export async function query(queryString, queryParams) {
    try {
        const results = await db.query(queryString, queryParams);
        //console.log(results);
        await db.end();
        return results;
    } catch (e) {
        throw Error(e.message);
    }
}
