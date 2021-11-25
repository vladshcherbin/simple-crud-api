module.exports = {
  entry: './src/index.js',
  output: {
    path: `${__dirname}/dist`,
    filename: 'server.js',
    chunkFormat: 'module',
    module: true,
    clean: true
  },
  mode: 'production',
  target: 'node16',
  module: {
    rules: [
      {
        test: /\.js$/,
        resolve: {
          fullySpecified: false
        }
      }
    ]
  },
  experiments: {
    outputModule: true
  }
}
