'use strict'
const submit = document.querySelector('.btn')
const msg = document.querySelector('.msg')
const list = document.querySelector('.feedback-list')
const average = document.querySelector('.average')
const filBtns = document.querySelectorAll('.fil-btn')
let ratValue = document.querySelectorAll('[type="radio"]')
let text = document.querySelector('[type="text"]')
//initial
let feedbackArr = [
    {
        "id": "23a4bed8-a816-44d8-ae7c-901390daaf73",
        "rating": 4,
        "feedback": "@hunterem254",
        "createdAt": 1673792926148,

    },
    {
        "id": "b66ae666-2052-42a5-aa16-20f938d69be0",
        "rating": 4,
        "feedback": "jskjfe sf fadf ahdfajkshf ",
        "createdAt": 1673792976560
    },
    {
        "id": "7c59b2fe-2894-4fc5-b015-aaa8ee2d3c1e",
        "rating": 4,
        "feedback": "sfewe jkjkdhd fjd hfjka f",
        "createdAt": 1673792948837,
        "reply": [
            {
                "msgValue": "gfgfff gff gfhgffg fh fgjhg hj gj",
                "createdAt": 1673792961917
            }
        ]
    },
    {
        "id": "4d2d6ec6-ef47-4df1-afac-429ca08b3141",
        "rating": 3,
        "feedback": "@joe_Mwan_gi",
        "createdAt": 1673795948837
    },
    {
        "id": "75f75567-7961-442b-94d3-9204f4402e43",
        "rating": 3,
        "feedback": "@joe_Mwan_gi",
        "createdAt": 1673792427006,
        "reply": [
            {
                "msgValue": "kjfkjskd fsjfsj fjskdjf ",
                "createdAt": 1673792448536
            }
        ]
    },
    {
        "id": "928c56cd-b590-4526-b121-555b7d6f1ac7",
        "rating": 5,
        "feedback": "first feedback",
        "createdAt": 1673792421675,
    }
]

let editFlag = false
let editId = ''

document.addEventListener('DOMContentLoaded', () => {
    filterBtns(filBtns)
    filterFeedback()
    reviewsFunc(feedbackArr, document.querySelector('.review'))
    editFunc()
    delFeedback()
})
    

    //submiting feedback
    
form.addEventListener('submit', e => {
    e.preventDefault()
    feedbackVal()
    filterFeedback()
    reviewsFunc(feedbackArr, document.querySelector('.review'))
    averageRating()
    editFunc()
    delFeedback()
})    


function filterFeedback() {
    feedbackArr = feedbackArr.sort((a, b) => b.createdAt - a.createdAt)
    //adding all to list
    addToList(feedbackArr)
    
    //filtering the list
    filBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            if(e.currentTarget.classList.contains('btn-fil2')) {
                addToList(feedbackArr.filter(item => item.rating > 3))
                reviewsFunc(feedbackArr.filter(item => item.rating > 3), 
                document.querySelector('.pos-review'))
            } else if(e.currentTarget.classList.contains('btn-fil4')) {
                addToList(feedbackArr.filter(item => item.rating < 3))
                reviewsFunc(feedbackArr.filter(item => item.rating < 3), 
                document.querySelector('.crit-review'))
            } else if(e.currentTarget.classList.contains('btn-fil3')) {
                addToList(feedbackArr.filter(item => item.rating === 4 || item.rating === 3))
                reviewsFunc(feedbackArr.filter(item => item.rating === 4 || item.rating === 3),
                document.querySelector('.neu-review'))
            } else {
                addToList(feedbackArr)
                reviewsFunc(feedbackArr, 
                document.querySelector('.review'))
            }
        })
    })
    ratingStats([...feedbackArr])
    averageRating()
}
    
    //average rating
function reviewsFunc(arr, review) {
    if(arr.length > 0) {
        review.textContent = `${arr.length} Reviews`
    } else{
        review.textContent = 'No Reviews'
    }
}

