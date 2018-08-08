import lines from "./lines";

const warningLable = {};

warningLable.registerLable = [
    "",
    "请选择头像！！",
    "请输入有效的邮箱！！",
    "您两次输入的密码不一样",
    "您有栏目未填完，请填上",
    "id必须全为数字！！",
]

warningLable.loadingLable = [
    "账号或密码不能为空！！！！",
    "该账号未被注册，请先注册或重新输入正确的id!!!",
    "密码输入错误！！！！",
    "",
]

warningLable.registerCallback = [
    "注册成功，欢迎加入南山棋牌室,三秒内跳转登录界面！",
    "抱歉，id存在，请重新输入",
    "您准备注册的昵称已被使用",
]

module.exports = warningLable;
export default warningLable;
