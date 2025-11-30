const btnReadMore = document.getElementById('btn_read_more_home')
const heroContent = document.querySelector('.hero_content')
if (btnReadMore) {
    btnReadMore.addEventListener('click', function () {
        if (heroContent.classList.contains('change')) {
            heroContent.classList.remove('change')
            heroContent.classList.add('back')
        } else {
            heroContent.classList.remove('back')
            heroContent.classList.add('change')
        }
    })
}

const trigerlogin = document.querySelector('.triger_login')
const trigerregister = document.querySelector('.triger_register')
const card = document.querySelector('.card')

if (trigerlogin) {
    trigerlogin.addEventListener('click', function () {
        card.classList.remove('slide')
        card.classList.remove('geserKanan')
        card.classList.add('geserKiri')
    })

}

if (trigerregister) {
    trigerregister.addEventListener('click', function () {
        card.classList.add('slide')
        card.classList.remove('geserKiri')
        card.classList.add('geserKanan')
    })
}


const btnLogin = document.getElementById('btn_login')
if (btnLogin) {
    btnLogin.addEventListener('click', login)
}
async function login() {
    const email = document.getElementById('email_login').value
    const password = document.getElementById('password_login').value
    const response = await fetchData('/api/login', 'POST', { email, password })
    window.location.href = response.url
    return
}

async function fetchData(url, method, body = {}) {
    const options = {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    }

    if (method !== 'GET') {
        options.body = JSON.stringify(body)
    }

    const response = await fetch(url, options)

    const json = await response.json()
    return json?.data ?? json
}

const btnRegister = document.getElementById('btn_register')
if (btnRegister) {
    btnRegister.addEventListener('click', register)
}
async function register() {
    const nama = document.getElementById('username_register').value
    const email = document.getElementById('email_register').value
    const password = document.getElementById('password_register').value
    const response = await fetchData('/api/register', 'POST', { nama, email, password })
    window.location.href = response.url
    return
}


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

const humberGerMenu = document.querySelector('.humberger_menu')
humberGerMenu.addEventListener('click', function(){
    
})