module.exports = {
  env: {
    node: true,
    commonjs: true,
    browser: true,
    es6: true,
    jest: true
  },
  plugins: [
    'react'
  ],
  settings: {
    react: {
      createClass: 'createReactClass',
      pragma: 'React',
      version: 'detect',
      flowVersion: '0.53'
    },
    propWrapperFunctions: [
      'forbidExtraProps',
      {
        property: 'freeze',
        object: 'Object'
      },
      {
        property: 'myFavoriteWrapper'
      }
    ],
    linkComponents: [
      'Hyperlink',
      {
        name: 'Link',
        linkAttribute: 'to'
      }
    ]
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:flowtype/recommended',
    'plugin:react/recommended'
  ],
  rules: {
    'react/prop-types': 'off',
    'no-console': 'off',
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: 'if',
        next: '*'
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'if'
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'return'
      }
    ],
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        shorthandFirst: true,
        noSortAlphabetically: true
      }
    ],
    'react/no-access-state-in-setstate': 'error',
    'react/no-deprecated': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/no-unsafe': 'error',
    'react/prefer-stateless-function': 'error',
    'flowtype/define-flow-type': 2,
    'flowtype/sort-keys': [
      2,
      'asc',
      {
        caseSensitive: true,
        natural: false
      }
    ],
    'flowtype/space-after-type-colon': [2, 'always', { allowLineBreak: true }],
    'jsx-quotes': [
      1,
      'prefer-double'
    ],
    'no-unused-vars': [1, { vars: 'all', args: 'after-used', ignoreRestSiblings: false }]
  }
}
