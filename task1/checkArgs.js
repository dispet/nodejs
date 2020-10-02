const ACTION = ['a', 'action'];
const INPUT_FILE = ['i', 'input'];
const OUTPUT_FILE = ['o', 'output'];
const SHIFT = ['s', 'shift'];

const args = require('minimist')(process.argv.slice(2));

function errorHandler(err) {
    if (err) {
        process.stderr.write(err.message + '\n');
        process.exit(1);
    }
}

function getInputFile() {
    return args[INPUT_FILE[0]] || args[INPUT_FILE[1]];
}

function getOutputFile() {
    return args[OUTPUT_FILE[0]] || args[OUTPUT_FILE[1]];
}

function getAction() {
    return args[ACTION[0]] || args[ACTION[1]];
}

function getShift() {
    return args[SHIFT[0]] || args[SHIFT[1]];
}

function validateArgs() {
    const action = getAction(args);

    if (!action) {
        errorHandler(new Error('error: there is no the following required argument: --action'));
    }

    if(action !== 'encode' && action !== 'decode') {
        errorHandler(new Error("error: action should be either 'encode' or 'decode'"));
    }

    const shift = getShift(args);
    if (!shift) {
        errorHandler(new Error('error: there is no the following required argument: --shift'));
    }

    if ((!Number.isInteger(shift)) || (shift < 1)) {
        errorHandler(new Error('error: value of shift must be positive integer'));
    }

    const fs = require('fs');
    let file = getInputFile(args);

    if(!fs.existsSync(file) && !!file){
        errorHandler(new Error(`error: "${file}" is a wrong path to input file`));
    }

    if (file) {
        fs.access(file, fs.constants.R_OK, err => errorHandler( err ? new Error(`error: ${file} is not readable`) : err));
    }

    file = getOutputFile(args);

    if(!fs.existsSync(file) && !!file){
        console.error(`error: "${file}" is a wrong path to output file`);
        process.exit(1);
    }

    if (file) {
        fs.access(file, fs.constants.W_OK, err => errorHandler( err ? new Error(`error: ${file} is not writable`) : err));
    }
}

module.exports = {
    validateArgs,
    getInputFile,
    getOutputFile,
    getAction,
    getShift
};