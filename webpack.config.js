const { resolve } = require('path');
const { DefinePlugin } = require('webpack');
const { Configuration } = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

/**
 * Create a webpack configuration for a specific side
 * @param {string} side
 * @param {Record<string, string>} variables
 * @param {boolean} isProduction
 * @returns {Configuration}
 */
const createConfig = (side, variables, isProduction) => {
    return {
        entry: `./src/${side}/index.ts`,
        target: 'node',
        output: {
            filename: `${side}.js`,
            path: resolve(__dirname, 'build'),
        },
        resolve: {
            extensions: ['.ts', '.js', '.json'],
            alias: {
                '@public/*': [resolve(__dirname, './src/*')],
                '@core/*': [resolve(__dirname, './src/core/*')],
            },
            plugins: [new TsconfigPathsPlugin({
                configFile: resolve(__dirname, 'tsconfig.json'),
            })],
        },
        plugins: [
            new DefinePlugin({ ...variables, IS_PRODUCTION: isProduction }),
            new FilterWarningsPlugin({
                exclude: [
                    /mongodb/, /mssql/, /mysql/, /mysql2/,
                    /oracledb/, /redis/, /sqlite3/, /sql.js/,
                    /react-native-sqlite-storage/
                ]
            })
        ],
        externals: {
            typeorm: 'commonjs typeorm'
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'swc-loader',
                        options: {
                            jsc: {
                                parser: {
                                    syntax: 'typescript',
                                    tsx: true,
                                    decorators: true,
                                },
                                transform: {
                                    optimizer: {
                                        simplify: true,
                                        globals: {
                                            vars: {
                                                ...variables,
                                                IS_PRODUCTION: JSON.stringify(isProduction),
                                            },
                                        }
                                    },
                                },
                                target: 'es2020',
                                baseUrl: resolve(__dirname, '.'),
                                paths: {
                                    '@public/*': [resolve(__dirname, 'src/*')],
                                    '@core/*': [resolve(__dirname, 'src/core/*')],
                                },
                            },
                            sourceMaps: !isProduction,
                            minify: isProduction,
                        },
                    },
                },
                {
                    test: /\.json$/,
                    type: 'json',
                },
            ],
        },
    };
};

module.exports = (env, argv) => {
    console.log(`Building with env ${JSON.stringify(env)} and argv ${JSON.stringify(argv)}`);
    const serverConfig = createConfig(
        'server', {
        IS_SERVER: 'true',
        IS_CLIENT: 'false'
    }, argv.mode === 'production'
    );
    const clientConfig = createConfig(
        'client', {
        IS_SERVER: 'false',
        IS_CLIENT: 'true',
    }, argv.mode === 'production'
    );

    return [serverConfig, clientConfig];
};