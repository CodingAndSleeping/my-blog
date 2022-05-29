import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router/index';
// 引入store
import store from '@/store/index';
// 按需引入elementUI组件
import {
  Button,
  ButtonGroup,
  Container,
  Header,
  Main,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Select,
  Option,
  Form,
  FormItem,
  Input,
  Message,
  MessageBox,
  Pagination,
  Dialog,
  Upload
} from 'element-ui';
// 引入mavonEditor组件
import mavonEditor from 'mavon-editor'
// 引入mavonEditor样式
import 'mavon-editor/dist/css/index.css'

// highlight.js代码高亮插件
import Highlight from '@/utils/highLight'; // from 路径是highlight.js的路径
Vue.use(Highlight);

Vue.config.productionTip = false

Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.use(Select);
Vue.use(Option);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Upload);
Vue.use(mavonEditor);
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;

// 自定义指令，博客标题随机颜色展示
Vue.directive("titleRainbow", {
  bind(el) {
    el.style.color = "#" + Math.random().toString(16).slice(2, 8);
  }
})

// 添加路由守卫
router.beforeEach((to, from, next) => {
  // 获得token
  store.commit("getToken");
  const token = store.state.user.token;
  // 如果token存在，并且访问的时登陆或者注册页，则跳转到首页
  if (token) {
    if (to.name == "login" || to.name == "register") {
      next({
        name: "home"
      })
    }
    next()
  } else {
    // 如果token不存在， 并且路由组件需要登录授权，则跳转到首页
    if (to.meta.requiresAuth) {
      Vue.prototype.$message({
        message: "请先登录",
        type: "warning",
        duration: 1000,
      })
      next({
        name: "home"
      })
    }
    next()
  }


})

// 创建Vue实例
new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate(){
    // 安装全局事件总线
    Vue.prototype.$bus = this
  }
}).$mount('#app')