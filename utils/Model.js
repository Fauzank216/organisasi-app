import { main } from "../config/db.js"
const runQuery = async (query, params = []) => {
    const connection = await main()
    try {
        let result = await connection.query(query, params) 
        return result
    } catch (err) {
        console.log(err)
    } finally {
        connection.end()
    }
}
export default runQuery