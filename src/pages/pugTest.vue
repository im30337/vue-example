<template lang="pug">
form
  .form-group
    label(for='exampleFormControlInput1') Email address
    input#exampleFormControlInput1.form-control(type='email', placeholder='name@example.com')
  .form-group
    label(for='exampleFormControlSelect1') Example select
    select#exampleFormControlSelect1.form-control
      option 1
      option 2
      option 3
      option 4
      option 5
  .form-group
    label(for='exampleFormControlSelect2') Example multiple select
    select#exampleFormControlSelect2.form-control(multiple='')
      option 1
      option 2
      option 3
      option 4
      option 5
  .form-group
    label(for='exampleFormControlTextarea1') Example textarea
    textarea#exampleFormControlTextarea1.form-control(rows='3')

</template>

<script>
export default {
  beforeRouteEnter (to, from, next) {
    console.log('beforeRouteEnter')
    next()
  },
    beforeRouteUpdate (to, from, next) {
    console.log('beforeRouteUpdate')
    next()
  },
    beforeRouteLeave (to, from, next) {
    console.log('beforeRouteLeave')
    next()
  }
}
</script>

<style lang="scss" scoped>
</style>