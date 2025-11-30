

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


async function getSelfData() {
    const response = await fetchData('/api/users/self')
    const json = await response.json()
    let data = json.data;
    return data
}

const trigerPopUpEditProfile = document.getElementById('profile_avatar')

const editBtn = document.getElementById('editBtn');
const popupEditProfile = document.getElementById('editModal');
const closeBtnProfile = document.getElementById('closeBtn');

const saveBtnEditProfile = document.getElementById('btn_save');


trigerPopUpEditProfile.addEventListener('click', async function () {
    const data = await getSelfData()

    saveBtnEditProfile.setAttribute('data-id', data.id)
    console.log(data)
    document.getElementById('name_edit_profile').value = data.name;
    document.getElementById('email_edit_profile').value = data.email;
    console.log(data.email)
    document.getElementById('phone_edit_profile').value;
    popupEditProfile.style.display = 'flex';
});

if (closeBtnProfile) {
    closeBtnProfile.addEventListener('click', function () {
        popupEditProfile.classList.add('noneActive')
    });
}



if (saveBtnEditProfile) {
    saveBtnEditProfile.addEventListener('click', async function (e) {
        const name = document.getElementById('name_edit_profile').value;
        const email = document.getElementById('email_edit_profile').value;
        // const phone = document.getElementById('phone').value;
        let userId = e.target.getAttribute('data-id')
        let newData = { name, email }
        const response = await fetchData(`/api/users/${userId}`, 'PATCH', newData)
        if(response.ok){
            loading(true, popUpResult)
        }
        popupEditProfile.style.display = 'none';
    });
}

async function renderProfile() {
    let data = await getSelfData()
    document.querySelector('.self_name').textContent = data.name
    document.querySelector('.self_email').textContent = data.email
    if (document.querySelector('.welcome')) {
        document.querySelector('.welcome').textContent = `Welcome ${data.name}`
    }
}

renderProfile()
