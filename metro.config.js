const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const customConfig = {
  resolver: {
    sourceExts: ['jsx', 'js', 'json', 'ts', 'tsx'],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), customConfig);
