const submitButton = document.querySelector('#submit-name')
const inputNameField = document.querySelector('#input-name')
const app = document.querySelector('.app-wrapper')

submitButton.addEventListener('click', ev => {
    fetch('http://127.0.0.1:5000', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({name: inputNameField.value})
    }).then(res => res.json())
      .then(res => {
          const element = document.createElement('p')
          element.innerHTML = res.text
          app.appendChild(element)
        })
})
