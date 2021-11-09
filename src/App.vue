<template>
  <div id="app">

    <router-view/>
    
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

interface Foo {
  a: string
  b: number
}
export default Vue.extend({
  name: 'APP'
})
</script>

<style lang="scss" scoped>
// @import "~@/styles/variables.scss";
.text {
  color: $success-color;
}
</style>
