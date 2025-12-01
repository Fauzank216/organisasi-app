
async function fetchData(url, method, body = {}) {
    const options = {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    };

    if (method !== 'GET') {
        options.body = JSON.stringify(body);
        console.log(options);
    }

    const response = await fetch(url, options);

    return response;
}

// Data history
let attendanceHistoryData = [];
let maddingHistoryData = [];
let allUsersHistory = [];

// Fetch data history attendance
async function fetchAttendanceHistory() {
    const response = await fetchData('/api/attendance/history', 'GET');
    const json = await response.json();
    attendanceHistoryData = await json.data;
}

// Fetch data history madding
async function fetchMaddingHistory() {
    const response = await fetchData('/api/content/history', 'GET');
    const json = await response.json();
    maddingHistoryData = await json.data;
}

// Fetch all users history
async function fetchAllHistory(fn) {
    const response = await fetchData('/api/users/history', 'GET');
    const json = await response.json();
    allUsersHistory = await json.data;
    await fn(allUsersHistory)
}


const activityListContainer = document.querySelector('.activity-list');
const tabAttendance = document.getElementById('tab-absen');
const tabMadding = document.getElementById('tab-madding');
const tabAll = document.getElementById('tab-all');


tabAll.addEventListener('click', function () {
    renderActivityList(allUsersHistory);
});

tabAttendance.addEventListener('click', async function () {
    renderActivityList(attendanceHistoryData);
});

tabMadding.addEventListener('click', async function () {
    renderActivityList(maddingHistoryData);
});


async function renderActivityList(data) {
    activityListContainer.innerHTML = "";
    data.forEach(item => {
        activityListContainer.innerHTML += `
            <div>
                ${item.status ? `Absen-${item.activity} : ${item.status}` : `Upload Madding : ${item.title}`}
                <p>01/02/2025</p>
            </div>
           `
    })
}


async function saveEdit(e) {

    const fd = new FormData()

    const avatar = document.querySelector('.avatar').files[0]
    const values = Array.from(document.querySelectorAll('.input-control'))
        .map(input => input.value)
    fd.append('name', values[0])
    fd.append('email', values[1])
    fd.append('notelp', values[2])

    if (avatar) {
        fd.append('avatar', avatar)
    }


    let userId = e.target.getAttribute('data-id');

    const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        body: fd
    });

    loading(true, popUpResult)
    if (response.ok) {
        await renderProfile()
    }

    return response
}

async function setInputValue(values = []) {
    const inputControlls = Array.from(document.querySelectorAll('.input-control'))
    const keys = ['name', 'email', 'no_telp']
    inputControlls.map((input, i) => input.value = values[keys[i]])
    btnSave.setAttribute('data-id', values.id)
}

async function getSelfData() {
    const response = await fetchData('/api/users/self', 'GET')
    const json = await response.json()
    return json.data
}

const triggerEditProfile = document.getElementById('trigger_edit_profile')
if (triggerEditProfile) {
    triggerEditProfile.addEventListener('click', async function () {
        let user = await getSelfData()
        console.log(user)
        document.querySelector('.form_edit_profile').classList.add('flex')
        setInputValue(user)
    })
}

const btnSave = document.getElementById('sv_btn_profile')
if (btnSave) {
    btnSave.addEventListener('click', saveEdit)
}

const cancelBtn = document.getElementById('cancel_btn_profile')
if (cancelBtn) {
    cancelBtn.addEventListener('click', function () {
        document.querySelector('.form_edit_profile').classList.remove('flex')
    })
}

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

const btnLogout = document.getElementById('btn_logout')
if (btnLogout) {
    btnLogout.addEventListener('click', async function () {
        await fetchData('/api/logout', 'GET')
        loading(true, function(){
            window.location.reload()
        })
    })
}

async function renderProfile() {
    const response = await getSelfData()
    document.querySelector('.member_name').textContent = response.name
    document.querySelector('.member_email').textContent = response.email
    document.querySelector('.role_profile').textContent = response.role
    document.querySelector('.member_role').textContent = response.role
    document.querySelector('.status_profile').textContent = response.status
    document.querySelector('.profile_picture')
        .setAttribute('src', response?.avatar
            ? `/img/uploads/avatar/${response.avatar}`
            : '/profile.webp'
        );


}

renderProfile()
fetchAllHistory(renderActivityList);
fetchMaddingHistory();
fetchAttendanceHistory();

