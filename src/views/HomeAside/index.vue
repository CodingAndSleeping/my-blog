<template>
  <div class="aside">
    <div class="label_list">
      <div class="search">
        <input
          type="text"
          placeholder="请输入关键词"
          v-model="keywords"
          @keyup.enter="search"
        />
        <i class="el-icon-search" @click="search"></i>
      </div>
      <div class="label">
        <div
          :class="{ active: label == '全部' }"
          @click="getBlogsByLabel('全部')"
        >
          全部
        </div>
        <div
          :class="{ active: label == item.label }"
          :key="item.id"
          v-for="item in labels"
          @click="getBlogsByLabel(item.label)"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
    <div class="contect_me">
      <i class="el-icon-postcard"></i><span>联系方式</span>
      <div class="contect_item">
        <div><img src="@/assets/QQ.svg" /><span>1162300237</span></div>
        <div>
          <img src="@/assets/email.svg" /><span>1162300237@qq.com</span>
        </div>
        <div>
          <img src="@/assets/github.svg" /><span>CodingAndSleeping</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入 获得标签列表 接口
import { getLabels } from "@/api/data";
export default {
  name: "HomeAside",
  data() {
    return {
      // 查询关键词
      keywords: "",
      // 标签列表
      labels: [],
      // 当前选中标签
      label: "全部",
    };
  },
  methods: {
    // 点击或者敲回车调用search函数
    search() {
      // 将当前标签设为空
      this.label = "";
      // 触发searchBlogs事件，将关键词作为参数传给Home组件
      this.$bus.$emit("searchBlogs", this.keywords);
    },
    // 点击标签调用getBlogsByLabel函数
    getBlogsByLabel(label) {
      // 将当前标签改为点击的标签
      this.label = label;
      // 判断点击的标签是否为全部标签， 若是，则不传递参数，查询所有博客， 若不是，则传递点击的标签， 查询该标签的所有博客
      if (label === "全部") {
        this.$bus.$emit("getBlogsByLabel");
      } else {
        this.$bus.$emit("getBlogsByLabel", label);
      }
    },
  },
  async created() {
    // 组件创建完成获得标签列表
    const result = await getLabels();
    this.labels = result.labels;
  },
};
</script>

<style lang="less" scoped>
.aside {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 5px 10px 5px 0;
  width: 20%;
  .label_list {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(255, 255, 255);
    border-radius: 5px;
    margin-bottom: 5px;
    .search {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 2px 5px 2px 10px;
      height: 3vh;
      width: 13vw;
      margin: 10px 0;
      border-radius: 5.556vw;
      background-color: rgb(255, 255, 255);
      border: 1px solid black;
      input {
        font-style: italic;
        font-size: 0.8vw;
        border: none;
        height: 3vh;
        width: 10vw;
        outline: none;
      }
      i {
        padding-right: 0.6vw;
        cursor: pointer;
      }
    }
    .label {
      width: 100%;
      .active {
        background-color: rgb(109, 183, 243);
      }
      div {
        display: flex;
        margin: 5px 0;
        width: 100%;
        padding: 5px 0;
        justify-content: center;
        background-color: aliceblue;
        border-radius: 10px;
        cursor: pointer;
      }
      div:hover {
        background-color: rgb(109, 183, 243);
      }
    }
  }
  .contect_me {
    background-color: rgb(255, 255, 255);
    border-radius: 5px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    i {
      margin: 10px 10px 5px 10px;
    }
    .contect_item {
      padding: 10px;
      div {
        display: flex;
        align-items: center;
        border-bottom: 1px solid black;
        margin: 10px 0;
        img {
          height: 50px;
          width: 50px;
          margin-right: 5px;
        }
      }
    }
  }
}
</style>