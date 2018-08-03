let playerData = function(){
    let that = {};
    that.uid = undefined;
    that.uniqueID = '100000';
    that.nickName = 'Hu jj' + Math.floor(Math.random() * 10);
    that.avatarUrl = 'http://tieba.baidu.com/photo/p?kw=%E5%A4%B4%E5%83%8F&ie=utf-8&flux=1&tid=5817105172&pic_id=a1459822720e0cf3ef55b73b0646f21fbf09aa63&pn=1&fp=2&see_lz=1';
    /*for(let i = 0;i < 7;i++ ){
        that.uniqueID += Math.floor(Math.random() * 10);
    };*/
    that.weChatLoginSuccess = function(data){
        that.uniqueID = data.uniqueID;
        that.nickName = data.nickName;
        that.avatarUrl = data.avatarUrl;
    };
    that.loginSuccess = function(data){
        console.log('data = ' + JSON.stringify(data));
    };
    return that;
};
export default playerData();
