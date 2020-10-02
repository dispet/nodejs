const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
const ENCRYPTION = 'encode';

const crypto = (text, shift, mode = ENCRYPTION) => {
    if (mode !== ENCRYPTION) {
        shift *= -1;
    }
    return text.split('').map(item => {
        const lowerCaseOfItem = item.toLowerCase();
        const index = alphabet.indexOf(lowerCaseOfItem);
        if (index >= 0) {
            let shiftedIndex = (index + shift) % alphabet.length;
            if (shiftedIndex < 0) {
                shiftedIndex += alphabet.length;
            }

            return String.fromCharCode((item.charCodeAt(0) & 0x20) | (alphabet[shiftedIndex].charCodeAt(0) & 0xdf))
        } else {
            return item;
        }
    }).join('');
};

module.exports = {crypto};