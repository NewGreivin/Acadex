import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      // El proyecto consume la API con fetch() dentro de useEffect (tal
      // como pide el laboratorio), por lo que esta regla, pensada para
      // empujar hacia librerías de data-fetching, se deja como advertencia.
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
])
