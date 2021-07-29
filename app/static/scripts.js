const store = {image: null}

const imageInput = document.querySelector('#preview_image')
const imagePreview = document.querySelector('.image-preview-label')
const sendButton = document.querySelector('.button')

imageInput.addEventListener('input', ev => {
    const image = ev.target.files[0]
    let fileReader = new FileReader()

    fileReader.onload = ev => {
        if(fileReader.readyState === 2){
            imagePreview.style.backgroundImage = `url(${fileReader.result})`
            store.image = image
        }
    }

    try{
        fileReader.readAsDataURL(image)
    } catch (ex) {}
})

function sendImage() {
    if(store.image === null){
        alert('Cant predict, because you did not select the image')
    }
    else{
        let data = new FormData()
        data.append('image', store.image, store.image.name)

        fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: data
        }).then(res => res.json())
          .then(res => console.log(res))
    }
}

sendButton.addEventListener('click', sendImage)
