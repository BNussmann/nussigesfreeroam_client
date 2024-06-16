/* eslint-disable @typescript-eslint/no-var-requires */
const {join} = require('path')

module.exports = {
    chainWebpack: config => {
        config.module.rule('vue')
        config
            .plugin('html')
            .tap(args => {
                args[0].template = './public/index.html'
                return args
            })
    },

    outputDir: join(__dirname, "./output"),
    publicPath: './',
    indexPath: 'index.html',

    devServer: {
        port: 8080,
        open: true
    },

    pluginOptions: {
      vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
    }
}
