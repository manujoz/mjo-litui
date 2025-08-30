module.exports = {
    extends: ["@commitlint/config-conventional"],
    rules: {
        "type-enum": [2, "always", ["build", "docs", "feat", "fix", "perf", "refactor", "revert", "style", "test"]],
    },
    parserPreset: {
        parserOpts: {
            headerPattern: /^(\w*)\((MJOLIT-[0-9]*)\)!?:\s(add|fix|update|test|change|remove|panic|close)\s([a-z0-9\s-#@.-_,]*)$/,
            headerCorrespondence: ["type", "issue-id", "subjectprefix", "subject"],
        },
    },
};
