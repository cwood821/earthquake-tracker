module.exports = {

  entry: {
    Main: "./js/Main.js"
  },
  output: {
    filename: "bundle.js",
    library: 'earthquakeTracker'
  },
  module: {
    loaders: [
      {
        exclude: /(node_modules)/,
        loader: "babel-loader"
      }
    ]
  }

};
