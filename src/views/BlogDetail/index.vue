<template>
  <div class="blogDetail">
    <h2 class="title">{{ blogDetail.title }}</h2>
    <div class="author">
      <img class="avater" :src="`${blogDetail.avater}`" /><span
        class="name"
        @click="toUserCenter(blogDetail.username)"
        >{{ blogDetail.username }}</span
      >
      <span class="time">于{{ blogDetail.create_time }}发布</span>
      <img class="view" src="@/assets/view.svg" /><span class="viewNum">{{
        blogDetail.views
      }}</span>
    </div>
    <mavon-editor
      class="content"
      :ishljs="true"
      v-html="blogDetail.content"
      v-highlight
    ></mavon-editor>
    <div class="like">
      <img v-if="currentLike" src="@/assets/like.svg" @click="toLike" />
      <img v-if="!currentLike" src="@/assets/notLike.svg" @click="toLike" />
      <span class="likeNum">{{ blogDetail.likes }}</span>
    </div>
  </div>
</template>

<script>
// 引入 获得博客详情接口 更新点赞接口 更新查看接口 用户是否点赞接口
import { getBlogDetail, updateLikes, updateViews, isLike } from "@/api/data";
export default {
  name: "BlogDetail",
  data() {
    return {
      // 标记用户是否点赞该篇文章
      isLike: false,
      // 当前查看博客的id
      id: this.$route.params.id,
      // 博客详情
      blogDetail: {},
      // 标记当前是否为点赞状态
      currentLike: false,
    };
  },
  methods: {
    // 用户点击点赞图标调用此函数
    toLike() {
      // 当前点赞状态取反
      this.currentLike = !this.currentLike;
      // 判断当前点赞状态是否为true， 若为true，则博客的点赞数加一，否则减一
      if (this.currentLike === true) {
        this.blogDetail.likes += 1;
      } else {
        this.blogDetail.likes -= 1;
      }
    },
    // 点击博客作者名字，跳转到作者个人中心页
    toUserCenter(username) {
      this.$router.push({
        name: "userCenter",
        params: {
          username,
        },
      });
    },
  },
  async mounted() {
    // 组件挂载完成时获得博客详情
    const blogDetailResult = await getBlogDetail({ id: this.id });
    this.blogDetail = blogDetailResult.blogDetail;
    // 调用用户是否点赞接口，判断当前用户是否点赞该篇文章
    const isLikeResult = await isLike({
      username: this.blogDetail.username,
      blogId: this.blogDetail.id,
    });
    // 将用户点赞状态赋值给isLike和CurrentLike
    this.isLike = isLikeResult.isLike;
    this.currentLike = this.isLike;
  },
  beforeDestroy() {
    // 用户关闭页面之前（即组件被销毁之前）判断当前的点赞状态是否和刚开始的点赞状态相同
    if (this.currentLike !== this.isLike) {
      // 若不相同，则发送请求，修改点赞状态，更新点赞数量
      updateLikes({
        isLike: this.currentLike,
        username: this.blogDetail.username,
        blogId: this.blogDetail.id,
      });
    }
    // 用户关闭页面之前（即组件被销毁之前）发送请求，更新查看数
    updateViews({ blogId: this.blogDetail.id });
  },
};
</script>

<style lang="less">
.blogDetail {
  background: rgba(255, 255, 255, 0.7);
  margin-top: 3px;
  border-radius: 5px;
  padding: 2vw;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  overflow: visible;
  .title {
    margin: 0 0 5vh 0;
  }
  .author {
    display: flex;
    align-items: center;
    margin: 1vh 0 0;
    .avater {
      height: 3vw;
      width: 3vw;
      border-radius: 50%;
      margin-right: 2vw;
    }
    .name {
      margin-right: 0.5vw;
      cursor: pointer;
    }
    .time {
      font-size: 0.8vw;
      color: rgb(124, 124, 124);
      margin-right: 4vw;
    }
    .view {
      height: 1.5vw;
      width: 1.5vw;
      margin-right: 0.5vw;
    }
  }
  .content {
    margin: 5vh 0;
    padding: 3vw;
    z-index: 0;
  }
  .like {
    margin-left: 60vw;
    display: flex;
    align-items: center;
    img {
      height: 1.5vw;
      width: 1.5vw;
      margin-right: 0.5vw;
      cursor: pointer;
    }
  }
}
</style>