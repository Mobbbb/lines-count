const stat = require('./libs')

stat('E:/workspace/vue-admin', {
    extnames: ['vue', 'js', 'ts', 'css', 'sass', 'less', 'html'], // 后缀名
    ingoreDirs: ['.git', 'dist', 'build', 'node_modules', '/src/mock'], // 忽略目录
    ingoreFiles: [ // 忽略文件
        '.eslintrc.js', 
        '.postcssrc.js',
    ],
})
