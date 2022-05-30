<template>
  <div class="common_header">
    <span class="title">Welcome</span>

    <div class="menu">
      <router-link to="/home">首页</router-link>
      <router-link to="/blog">写博客</router-link>
    </div>
    <!-- 判断是否有token，如果有则显示用户头像，如果没有则显示登录两个字 -->
    <div class="login_tip" v-if="!token">
      <router-link to="/login">登录</router-link>
    </div>
    <div class="user" v-if="token">
      <el-dropdown @command="handleCommand">
        <img ref="img" :src="avater" />

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="user">个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  name: "CommonHeader",
  data() {
    return {
      // 获得token
      token: this.$store.state.user.token || localStorage.getItem("token"),
      // 获得用户头像地址
      avater: this.$store.state.user.avater || localStorage.getItem("avater"),
      // 获得用户名
      username:
        this.$store.state.user.username || localStorage.getItem("username"),
    };
  },
  methods: {
    // 处理下拉菜单中的指令
    handleCommand(command) {
      // 判断指令是否为用户中心
      if (command === "user") {
        // 防止路由页面重复跳转报错
        if (this.username != this.$route.params.username) {
          // 跳转到用户中心
          this.$router.push({
            name: "userCenter",
            params: {
              username: this.username,
            },
          });
        }
        // 判断指令是否为登出
      } else if (command === "logout") {
        // store中清空用户头像
        this.$store.commit("clearAvater");
        // store中清空token
        this.$store.commit("clearToken");
        // store中清空用户id
        this.$store.commit("clearId");
        // store中清空用户名
        this.$store.commit("clearUsername");
        this.avater = "";
        this.token = "";
        this.id = "";
        // 判断当前页是否是写博客页
        if (this.$route.name === "blog") {
          // 跳转到首页
          this.$router.push({
            name: "home",
          });
        }
        if(this.$route.name === "userCenter"){
          this.$router.go(0)
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.common_header {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  .title {
    color: rgb(233, 109, 8);
    font-style: italic;
    display: inline-block;
    padding: 0 2vw;
    font-size: 2vw;
  }

  .menu {
    display: flex;
    align-items: center;
    height: 100%;
    a {
      margin: 0 1vw;
      font-size: 1vw;
      color: #e96d08;
      cursor: pointer;
    }
    a:hover {
      text-decoration: underline;
      color: #eeae7a;
    }

    .router-link-active {
      color: #ec944b;
      text-decoration: none;
    }
  }
  .user {
    margin-right: 1vw;
    img {
      height: 40px;
      width: 40px;
      border-radius: 50%;
    }
  }
  .login_tip {
    margin-right: 1vw;
    a {
      color: #ec944b;
      text-decoration: none;
      font-size: 1vw;
    }
    img {
      height: 40px;
      width: 40px;
      border-radius: 50%;
    }
  }
}
</style>