const fs = require('fs')
const chalk = require('chalk')
const sharp = require('sharp')
const utils = require('./utils/utils')
const globalVariables = require("./constants/global")

const convertIntoJPEG = async (inputPath, outputPath) => {
    try {
        const imgPath = fs.readFileSync(Buffer.from(inputPath))
        const imgName = utils.GetFilename(inputPath)
        const imgExtension = inputPath.replace(/^.*\./, '');
        const imgOutputDes = outputPath + '/' + imgName + '-(converted).jpeg' 
        if (imgExtension === globalVariables.JPEG || imgExtension === globalVariables.JPG) {
            return console.log(chalk.yellow.inverse('Stopped: Image is already in JPEG Format'))
        } else {
            const data = await sharp(imgPath)
                .jpeg({
                    quality: 30,
                    chromaSubsampling: '4:4:4'
                  })
                .toBuffer();
            try {
                fs.writeFileSync(imgOutputDes, data);
                console.log(chalk.green.inverse('Success: Image Coverted to JPEG!'))
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
        console.log(chalk.redBright('Input Path: Should be a dir path (including image name) to your desired image you want to convert'))
        console.log(chalk.redBright('Ouput Path: Should be a dir path where you want to save the new converted image'))
    }
}

module.exports = {
    convertIntoJPEG
}