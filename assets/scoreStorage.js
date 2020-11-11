var RNFS = require('react-native-fs');
var path = RNFS.DocumentDirectoryPath + '/score.txt';

export const writeScore = (score) => {
    RNFS.writeFile(path, score, 'utf8')
        .then((success) => {
            console.log('FILE WRITTEN!');
        })
        .catch((err) => {
            console.log(err.message);
        });
}

export const readScore = async () => {
    return RNFS.readFile(path, 'utf8').then((content) => {
        return content.toString();
    }).catch((err) => {
        return 'noscore';
    });
}
