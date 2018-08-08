var global = require("./global");
var warningLines = require("./warningLable");

cc.Class({
    extends: cc.Component,

    properties: {
        userNameEditBox:{
            default:null,
            type:cc.EditBox
        },

        passWordEditBox:{
            default:null,
            type:cc.EditBox
        },

        warningLable:{
            default:null,
            type:cc.Label
        },
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        global.socket.init();
        this.warningLable.string = '';
        global.warningLableString = this.warningLable;
        global.userInformation = [];
    },

    registerButtonClicked:function () {
        cc.director.loadScene('registerSence');
    },

    startButtonClicked:function (event , customerData) {
        if(this.userNameEditBox.string !== '' && this.passWordEditBox.string !== ''){
            switch (customerData){
                case 'login':
                    global.socket.login(
                        this.userNameEditBox.string,
                        this.passWordEditBox.string, function(err,data){
                            if(err){
                                console.log('login errr!');
                            }else{
                                console.log('login data is = ' + JSON.stringify(data));
                                let callbackData = parseInt(data.dataSend);
                                global.warningLableString.string = warningLines.loadingLable[callbackData];
                                if(callbackData === 3){
                                    global.userInformation.id = data.userId;
                                    global.userInformation.avatar = data.avatarNum;
                                    global.userInformation.nickName = data.nickName;
                                    global.userInformation.credits = data.credits;
                                    console.log(global.userInformation);
                                    cc.director.loadScene('mainSence');
                                }
                            }
                        });
                    break;
                default:
                    break;
            }
        }else{
            this.warningLable.string = warningLines.loadingLable[0];
        }

    }



    /*start () {

    },*/

    // update (dt) {},
});
