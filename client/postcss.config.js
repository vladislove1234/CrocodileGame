module.exports = {
  ident: `postcss`,
  sourceMap: true,
  plugins: [
    require(`autoprefixer`),
    require(`css-mqpacker`),
  ],
};
