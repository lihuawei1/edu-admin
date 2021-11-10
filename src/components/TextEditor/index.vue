<template>
    <div ref="editor" class="text-editor">

    </div>
</template>
<script lang='ts'>
import Vue from 'vue'
import E from 'wangeditor'
export default Vue.extend({
    name: 'TextEditor',
    props: {
      value: {
          type: String,
          default: ''
      }
    },
    mounted(){
       this.initEditor()
    },
    methods: {
        initEditor () {
            const editor = new E(this.$refs.editor as any)
        //注意：事件监听必须在creat之前
         editor.config.onchange = function (value:any) {
          console.log("change 之后最新的 html", value);
          (this as any).$emit('input',value)
        };
        // 或者 const editor = new E( document.getElementById('div1') )
        editor.create()
        //注意：设置初始化必须在creat之后
        editor.txt.html(this.value)
        }
    }
})
</script>
<style lang='scss' scoped>

</style>
