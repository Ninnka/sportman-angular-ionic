module.exports = {
  // 全局变量
  "globals": {
    "$": true,
    "_": true,
    "__dirname": true,
    "angular": true,
    "cordova": true,
    "StatusBar": true
  },
  "root": true,
  // 语言环境选项
  "env": {
    "node": true,
    "browser": true,
    "commonjs": true,
    "es6": true,
    "jquery": true
  },
  // 扩展设置文件
  // 可以从插件中获取布局结构
  // 可以自定义布局结构文件
  // 可以使用"eslint:all"来让当前安装的eslint的所有核心规则生效
  "extends": [
		"eslint:recommended",
    // "eslint:all,"
    // "standard,"
		// "vue,"
		// "plugin:react/recommended,"
	],
  // 解析器选择，默认为Espree解析器，不建议修改
  // 可选择的解析器有“esprima”，"babel-eslint"
  // "parser": "",
  // 解析器选项
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "generators": true,
      "experimentalObjectRestSpread": true
    }
  },
  // 第三方插件
  "plugins": [
		//   "import",
		//   "babel",
		//   "vue",
		//   "eslint-plugin-html"
	],
  // 语法规则
  "rules": {
    "linebreak-style": [
			"error",
			"unix"
		],
    "quotes": [
			"off",
			"double"
		],
    "semi": [
			"error",
			"always"
		],
    "no-redeclare": 0,
    "accessor-pairs": 2,
    "arrow-spacing": 2,
    "block-scoped-var": 2,
    "computed-property-spacing": 2,
    "default-case": 2,
    "dot-location": [
			2,
			"property"
		],
    "eqeqeq": [
			1,
			"smart"
		],
    "func-style": [2, "declaration", {
      "allowArrowFunctions": true
		}],
    "indent": [0, 2, {
      "SwitchCase": 0
		}],
    "space-before-function-paren": ["off", {
      "anonymous": "always",
      "named": "ignore",
      "asyncArrow": "ignore"
		}],
    "no-unused-vars": [0, {
      "vars": "all",
      "args": "after-used"
		}],
    "func-style": 0,
    "max-depth": 2,
    "max-params": [2, 10],
    "new-parens": 2,
    "no-alert": 1,
    "no-array-constructor": 2,
    "no-bitwise": 2,
    "no-caller": 2,
    "no-confusing-arrow": 2,
    "no-console": 0,
    "no-div-regex": 2,
    "no-duplicate-imports": 2,
    "no-else-return": 2,
    "no-empty-label": 0,
    "no-empty": 0,
    "no-eval": 2,
    "no-extend-native": 2,
    "no-extra-bind": 2,
    "no-extra-parens": 2,
    "no-floating-decimal": 2,
    "no-implied-eval": 2,
    "no-inline-comments": 2,
    "no-iterator": 2,
    "no-lone-blocks": 2,
    "no-loop-func": 2,
    "no-mixed-requires": 2,
    "no-nested-ternary": 2,
    "no-new-func": 2,
    "no-new-object": 2,
    "no-new-require": 2,
    "no-new-wrappers": 2,
    "no-new": 2,
    "no-octal-escape": 2,
    "no-path-concat": 2,
    "no-proto": 2,
    "no-restricted-modules": 2,
    "no-return-assign": 2,
    "no-self-compare": 2,
    "no-sequences": 2,
    "no-shadow-restricted-names": 2,
    "no-this-before-super": 2,
    "no-throw-literal": 2,
    "no-trailing-spaces": 2,
    "no-undef-init": 2,
    "no-unneeded-ternary": 2,
    "no-unused-expressions": 2,
    "no-use-before-define": 2,
    "no-useless-call": 2,
    "no-useless-concat": 2,
    "no-void": 2,
    "object-shorthand": 0,
    "operator-assignment": 2,
    "operator-linebreak": 0,
    "prefer-const": 0,
    "prefer-spread": 2,
    "radix": 2,
    "sort-vars": 2,
    "valid-jsdoc": 2,
    "wrap-regex": 2,
    "no-use-before-define": 1,
    "no-loop-func": 1,
    "no-var": 0
    // "babel/arrow-parens": [2, "as-needed"],
    // "babel/generator-star-spacing": [2, "before"]
  },
  // "settings": {
  //     "import/ignore": [
  //         "node_modules",
  //         "\\.(json|css|less|scss|jpg|png|gif|eot|svg|ttf|woff|woff2|mp4|webm)$",
  //         "\\.eslintrc"
  //     ],
  //     "import/extensions": [".js", ".vue"],
  //     "import/resolver": {
  //         "node": {
  //             "extensions": [".js", ".json"]
  //         }
  //     }
  // },
};
