<template>
  <el-form
    :model="form"
    status-icon
    :rules="rules"
    ref="form"
    label-width="100px"
    class="register-container"
  >
    <h3 class="register-title">注册</h3>
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

    <el-form-item label="邮箱" label-width="80px" prop="email" class="email">
      <el-input
        type="input"
        v-model="form.email"
        auto-complete="off"
        placeholder="请输入邮箱"
      ></el-input>
    </el-form-item>
    <el-form-item
      label="密码"
      label-width="80px"
      prop="password"
      class="password"
    >
      <el-input
        type="password"
        v-model="form.password"
        auto-complete="off"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>

    <el-form-item
      label="确认密码"
      label-width="80px"
      prop="checkPass"
      class="checkPass"
    >
      <el-input
        type="password"
        v-model="form.checkPass"
        autocomplete="off"
        placeholder="请再次输入密码"
      ></el-input>
    </el-form-item>
    <el-form-item class="register_submit">
      <el-button
        type="primary"
        @click="register('form')"
        class="register_submit"
        >注册</el-button
      >
      <router-link to="/login" class="to_login">已有账号？点击登录</router-link>
    </el-form-item>
  </el-form>
</template>

<script>
// 引入 校验用户名接口 注册接口
import { validate, register } from "@/api/data";
export default {
  name: "Register",
  data() {
    // 校验用户名
    const validateName = async (rule, value, callback) => {
      if (rule.required && !value) {
        return callback(new Error("用户名不能为空"));
      }
      // 发送请求，判断用户名是否存在
      const result = await validate(this.form.username);
      if (result.code != 200) {
        callback(new Error(result.msg));
      } else {
        callback();
      }
    };
    // 校验邮箱
    const validateEmail = (rule, value, callback) => {
      // 定义校验规则正则表达式
      const mal =
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (rule.required && !value) {
        return callback(new Error("邮箱不能为空"));
      }
      if (value) {
        // 正则匹配
        if (!mal.test(value)) {
          callback(new Error("请输入正确邮箱"));
        } else {
          callback();
        }
      }
    };
    // 确认密码
    const validatePass = (rule, value, callback) => {
      if (rule.required && !value) {
        callback(new Error("请输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: "",
        email: "",
        password: "",
        // 确认密码
        checkPass: "",
        avater: "",
      },
      sec: 3,
      rules: {
        username: [
          {
            required: true,
            validator: validateName,
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            min: 6,
            message: "密码不能小于6位",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            validator: validateEmail,
            trigger: "blur",
          },
        ],
        checkPass: [
          {
            required: true,
            validator: validatePass,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    register(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 设置默认头像， 地址是服务器地址头像静态资源路径
          this.form.avater = "http://47.113.230.146:3000/static/avater/default.jpg";
          // this.form.avater = "http://localhost:3000/static/avater/default.jpg";
          const result = await register(this.form);
          // 设置定时器，注册成功三秒后跳转登录页
          setTimeout(() => {
            this.$router.push({
              name: "login",
            });
          }, 3000);
          this.$message({
            dangerouslyUseHTMLString: true,
            message: `<span>${result.msg},3秒后跳转登录页</span>`,
          });
        } else {
          console.log("注册失败！");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 100px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.register-title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.register_submit {
  margin: 10px auto 0 auto;
  display: flex;
}
</style>