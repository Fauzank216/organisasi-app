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

async function getAttendance() {
    const response = await fetchData('/api/attendance', 'GET')
    const json = await response.json()
    let data = json.data
    return data
}

const tbodyAttendance = document.querySelector('.tbody_attendance')
async function renderAttendance() {
    const attandances = await getAttendance()
    attandances.forEach(attandance => {
        let rowHtml = `
        <tr>
            <td>${attandance.name}</td>
            <td>${attandance.date}</td>
            <td class="status present">${attandance.status}</td>
            <td><button class="verify-btn" data-attendance="${attandance.id}">Verifikasi</button></td>
        </tr>`
        tbodyAttendance.insertAdjacentHTML('beforeend', rowHtml)
    });
}

async function verifyAttendance(e) {
    if (e.target.classList.contains('verify-btn')) {
        let attendanceId = e.target.getAttribute('data-attendance')
        const response = await fetchData(`/api/attendance/${attendanceId}`, 'PATCH', {})
    }
}

if (tbodyAttendance) {
    tbodyAttendance.addEventListener('click', verifyAttendance)
}

renderAttendance()