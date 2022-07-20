# lines-count
 基于node的代码行数统计

# Example for app.js
```js
const stat = require('./libs')

stat('E:/workspace/vue-admin', {
    extnames: ['vue', 'js', 'ts', 'css', 'sass', 'less', 'html'], // 统计的文件后缀名
    ingoreDirs: ['.git', 'dist', 'build', 'node_modules', '/src/mock'], // 忽略的目录列表
    ingoreFiles: [ // 忽略的文件列表
        '.eslintrc.js', 
        '.postcssrc.js',
    ],
})
```

# Run serve
```
node app.js
```
