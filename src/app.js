const fs = require('fs')
const yargs = require('yargs')
const chalk = require('chalk')
const resize = require('./resize')
const compressByRate = require('./compressByRate')
const compressBySize = require('./compressBySize')
const compressBySharp = require('./compressBySharp')
const toJPEG = require('./toJPEG')
const toPNG = require('./toPNG')
const { toDataURL, toBlob } = require('./changeDPI')

//customize app version using yargs
yargs.version('1.0.0')

//Resize Command:
yargs.command({
    command: 'resize',
    describe: 'Add new dimensions (width x height) and source & destination path of your image',
    builder: {
        width: {
            describe: 'New Width',
            required: true,
            type: 'number'
        },
        height: {
            describe: 'New Height',
            required: true,
            type: 'number'
        },
        inputPath: {
            describe: 'Image Source Path',
            required: true,
            type: 'string'
        },
        outputPath: {
            describe: 'Image Destination Path',
            required: true,
            type: 'string'
        }
    },
    handler(argv) {
        if (!argv.width || !argv.height || argv.width <= 0 || argv.height <= 0) {
            console.log(chalk.red.inverse('Error: Invalid Image Dimensions: (' + argv.width, 'x', argv.height + ')'))
        } else if ((!argv.inputPath || !argv.outputPath || argv.inputPath === "" || argv.outputPath === "")) {
            console.log(chalk.red.inverse('Error: I/O paths cannot be empty'))
        } else if (!(fs.existsSync(argv.inputPath))) {
            console.log(chalk.red.inverse('Error: Invalid Src Path, No such file or directory'))
            console.log(chalk.redBright('Image_Src_Path: "' + argv.inputPath + '"'))
        } else if (!(fs.existsSync(argv.outputPath) && fs.lstatSync(argv.outputPath).isDirectory())) {
            console.log(chalk.red.inverse('Error: Invalid Destination Path, No such directory'))
            console.log(chalk.redBright('Image_Destination_Path: "' + argv.outputPath + '"'))
        } else {
            resize.resizeImage(argv.width, argv.height, argv.inputPath, argv.outputPath)
        }
    }
})

//CompressByRate Command:
yargs.command({
    command: 'compressByRate',
    describe: 'Add source & destination path of your image',
    builder: {
        inputPath: {
            describe: 'Image Source Path',
            required: true,
            type: 'string'
        },
        outputPath: {
            describe: 'Image Destination Path',
            required: true,
            type: 'string'
        },
        rate: {
            describe: 'Add Compression Rate (by default: 1)',
            default: 1,
            type: 'number'
        }
    },
    handler(argv) {
        if ((!argv.inputPath || !argv.outputPath || argv.inputPath === "" || argv.outputPath === "")) {
            console.log(chalk.red.inverse('Error: I/O paths cannot be empty'))
        } else if (!(fs.existsSync(argv.inputPath))) {
            console.log(chalk.red.inverse('Error: Invalid Src Path, No such file or directory'))
            console.log(chalk.redBright('Image_Src_Path: "' + argv.inputPath + '"'))
        } else if (!(fs.existsSync(argv.outputPath) && fs.lstatSync(argv.outputPath).isDirectory())) {
            console.log(chalk.red.inverse('Error: Invalid Destination Path, No such directory'))
            console.log(chalk.redBright('Image_Destination_Path: "' + argv.outputPath + '"'))
        } else if (!argv.rate || argv.rate <= 0 || argv.rate > 10) {
            console.log(chalk.red.inverse('Compression Rate value is invalid - it should be in range (1-10)'))
        } else {
            compressByRate.compressImage(argv.rate, argv.inputPath, argv.outputPath)
        }
    }
})

//CompressBySize Command:
yargs.command({
    command: 'compressBySize',
    describe: 'Add source & destination path of your image',
    builder: {
        inputPath: {
            describe: 'Image Source Path',
            required: true,
            type: 'string'
        },
        outputPath: {
            describe: 'Image Destination Path',
            required: true,
            type: 'string'
        },
        size: {
            describe: 'Add size in kilo bytes (kb), in which you want to compress your image',
            required: true,
            type: 'number'
        }
    },
    handler(argv) {
        if ((!argv.inputPath || !argv.outputPath || argv.inputPath === "" || argv.outputPath === "")) {
            console.log(chalk.red.inverse('Error: I/O paths cannot be empty'))
        } else if (!(fs.existsSync(argv.inputPath))) {
            console.log(chalk.red.inverse('Error: Invalid Src Path, No such file or directory'))
            console.log(chalk.redBright('Image_Src_Path: "' + argv.inputPath + '"'))
        } else if (!(fs.existsSync(argv.outputPath) && fs.lstatSync(argv.outputPath).isDirectory())) {
            console.log(chalk.red.inverse('Error: Invalid Destination Path, No such directory'))
            console.log(chalk.redBright('Image_Destination_Path: "' + argv.outputPath + '"'))
        } else if (!argv.size || argv.size <= 0) {
            console.log(chalk.red.inverse('Compression Size value is invalid'))
        } else {
            compressBySize.compressImage(argv.size, argv.inputPath, argv.outputPath)
        }
    }
})

