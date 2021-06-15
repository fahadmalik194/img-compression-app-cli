const fs = require('fs')
const chalk = require('chalk')
const sharp = require('sharp')
const globalVariables = require("./constants/global")
const utils = require('./utils/utils')

const compressImage = async (inputPath, outputPath) => {
    try {
        const imgPath = fs.readFileSync(Buffer.from(inputPath))
        const imgName = utils.GetFilename(inputPath)
        const imgExtension = inputPath.replace(/^.*\./, '');
        const imgOutputDes = outputPath + '/' + imgName + '-compressed.' + imgExtension
        if (imgExtension === globalVariables.JPG || imgExtension === globalVariables.JPEG) {
            const data = await sharp(imgPath)
                .jpeg({
                    mozjpeg: true,
                    quality: 5
                })
                .toBuffer()
            try {
                fs.writeFileSync(imgOutputDes, data);
                console.log(chalk.green.inverse('Success: Image Compressed!'))
                console.log(chalk.green('New Image Dir:', imgOutputDes))
            } catch (e) {
                console.log('Error:', e)
            }
        } else if (imgExtension === globalVariables.PNG) {
            const data = await sharp(imgPath)
                .png({
                    palette: true,
                    quality: 5
                })
                .toBuffer();
            try {
                fs.writeFileSync(imgOutputDes, data);
                console.log(chalk.green.inverse('Success: Image Compressed!'))
                console.log(chalk.green('New Image Dir:', imgOutputDes))
            } catch (e) {
                console.log('Error:', e)
            }
        }
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