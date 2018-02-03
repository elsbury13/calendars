module.exports = {
  extends: ['./index', '../base/testing'].map(require.resolve),
  env: {
    jest: true,
  },
  globals: {
    afterAll: false,
		beforeAll: false,
  },
}
