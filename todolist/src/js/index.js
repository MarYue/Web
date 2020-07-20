// 使用localStorage创建一个本地存储的 key/value 元素对
// 存取localStorage中的数据
var store = {
    // 保存数据
    save(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value))    // 这里用JSON.stringify()方法将 JSON 对象转换为 JSON 字符串
    },
    // 获取数据
    fetch(key) {
        return JSON.parse(window.localStorage.getItem(key)) || []     // 读取之后用 JSON.parse() 方法将 JSON 字符串转换为 JSON 对象
    }
}

// list 取出所有的值
var list = store.fetch("storeData")

// 创建Vue 实例
var vm = new Vue({
    el: '#app',
    data: {
        list,
        todo: '',
        //unCompleted: 0,
        editTasks: '',    // 记录正在编辑的任务
        beforeTitle: '',    // 记录正在编辑的数据的title
        visibility: 'all'   // 通过这个属性值的变化对数据进行分类
    },
    watch: {
        // 下面这种方法是浅监听
        // list: function () { 
        //     // 监控list属性，当这个属性发生变化就会执行函数
        //     store.save("storeData", this.list)
        // }

        // 下面是深度监听。监听器会一层层向下遍历，给对象的所有属性都加上这个监听器。但是这样的开销很大。。
        list: {
            handler: function (){
                store.save("storeData", this.list)
            },
            deep: true
        }
    },
    methods: {
        addTask(task) {     // 向list中添加一项任务
            //事件处理函数中的 this 指向的是当前这个根实例
            if(this.todo === "") {
                return
            }
            this.list.push({
                title: this.todo,
                isComplete: false
            })
            this.todo = ''
        },

        delTask(item) {    // 删除任务
            var index = this.list.indexOf(item)
            this.list.splice(index, 1)
        },

        editTask(item) {    // 编辑任务
            // 编辑时要记得记录编辑前的值
            this.beforeTitle = item.title
            this.editTasks = item
        },

        editEnd() {     // 编辑完成
            this.editTasks = ''
        },

        cancelEdit(item) {  // 取消编辑
            item.title = this.beforeTitle
            this.beforeTitle = ''
            this.editTasks = ''
        }
    },

    derectives: {   // vue 中这个属性可以用来自定义指令
        'focus': {
            update(el, binding) {
                if(binding.value) {
                    el.focus();
                }
            }
        }
    },

    computed: {
        unCompleted() {
            return this.list.filter(item => {
                return !item.isComplete
            }).length
        },
        filterData() {
            // 过滤任务数据，进行分类
            var filter = {
                all: function(list) {
                    return list
                },
                completed: function (list) { 
                    return list.filter(item => {
                        return item.isComplete
                    })
                },
                unCompleted: function (list) { 
                    return list.filter(item => {
                        return !item.isComplete
                    })
                 }
            }

            // 如果找到了过滤函数，就返回过滤后的数据，如果没有就返回所有数据
            return filter[this.visibility] ? filter[this.visibility](list) : list
        }
    }


})

function hashFn() { 
    var hash = window.location.hash.slice(1)   // hash中带"#"号，用 slice() 方法去掉"#"
    vm.visibility = hash
}
hashFn()
window.addEventListener('hashchange', hashFn)