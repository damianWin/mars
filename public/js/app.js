
// fetch('http://localhost:3000/weather?adress=boston')
// .then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         } else {
//         console.log(data.location)
//         console.log(data.forecast)

//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From Javascript'

weatherForm.addEventListener('submit', (e) => {
    
    e.preventDefault();
    const location = search.value

    

    fetch(`http://localhost:3000/weather?adress=${location}`)
    .then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error;
            messageTwo.textContent = '';

        } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;

        }
    })
})
})
