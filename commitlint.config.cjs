module.exports = {
    extends: ["@commitlint/config-conventional"],
    rules: {
        "type-enum": [2, "always", ["build", "docs", "feat", "fix", "perf", "refactor", "revert", "style", "test"]],
        "scope-enum": [2, "always", ["col", "dev"]],
    },
    parserPreset: {
        parserOpts: {
            headerPattern: /^(\w*)\(([\w-]*)\)\[(\w*)\]!?:\s(add|fix|update|test|change|remove|panic)\s([a-z0-9\s-#@.-_]*)$/,
            headerCorrespondence: ["type", "scope", "issue-id", "subjectprefix", "subject"],
        },
    },
};
