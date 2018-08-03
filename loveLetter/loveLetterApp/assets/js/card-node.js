var global = require("./global");
var massageCard = require("./massageCard");
cc.Class({
    extends: cc.Component,
    properties: {
        cardSprite:{
            default:null,
            type:cc.SpriteAtlas
        },
    },

    onLoad () {
        this.addComponent(cc.Sprite).spriteFrame = this.cardSprite.getSpriteFrame(global.rankCard);
    },
});
