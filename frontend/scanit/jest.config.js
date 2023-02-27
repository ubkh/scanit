module.exports = {
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)"
  ],
  moduleDirectories: [
    'node_modules',
    'utils', // utility folder
     __dirname, // root directory
  ],
  moduleFileExtensions: [
    "js",
    "jsx",
    "ts",
    "tsx"
  ],
  setupFiles: [
    "./jest.setup.js"
  ]
}
