const store = {image: null}

const imageInput = document.querySelector('#preview_image')
const imagePreview = document.querySelector('.image-preview-label')
const sendButton = document.querySelector('.button')

imageInput.addEventListener('input', ev => {
    const image = ev.target.files[0]
    let fileReader = new FileReader()

    fileReader.onload = ev => {
        if(fileReader.readyState === 2){
            let dataUrl = fileReader.result
            imagePreview.style.backgroundImage = `url(${fileReader.result})`
            store.image = dataUrl.replace('data:image/jpeg;base64,', '')
        }
    }

    try{
        fileReader.readAsDataURL(image)
    } catch (ex) {}
})

function showPredictionResults(results) {
    const catLabel = document.querySelector('#percentage-cat')
    const dogLabel = document.querySelector('#percentage-dog')

    catLabel.textContent = `Cat: ${Number(results.cat).toFixed(2)}`
    dogLabel.textContent = `Dog: ${Number(results.dog).toFixed(2)}`
}

function sendImage() {
    if(store.image === null){
        alert('Cant predict, because you did not select the image')
    }
    else{
        fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({image: store.image})
        }).then(res => res.json())
          .then(res => showPredictionResults(res))
    }
}

sendButton.addEventListener('click', sendImage)
