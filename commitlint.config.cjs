module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'refactor',
        'hotfix',
        'fix',
        'chore',
        'docs',
        'test',
        'style',
        'ci',
      ],
    ],
  },
};
