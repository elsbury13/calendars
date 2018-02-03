module.exports = {
  extends: ['./index', '../base/testing'].map(require.resolve),
  globals: {
    expect: true,
  },
  env: {
    mocha: true,
  }
}
