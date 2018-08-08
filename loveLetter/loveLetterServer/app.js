const socket = require('socket.io');
const config = require('./config.json');
const app = socket(3000);
const mydb = require('./utility/db');
const playerController = require('./game/player');
const errManager = require('./game/errManager');

mydb.connect(config.mysqlConfig);
/*mydb.checkPlayer("10000" , function(err , cb){

});*/

/*mydb.insertPlayerInfo({
    unique_id:'100000',
    uid:'120000',
    nick_name:'杨大脑袋',
    avatar_url:'tencent,com',
});*/

/*mydb.updatePlayerInfo('unique_id' , '100000' , {
    nick_name:'胡某',
    avatar_url:'wangyi.com',
});*/

app.on('connection',function(socket){
    console.log("A user connected!");
    socket.emit("welcome","hello my customer!!");
    socket.on("notify" , function(res){
        console.log("A user is login = " + JSON.stringify(res));

        let notifyData = res.data;
        let callBackIndex = res.callBackIndex;
        let msg = res.msg;

        switch (msg){
            case 'login':
                mydb.checkPlayerId(notifyData.id , function(err , data){
                    if(err){
                        console.log('err = ' + err);
                    }else {
                        if(data.length === 0){
                            console.log("不存在玩家");
                            let errSend = 1 + '';
                            playerController.passUserInformation(socket, {
                                callBackIndex: callBackIndex,
                                dataSend: errSend,
                            });
                            /*let uid = '1';
                            for(let i = 0;i < 7;i++ ){
                                uid += Math.floor(Math.random() * 10);
                            }*/
                            /*mydb.insertPlayerInfo({
                                unique_id:notifyData.uniqueID,
                                uid:uid,
                                nick_name:notifyData.nickName,
                                avatar_url:notifyData.avatarUrl,
                            });*/
                            /*playerController.creatPlayer(socket , {
                                uid:uid,
                                nickName:notifyData.nickName,
                                avatarUrl:notifyData.avatarUrl,
                                callBackIndex:callBackIndex,
                            });*/
                        }else{
                            mydb.checkPlayerPassWord(notifyData.id , notifyData.password , function(err , data){
                                if(data.length === 0){
                                    let errSend = 2 + '';
                                    playerController.passUserInformation(socket, {
                                        callBackIndex: callBackIndex,
                                        dataSend: errSend,
                                    });
                                }else {
                                    console.log(data[0].userId);
                                    let errSend = 3 + '';
                                    playerController.passUserInformation(socket, {
                                        userId:data[0].userId,
                                        userAvatarNum:data[0].userAvatarNum,
                                        userNickName:data[0].userNickName,
                                        userCredits:data[0].userCredits,
                                        dataSend:errSend,
                                        callBackIndex:callBackIndex,
                                    });
                                }
                            });
                            /*mydb.updatePlayerInfo('unique_id' , notifyData.uniqueID , {
                                nick_name:notifyData.nickName,
                                avatar_url:notifyData.avatarUrl,
                            });
                            playerController.creatPlayer(socket , {
                                uid:data[0].uid,
                                nickName:notifyData.nickName,
                                avatarUrl:notifyData.avatarUrl,
                                callBackIndex:callBackIndex,
                            });*/
                        }
                    }
                });
                break;
            case 'register':
                mydb.checkPlayerId(notifyData.id , function(err , data){
                    if(err){
                        console.log('err = ' + err);
                    }else {
                        if(data.length === 0){
                            mydb.checkPlayerNickName(notifyData.nickName , function(err , data) {
                                if (data.length === 0) {
                                    mydb.insertPlayerInfo({
                                        userId: notifyData.id,
                                        userAvatarNum: notifyData.avatarNum,
                                        userNickName: notifyData.nickName,
                                        userEmail: notifyData.email,
                                        userPassword: notifyData.password,
                                        userCredits: '2000',
                                    });
                                    let errSend = 0 + '';
                                    errManager.errSend(socket, {
                                        callBackIndex: callBackIndex,
                                        errSend: errSend,
                                    });
                                }else {
                                    console.log("改昵称已被使用！！！");
                                    let errSend = 2 + '';
                                    errManager.errSend(socket, {
                                        callBackIndex: callBackIndex,
                                        errSend: errSend,
                                    });
                                }
                            });
                        }else{
                            console.log("该用户名存在！！！");
                            let errSend = 1 + '';
                            errManager.errSend(socket , {
                                callBackIndex:callBackIndex,
                                errSend:errSend,
                            });
                        }
                    }
                });
                console.log(res);
                break;
            default:
                break;
        }
    });
});
console.log("hello world!!");