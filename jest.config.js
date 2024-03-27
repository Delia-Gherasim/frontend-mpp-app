// module.exports = {
//     roots: ['<rootDir>/src'],
//     testMatch: [
//         '**/__tests__/**/*.+(ts|tsx|js)',
//         '**/?(*.)+(spec|test).+(ts|tsx|js)',
//     ],
//     transform: {
//         '^.+\\.(ts|tsx)$': 'ts-jest',
//     },
// };
// jest.config.js
module.exports = {
    preset: 'react-native',
    setupFiles: ['<rootDir>/jest/setup.js'],
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    transform: {
        '^.+\\.tsx?$': 'babel-jest',
        '^.+\\.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp)$': require.resolve(
            'react-native/jest/assetFileTransformer.js',
        ),
    },
    transformIgnorePatterns: [
        'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
    ],
    globals: {
        'ts-jest': {
            isolatedModules: true,
        },
    },
};
