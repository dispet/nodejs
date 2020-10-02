const {getAction, getShift} = require('./checkArgs');
const {crypto} = require('./caesar');

const stream = require('stream');
const coder = new stream.Transform({objectMode: true});

coder._transform = function (chunk, encoding, done) {
    try {
        done(null, crypto(chunk.toString(), getShift(), getAction()));
    } catch (e) {
        done(e);
    }
};

module.exports = {coder};