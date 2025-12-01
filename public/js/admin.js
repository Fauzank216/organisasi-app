
let contents = [];

const okBtn = document.querySelector('#btn_ok')
const popUpSuccess = document.querySelector('.overlay_success')
if (okBtn) {
    okBtn.onclick = function () {
        popUpSuccess.classList.add('hide')
    }
}


function popUpResult(success) {
    if (success) {
        popUpSuccess.classList.remove('hide')
    }
}

const loadingWrapper = document.querySelector('.spinner-wrapper')
function loading(success, fn) {
    loadingWrapper.style.display = 'flex'
    let timer = setTimeout(() => {
        loadingWrapper.style.display = 'none'
        fn(success)
        clearTimeout(timer)
    }, 2000)
}

async function fetchData(url, method, body = {}) {
    const options = {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    };

    if (['POST', 'PUT', 'PATCH'].includes(method)) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    return response;
}


const tableUsers = document.querySelector('.table_users');


async function getAllUsers() {
    const response = await fetchData('/api/users', 'GET');
    const json = await response.json();
    return json.data;
}

async function renderUser() {
    const users = await getAllUsers();
    users.forEach(user => {
        const rowHTML = `
            <tr>
                <td class="td_photo">
                    <img src="${user.avatar?`/img/uploads/avatar/${user.avatar}`: `/img/uploads/profile.webp`}" alt="" style="width: 50px;">
                </td>
                <td class="td_nama">
                    ${user.name}
                </td>
                <td class="td_notelp">
                    08978887338
                </td>
                <td class="td_email">
                    ${user.email}
                </td>
                <td class="td_status">${user.status}</td>
                <td class="td_action">
                    <img class='icon_changeStatus' src="/img/asset/x-octagon.svg" data-id="${user.id}" alt="">
                    <img class='icon_edit' src="/img/asset/edit-2.svg" data-id="${user.id}" alt="">
                </td>
            </tr>
        `;
        tableUsers.insertAdjacentHTML('beforeend', rowHTML);
    });
}

if (tableUsers) {
    renderUser();
}

if (tableUsers) {
    tableUsers.addEventListener('click', function (e) {
        const target = e.target;
        if (target.classList.contains('icon_edit')) {
            const userId = target.getAttribute('data-id');
            document.querySelector('#editModal').classList.remove('noneActive');
            
            setValueEdit(userId);
        } else if (target.classList.contains('icon_changeStatus')) {
            const userId = target.getAttribute('data-id');
            const row = target.closest('tr');
            const statusCell = row.querySelector('.td_status');
            const currentStatus = statusCell.textContent.trim();
            const newStatus = currentStatus === 'active' ? 'noneactive' : 'active';
            statusCell.textContent = newStatus;
            changeStatus(userId, newStatus);
        } else if (target.classList.contains('icon_delete')) {
            console.log('yahoooo!');
        }
    });
}

async function changeStatus(id, status) {
    const response = await fetchData(`/api/users/${id}`, 'PUT', { status });
    const json = await response.json();
    return json;
}

const saveBtn = document.getElementById('btn_save');

async function setValueEdit(idUser) {
    const response = await fetchData(`/api/users/${idUser}`, 'GET');
    const json = await response.json();
    const data = json.data;
    document.getElementById('name_edit_profile').value = data.name;
    document.getElementById('email_edit_profile').value = data.email;
    saveBtn.setAttribute('data-id', idUser);
}

if (saveBtn) {
    saveBtn.addEventListener('click', async function () {
        const name = document.getElementById('name_edit_profile').value;
        const email = document.getElementById('email_edit_profile').value;
        const id = saveBtn.getAttribute('data-id');
        let response = await fetchData(`/api/users/${id}`, 'PATCH', { name, email });
        if (response.ok) {
            loading(true, popUpResult)
        }
    });
}

const approvalContainer = document.querySelector('.approval_page_content');

async function getContents() {
    const response = await fetchData('/api/content', 'GET');
    const json = await response.json();
    return json.data;
}

async function renderApprovalContent() {
    const data = await getContents();
    contents = data;
    contents.forEach(content => {
        let approvalRow =
            `<div class="card_content">
                <img class="content_thumbnail" src="${content.thumbnail}" data-id="${content.id}" alt="">
                    <div class="btn_approved_group">
                        <button class="btn_setuju" data-id="${content.id}">Approve</button>
                        <button class="btn_tolak" data-id="${content.id}">Reject</button>
                    </div>
            </div>`;
        approvalContainer.insertAdjacentHTML('beforeend', approvalRow);
    });
}

if (approvalContainer) {
    approvalContainer.addEventListener('click', async function (e) {
        if (e.target.classList.contains('btn_setuju')) {
            const contentId = e.target.getAttribute('data-id');
            const response = await fetchData(`/api/content/${contentId}`, 'PATCH', { approved: 'approve' });
        } else if (e.target.classList.contains('btn_tolak')) {
            const contentId = e.target.getAttribute('data-id');
            const response = await fetchData(`/api/content/${contentId}`, 'PATCH', { approved: 'reject' });
        } else if (e.target.classList.contains('content_thumbnail')) {
            const contentId = e.target.getAttribute('data-id');
            showDetailContents(contentId);
        }
    });
}

