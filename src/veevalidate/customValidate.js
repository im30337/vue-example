import { Validator } from 'vee-validate'

//只有中文字串校驗
Validator.extend('onlyCN', {
    getMessage: field => field + '只能有中文',
    validate: value => {
        return !/[^\u4E00-\u9FA5]/g.test(value)
    }
})

//11位手機號碼校驗
Validator.extend('isMobile', {
    getMessage: field => field + '必須是11位手機號碼',
    validate: value => {
        return value.length === 11 && !/[^\d]/g.test(value)
    }
});

export default Validator