const {dataTransformation} = require('./task1/data-transform');
const {getOutputFile, getInputFile, validateArgs} = require('./task1/checkArgs');

validateArgs();
dataTransformation(getInputFile(), getOutputFile()); 