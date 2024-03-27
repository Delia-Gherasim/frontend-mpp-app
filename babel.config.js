// babel.config.js

// module.exports = function (api) {
//     api.cache(true);

//     const presets = [
//         '@babel/preset-env',
//         '@babel/preset-typescript',
//         '@babel/preset-react',
//     ];

//     return {
//         presets,
//     };
// };
module.exports = {
    presets: [
        ['@babel/preset-env', {targets: {node: 'current'}}],
        '@babel/preset-typescript',
        '@babel/preset-react',
    ],
    plugins: ['@babel/plugin-transform-flow-strip-types'],
};
