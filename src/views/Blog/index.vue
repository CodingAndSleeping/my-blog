<template>
  <div class="blog">
    <h1>添加博客</h1>
    <div class="title">
      <label>博客标题</label>
      <input type="text" v-model="blog.title" />
    </div>
    <div class="content">
      <label>博客内容</label>
      <div class="editor">
        <mavon-editor
          v-model="mavonValue"
          :scrollStyle="true"
          :ishljs="true"
          @change="change"
          @imgAdd="imgAdd"
          @imgDel="imgDel"
        />
      </div>
    </div>
    <div class="label">
      <label>添加标签:</label>
      <el-select v-model="blog.labels" multiple placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <el-button type="primary" @click="submitBlog">提交</el-button>
  </div>
</template>

<script>
// 引入 获得标签列表， 添加博客 接口
import { getLabels, addBlog} from "@/api/data";
import { getTime } from "@/utils/getTime";
export default {
  name: "Blog",
  data() {
    return {
      // mavonEditor内容
      mavonValue: "",
      // 博客内容
      blog: {
        // 博客标题
        title: "",
        // 博客markdown格式内容
        content: "",
        // 储存博客的标签
        labels: [],
        // 获得当前用户名
        username:
          this.$store.state.user.username || localStorage.getItem("username"),
        createTime: "",
        // 用来存储博客中的添加地图片信息
        pictures: [],
      },
      // 标签配置项
      options: [],
    };
  },
  methods: {
    // 当编辑器内容发生改变调用此函数，参数为改变后的内容
    change(val) {
      this.blog.content = val;
    },
    // 当添加图片时调用此函数， 参数依次为文件序号，文件对象
    imgAdd(filename, fileobj) {
      // 获取当前的时间
      const time = new Date().getTime();
      // pictures数组存入添加地图片信息
      this.blog.pictures.push({
        index: filename,
        name: fileobj.name,
        url: fileobj.miniurl,
        timeStamp: time,
      });
    },
    // 当删除图片时调用此函数，参数为删除的文件对象
    imgDel(filename) {
      // 遍历pictures数组，保留未删除图片信息
      this.blog.pictures = this.blog.pictures.filter((item) => {
        return item.name != filename[0];
      });
    },
    // 提交博客
    async submitBlog() {
      // 获取当前时间
      const date = new Date();
      // 时间格式转换
      this.blog.createTime = getTime(date);
      // 将blog作为参数向后台发送请求，并接收返回结果
      const result = await addBlog(this.blog);
      if (result.code === 200) {
        this.$message({
          message: result.msg,
          type: "success",
          duration: 1000,
        });
        // 跳转首页
        this.$router.push({
          name: "home",
        });
        // 销毁组件
        this.$destroy();
      } else {
        this.$message({
          message: result.msg,
          type: "error",
          duration: 1000,
        });
      }
    },
  },
  async created() {
    // 获得所有标签列表
    const result = await getLabels();
    this.options = result.labels;
  },

};
</script>

<style lang="less" scoped>
.blog {
  background: rgba(255, 255, 255, 0.5);
  margin-top: 3px;
  border-radius: 5px;
  padding: 1vw;
  height: 100%;
  overflow-y: hidden;
  overflow: visible;
}
h1 {
  font-size: 3vw;
  margin: 0;
}
.title {
  label {
    display: block;
    font-size: 1.5vw;
    margin: 1vw 0;
  }
  input {
    display: block;
    height: 5vh;
    width: 100%;
    font-size: 1.5vw;
    outline: none;
    border: 0;
    padding: 0;
  }
}

.content {
  label {
    display: block;
    font-size: 1.5vw;
    margin: 1vw 0;
  }
  .editor {
    height: 40vw;
    width: 100%;
    overflow: hidden;
    div {
      height: 100%;
      z-index: 0;
    }
  }
}

.label {
  display: flex;
  width: 100%;
  align-items: center;
  margin-top: 5px;
  label {
    font-size: 1.5vw;
    width: 10vw;
    margin: 1vw 0;
  }
  .el-select {
    width: 100%;
  }
}
.el-button {
  margin-top: 5px;
  position: relative;
  left: calc(50% - 40px);
}
</style>