function averageRating() {
    const avRating = feedbackArr.reduce((accum, curr) => 
    +accum + +curr.rating
    , [0]) 
    const length = feedbackArr.length
    if(length > 0) {
        average.textContent = (avRating / length).toFixed(1).replace(/.0$/, '')
    } else{
        average.textContent = 0
    }
}

//validation
function feedbackVal() {
    if(text.value.trim().length < 10) {
        msg.textContent = 'Type at least 10 characters'
    } else{
        msg.textContent = ''
        addToArr()
    }
}

function addToArr() {
    const body = new FormData(form)
    const entries = [...body.entries()]
    const rating = +entries[0][1]
    const feedback = entries[1][1]
    const id = crypto.randomUUID()
    const createdAt = Date.now()
    

    if(!editFlag) {
        feedbackArr.push({id, rating, feedback, createdAt})
        setToDefault()
    } else {
            const editItem = feedbackArr.find(item => item.id === editId)
            editItem.rating = rating
            editItem.feedback = feedback
            setToDefault()
    }
}

function delFeedback() {
    const delBtns = document.querySelectorAll('.close')
    delBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            const target = e.currentTarget
            const parent = target.closest('.card')
            const id = parent.dataset.id
            
            feedbackArr = feedbackArr.filter(item => item.id !== id)
            parent.remove()
            reviewsFunc(feedbackArr, document.querySelector('.review'))
            averageRating()
            ratingStats([...feedbackArr])
        })
    })
}

//adding feedbacks to the list
function addToList(arr) {
    let cards = []     
    arr.map(item => {
        cards.push(             `
        <div class="card feedback" data-id="${item.id}">
            <div class="num-display">${item.rating}</div>
            <img src="./images/star.png" alt="" class="star">
            <div class="btns">
                <!-- <h6 class="from">from</h6> -->
                <button class="edit"></button>
                <button class="close"></button>
            </div>
            <div class="text-display">
                <p class="feed">${item.feedback}</p>
                <div class="date-wrapper">
                    <h5 class="date" data-date="${item.createdAt}"></h5>
                    </div>
            </div>
            <div class="msg-container">


            </div>
            <form class="reply-wrapper">
                <div class="input-group">
                    <input type="text" name="reply" placeholder="Write a reply"/>
                    <button type="submit" class="btn btn-secondary"></button>
                </div>
            </form>
            <div class="reply-container">
                <h4 class="reply">reply</h4>
            </div>
        </div>
            `)
    })
    
    list.innerHTML = cards.join(' ')
    replyFunc(list.querySelectorAll('.reply'))
    
    //showing reply msgs
    const replyMsg = list.querySelectorAll('.msg-container')
    arr.map((item, index)=> {
        if(item.reply) {
            replyMsg.forEach((msg, index2) => {
                if(index === index2) {
                    msg.innerHTML += `
                <div class="reply-msg">
                    <div class="sender">
                        <div class="sender-img">
                            <!-- <img src="" alt=""> -->
                            F
                        </div>
                        <h6 class="from">from</h6>
                    </div>
                    <p class="reply-text">${item.reply[0].msgValue}</p>
                    <div class="date-wrapper">
                        <h5 class="date" data-date="${item.reply[0].createdAt}"></h5>
                    </div>
                </div>
                `
                }
            })
        }
    })


    const date = list.querySelectorAll('.date')

    setInterval(() => {
        date.forEach(item => {
            const createdAt = +item.dataset.date
            const currentDate = new Date()
        
            // Get the time the feedback was created
            const itemCreatedDate = new Date(createdAt)
        
            let timeElapsed = currentDate - itemCreatedDate
        
            let seconds = Math.floor(timeElapsed / 1000)
            let minutes = Math.floor(seconds / 60)
            let hours = Math.floor(minutes / 60)
            let days = Math.floor(hours / 24)
            if(timeElapsed < 60000) {
                item.textContent = `${seconds}s`
            } else if(timeElapsed < 3600000) {
                item.textContent = `${minutes}m`
            } else if(timeElapsed < 86400000){
                item.textContent = `${hours}h`
            } else if(timeElapsed < 86400000 * 7){
                item.textContent = `${days}d`
            }else {
                let month = itemCreatedDate.getMonth() + 1
                let day = itemCreatedDate.getDate()
                const year = itemCreatedDate.getFullYear()
        
                if(month<10) month = `0${month}`
                if(day<10) day = `0${day}`
        
                item.textContent = `${day}-${month}-${year}`
            }
        })
    }, 1000)
}

