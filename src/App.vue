<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background-image: url("./assets/back4.jpg");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
}
#app {
  height: 100%;
}

::-webkit-scrollbar {
  width: 5px;
  height: 1px;
}
::-webkit-scrollbar-thumb {
  //滑块部分
  border-radius: 5px;
  background-color: rgb(106, 103, 107);
}
::-webkit-scrollbar-track {
  //轨道部分
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ededed;
  border-radius: 5px;
}
</style>>


