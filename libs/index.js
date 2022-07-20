const fs = require('fs')
const path = require('path')

async function stat(rootPath, { extnames = [], ingoreDirs = [], ingoreFiles = [] } = {}) {
    const total = {
        path: '总计',
        length: 0,
        comment: 0,
        commentRatio: 1
    }
    // 统计结果
    const result = []

    /**
     * @description 对指定文件进行统计，包括获取文件行数、注释及计算注释率
     * @param {String} path 文件路径
     */
    async function count(path) {
        const rep = await fs.readFileSync(path).toString()
        const lines = rep.split('\n')

        // 匹配出注释的行数
        const commentNum = lines.filter(line => new RegExp('^(//|/\\*|\\*|\\*/)', 'g').test(line.trimStart())).length

        let logPath = path.replace(rootPath, '')
        if (logPath.length > 60) {
            const logPathArr = logPath.split('/').filter(item => item)
            if (logPathArr.length > 2) {
                logPath = `/${logPathArr[0]}/.../${logPathArr[logPathArr.length - 2]}/${logPathArr[logPathArr.length - 1]}`
            } else {
                logPath = `/.../${logPathArr[1]}`
            } 
        }

        result.push({
            path: logPath,
            length: lines.length,
            comment: commentNum,
            commentRatio: (Math.round(commentNum/lines.length * 10000) / 100) + '%'
        })

        updateTotal(lines.length, commentNum)
    }

    /**
     * @description 更新总计信息
     * @param {number} length 新增行数
     * @param {number} comment 新增注释
     */
    function updateTotal(length, comment) {
        total.length += length
        total.comment += comment
        total.commentRatio = (Math.round(total.comment/total.length * 10000) / 100) + '%'
    }

    /**
     * @description 递归统计所有文件夹
     * @param {String} innerPath 
     */
    async function start(innerPath) {
        fs.readdirSync(innerPath).map(file => `${innerPath}/${file}`).forEach(file => {
            const stat = fs.statSync(file)
            // 是文件夹就递归
            if (stat.isDirectory()) {
                if (indexOfArr(ingoreDirs, file)) return
                return start(file)
            }
            // 是文件并且后缀名符合就执行统计
            const extname = path.extname(file).split('.')[1] || ''
            if (extnames.includes(extname) && !indexOfArr(ingoreFiles, file)) count(file)
        })
    }

    function indexOfArr(arr, str) {
        let flag = false
        for (let i = 0; i < arr.length; i++) {
            if (str.indexOf(arr[i]) > -1) {
                flag = true
                break
            }
        }
        return flag
    }

    await start(rootPath)
    result.push(total)
    console.table(result)
}

module.exports = stat