//rating stats
function ratingStats(newArr) {
    const five = newArr.filter(item => item.rating === 5).length
    const four= newArr.filter(item => item.rating === 4).length
    const three = newArr.filter(item => item.rating === 3).length
    const two = newArr.filter(item => item.rating === 2).length
    const one = newArr.filter(item => item.rating === 1).length
    const total = newArr.length
    const progress = document.querySelectorAll('.progress')

    progress.forEach((item, index)=> {
        if(index === 0) {
            item.style.width = `${ ((five/total) * 100)}%`
        } else if(index === 1) {
            item.style.width = ((four/total) * 100) + '%'
        }  else if(index === 2) {
            item.style.width = ((three/total) * 100) + '%'
        } else if(index === 3) {
            item.style.width = ((two/total) * 100) + '%'
        }  else {
            item.style.width = ((one/total) * 100) + '%'
        }
    })
}

//filter-btns
function filterBtns(filBtns) {
    filBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            btn.classList.add('active-btn')
            btn.nextElementSibling.classList.add('show')
            filBtns.forEach(item => {
                if(btn !== item) {
                    item.classList.remove('active-btn')
                    item.nextElementSibling.classList.remove('show')
                }
            })
        })
    })
}

function replyFunc(reply) {
    reply.forEach(rep => {
        rep.addEventListener('click', e => {
            const target = e.currentTarget
            const parent = target.closest('.card')
            const input = parent.querySelector('.reply-wrapper')

            const id = parent.dataset.id
            const arr = feedbackArr.find(item => item.id === id)
            arr.reply = []
            
            input.classList.add('block')
            target.classList.add('remove')

            const form = parent.querySelector('.reply-wrapper')
            const msgContainer = parent.querySelector('.msg-container')

            form.addEventListener('submit', e => {
                e.preventDefault()
                const msgValue = form.elements[0].value
                const createdAt = Date.now()
                arr.reply.push({msgValue, createdAt})


                msgContainer.innerHTML = `
                <div class="reply-msg">
                    <div class="sender">
                        <div class="sender-img">
                            <!-- <img src="" alt=""> -->
                            F
                        </div>
                        <h6 class="from">from</h6>
                    </div>
                    <p class="reply-text">${msgValue}</p>
                    <div class="date-wrapper">
                        <h5 class="date" data-date="${createdAt}">now</h5>
                    </div>
                </div>
                `
            })
        })
    })
}



//edit feedback
function editFunc() {
    list.querySelectorAll('.edit').forEach(item => {
        item.addEventListener('click', e => {
            editFlag = true
            const target = e.currentTarget
            const parent = target.closest('.card')
            editId = parent.dataset.id
            const rating = parent.querySelector('.num-display').textContent
            const editElement = parent.querySelector('.feed')

            text.value = editElement.textContent
            const item = [...ratValue].find(item => item.value === rating)
            item.checked = true
        })
    })
}

//set to initial state
function setToDefault() {
    editFlag = false
    text.value = ''
    ratValue.forEach(item => {
        if(item.value === '5') item.checked = true
    })
}

//Todo: 1. add delete and edit func after click on filter btns
//      2. add three dots to hide del and edit icons
//      3. hide reply-btn after one reply
//      4. delete and edit replies
//      5. set all colors to variables
