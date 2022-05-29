<template>
  <el-form
    :model="form"
    status-icon
    :rules="rules"
    ref="form"
    label-width="100px"
    class="login-container"
  >
    <h3 class="login-title">登录</h3>
    <el-form-item
      label="用户名"
      label-width="80px"
      prop="username"
      class="username"
    >
      <el-input
        type="input"
        v-model="form.username"
        auto-complete="off"
        placeholder="请输入账号"
      ></el-input>
    </el-form-item>

    <el-form-item label="密码" label-width="80px" prop="password">
      <el-input
        type="password"
        v-model="form.password"
        auto-complete="off"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <el-form-item class="login_submit">
      <el-button type="primary" @click="loginSubmit" class="login_submit"
        >登录</el-button
      >
      <router-link to="/register" class="to_register"
        >没有账号？点击注册</router-link
      >
    </el-form-item>
  </el-form>
</template>

<script>
// 引入登录组件
import { login } from "@/api/data";
export default {
  name: "Login",
  data() {
    return {
      form: {
        // 用户名
        username: "",
        // 密码
        password: "",
      },
      // 校验规则
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    async loginSubmit() {
      const result = await login(this.form);
      if (result.code !== 200) {
        this.$message.error("用户名或密码错误!");
      } else {
        // 在state和Localstorage中设置token
        this.$store.commit("setToken", result.token);
        // 在state和Localstorage中设置用户头像
        this.$store.commit("setAvater", result.avater);
        // 在state和Localstorage中设置用户id
        this.$store.commit("setId", result.id);
        // 在state和Localstorage中设置用户名
        this.$store.commit("setUsername", this.form.username);
        // 跳转首页
        this.$router.push({
          name: "home",
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 150px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login-title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.login_submit {
  margin: 10px auto 0 auto;
  display: flex;
}
</style>