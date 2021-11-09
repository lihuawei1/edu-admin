<template>
  <div class="login">
    <el-form
      class="login-from"
      ref="form"
      :rules="rules"
      :model="form"
      label-width="80px"
      label-position="top"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-btn"
          type="primary"
          @click="onSubmit"
          :loading="isLoginloading"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { login } from '@/services/user'
import request from "@/utils/request";
import qs from "qs";
import { Form } from "element-ui";
export default Vue.extend({
  name: "LoginIndex",
  data() {
    return {
      form: {
        phone: "",
        password: "",
      },
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { pattern:/^1\d{10}/,message:'请输入正确得手机号', trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" },
        ],
      },
      isLoginloading: false,
    };
  },
  methods: {
    async onSubmit() {
      try {
        await (this.$refs['form'] as Form).validate()
        this.isLoginloading = true;
        console.log(login(this.form))
        const { data }:any = await login(this.form)
        console.log(data,'1122')
        if (data.state != "1") {
         this.$message.warning(data.message);
        }else {
          //1.登录成功，记录登录状态，状态需要能够全局访问（放到vueX里面）
           this.$store.commit('setUser',data.content)
           //2.然后在访问需要登录得页面的时候判断有没有登录状态（路由拦截）
           //成功：跳转首页
          //  this.$router.push({
          //  name: "home",
          // });
          this.$router.push(this.$route.query.redirect as string || '/')
          this.$message.success("登录成功");
        }
       
      } catch (err) {
        console.log("登录失败", err);
      }
      this.isLoginloading = false;
    },
  },
});
</script>
<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-from {
    width: 300px;
    background: #fff;
    padding: 20px;
    border-radius: 5px;
  }
  .login-btn {
    width: 100%;
  }
}
</style>