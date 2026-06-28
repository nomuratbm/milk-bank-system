const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

const { transformer, resolver } = config;

// 1. Add the SVG transformer config
config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer/expo")
};

// 2. Adjust resolver to handle .svg files as source code instead of raw assets
config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"]
};

// 3. Export with your NativeWind wrapper intact
module.exports = withNativeWind(config, { input: "./global.css" });