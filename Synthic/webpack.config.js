const glob = require('glob');
const path = require('path');

function getEntries(pattern) {
    const entries = {};
    glob.sync(pattern).forEach((file) => {
        const outputFileKey = path.basename(file);
        entries[outputFileKey] = path.join(__dirname, file);
    });

    return entries;
}

module.exports = {
    entry: getEntries('wwwroot/src/**/*.js'),
    output: {
        path: __dirname + '/wwwroot/js',
        filename: '[name]',
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.js'],
    },
    experiments: {
        topLevelAwait: true,
    },
};