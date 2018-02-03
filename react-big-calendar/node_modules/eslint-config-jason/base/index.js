
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
  ],
  env: {
    es6: true,
    node: true,
  },
  globals: {
    cancelAnimationFrame: false,
    clearTimeout: false,
    document: false,
    localStorage: false,
    requestAnimationFrame: false,
    setTimeout: false,
    window: false,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
      impliedStrict: true,
      experimentalObjectRestSpread: true,
    },
  },
  plugins: [
    'import',
  ],
  rules: {
    'global-require': 2,
    'comma-spacing': 2,
    'constructor-super': 2,
    'func-call-spacing': 2,
    'dot-notation': [2, { 'allowKeywords': true }],
    'eol-last': 2,
    'quotes': [2, 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true
    }],

    'no-cond-assign': 0,
    'no-this-before-super': 2,
    'no-trailing-spaces': 2,
    'no-unused-expressions': [2, {
      allowTernary: true,
      allowShortCircuit: true
    }],
    'no-unused-vars': [2, {
      'vars': 'all',
      'args': 'after-used',
      'varsIgnorePattern': '^_$',
      'argsIgnorePattern': '^_$',
    }],

    'import/no-duplicates': 2,
  }
}
