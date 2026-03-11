/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard', 'stylelint-config-tailwindcss'],
  rules: {
    'import-notation': null,
    'custom-property-pattern': null,
    'nesting-selector-no-missing-scoping-root': null,
  },
}
