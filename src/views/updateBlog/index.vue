<template>
  <div class="blog">
    <h1>修改博客</h1>
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
// 引入 获得标签列表 修改博客 获得博客详情 接口
import { getLabels, updateBlog, getBlogDetail } from "@/api/data";
export default {
  name: "Blog",
  data() {
    return {
      // 获取当前博客id
      id: this.$route.params.id,
      // 编辑器内容
      mavonValue: "",
      // 博客详情
      blog: {
        // 博客标题
        title: "",
        // 博客内容
        content: "",
        // 博客标签
        labels: [],
        // 博客新增图片对象数组
        pictures: [],
      },
      // 标签配置项
      options: [],
    };
  },
  methods: {
    // 编辑器内容改变时调用，将改变后的内容赋值给博客内容
    change(val) {
      this.blog.content = val;
    },
    // 添加图片时调用
    imgAdd(filename, fileobj) {
      // 获取当前时间
      const time = new Date().getTime();
      // 向博客新增图片数组中添加新增的图片信息
      this.blog.pictures.push({
        index: filename,
        name: fileobj.name,
        url: fileobj.miniurl,
        timeStamp: time,
      });
    },
    // 图片删除时调用
    imgDel(filename) {
      // 保留pictures数组里的未删除图片信息
      this.blog.pictures = this.blog.pictures.filter((item) => {
        return item.name != filename[0];
      });
    },

    async submitBlog() {
      // 提交修改后的博客
      const result = await updateBlog({ id: this.id, blog: this.blog });
      if (result.code === 200) {
        this.$message({
          message: result.msg,
          type: "success",
          duration: 1000,
        });
        this.$router.push({
          name: "home",
        });
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
    // 组件创建完成时获取标签列表
    const result = await getLabels();
    this.options = result.labels;
    // 获取该博客的详情
    const blogDetailResult = await getBlogDetail({
      id: this.id,
      isUpdate: true,
    });
    // 博客标题，内容， 标签回显
    this.blog.title = blogDetailResult.blogDetail.title;
    this.mavonValue = blogDetailResult.blogDetail.content;
    this.blog.labels = blogDetailResult.blogDetail.labels.split(",");
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