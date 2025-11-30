import runQuery from "../utils/Model.js";
const createActivity = async (values = []) => {
    const query = 'INSERT INTO schedule (activity, description, date_start, date_end, created_by) VALUES(?, ?, ?, ?, ?)'
    let [QueryResult] = await runQuery(query, values)
    return {
        info: QueryResult.info,
        affectedRows: QueryResult.affectedRows
    }
}

const updateActivity = async (activityId = []) => {
    const query = 'UPDATE schedule SET activity = ? , description = ?, date_start = ?, date_end = ? WHERE id = ?'
    let [QueryResult] = await runQuery(query, activityId)
    return {
        info: QueryResult.info,
        affectedRows: QueryResult.affectedRows
    }
}

const deleteActivity = async (activityId = []) => {
    const query = 'DELETE FROM schedule WHERE id = ?'
    let [QueryResult] = await runQuery(query, activityId)
    return {
        info: QueryResult.info,
        affectedRows: QueryResult.affectedRows
    }
}

const getActivity = async (memberId = []) => {
    const query = `SELECT 
    schedule.id, 
    schedule.activity, 
    schedule.description,
    users.name as created_by, 
    DATE_FORMAT(schedule.created_at, '%d/%m/%Y') AS created_at, 
    DATE_FORMAT(schedule.date_start, '%d/%m/%Y') AS date_start, 
    DATE_FORMAT(schedule.date_end, '%d/%m/%Y') AS date_end, 
    schedule.status 
    FROM schedule 
    INNER JOIN users ON users.id = schedule.created_by 
    ORDER BY schedule.date_start DESC 
    `
    let [QueryResult] = await runQuery(query)
    return QueryResult
}

const getActivityById = async (activityId = []) => {
    const query = `SELECT * FROM schedule WHERE status = 'Toward' ORDER BY date_start DESC LIMIT 1`
    let [QueryResult] = await runQuery(query)
    return QueryResult
}


const getActivityStats = async () => {
    const query =
       `SELECT
        schedule.id,
        schedule.activity,
        COUNT(attendance.user_id) AS jumlahPeserta
        FROM schedule
        LEFT JOIN attendance 
        ON attendance.activity_id = schedule.id
        GROUP BY schedule.id, schedule.activity
        `
    let [QueryResult] = await runQuery(query)
    return QueryResult
}
// createReminder
// deleteReminder
// findRemindersByUserId
// isReminderExists
export { createActivity, updateActivity, deleteActivity, getActivity, getActivityById, getActivityStats }