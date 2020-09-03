// 这是项目的 JS 入口文件

// 1.导入 jquery
// import *** from *** 是 ES6 中导入模块的方式。浏览器解析不了，下面这行会报错
import $ from 'jquery'  // const $ = require('jquery')

$(function () { 
    $('li:odd').css('backgroundColor', 'skyblue')
    $('li:even').css('backgroundColor', 'pink')
    // $('li:even').css('backgoundColor', function () {
    //     return '#' + '666666'
    // })
 })