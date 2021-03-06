import axios from '@/api/index';
const url = process.env.NODE_ENV === 'development' ? "/myblog" : ""
// 登录接口
export const login = (data) => {
    return axios.request({
        url: url+"/login",
        method: "post",
        data
    })
}

// 校验用户名是否重复接口
export const validate = (username) => {
    return axios.request({
        url: url+"/validateName",
        method: "post",
        data: {
            username
        }
    })
}

// 注册接口
export const register = (data) => {
    return axios.request({
        url: url+"/register",
        method: "post",
        data
    })
}

// 获取文章标签列表接口
export const getLabels = () => {
    return axios.request({
        url: url+"/getLabels",
        method: "get"
    })
}

// 添加博客接口
export const addBlog = (data) => {
    return axios.request({
        url: url+"/addBlog",
        method: "post",
        data
    })
}

// 获得博客列表接口
export const getBlogs = (params) => {
    return axios.request({
        url: url+"/getBlogs",
        method: "get",
        params
    })
}

// 获得博客详情接口
export const getBlogDetail = (params) => {
    return axios.request({
        url: url+"/getBlogDetail",
        method: "get",
        params
    })
}

// 更新点赞接口
export const updateLikes = (data) => {
    return axios.request({
        url: url+"/updateLikes",
        method: "put",
        data
    })
}

// 更新阅读量接口
export const updateViews = (data) => {
    return axios.request({
        url: url+"/updateViews",
        method: "put",
        data
    })
}

// 查看用户是否点赞该篇文章接口
export const isLike = (params) => {
    return axios.request({
        url: url+"/isLike",
        method: "get",
        params
    })
}

// 获得用户所写的博客接口
export const getUserBlogs = (params) => {
    return axios.request({
        url: url+"/getUserBlogs",
        method: "get",
        params
    })
}

// 获得用户头像接口
export const getAvater = (params) => {
    return axios.request({
        url: url+"/getAvater",
        method: "get",
        params
    })
}

// 删除博客接口
export const deleteBlog = (params) => {
    return axios.request({
        url: url+"/deleteBlog",
        method: "delete",
        params
    })
}

// 修改博客接口
export const updateBlog = (data) => {
    return axios.request({
        url: url+"/updateBlog",
        method: "put",
        data
    })
}

