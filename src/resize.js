const fs = require('fs')
const chalk = require('chalk')
const sharp = require('sharp')
const utils = require('./utils/utils')

const resizeImage = (width, height, inputPath, outputPath) => {
    try {
        const imgPath = fs.readFileSync(Buffer.from(inputPath))
        const imgName = utils.GetFilename(inputPath)
        const imgExtension = inputPath.replace(/^.*\./, '');
        const imgOutputDes = outputPath + '/' + imgName + '-' + width + 'x' + height + '.' + imgExtension
        sharp(imgPath)
            .resize(width, height)
            .toFile(imgOutputDes, function (err) {
                if (err) {
                    console.log(chalk.red.inverse('Something went wrong:', err))
                } else {
                    console.log(chalk.green.inverse('Success: Image Resized!'))
                    console.log(chalk.greenBright('New Image Dir: "' + imgOutputDes + '"'))            
                }
            })
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
    resizeImage
}