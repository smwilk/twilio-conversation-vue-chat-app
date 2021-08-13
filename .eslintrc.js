module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2020,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        "indent": [
            "warn",
            "tab",
        ],
        "quotes": [
            "warn",
            "double"
        ],
        "linebreak-style": [
            "warn",
            "unix"
        ],
        "semi": [
            "warn",
            "never"
        ]
    },
};