const detailContainer = document.querySelector('.container_detail');
function showDetailContents(contentId) {
    let content = contents.find(content => content.id == contentId);
    console.log(content);
    detailContainer.classList.remove('noneActive');
    approvalContainer.classList.add('noneActive');
    detailContainer.querySelector('.title').textContent = content.title;
    detailContainer.querySelector('.credit').textContent = 'Ozan';
    detailContainer.querySelector('.created_at').textContent = content.created_at;
    detailContainer.querySelector('.contents').textContent = content.content;
    detailContainer.querySelector('.thumbnail').src = content.thumbnail;
    detailContainer.querySelector('.btn_delete_content').setAttribute('data-id', content.id);
}

function hideDetailContents() {
    detailContainer.classList.add('noneActive');
    approvalContainer.classList.remove('noneActive');
}

const confirmModal = document.getElementById('confirm_popup');
const cancelBtn = document.getElementById('cancelBtn');
const confirmBtn = document.getElementById('confirmBtn');

async function openConfirmDelete(message, fn) {
    return new Promise((resolve) => {
        cancelBtn.onclick = () => {
            confirmModal.style.display = 'none';
            resolve();
        };
        document.querySelector('.confirm_message').textContent = message;
        confirmBtn.onclick = async () => {
            await fn();
            confirmModal.style.display = 'none';
            resolve();
        };
    });
}

async function deleteContent(e) {
    let idContent = e.target.getAttribute('data-id');
    confirmModal.style.display = 'flex';
    await openConfirmDelete("Silahkan Confirm Untuk Menghapus.", async () => {
        let response = await fetchData(`/api/content/${idContent}`, 'DELETE');
        if (response.ok) {
            loading(true, popUpResult)
        }
    });
}

if (detailContainer) {
    const btnDeleteContent = detailContainer.querySelector('.btn_delete_content');
    if (btnDeleteContent) {
        btnDeleteContent.addEventListener('click', deleteContent);
    }
}

const closeIcon = document.querySelector('.close_icon');

if (closeIcon) {
    closeIcon.addEventListener('click', hideDetailContents);
}

if (approvalContainer) {
    renderApprovalContent();
}

const highlightApproval = document.querySelector('.dashboard_highlight_approval');
async function renderHighlightApproval() {
    const contents = await getContents();
    highlightApproval.innerHTML = "";
    contents.forEach((content, i) => {
        if (i < 3) {
            highlightApproval.innerHTML +=
                `<a href='/page/managePost'>
              <div class="card_content">
                    <img src="${content.thumbnail}" alt="">
                    <div>
                        <button class="btn_setuju">Setuju</button>
                        <button class="btn_tolak">Tolak</button>
                    </div>
              </div>
              </a>`;
        }
    });
}

if (highlightApproval) {
    renderHighlightApproval();
}

// Calendar Schedule
const calenderA = document.querySelector('#calenderA');
const calenderB = document.querySelector('#calenderB');
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();

let firstDayThisMonth = new Date(year, month, 1).getDay();
let daysThisMonth = new Date(year, month + 1, 0).getDate();
let activities = [];
const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"
];

async function renderCalender(calender, fn) {
    document.querySelectorAll('.year')[0].textContent = year;
    document.querySelectorAll('.month')[0].textContent = months[month];
    document.querySelectorAll('.year')[1].textContent = year;
    document.querySelectorAll('.month')[1].textContent = months[month];
    for (let i = 0; i < 42; i++) {
        const div = document.createElement('div');
        if (i >= firstDayThisMonth && i < daysThisMonth + firstDayThisMonth) {
            div.textContent = i - firstDayThisMonth + 1;
            div.classList.add('date');
            div.setAttribute('data-date', `${i - firstDayThisMonth + 1}/${month}/${year}`);
            calender.appendChild(div);
        } else {
            calender.appendChild(div);
        }
    }
    fn();
}

async function init() {
    await getActivities();
    renderCalender(calenderB, markDate);
    renderCalender(calenderA, markDate);
}

const calenderBContainer = document.getElementById('calenderB');
const btnCreateSchedule = document.getElementById('btn_create_schedule');

if (calenderBContainer) {
    calenderBContainer.addEventListener('click', function (e) {
        let date = e.target.getAttribute('data-date');
        e.target.classList.toggle('mark');
        btnCreateSchedule.setAttribute('data-date', date);
    });
}

const calenderAContainer = document.getElementById('calenderA');

if (calenderAContainer) {
    calenderA.addEventListener('click', function (e) {
        if (e.target.classList.contains('date')) {
            let dateEvent = e.target.getAttribute('data-date');
            console.log(dateEvent);
            renderDetailSchedule(dateEvent);
        }
    });
}

