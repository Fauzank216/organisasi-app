import runQuery from "../utils/Model.js"

const createContent = async (values = []) => {
    const query = 'INSERT INTO madding(user_id, title, content, category, thumbnail) VALUES(?, ?, ?, ?, ?)'
    let [QueryResult] = await runQuery(query, values)
    return {
        info: QueryResult.info,
        affectedRows: QueryResult.affectedRows
    }
}

//findAllContents
const getAllContents = async (value = []) => {
    const query = `SELECT * FROM madding WHERE user_id = ? AND approved != 'approve'`
    let [QueryResult] = await runQuery(query, value)
    return QueryResult
}

const getAllPublishedContent = async (value = []) => {
    const query = `SELECT * FROM madding WHERE approved = 'approve'`
    let [QueryResult] = await runQuery(query)
    return QueryResult
}

//EditContent by member
const updateContent = async (values = []) => {
    const query = 'UPDATE madding SET title = ?, content = ?, category = ? WHERE id = ?'
    let [QueryResult] = await runQuery(query, values)
    return {
        info: QueryResult.info,
        affectedRows: QueryResult.affectedRows
    }
}

const updateApprovalStatus = async (values = []) => {
    const query = 'UPDATE madding SET approved = ? WHERE id = ?'
    let [QueryResult] = await runQuery(query, values)
    return {
        info: QueryResult.info,
        affectedRows: QueryResult.affectedRows
    }
}

//DeleteContent
const deleteContent = async (idContent = []) => {
    const query = 'DELETE FROM madding WHERE id = ? '
    let [QueryResult] = await runQuery(query, idContent)
    return {
        info: QueryResult.info,
        affectedRows: QueryResult.affectedRows
    }
}

//findContentByKategori
const getContentByCategory = async (category = []) => {
    const query = 'SELECT * FROM madding WHERE category = ? '
    let [QueryResult] = await runQuery(query, category)
    return QueryResult
}

//findContentByDate
const getContentByDate = async (date = []) => {
    const query = 'SELECT * FROM madding WHERE created_at = ? '
    let [QueryResult] = await runQuery(query, date)
    return QueryResult
}

//FindContentByTitle
const getContentByTitle = async (title = []) => {
    const query = 'SELECT * FROM madding WHERE title = ? '
    let [QueryResult] = await runQuery(query, title)
    return QueryResult
}

const getContentById = async (id = []) => {
    const query = `SELECT * FROM madding WHERE id = ?`
    let [QueryResult] = await runQuery(query, id)
    return QueryResult
}

const getContentHistory = async (memberId = []) => {
    const query = `
    SELECT 
    madding.title,
    madding.status,
    madding.approved,
    DATE_FORMAT(madding.created_at, '%d/%m/%Y') AS date
    FROM madding
    JOIN users ON madding.user_id = users.id
    WHERE users.id = ?;
    `
    let [QueryResult] = await runQuery(query, memberId)
    return QueryResult
}

/*
SELECT schedule.id, schedule.activity, users.name as created_by, schedule.created_at, schedule.date_start, schedule.date_end, schedule.status FROM schedule INNER JOIN users ON users.id = schedule.created_by WHERE users.id = '4';
*/ 

export { createContent, updateContent, updateApprovalStatus, getContentById, getAllPublishedContent, deleteContent, getAllContents, getContentByCategory, getContentByDate, getContentByTitle, getContentHistory }