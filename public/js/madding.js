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

    const contentType = response.headers.get('content-type')
    let json = null
    if (contentType && contentType.includes('application/json')) {
        json = await response.json()
    } else {
        throw new Error('Response is not JSON')
    }

    console.log(response.headers.get('content-type'))
    return { ok: response.ok, data: json?.data ?? json }
}


let contents = []
let rejected = []
let pending = []
const madding = document.querySelector('.madding_content')

async function getContents() {
    const response = await fetchData('/api/content', 'GET')
    console.log(response)
    if (response.ok) {
        contents = response.data
        rejected = contents.filter(r => r.approved === 'rejected')
        pending = contents.filter(r => r.approved === 'pending')
        renderContent(contents)
    }
    return
}

function descSorting() {
    return [...contents].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
}

function ascSorting() {
    return [...contents].sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
}

const search = document.getElementById('search')
const btnAll = document.getElementById('all')
const btnLastest = document.getElementById('lastest')
const btnOldest = document.getElementById('oldest')
const btnReject = document.getElementById('rejected')
const btnPending = document.getElementById('pending')

if (btnLastest) {
    btnLastest.addEventListener('click', function () {
        let sortedContents = descSorting()
        renderContent(sortedContents)
    })
}

if (btnOldest) {
    btnOldest.addEventListener('click', function () {
        let sortedContents = ascSorting()
        renderContent(sortedContents)
    })
}

async function searchContentByTitle(key) {
    if (key === '') {
        renderContent(contents)
    } else {
        let filteredContents = contents.filter(content => content.title && content.title.toLowerCase().includes(key.toLowerCase()))
        renderContent(filteredContents)
    }
}

function debounce(fn, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}

let debounced = debounce(searchContentByTitle, 500)

if (search) {
    search.addEventListener('keyup', function (e) {
        debounced(e.target.value)
    })
}

if (btnAll) {
    btnAll.addEventListener('click', function () {
        renderContent(contents)
    })
}

if (btnReject) {
    btnReject.addEventListener('click', function () {
        renderContent(rejected)
    })
}

if (btnPending) {
    btnPending.addEventListener('click', function () {
        renderContent(pending)
    })
}

function renderContent(contents = null) {
    let html = ''
    if (contents && contents.length > 0) {
        contents.forEach(content => {
            html +=
                `<div class="card_content">
                    <img class='triger_detail' data-id=${content.id} src="${content.thumbnail}" alt="">
                        <div>
                            <p>${content.title}</p>
                            <img src="/img/asset/info_35dp_FFFFFF_FILL0_wght400_GRAD0_opsz40.png" alt="">
                        </div>
                </div>`
        });
    }
    madding.innerHTML = html
}

const cardContent = document.querySelector('.madding_content')
const cardDetailContainer = document.querySelector('.container_detail')

if (cardDetailContainer) {

    cardContent.addEventListener('click', function (e) {
        if (e.target.classList.contains('triger_detail')) {
            let id = parseInt(e.target.getAttribute('data-id'))
            const data = contents.find(d => d.id == id)

            document.querySelector('.left_card h1').textContent = data.title;
            document.querySelector('.card_detail_content p').textContent = data.content;
            document.querySelector('.right_card p').textContent = data.created_at;
            document.querySelector('.thumbnail').src = data.thumbnail;

            const btnEdit = document.querySelector('.btn_edit')

            if (btnEdit) {
                btnEdit.setAttribute('data-id', e.target.getAttribute('data-id'))
            }

            const btnDelete = document.querySelector('.btn_delete')

            if (btnDelete) {
                btnDelete.setAttribute('data-id', e.target.getAttribute('data-id'))
            }

            // show detail
            cardDetailContainer.classList.remove('noneActive');
            cardDetailContainer.classList.add('active');
        } else {
            console.log(e.target.classList)
        }

    })
}

const closeIcon = document.querySelector('.close_icon')
if (closeIcon) {
    closeIcon.addEventListener('click', function () {
        cardDetailContainer.classList.remove('active');
        cardDetailContainer.classList.add('noneActive');
    })
}

getContents()
const btnEnter = document.getElementById('btn_enter_information')
const infoContainer = document.querySelector('.info')
const maddingWrapper = document.querySelector('.madding_wrapper')

btnEnter.addEventListener('click', function () {
    btnEnter.classList.add('noneActive')
    infoContainer.classList.add('noneActive')
    maddingWrapper.classList.remove('noneActive')
    maddingWrapper.classList.add('active')
})

const cardDetail = document.querySelector('.card_detail')


if (cardDetail) {
    cardDetail.addEventListener('click', async function (e) {
        let id = null
        if (e.target.classList.contains('btn_edit')) {
            id = parseInt(e.target.getAttribute('data-id'))
            window.location.href = `/page/update/${id}`
        } else if (e.target.classList.contains('btn_delete')) {
            id = e.target.getAttribute('data-id')
            let response = await fetchData(`/api/content/${id}`, 'DELETE')
            if (response.ok) {
               
                contents = contents.filter(c => c.id != id)
                rejected = rejected.filter(c => c.id != id)
                pending = pending.filter(c => c.id != id)
                renderContent(contents)
                loading(true,popUpResult)
              
            } else {
                popUpResult(false, popUpResult)
            }
        }
    })
}



const addContent = document.getElementById('add_content_icon')
addContent.addEventListener('click', function () {
    window.location.href = `information/create`
})
