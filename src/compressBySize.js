const fs = require('fs')
const compress = require('image-conversion')
const Blob = require('blob')
const utils = require('./utils/utils')

const compressImage = (size, inputPath, outputPath) => {
    try {
        const result = async function view() {
            const imgPath = fs.readFileSync(Buffer.from(inputPath))
            // const arrayBuff = utils.toArrayBuffer(imgPath)
            // const blobObj = new Blob([arrayBuff])
            const imgName = utils.GetFilename(inputPath)
            if(!imgName){
                throw new Error('Error: No Such File or Directory')
            }
            const res = await compress.compressAccurately(imgPath, size)
            try {
                fs.writeFileSync(outputPath + imgName, res);
                console.log(chalk.green.inverse('Success: Image Compressed!'))
            } catch (e) {
                return console.log(chalk.red.inverse('Error: No such file or directory to save new image', e.path));
            }
        }
        result()
    } catch (e) {
        console.log(chalk.red.inverse('Something went wrong, please check your I/O paths'))
        console.log(chalk.redBright('Image_Src_Path: "' + inputPath + '"'))
        console.log(chalk.redBright('Image_Destination_Path: "' + outputPath + '"'))
        console.log(chalk.redBright('--------------------------------------------'))
        console.log(chalk.redBright('Input Path: Should be a dir path (including image name) to your desired image you want to resize'))
        console.log(chalk.redBright('Ouput Path: Should be a dir path where you want to save the new resized image'))
    }
}

module.exports = {
    compressImage
}