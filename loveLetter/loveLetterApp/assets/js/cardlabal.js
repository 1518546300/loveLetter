var massageCard = require("./massageCard");
var global = require("./global");

cc.Class({
    extends: cc.Component,

    properties: {
        wordLabel:{
            default:null,
            type:cc.Label,
        }, 
    },
    onLoad () {
        this.wordLabel.string = massageCard.cardRuleInformation[global.cardNowNumber];
        global.changeCardLabel = (() => {
            this.changeCardLabel();
        });
    },

    changeCardLabel:function(){
        this.wordLabel.string = massageCard.cardRuleInformation[global.cardNowNumber];
    },
});
