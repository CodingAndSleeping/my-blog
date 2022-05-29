export default {
    // state存放用户头像，token，用户id， 用户名
    state: {
        avater: "",
        token: "",
        id: "",
        username: ""
    },
    mutations: {
        // 在state和LocalStorage中存储头像
        setAvater(state, val) {
            state.avater = val;
            localStorage.setItem("avater", val);
        },
        // 在state和LocalStorage中清空头像
        clearAvater(state) {
            state.avater = "";
            localStorage.removeItem("avater");
        },
        // 在state和LocalStorage中存储用户id
        setId(state, val) {
            state.id = val;
            localStorage.setItem("id", val);
        },
        // 在state和LocalStorage中清空用户id
        clearId(state) {
            state.id = "";
            localStorage.removeItem("id");
        },
        // 在state和LocalStorage中存储用户名
        setUsername(state, val) {
            state.username = val;
            localStorage.setItem("username", val);
        },
        // 在state和LocalStorage中清空用户名
        clearUsername(state) {
            state.username = "";
            localStorage.removeItem("username");
        },
        // 在state和LocalStorage中存储token
        setToken(state, val) {
            state.token = val
            localStorage.setItem("token", val);
        },
        // 在state和LocalStorage中清空token
        clearToken(state) {
            state.token = "";
            localStorage.removeItem("token")
        },
        // 得到token
        getToken(state) {
            state.token = state.token || localStorage.getItem("token")
        }
    }
}