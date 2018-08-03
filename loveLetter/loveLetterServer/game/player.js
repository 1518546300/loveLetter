const Player = function(socket , data){
    let that = {};
    let _socket = socket;
    let _uid = data.uid;
    let _nickname = data.nickName;
    let _avatarurl = data.avatarUrl;
    let _callBackIndex = data.callBackIndex;
    _socket.emit('notify' , {msg:'login' , callBackIndex:_callBackIndex , data:'welcome!!!'});

    return that;
};

let _playerListen = [];

exports.creatPlayer = function(socket , data){
    console.log('data = ' + JSON.stringify(data));
    let player = Player(socket , data);
    _playerListen.push(player);
};