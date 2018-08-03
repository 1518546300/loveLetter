import defines from "../defines";

const socketController = function(){
    let that = {};
    let _socket = undefined;
    let _callBackMap = {};
    let _callBackIndex = 1;

    that.init = function(){
        _socket = io(defines.serverUrl);
        _socket.on('notify' , function(data){
            console.log('notify  = ' + JSON.stringify(data));
            let callBackIndex = data.callBackIndex;
            let cb = _callBackMap[callBackIndex];
            if(cb){
                cb(null , data.data);
            }
        });
    };

    const notify = function(msg , data){
        _socket.emit('notify' , {msg:msg , callBackIndex:_callBackIndex , data:data});
        _callBackIndex ++;
    };

    const request = function(msg , data , cb){
        _callBackMap[_callBackIndex] = cb;
        notify(msg , data);
    };


    that.login = function(unique ,nickname ,avartar ,cb){
        /*_socket.emit('login',{
            uniqueID:unique,
            nickName:nickname,
            avatarUrl:avartar,
        });*/
        request('login' , {uniqueID:unique , nickName:nickname , avatarUrl:avartar} , cb);
    };

    /*that.onLogin = function(data){
        _socket.on('login' , function(data){
            console.log('login is coming = ' + JSON.stringify(data));
        });
    };*/

    return that;
};
export default socketController();