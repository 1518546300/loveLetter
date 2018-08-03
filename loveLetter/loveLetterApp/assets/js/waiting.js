var global = require("./global");
cc.Class({
    extends: cc.Component,

    properties: {
        
        myFriends:{
            default:null,
            type:cc.Prefab
        },
        friend1:{
            default:null,
            type:cc.Prefab
        },
       
    },

    onLoad () {
        /* global.myFriends = cc.instantiate(this.myFriends);
        global.myFriends.parent = this.node;
        global.myFriends.position = {
            x:2000,
            y:2000,
        };
        global.Friend=[];
        for(let i=0;i<4;i++){
            global.Friend[i] = cc.instantiate(this.friend1);
            global.Friend[i].parent = this.node;
        };
        global.Friend[0].position = {
            x:2000,
            y:2000,
        };
        global.Friend[1].position = {
            x:2000,
            y:2000,
        };
        global.Friend[2].position = {
            x:2000,
            y:2000,
        };
        global.Friend[3].position = {
            x:2000,
            y:2000,
        };
        console.log(global.myFriends.position); */
    },
    beginButton:function(){
        cc.director.loadScene('gameSence');
    },
    inviteFriendsButton:function(){
        /* global.myFriends.position = {
            x:-300,
            y:-150,
        };
        console.log(global.myFriends.position); */
    },
});
