/** @type {import('lint-staged').Config} */
module.exports = {
  "*.{js,jsx,ts,tsx,md,json}": [
    "biome format --write",
    "biome lint --apply"
  ]
};
