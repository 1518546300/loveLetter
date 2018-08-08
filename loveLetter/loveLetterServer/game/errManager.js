const myErr = function(socket , data){
    let that = {};
    let _socket = socket;
    /*let _uid = data.uid;
    let _nickname = data.nickName;
    let _avatarurl = data.avatarUrl;*/
    let dataSend = data.errSend;
    let _callBackIndex = data.callBackIndex;
    _socket.emit('notify' , {msg:'err' , callBackIndex:_callBackIndex , data:dataSend});

    return that;
};


exports.errSend = function(socket , data){
    console.log('data = ' + JSON.stringify(data));
    let err = myErr(socket , data);
};
