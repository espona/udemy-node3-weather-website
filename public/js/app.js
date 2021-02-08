console.log("Client side javascript is loaded")



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    message1.textContent = 'Loading...'
    message2.textContent = ''

    const location = search.value
    console.log(location)

    fetch('http://localhost:3000/weather?address=' + location).then((response) =>  {
        response.json().then((data) => {
            if (data.error) {
                console.error(data.error)
                message1.textContent = 'ERROR'
                message2.textContent = data.error
            } else {
                console.log(data.location)
                console.log(data.forecast)
                message1.textContent = data.location
                message2.textContent = data.forecast
            }
        })
    })

})
