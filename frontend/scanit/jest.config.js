module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
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
  ],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|svg)$": "identity-obj-proxy",
    "\\.(woff|woff2|ttf|otf|eot)$": "identity-obj-proxy"
  }
}
