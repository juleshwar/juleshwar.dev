import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettierRecommended from 'eslint-plugin-prettier/recommended'

// jsx-a11y is registered by eslint-config-next; reuse it for the full recommended set.
const jsxA11y = nextVitals.find((c) => c.plugins?.['jsx-a11y']).plugins['jsx-a11y']

export default [
  { ignores: ['.next/**', '.contentlayer/**', 'public/**', 'next-env.d.ts'] },
  ...nextVitals,
  ...nextTs,
  { rules: jsxA11y.configs.recommended.rules },
  prettierRecommended,
  {
    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['hrefLeft', 'hrefRight'],
          aspects: ['invalidHref', 'preferButton'],
        },
      ],
      'react/prop-types': 0,
      'no-unused-vars': 0,
      'react/no-unescaped-entities': 0,
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
]
