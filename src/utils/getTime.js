export const getTime = (date) => {
    let year = date.getFullYear(); //年 ,从 Date 对象以四位数字返回年份
    let month = date.getMonth() + 1; //月 ,从 Date 对象返回月份 (0 ~ 11) ,date.getMonth()比实际月份少 1 个月
    let day = date.getDate(); //日 ,从 Date 对象返回一个月中的某一天 (1 ~ 31)

    let hours = date.getHours(); //小时 ,返回 Date 对象的小时 (0 ~ 23)
    let minutes = date.getMinutes(); //分钟 ,返回 Date 对象的分钟 (0 ~ 59)
    let seconds = date.getSeconds(); //秒 ,返回 Date 对象的秒数 (0 ~ 59)

    //修改月份格式
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    //修改日期格式
    if (day >= 0 && day <= 9) {
        day = "0" + day;
    }

    //修改小时格式
    if (hours >= 0 && hours <= 9) {
        hours = "0" + hours;
    }
    //修改分钟格式
    if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
    }
    //修改秒格式
    if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds;
    }
    //获取当前系统时间  格式(yyyy-mm-dd hh:mm:ss)
    return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
}