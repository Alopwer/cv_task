const menu = document.querySelector('.menu')
const aside = document.querySelector('aside')
menu.addEventListener('click', () => {
    aside.classList.toggle('active')
})

const applyRank = (status) => {
    const p = document.createElement('p')
    p.innerText = `Rank: ${Math.floor(Math.random() * 50)} / 50`
    p.classList.add('table-status__rank') 
    status.appendChild(p)
}

const removeRank = (status) => {
    status.removeChild(status.children[0])
}

const onChangeStatus = (e, i) => {
    if (e.target.checked) {
        statuses[i].innerText = 'Active'
        applyRank(statuses[i])
    } else {
        removeRank(statuses[i])
        statuses[i].innerText = 'Inactive'
    }
    statuses[i].classList.toggle('active')
}

const inputs = document.querySelectorAll('.switcher')
const statuses = document.querySelectorAll('.table-status__info')
Array.prototype.forEach.call(inputs, (input, i) => {
    input.addEventListener('change', (e) => onChangeStatus(e, i))
    if (input.checked) {
        statuses[i].innerText = 'Active'
        statuses[i].classList.add('active')
        applyRank(statuses[i])
    } else if (statuses[i].innerText === 'Active') {
        input.checked = true
        statuses[i].classList.add('active')
        applyRank(statuses[i])
    }
});

const handleProgressbarStyling = (pc, i) => {
    const text = pc.innerText
    const progress = text.slice(0, text.length - 1)
    progressbars[i].style.width = `${progress}%`
    if (progress >= 70) {
        progressbars[i].style.backgroundColor = '#7FC637'
    } else if (progress >= 35) {
        progressbars[i].style.backgroundColor = '#F9A432'
    } else if (progress > 0) {
        progressbars[i].style.backgroundColor = '#F12711'
    } else {
        progressbars[i].style.backgroundColor = 'transparent'
    }
}

const progressbars = document.querySelectorAll('.progressbars')
const progressbarsContainers = document.querySelectorAll('.table-progress')
const percentages = document.querySelectorAll('.table-progress__info')
Array.prototype.forEach.call(percentages, (pc, i) => {
    handleProgressbarStyling(pc, i)
})
Array.prototype.forEach.call(progressbarsContainers, (pg, i) => {
    const text = percentages[i].innerText
    const multiplier = document.querySelectorAll('.table__value')[i].innerText.split(',').join('')
    const value = text.slice(0, text.length - 1) * multiplier / 100
    if (value) {
        pg.addEventListener('mouseover', () => {
            const div = document.createElement('div')
            div.innerText = value
            div.classList.add('progressbars__info')
            pg.appendChild(div)
        })
        pg.addEventListener('mouseout', () => {
            pg.removeChild(pg.children[1])
        })
    }
})

const handleCheck = (value) => {
    const allCheckboxes = document.querySelectorAll('.table-checkbox')
    Array.prototype.forEach.call(allCheckboxes, (c) => {
        c.children[0].checked = value
    })
}

const mainCheckbox = document.querySelector('.table-checkbox__main')
mainCheckbox.addEventListener('change', (e) => {
    if (e.target.checked) {
        handleCheck(true)
    } else {
        handleCheck(false)
    }
})


const input = document.querySelector('.table-search input')
input.addEventListener('keyup', onSearch)
function onSearch(e) {
    const value = e.target.value.toLowerCase()
    const tr = document.querySelectorAll('tbody tr')
    Array.prototype.forEach.call(tr, (t, i) => {
        const campaignName = document.querySelectorAll('.table-branch')
        if (campaignName[i].children[0].innerText.toLowerCase().indexOf(value)) {
            t.style.display = 'none'
        } else {
            t.style.display = ''
        }
    })
}

const sortableHeaders = document.querySelectorAll('.sortable')
sortableHeaders[0].addEventListener('click', () => sort(2))
sortableHeaders[1].addEventListener('click', () => sort(3))

function sort(n) {
    const table = document.getElementsByTagName("table")[0]
    let switching = true
    let dir = 'asc'
    let shouldSwitch, switchcount = 0

    while (switching) {
        switching = false
        rows = table.rows
    
        for (i = 1; i < rows.length - 1; i++) {
            shouldSwitch = false;
            x = rows[i].querySelectorAll("td")[n];
            y = rows[i + 1].querySelectorAll("td")[n];

            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                  shouldSwitch = true;
                  break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}