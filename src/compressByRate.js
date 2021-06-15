const fs = require('fs')
const chalk = require('chalk')
const { compress } = require('compress-images/promise');
const utils = require('./utils/utils')

const compressImage = (compressRate, inputPath, outputPath) => {
    try {
        const imgName = utils.GetFilename(inputPath)
        if (!imgName) {
            throw new Error('Error: No Such File or Directory')
        }
        const processImages = async (onProgress) => {
            const result = await compress({
                source: inputPath,
                destination: outputPath,
                onProgress,
                enginesSetup: {
                    jpg: { engine: 'mozjpeg', command: ['-quality', compressRate] },
                    png: { engine: 'pngquant', command: ['--quality=' + compressRate, '-o'] },
                }
            }).then((result) => {
                if (result.statistics[0].percent >= 95) {
                    compressRate += 2
                    console.log('Compress Rate:', compressRate)
                    fs.unlinkSync(result.statistics[0].path_out_new)
                    processImages()
                } else {
                    console.log(chalk.green.inverse('Success: Image Compressed!'))
                    console.log(chalk.green('New Image Dir:', result.statistics[0].path_out_new))
                }
            }).catch((e) => {
                console.log('Error:', e)
            })
            // const { statistics, errors } = result;
        };
        processImages()
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