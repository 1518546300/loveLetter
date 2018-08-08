var global = require("./global");
var warningLines = require("./warningLable");

cc.Class({
    extends: cc.Component,

    properties: {
        userAvatar:{
            default:null,
            type:cc.Sprite
        },

        choiceAvatarFrame:{
            default:null,
            type:cc.Prefab
        },

        avatarSprite:{
            default:null,
            type:cc.SpriteAtlas
        },

        idEditBox:{
            default:null,
            type:cc.EditBox
        },

        nickNameEditBox:{
            default:null,
            type:cc.EditBox
        },

        emailEditBox:{
            default:null,
            type:cc.EditBox
        },

        passWord1EditBox:{
            default:null,
            type:cc.EditBox
        },

        passWord2EditBox:{
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
        global.userAvatarChoice = undefined;
    },

    buttonClicked:function(event , msg){
        global.warningLableString = this.warningLable;
        console.log(msg);
        switch (msg) {
            case 'avatarChoice':
                let avatarFrame = cc.instantiate(this.choiceAvatarFrame);
                avatarFrame.parent = this.node;
                break;
            case 'back':
                cc.director.loadScene('loadingSence');
                break;
            case 'commit':
                this.checkCommit();
                break;
            default:
                break;
        }
    },

    /*start () {

    },*/

    checkCommit:function(){
        if(global.userAvatarChoice === undefined || this.idEditBox.string === '' || this.nickNameEditBox.string === '' || this.emailEditBox.string === '' || this.passWord1EditBox.string === '' || this.passWord2EditBox.string === ''){
            if(global.userAvatarChoice === undefined){
                global.warningLableString.string = warningLines.registerLable[1];
            }else{
                global.warningLableString.string = warningLines.registerLable[4];
            }
        }else{
            let pattern= /^[0-9]+.?[0-9]*$/;
            let k  = pattern.test(this.idEditBox.string);
            if(k){
                pattern= /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                k  = pattern.test(this.emailEditBox.string);
                if(k){
                    if(this.passWord1EditBox.string !== this.passWord2EditBox.string){
                        global.warningLableString.string = warningLines.registerLable[3];
                    }else{
                        this.warningLable.string = warningLines.registerLable[0];
                        global.socket.registerUser(
                            this.idEditBox.string,
                            global.userAvatarChoice,
                            this.nickNameEditBox.string,
                            this.emailEditBox.string,
                            this.passWord1EditBox.string,function(err,data){
                                if(err){
                                    console.log('register errr!');
                                }else{
                                    let callbackData = parseInt(data);
                                    global.warningLableString.string = warningLines.registerCallback[callbackData];
                                    if(callbackData === 0){
                                        /*component.schedule(function() {
                                            cc.director.loadScene('loadingSence');
                                        }, 3);*/
                                        cc.director.loadScene('loadingSence');
                                    }
                                    console.log('register success data is = ' + JSON.stringify(data));
                                }
                            });
                    }
                }else{
                    global.warningLableString.string = warningLines.registerLable[2];
                }
            }else{
                global.warningLableString.string = warningLines.registerLable[5];
            }

        }
    },

    update (dt) {
        this.userAvatar.getComponent(cc.Sprite).spriteFrame = this.avatarSprite.getSpriteFrame(global.userAvatarChoice);
    },
});
