import runQuery from "../utils/Model.js"

const createUser = async (values = []) => {
    const query = 'INSERT INTO users (name, email, password) VALUES(?, ?, ?)'
    console.log('dari user model : ', values)
    let [QueryResult] = await runQuery(query, values)
    return {
        info: QueryResult.info,
        affectedRows: QueryResult.affectedRows
    }
}

const findUserByEmail = async (email = []) => {
    const query = 'SELECT * FROM users WHERE email = ?'
    let [QueryResult] = await runQuery(query, email)
    return QueryResult[0]
}

const findUserById = async (id = []) => {
    const query = 'SELECT * FROM users WHERE id = ?'
    let [QueryResult] = await runQuery(query, id)
    return QueryResult[0]
}

const findAllUsers = async (value = []) => {
    const query = 'SELECT * FROM users'
    let [QueryResult] = await runQuery(query)
    return QueryResult
}

const deleteUserById = async (idUser = []) => {
    const query = 'DELETE FROM users WHERE id = ?'
    let [QueryResult] = await runQuery(query, idUser)
    return {
        info: QueryResult.info,
        affectedRows: QueryResult.affectedRows
    }
}

const findUserByName = async (nama = []) => {
    const query = 'SELECT * FROM users WHERE name LIKE = $?$'
    let [QueryResult] = await runQuery(query, nama)
    return QueryResult
}

const updateUserById = async (values = []) => {
    const query = 'UPDATE users SET name = ?, email = ? WHERE id = ? '
    let [QueryResult] = await runQuery(query, values)
    return {
        info: QueryResult.info,
        affectedRows: QueryResult.affectedRows
    }
}

const updateStatusUser = async (values = []) => {
    const query = 'UPDATE users SET status = ? WHERE id = ? '
    let [QueryResult] = await runQuery(query, values)
    return {
        info: QueryResult.info,
        affectedRows: QueryResult.affectedRows
    }
}

export { createUser, findAllUsers, findUserByEmail, findUserById, findUserByName, updateUserById, deleteUserById, updateStatusUser }