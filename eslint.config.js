module.exports = {
    "extends": ["prettier", "react-app", "plugin:import/errors", "plugin:import/warnings"],
    "env": {
        "jest": true
    },
    "globals": {
        "document": true,
        "css": true
    },
    "parse": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "./tsconfig.json",
        "tsconfigRootDir": __dirname,
        "ecmaVersion": 6,
        "sourceType": "module",
        "allowImportExportEverywhere": false,
        "ecmaFeatures": {
            "globalReturn": false,
            "jsx": true,
            "modules": true,
            "experimentalObjectRestSpread": true
        }
    },
    "plugins": ["@typescript-eslint"],
    "rules": {
        "react/destructuring-assignment": "off",
        "no-nested-ternary": "off",
        "react/jsx-props-no-spreading": "off",
        "react/prop-types": "off",
        "react/prefer-stateless-function": ["error", { "ignorePureComponents": true }],
        "import/prefer-default-export": "off",
        "react/no-unescaped-entities": 0,
        "comma-dangle": 0,
        "react/jsx-uses-vars": 1,
        "react/display-name": 1,
        "no-unused-vars": "warn",
        "no-console": 1,
        "no-unexpected-multiline": "warn",
        "import/no-unresolved": "off",
        "arrow-body-style": ["error", "as-needed"],
        "react/jsx-filename-extension": [
            1,
            {
                "extensions": [".ts", ".tsx"]
            }
        ]
    },
    "overrides": [
        {
            files: ["*.ts", "*.tsx"],
            extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
            parser: "@typescript-eslint/parser",
            plugins: ["@typescript-eslint"]
        }
    ],
    "settings": {
        "import/resolver": {
            "node": {
                extensions: [".js", ".jsx", ".ts", ".tsx"],
                moduleDirectory: ["node_modules", "src/"]
            }
        }
    }
}