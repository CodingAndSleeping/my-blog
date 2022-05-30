<template>
  <div class="userCenter">
    <div class="userDetail">
      <img :src="avater" @click="dialogFormVisible = !dialogFormVisible" />
      <div>
        <span class="name">{{ username }}</span>
        <div>
          <span>{{ viewsTotal == null ? 0 : viewsTotal }}被访问</span>
          <span>{{ total }}原创</span>
          <span>{{ likesTotal == null ? 0 : likesTotal }}点赞</span>
        </div>
      </div>
    </div>
    <div class="blog_list">
      <ul>
        <li :key="item.id" v-for="item in blogs">
          <h3 class="title" v-titleRainbow @click="toBlogDetail(item.id)">
            {{ item.title }}
          </h3>
          <div class="body">
            <span class="time">{{ item.createTime }}</span>
            <div v-if="isAuthor">
              <el-button type="text" @click="updateBlog(item.id)"
                ><span class="modify">修改</span></el-button
              >

              <el-button type="text" @click="deleteBlog(item.id)"
                ><span class="delete">删除</span></el-button
              >
            </div>
          </div>
          <div class="content" @click="toBlogDetail(item.id)">
            {{ item.content }}
          </div>
          <div class="bottom">
            <div class="label">
              <span :key="index" v-for="(label, index) in item.labels">{{
                label
              }}</span>
            </div>
            <div class="record">
              <div>
                <img src="@/assets/notLike.svg" /><span>{{ item.likes }}</span>
              </div>
              <div>
                <img src="@/assets/view.svg" /><span>{{ item.views }}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="5"
    >
    </el-pagination>

    <el-dialog :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label-width="120px">
          上传头像：
          <el-upload
            class="avatar-uploader"
            :action="url"
            list-type="picture-card"
            name="img"
            :headers="headers"
            :data="data"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="avater" :src="avater" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// 引入 获得用户所写博客接口 获得头像接口 删除博客接口
import { getUserBlogs, getAvater, deleteBlog } from "@/api/data";
export default {
  name: "UserCenter",
  data() {
    return {
      // 当前页数
      currentPage: 1,
      // 总页数
      total: 0,
      // 当前用户名
      username: this.$route.params.username,
      // 判断是否是用户查看自己的主页
      isAuthor:
        this.$store.state.user.username == this.$route.params.username ||
        localStorage.getItem("username") == this.$route.params.username,
        // 博客列表
      blogs: [],
      // 总的查看数
      viewsTotal: 0,
      // 总的点赞数
      likesTotal: 0,
      // 用户头像
      avater: "",
      // 修改头像对话框是否显示
      dialogFormVisible: false,
      url:process.env.NODE_ENV === 'development' ? "http://localhost:8080/myblog/upLoadAvater" : "http://47.113.230.146:3000/upLoadAvater",
      // 请求头
      headers: {
        token: this.$store.state.user.token || localStorage.getItem("token"),
      },
      // 修改头像时，用户名也作为参数传递
      data: {
        username: this.$route.params.username,
      },
    };
  },
  methods: {
    // 分页函数
    async handleCurrentChange(val) {
      const result = await getUserBlogs({ username: this.username, page: val });
      this.blogs = result.blogs;
      this.total = result.total;
      this.viewsTotal = result.viewsTotal;
      this.likesTotal = result.likesTotal;
    },
    // 头像上传成功时调用
    handleAvatarSuccess(file) {
      // 头像地址改为当前图片地址
      this.avater = file.imgUrl;
      // store和LocalStorage中修改头像地址
      this.$store.commit("setAvater", file.imgUrl);
      // 修改头像对话框关闭
      this.dialogFormVisible = !this.dialogFormVisible;
      // 刷新页面
      this.$router.go(0);
    },
    // 头像上传前调用
    beforeAvatarUpload(file) {
      // 对上传图片做限制
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt3M = file.size / 1024 / 1024 / 1024 < 3;
      if (!isJPG && !isPNG) {
        this.$message.error`在这里插入代码片`(
          "上传头像图片只能是 JPG 格式或 png 格式!"
        );
      }
      if (!isLt3M) {
        this.$message.error("上传头像图片大小不能超过 3MB!");
      }
      return isJPG && isLt3M;
    },
    // 点击博客标题和内容时调用
    toBlogDetail(id) {
      // 跳转详情页
      this.$router.push({
        name: "blogDetail",
        params: {
          id,
        },
      });
    },
    // 删除博客
    deleteBlog(id) {
      this.$confirm("此操作将永久删除该博客, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const result = await deleteBlog({ id });
          this.$message({
            type: "success",
            message: result.msg,
          });

          this.$router.go(0);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      
      
    },
    // 修改博客
    updateBlog(id) {
      // 跳转修改博客页
      this.$router.push({
        name: "updateBlog",
        params: {
          id,
        },
      });
    },
  },
  async mounted() {
    const blogResult = await getUserBlogs({ username: this.username });
    this.blogs = blogResult.blogs;
    this.total = blogResult.total;
    this.viewsTotal = blogResult.viewsTotal;
    this.likesTotal = blogResult.likesTotal;
    const avaterResult = await getAvater({ username: this.username });
    this.avater = avaterResult.avater;
  },
};
</script>

<style lang="less" scoped>
.userCenter {
  background: rgba(255, 255, 255, 0.5);
  margin-top: 3px;
  border-radius: 5px;
  padding: 1vw;
  height: 100%;
  overflow-y: hidden;
  overflow: visible;
  .userDetail {
    display: flex;
    align-items: center;
    background-color: white;
    border-radius: 5px;
    margin-bottom: 1vh;
    img {
      height: 100px;
      width: 100px;
      border-radius: 50%;
      margin: 3vh 2vw;
    }
    div {
      .name {
        font-size: 3vw;
      }
      div {
        display: flex;
        span {
          display: block;
          margin: 0.5vh 0.5vw 0 0;
        }
      }
    }
  }
  .blog_list {
    ul {
      margin: 0;
      padding: 2vh 2vw;
      background-color: rgb(255, 255, 255);
      border-radius: 5px;
      li {
        list-style: none;
        padding-bottom: 0.5vh;
        border-bottom: 1px solid black;

        .title {
          margin: 10px 0;
          cursor: pointer;
        }
        .body {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .time {
            font-size: 1vw;
          }
          div {
            margin-right: 2vw;
            span {
              cursor: pointer;
              margin: 0 3px;
              padding: 0;
              color: rgb(0, 37, 245);
            }
            span:hover {
              color: rgb(148, 146, 146);
            }
          }
        }

        .content {
          margin: 10px 0;
          cursor: pointer;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
          .label {
            display: flex;
            align-items: center;
            span {
              display: block;
              font-size: 10px;
              background-color: rgb(6, 196, 132);
              padding: 3px 10px;
              margin-right: 10px;
              border-radius: 10px;
              box-shadow: 0 0 25px #cac6c6;
            }
          }
          .record {
            margin-right: 20px;
            display: flex;
            div {
              margin-right: 10px;
              display: flex;
              img {
                height: 20px;
                width: 20px;
                margin-right: 5px;
              }
            }
          }
        }
      }
    }
  }
  .el-pagination {
    padding: 10px 50%;
  }
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>