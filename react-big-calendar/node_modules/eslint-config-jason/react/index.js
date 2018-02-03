
let base = ['../base'].map(require.resolve);

module.exports = {
  extends: base.concat([
    'plugin:import/react',
  ]),
  plugins: [
    'react',
  ],
  rules: {
    'react/display-name': 0,
    'react/no-multi-comp': 0,
    'react/jsx-no-undef': 2,
    'react/jsx-uses-react': 2,
    'react/react-in-jsx-scope': 2,
    'react/jsx-wrap-multilines': 2,
    'react/jsx-uses-vars': 2,
    'react/prop-types': [2, {
      'ignore': [
        'children',
        'className',
        'style'
      ]
    }],
  }
}
