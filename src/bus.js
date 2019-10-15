import Vue from 'vue'

var EventBus = new Vue()

Object.defineProperties(Vue.prototype, {
    $bus: {
        get() {
            return EventBus
        }
    }
})

export default EventBus

//獨立分一個Vue實體來管理的方法
//要用到的元件都需引用
// export default new Vue()