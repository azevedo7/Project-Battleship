const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js', // Replace with your entry file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html', // Path to your HTML template file
      filename: 'index.html', // Output HTML filename in the 'dist' folder
    }),
  ],
};
