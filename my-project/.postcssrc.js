// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
    "plugins": {
        // to edit target browsers: use "browserslist" field in package.json
        "postcss-import": {},
        "autoprefixer": {},
        "postcss-pxtorem": {
            rootValue: 32,
            unitPrecision: 5,
            propList: ['*'],
            selectorBlackList: ['vux','weui','scrollable'],
            replace: true,
            mediaQuery: false,
            minPixelValue: 12
        }
    }
}
