var global = require("./global");

cc.Class({
    extends: cc.Component,

    properties: {

    },


    onLoad () {

    },

    buttonClicked:function (event , msg) {
        console.log(msg);
        switch (msg) {
            case 'close':
                global.userAvatarChoice = undefined;
                this.node.destroy();
                break;
            case 'confrimAvatar':
                global.userAvatarChoice = global.userAvatarChoice;
                this.node.destroy();
                break;
            case '0':
                global.userAvatarChoice = 0;
                break;
            case '1':
                global.userAvatarChoice = 1;
                break;
            case '2':
                global.userAvatarChoice = 2;
                break;
            case '3':
                global.userAvatarChoice = 3;
                break;
            case '4':
                global.userAvatarChoice = 4;
                break;
            case '5':
                global.userAvatarChoice = 5;
                break;
            default:
                break;
        }
    }

    /*start () {

    },*/

    // update (dt) {},
});
