/**
 * Created by I326950 on 6/28/2017.
 */
const path = require('path');
const rootPath = path.resolve(__dirname, './');

module.exports = function(env) {
    console.log(`The current environment is ${env}`);

    return require(`${root}/build/webpack.${env}.js`);
};
