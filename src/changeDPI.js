const toDataURL = (canvasWidth, canvasHeight) => {
    //How to get canvas element in CLI ????

    // create the dataUrl at standard 72dpi
    var dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    var daurl150dpi = changeDpiDataUrl(dataUrl, 150);
}

const toBlob = (canvasWidth, canvasHeight) => {
    //How to get canvas element in CLI ????

    // create the blob at standard 72dpi
    canvas.toBlob(function (blob) {
        changeDpiBlob(blob, 300).then(function (blob) {
            // use your changed blob
        })
    }, 'image/jpeg', 0.92);
}

module.exports = {
    toDataURL, toBlob
}