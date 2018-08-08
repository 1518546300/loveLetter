const Player = function(socket , data){
    let that = {};
    let _socket = socket;
    let _callBackIndex = data.callBackIndex;
    let _dataSend = data.dataSend;
    if(_dataSend === '3'){
        let _userId = data.userId;
        let _avatarNum = data.userAvatarNum;
        let _userNickName = data.userNickName;
        let _userCredits = data.userCredits;
        let _callBackIndex = data.callBackIndex;
        _socket.emit('notify' , {msg:'login' , callBackIndex:_callBackIndex , data:{
                userId:_userId, avatarNum:_avatarNum,nickName:_userNickName,credits:_userCredits,dataSend:_dataSend}});
    }else{
        _socket.emit('notify' , {msg:'login' , callBackIndex:_callBackIndex , data:{dataSend:_dataSend}});
    }


    return that;
};

let _playerListen = [];

exports.passUserInformation = function(socket , data){
    console.log('data1 = ' + JSON.stringify(data));
    let player = Player(socket , data);
    if(data.dataSend === '3'){
        _playerListen.push(player);
    }
};


exports.creatPlayer = function(socket , data){
    console.log('data = ' + JSON.stringify(data));
    let player = Player(socket , data);
    _playerListen.push(player);
};