function renderDetailSchedule(date) {
    let activity = activities.find(activity => activity.date_start == date);
    document.querySelector('.schedule_details_title').textContent = activity.activity;
    document.querySelector('.schedule_details_dateStart').textContent = activity.date_start;
    document.querySelector('.schedule_details_description').textContent = activity.description;
    document.getElementById('btn_edit_schedule').setAttribute('data-schedule', activity.id);
    document.getElementById('btn_delete_schedule').setAttribute('data-schedule', activity.id);
}

const btnEditSchedule = document.getElementById('btn_edit_schedule');

if (btnEditSchedule) {
    btnEditSchedule.addEventListener('click', setEditValueSchedule);
}

let mode = 'add';

function convertToISO(dateStr) {
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month}-${day}`;
}

async function setEditValueSchedule(e) {
    mode = 'update';
    let idActivity = e.target.getAttribute('data-schedule');
    let activity = activities.find(a => a.id == idActivity);
    document.getElementById('title_forum').value = activity.activity;
    document.getElementById('date_forum').value = convertToISO(activity.date_end);
    document.getElementById('description_forum').value = activity.description;
    document.getElementById('btn_create_schedule').setAttribute('data-schedule', activity.id);
    document.getElementById('btn_create_schedule').setAttribute('data-date', activity.date_start);
}

function markDate() {
    const dateCalender = document.querySelectorAll('.date');
    dateCalender.forEach((d, i) => {
        activities.forEach(activity => {
            if (d.getAttribute('data-date') == activity.date_start) {
                dateCalender[i].classList.add('mark');
            }
        });
    });
}

if (btnCreateSchedule) {
    btnCreateSchedule.addEventListener('click', createSchedule);
}

async function createSchedules(schedule) {
    const response = await fetch('/api/activity', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(schedule)
    });
    return response;
}

async function updateSchedule(schedule, activityId) {
    const response = await fetch(`/api/activity/${activityId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(schedule)
    });
    return response;
}

async function deleteSchedule(e) {
    let activityId = e.target.getAttribute('data-schedule');
    confirmModal.style.display = 'flex';
    await openConfirmDelete("Silahkan Confirm untuk Menghapus.", async function () {
        let response = await fetchData(`/api/activity/${activityId}`, 'DELETE');
        if (response.ok) {
            loading(true, popUpResult)
            markDate()
        }
    });
}

const btnDeleteSchedule = document.getElementById('btn_delete_schedule');
if (btnDeleteSchedule) {
    btnDeleteSchedule.addEventListener('click', deleteSchedule);
}

async function createSchedule(e) {
    const activity = document.getElementById('title_forum').value;
    const dateEnd = document.getElementById('date_forum').value;
    const dateStart = convertToISO(e.target.getAttribute('data-date'));
    const description = document.getElementById('description_forum').value;
    let schedule = { activity, description, dateStart, dateEnd };
    let response = null;
    console.log(schedule);
    if (mode == 'update') {
        const idActivity = e.target.getAttribute('data-schedule');
        response = await updateSchedule(schedule, idActivity);
        mode = 'add';
    } else if (mode == 'add') {
        response = await createSchedules(schedule);
    }
    if (response && response.ok) {
        loading(true, popUpResult);

    }
}


const schedulePage = document.getElementById('schedule_page');
if (schedulePage) {
    init();
}

async function getActivities() {
    const activiy = await fetch('/api/activity', {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
    })
    const json = await activiy.json()
    activities = json.data
    return json
}

let verticalBarChart = null
let horizontalBarChart = null

async function getAttendanceStats() {
    const response = await fetchData('/api/attendance/stats', 'GET')
    const json = await response.json()
    const stats = json.data

    if (horizontalBarChart) {
        horizontalBarChart.data.labels = []
        horizontalBarChart.data.datasets[0].data = []

        stats.forEach(stat => {
            horizontalBarChart.data.labels.push(stat.name)
            horizontalBarChart.data.datasets[0].data.push(stat.jmlhKehadiran)
        });

        horizontalBarChart.update()
    }

}

async function getActivityStats() {
    const response = await fetchData('/api/activity/stats', 'GET')
    const json = await response.json()
    const stats = json.data

    if (verticalBarChart) {
        verticalBarChart.data.labels = []
        verticalBarChart.data.datasets[0].data = []

        stats.forEach(stat => {
            verticalBarChart.data.labels.push(stat.activity)
            verticalBarChart.data.datasets[0].data.push(stat.jumlahPeserta)
        });
        verticalBarChart.update()
    }

}

const canvas1 = document.querySelector('.chart1')
const canvas2 = document.querySelector('.chart2')
if (canvas1) {
    horizontalBarChart = new Chart(canvas1, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Top 10 ',
                data: [],
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true
                }
            }
        }
    });

}

if (canvas2) {
    verticalBarChart = new Chart(canvas2, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Jumlah Peserta',
                data: [],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


getAttendanceStats()
getActivityStats()

async function renderStats(){
    const members = await getAllUsers()
    const posts = await getContents()
    let totalMembers = members.length
    let totalContents = posts.length
    document.querySelector('.member_stats').textContent = totalMembers
    document.querySelector('.post_stats').textContent = totalContents
}

renderStats()