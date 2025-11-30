const trigerAbsen = document.getElementById('triger_absen')
const sectionAbsen = document.querySelector('.section_absen')
trigerAbsen.addEventListener('click', function () {
    sectionAbsen.classList.toggle('hide')
})

const reminder = document.getElementById('reminder')
const saved = localStorage.getItem('isChecked') || null

let dateEvent = null

if (saved) {
    reminder.checked = true

}

reminder.addEventListener('click', function () {
    if (reminder.checked) {
        localStorage.setItem('isChecked', 'true')
        checkReminder()
    } else {
        localStorage.removeItem('isChecked')
    }
})

let interval = null
const closeBtn = document.querySelector('.close_btn')
closeBtn.addEventListener('click', function () {
    localStorage.removeItem('isChecked')
    reminder.checked = false
    overlay.classList.add('hide')
    stopInterval()
})

function stopInterval() {
    if (interval) {
        clearInterval(interval)
        interval = null
    }
}

const overlay = document.querySelector('.overlay')

function getToday() {
    return `1/4/2020`
}

function checkReminder() {
    if (reminder.checked == true) {
        interval = setInterval(() => {
            if (getToday() === dateEvent) {
                overlay.classList.remove('hide')
            }
        }, 60000)
    } else {
        return
    }
}

// cek tiap 1 menit 
checkReminder()

async function getSchedule() {
    const response = await fetch('/api/activity', { method: 'GET' })
    const json = await response.json()
    const data = json.data
    return data
}

const btnAbsen = document.querySelector('#btn_absen')

function convertIOS(params) {
    let row = params.split('/')
    let date = row[0]
    let month = row[1]
    let year = row[2]
    return `${year}-${month}-${date}`
}

async function renderSchedule() {
    let result = await getSchedule()
    let activity = result[0]
    console.log(result)
    document.querySelector('#acara').value = activity.activity
    document.querySelector('#tanggal').value = convertIOS(activity.date_start.split('T')[0])
    document.querySelector('#deskripsi').textContent = activity.description
    btnAbsen.setAttribute('data-activity', activity.id)
    dateEvent = new Date(activity.date_start.split('T')[0]).toLocaleDateString()
}

btnAbsen.addEventListener('click', async function (e) {
    const status = document.querySelector('.checkbox_absen:checked').value
    let dateObj = new Date()
    let date = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`
    let activity = e.target.getAttribute('data-activity')
    let response = await fetch('/api/attendance', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ activity, date, status })
    })
    if (response.ok) {
        loading(true, popUpResult)
    }
})


renderSchedule()
