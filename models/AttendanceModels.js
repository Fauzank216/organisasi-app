import runQuery from "../utils/Model.js";

const createAttendance = async (values = []) => {
    const query = 'INSERT INTO attendance (user_id, activity_id, date, status) VALUES(?, ?, ?, ?)'
    let [QueryResult] = await runQuery(query, values)
    return {
        info: QueryResult.info,
        affectedRows: QueryResult.affectedRows
    }
}

const updateVerifyAttendance = async (values = []) => {
    const query = 'UPDATE attendance SET verified = true WHERE id = ?'
    let [QueryResult] = await runQuery(query, values)
    return {
        info: QueryResult.info,
        affectedRows: QueryResult.affectedRows
    }
}

const deleteAttendance = async (attendanceId = []) => {
    const query = 'DELETE FROM attendance WHERE id = ?'
    let [QueryResult] = await runQuery(query, attendanceId)
    return {
        info: QueryResult.info,
        affectedRows: QueryResult.affectedRows
    }
}

const getAttendance = async (value = []) => {
    const query = `SELECT 
    attendance.id,
    users.name, 
    attendance.status, 
    attendance.date
    FROM users
    INNER JOIN attendance 
    ON users.id = attendance.user_id
    WHERE attendance.verified = 'pending'
    `
    let [QueryResult] = await runQuery(query)
    return QueryResult
}

const getAttendanceByVerified = async (verified = []) => {
    const query = 'SELECT * FROM attendance WHERE verified = ?'
    let [QueryResult] = await runQuery(query, verified)
    return QueryResult
}

const getAttendanceByName = async (memberId = []) => {
    const query = 'SELECT * FROM attendance WHERE user_id = ?'
    let [QueryResult] = await runQuery(query, memberId)
    return QueryResult
}

const getAttendanceStats = async () => {
    const query = `
    SELECT 
    users.name, 
    COUNT(*) AS jmlhKehadiran
    FROM attendance
    INNER JOIN users ON users.id = attendance.user_id
    WHERE attendance.verified = 'true'
    GROUP BY attendance.user_id, users.name
    ORDER BY jmlhKehadiran DESC;
    `
    let [QueryResult] = await runQuery(query)
    return QueryResult
}

const getAttendanceHistory = async (memberId = []) => {
    const query = `SELECT 
    users.name AS nama,
    users.email,
    schedule.activity,
    attendance.status,
    attendance.verified,
    DATE_FORMAT(attendance.date, '%d/%m/%Y') AS date
    FROM attendance
    JOIN users ON attendance.user_id = users.id
    JOIN schedule ON attendance.activity_id = schedule.id
    WHERE users.id = ? 
    ORDER BY date DESC 
    LIMIT 5;
`
    let [QueryResult] = await runQuery(query, memberId)
    return QueryResult
}

export { createAttendance, updateVerifyAttendance, deleteAttendance, getAttendance, getAttendanceByVerified, getAttendanceByName, getAttendanceHistory, getAttendanceStats }