<template>
  <el-container>
    <el-header>
      <common-header></common-header>
    </el-header>
    <el-main> 
      <keep-alive > 
    <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </el-main>
  </el-container>
</template>

<script>
import CommonHeader from "@/components/CommonHeader.vue";
export default {
  name: "Main",
  components: {
    CommonHeader,
  },
};
</script>


<style lang="less" scoped>
.el-container {
  align-items: center; 
}
.el-header {
  background-color: #000000;
  padding: 0;
  height: 27.778vw;
  width: 70vw;
  position: fixed;
  z-index: 1;
}
.el-main {

  width: 70vw;
  padding: 0;
  margin-top: 61px;

  // display: flex;
  // background-color: rgb(208 208 208);

  // flex: 1;
  
}
</style>