//CompressBySharp Command:
yargs.command({
    command: 'compressBySharp',
    describe: 'Add source & destination path of your image',
    builder: {
        inputPath: {
            describe: 'Image Source Path',
            required: true,
            type: 'string'
        },
        outputPath: {
            describe: 'Image Destination Path',
            required: true,
            type: 'string'
        }
    },
    handler(argv) {
        if ((!argv.inputPath || !argv.outputPath || argv.inputPath === "" || argv.outputPath === "")) {
            console.log(chalk.red.inverse('Error: I/O paths cannot be empty'))
        } else if (!(fs.existsSync(argv.inputPath))) {
            console.log(chalk.red.inverse('Error: Invalid Src Path, No such file or directory'))
            console.log(chalk.redBright('Image_Src_Path: "' + argv.inputPath + '"'))
        } else if (!(fs.existsSync(argv.outputPath) && fs.lstatSync(argv.outputPath).isDirectory())) {
            console.log(chalk.red.inverse('Error: Invalid Destination Path, No such directory'))
            console.log(chalk.redBright('Image_Destination_Path: "' + argv.outputPath + '"'))
        } else {
            compressBySharp.compressImage(argv.inputPath, argv.outputPath)
        }
    }
})

//toJPEG Command:
yargs.command({
    command: 'toJPEG',
    describe: 'Add source & destination path of your image',
    builder: {
        inputPath: {
            describe: 'Image Source Path',
            required: true,
            type: 'string'
        },
        outputPath: {
            describe: 'Image Destination Path',
            required: true,
            type: 'string'
        }
    },
    handler(argv) {
        if ((!argv.inputPath || !argv.outputPath || argv.inputPath === "" || argv.outputPath === "")) {
            console.log(chalk.red.inverse('Error: I/O paths cannot be empty'))
        } else if (!(fs.existsSync(argv.inputPath))) {
            console.log(chalk.red.inverse('Error: Invalid Src Path, No such file or directory'))
            console.log(chalk.redBright('Image_Src_Path: "' + argv.inputPath + '"'))
        } else if (!(fs.existsSync(argv.outputPath) && fs.lstatSync(argv.outputPath).isDirectory())) {
            console.log(chalk.red.inverse('Error: Invalid Destination Path, No such directory'))
            console.log(chalk.redBright('Image_Destination_Path: "' + argv.outputPath + '"'))
        } else {
            toJPEG.convertIntoJPEG(argv.inputPath, argv.outputPath)
        }
    }
})

//toPNG Command:
yargs.command({
    command: 'toPNG',
    describe: 'Add source & destination path of your image',
    builder: {
        inputPath: {
            describe: 'Image Source Path',
            required: true,
            type: 'string'
        },
        outputPath: {
            describe: 'Image Destination Path',
            required: true,
            type: 'string'
        }
    },
    handler(argv) {
        if ((!argv.inputPath || !argv.outputPath || argv.inputPath === "" || argv.outputPath === "")) {
            console.log(chalk.red.inverse('Error: I/O paths cannot be empty'))
        } else if (!(fs.existsSync(argv.inputPath))) {
            console.log(chalk.red.inverse('Error: Invalid Src Path, No such file or directory'))
            console.log(chalk.redBright('Image_Src_Path: "' + argv.inputPath + '"'))
        } else if (!(fs.existsSync(argv.outputPath) && fs.lstatSync(argv.outputPath).isDirectory())) {
            console.log(chalk.red.inverse('Error: Invalid Destination Path, No such directory'))
            console.log(chalk.redBright('Image_Destination_Path: "' + argv.outputPath + '"'))
        } else {
            toPNG.convertIntoPNG(argv.inputPath, argv.outputPath)
        }
    }
})

//From a Canvas Element to DataUrl Command:
yargs.command({
    command: 'toDataURL',
    describe: 'Add canvas width & canvas height of your image',
    builder: {
        canvasWidth: {
            describe: 'Add Image Width (Canvas)',
            required: true,
            type: 'number'
        },
        canvasHeight: {
            describe: 'Add Image Height (Canvas)',
            required: true,
            type: 'number'
        }
    },
    handler(argv) {
        toDataURL.toDataURL(argv.canvasWidth, argv.canvasHeight)
    }
})

//From a Canvas Element to Blob Command:
yargs.command({
    command: 'toBlob',
    describe: 'Add canvas width & canvas height of your image',
    builder: {
        canvasWidth: {
            describe: 'Add Image Width (Canvas)',
            required: true,
            type: 'number'
        },
        canvasHeight: {
            describe: 'Add Image Height (Canvas)',
            required: true,
            type: 'number'
        }
    },
    handler(argv) {
        toBlob.toBlob(argv.canvasWidth, argv.canvasHeight)

    }
})

yargs.parse()