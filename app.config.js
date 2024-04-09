module.exports = ({ config }) => {
  // console.log(config.android.config.googleMaps);
  config.android.config.googleMaps.apiKey = process.env.GOOGLE_MAPS_KEY;
  // console.log(config.android.config.googleMaps);
  return {
    ...config,
  };
};
