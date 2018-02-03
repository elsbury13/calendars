module.exports = {
  extends: ['./base'].map(require.resolve),
  settings: {
    'import/resolver': 'webpack',
    'import/ignore': [
      'node_modules',
      '\.(scss|less|css|png|gif|jpg)$'
    ]
  }
}
