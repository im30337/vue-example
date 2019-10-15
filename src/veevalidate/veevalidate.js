import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zhTWValidate from 'vee-validate/dist/locale/zh_TW'
// 自定義規則
import Validator from './customValidate'
Validator.localize(zhTWValidate)

const config = {
    locale: 'zh_TW',
    fieldsBagName: 'fieldBags'
}

// 自訂義提示
const dictionary = {
    zh_TW: {
        messages: {
            required: (field) => '請輸入' + field,
            number: (field) => field + '必須為數字',
            email: (field) => field + '格式不符',
            numeric:(field) => field + '只能是數字',
            alpha:(field) => field + '只能是英文',
            onlyCN:(field) => field + '只能有中文',
            isMobile:(field) => field + '必須為11位手機號碼' 
            //   url: () => '請輸入正確格式的伺服器地址',
            //   ip: () => '請輸入正確的ip地址'
        },
        attributes: {
            ip: 'IP地址',
            httpPort: 'HTTP接口'
        }
    }
}
Validator.localize(dictionary)
Vue.use(VeeValidate, config)