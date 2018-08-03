var global = require("./global");

cc.Class({
    extends: cc.Component,

    properties: {
        homelist:{
            default:null,
            type:cc.Prefab
        },
    },

    onLoad () {
        global.homeflag=0;
        global.homelist = cc.instantiate(this.homelist);
        global.homelist.parent = this.node;
        global.homelist.position={
            x:2000,
            x:2000,
        };
    },
    buildhomeButton:function(){
        cc.director.loadScene('waitingScene');
    },
    cancelButton:function(){
        if(global.homeflag==1){
            global.homelist.position = {
                x:2000,
                y:2000,
            };
            
        }else{
            cc.director.end();
        }
        global.homeflag=0;
    },
    joingfButton:function(){
        global.homelist.position = {
            x:0,
            y:-60,
        };
        global.homeflag=1;
    },
});
