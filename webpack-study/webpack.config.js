// 这个配置文件，其实是一个 js 文件，通过 node 中的模块操作，向外暴露了一个配置对象

// ----->>> 高版本的 webpack(这里是v4.43.0) 没有配置文件，可能无需再配置？？？

// const path = require('path')

// module.exports = {
//     // 在配置文件中，手动指定 入口 和 出口
//     entry: path.join(__dirname, './src/index.js'),    // 入口，表示要使用 webpack 打包哪个文件
//     output: {
//         //  输出文件相关的配置
//         path: path.join(__dirname, './dist'),   // 指定打包好的文件输出到哪个目录去
//         filename: 'bundle.js'  //这是指定输出的文件的名称
//     }
// }


// ---->>> 一些项目很复杂仍然需要很多配置，高版本 webpack 仍然保留了配置文件

const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
                //  输出文件相关的配置
                path: path.join(__dirname, './dist'),   // 指定打包好的文件输出到哪个目录去
                filename: 'bundle.js'  //这是指定输出的文件的名称
            },
    // output: {
    //     filename: 'bundle.js',
    //     path: path.resolve(__dirname, 'dist')
    // },
    mode: 'development'
}

// --->>> ！！！这里运行 npx webpack --config webpack.json.js 进行配置，有error
// --->>> 直接用 webpack 命令可以