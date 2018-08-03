var global = require("./global");
cc.Class({
    extends: cc.Component,

    properties: {
        startButton:{
            default:null,
            type:cc.Button
        },
        /*zhuomianDesk:{
            default:null, 
            type:cc.Prefab
        },*/

        userNameEditBox:{
            default:null,
            type:cc.EditBox
        },

        passWordEditBox:{
            default:null,
            type:cc.EditBox
        },
 
    },

    onLoad(){
        global.socket.init();
        //global.socket.onLogin();
        cc.loader.load('http://tieba.baidu.com/photo/p?kw=%E5%A4%B4%E5%83%8F&ie=utf-8&flux=1&tid=5817105172&pic_id=a1459822720e0cf3ef55b73b0646f21fbf09aa63&pn=1&fp=2&see_lz=1',function (err, texture) {
            var frame=new cc.SpriteFrame(texture);
            self.node.getComponent(cc.Sprite).spriteFrame=frame;
        });
    },

    startButtonClickedFunction: function(event , customerData){
        console.log('user name is = ' + this.userNameEditBox.string );
        console.log('password is = ' + this.passWordEditBox.string );
        console.log('data = ' + customerData);
        switch (customerData){
            case 'weChatSuccess':
                global.socket.login(
                    global.mainController.playerData.uniqueID,
                    global.mainController.playerData.nickName,
                    global.mainController.playerData.avatarUrl,function(err,data){
                        if(err){
                            console.log('login errr!');
                        }else{
                            console.log('login data is = ' + JSON.stringify(data));
                        }
                    });
                break;
            default:
                break;
        }
        global.beginSence.position = {
                x:2000,
                y:2000,
        };
        global.landingSence.position = {
            x:0,
            y:0,
        };
    },

});
