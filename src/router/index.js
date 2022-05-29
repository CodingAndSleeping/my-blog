import Vue from 'vue';
// 引入路由
import VueRouter from 'vue-router';
// 使用路由
Vue.use(VueRouter);
// 路由配置
const routes = [{
        path: "/",
        name: "main",
        redirect: "/home",
        component: () => import("@/views/main"),
        children: [{
                path: "/home",
                name: "home",
                component: () => import("@/views/Home"),
                meta: {
                    keepAlive: false
                }
            },
            {
                path: "/blog",
                name: "blog",
                component: () => import("@/views/Blog"),
                meta: {
                    requiresAuth: true,
                    keepAlive: true
                }
            },
            {
                path: "/blogDetail/:id",
                name: "blogDetail",
                component: () => import("@/views/BlogDetail")
            },
            {
                path: "/userCenter/:username",
                name: "userCenter",
                component: () => import("@/views/UserCenter"),
                meta: {
                    requiresAuth: true,
                }
            },
            {
                path: "/updateBlog/:id",
                name: "updateBlog",
                component: () => import("@/views/updateBlog"),
                meta: {
                    requiresAuth: true,
                }
            }
        ]
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/Login")
    },
    {
        path: "/register",
        name: "register",
        component: () => import("@/views/Register")
    },

];

// 暴露路由
export default new VueRouter({
    mode: "history",
    routes
})