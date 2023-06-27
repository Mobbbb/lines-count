const stat = require('./libs')

stat('E:/workspace/sourcetree/message-board', {
    extnames: ['vue', 'js', 'ts', 'css', 'sass', 'less', 'html'], // 统计的文件后缀名
    ingoreDirs: ['.git', 'dist', 'build', 'node_modules'], // 忽略的目录列表
    ingoreFiles: [ // 忽略的文件列表
        '.eslintrc.js', 
        '.postcssrc.js',
        'mock.js',
    ],
})
