<template>
  <div class="home">
    <div class="blog_list">
      <ul>
        <li :key="item.id" v-for="item in blogs">
          <h3 v-titleRainbow class="title" @click="toBlogDetail(item.id)">
            {{ item.title }}
          </h3>
          <span class="author">作者:{{ item.username }}</span>
          <span class="time">时间:{{ item.createTime }}</span>

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
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="5"
      >
      </el-pagination>
    </div>
    <home-aside></home-aside>
  </div>
</template>

<script>
import HomeAside from "@/views/HomeAside";
// 引入 获得博客列表 接口
import { getBlogs } from "@/api/data";
export default {
  name: "Home",
  components: {
    HomeAside,
  },
  data() {
    return {
      // 博客列表
      blogs: [],
      // 当前页数
      currentPage: 1,
      // 博客总数
      total: 0,
      // 查询关键词
      keywords: "",
      // 当前选中标签
      label: "",
    };
  },
  methods: {
    // 翻页函数，参数为当前页数
    async handleCurrentChange(val) {
      const result = await getBlogs({
        page: val,
        keywords: this.keywords,
        label: this.label,
      });
      this.blogs = result.blogs;
    },
    // 点击博客标题或者内容跳转到博客详情页
    toBlogDetail(id) {
      this.$router.push({
        name: "blogDetail",
        params: {
          id,
        },
      });
    },
  },
  async mounted() {
    // 获得博客列表和博客总数
    const result = await getBlogs();
    this.blogs = result.blogs;
    this.total = result.total;
    // 绑定searchBlogs事件
    this.$bus.$on("searchBlogs", async (keywords) => {
      // 将当前标签设为空
      this.label = "";
      this.keywords = keywords;
      // 根据关键词查询博客
      const result = await getBlogs({ keywords });
      this.blogs = result.blogs;
      this.total = result.total;
      // 将页数设为1
      this.currentPage1 = 1;
    });
    // 绑定getBlogsByLabel事件
    this.$bus.$on("getBlogsByLabel", async (label) => {
      // 将关键词设为空
      this.keywords = "";
      this.label = label;
      // 根据标签查询博客
      const result = await getBlogs({ label });
      this.blogs = result.blogs;
      this.total = result.total;
      // 将页数设为1
      this.currentPage1 = 1;
    });
  },
};
</script>

<style lang="less" scoped>
.home {
  background: rgba(255, 255, 255, 0.5);
  margin-top: 3px;
  border-radius: 5px;
  display: flex;
  align-items: flex-start;
  overflow-y: hidden;
  overflow: visible;
  .blog_list {
    margin-top: 5px;
    width: 75%;
    ul {
      margin: 0;
      padding: 0;

      li {
        margin: 0 10px 10px 10px;
        padding: 10px;
        background-color: rgb(255, 255, 255);
        border-radius: 5px;
        list-style: none;

        .title {
          margin: 10px 0;
          cursor: pointer;
        }
        .author {
          font-size: 12px;
          margin-right: 20px;
        }
        .time {
          font-size: 12px;
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
      li:hover {
        margin: 0 5px 10px 5px;
        box-shadow: 0px 5px 5px #7c7c7c;
        border-bottom: none;
      }
    }
    .el-pagination {
      padding: 10px 50%;
    }
  }
}
</style>