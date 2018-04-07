// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': 'off',
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e' // for e.returnvalue
      ]
    }],
    
    // allow optionalDependencies
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    'class-methods-use-this': 'off',
    'indent': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-expressions': 'off',
    'no-restricted-syntax': 'off',
    'guard-for-in': 'off',
    'no-console': 'off',
    'global-require': 'off',
    'no-param-reassign': 'off',
    'import/no-dynamic-require': 'off',
    'no-unused-vars': 'off',
  }
}
