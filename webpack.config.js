const path = require('path');

module.exports = function (env) {
    return {

        mode: env || 'production',
        entry: './sharepoint-peoplepicker.ts',
        output: {
            filename: 'sharepoint-peoplepicker.js',
            path: path.resolve(__dirname, 'dist'),
            library: 'sharepoint-peoplepicker',
            libraryTarget: 'umd',
        },
        devtool: 'source-map',
        resolve: {
            extensions: ['.js', '.ts']
        },
        module: {
            rules: [
                { test: /\.ts$/, loader: 'ts-loader', include: [__dirname] }
            ]
        }
    };
};