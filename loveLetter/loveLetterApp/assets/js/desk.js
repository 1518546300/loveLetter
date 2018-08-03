var global = require("./global");
var massageCard = require("./massageCard");

cc.Class({
    extends: cc.Component,

    properties: {
        cards:{
            default:null,
            type:cc.Prefab
        },
        cardlabal:{
            default:null,
            type:cc.Prefab,
        },
        chupaiButton:{
            default:null,
            type:cc.Button
        },
        wordLabel:{
            default:null,
            type:cc.Label,
        }, 
    },

    onLoad () {
        global.get_number = ((k) => {
            this.get_number(k);
        });
        global.bflag=0;
        global.cflag=0;
        global.dflag=0;
        global.cardMove = [];
        global.cardNum2 = [];
        this.cartInstantiate();
        for(let i=0;i<2;i++){
            global.cardMove[i].position = {
                x:-50 + i * 100,
                y:-220, 
            }; 
        };
        global.labal = cc.instantiate(this.cardlabal);
        global.labal.parent = this.node;
        global.labal.position = {
            x:2000,
            y:2000,
        };
        global.labalScence = cc.instantiate(this.cardlabal);
        global.labalScence.parent = this.node;
        global.labalScence.position = {
            x:2000,
            y:2000,
        };
        this.cardButtonClickedFunction1();
    },
    cartInstantiate:function(){
        for(let i=0;i<3;i++){
            global.get_number();
            //global.cardNum2[i]=global.rankCard;
            global.cardMove[i] = cc.instantiate(this.cards);
            global.cardMove[i].parent = this.node;
            global.cardMove[i].position = {
                x:2000,
                y:2000,
            };
            global.cardMove[i].cardNumber = global.rankCard;
        };
    },
    get_number:function(k){
        var a=Math.ceil(Math.random()*7 + 1);
        global.rankCard = a;
    },
    /* onDestroy () {
        this.node.off(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
    }, */
    /* onMouseDown: function(event) {
        let mouseType = event.getButton();
        if (mouseType === cc.Event.EventMouse.BUTTON_LEFT) {
            // 鼠标左键按下
            let mousePoint = event.getLocation();
            let localPoint = this.node.convertToNodeSpace(mousePoint);
            if(global.bflag==1){
                let hereX=event.getLocationX();
                let hereY=event.getLocationY();
                this.cancelPush(hereX,hereY);
                console.log('2 kaishi');
                event.stopPropagationImmediate();
            };
            if(global.bflag==0){
                let hereX=event.getLocationX();
                let hereY=event.getLocationY();
                this.pushCard(hereX,hereY);
                console.log('1 kaishi');
                event.stopPropagationImmediate();
            }; 
        };
    }, */
    /* onMouseUp: function(event) {
        let mouseType = event.getButton();
        if (mouseType === cc.Event.EventMouse.BUTTON_LEFT) {
            let mousePoint = event.getLocation();
            let localPoint = this.node.convertToNodeSpace(mousePoint);
            this.onDestroy();
            this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
        };
    }, */
    chupaiButtonClickedFunction: function(){ 
        if(global.aflag==0&&global.bflag==1){
            global.cardMove[0].position = {
                x:0,
                y:0,
            };
            global.cardMove[1].position = {
                x:0,
                y:-220, 
            };
            global.labalScence.position = {
                x:2000,
                y:2000,
            };
            global.cflag=1; 
        };
        if(global.aflag==1&&global.bflag==1){
            global.cardMove[1].position = {
                x:0,
                y:0, 
            };
            global.cardMove[0].position = {
                x:0,
                y:-220, 
            };
            global.labalScence.position = {
                x:2000,
                y:2000,
            };
            global.cflag=1;
        };
    },
    cancelPush:function(l,m){
        if(m<160&&m>40){
            if(global.aflag==0 && l>390 && l<470 && global.cflag==0){
                global.cardMove[0].position = {
                    x:-50,
                    y:-220,
                };  
                global.bflag=0;
                global.labalScence.position = {
                    x:2000,
                    y:2000,
                };
                console.log(global.labalScence.position);
                
            };
            if(global.aflag==1 && l>485 && l<572 && global.cflag==0){
                global.cardMove[1].position = {
                    x:50,
                    y:-220, 
                };
                global.bflag=0;
                global.labalScence.position = {
                    x:2000,
                    y:2000,
                };
            };
        };
       
    },
    
    pushCard:function(l,m){
        if(m<160 && m>40){
            if(l>390 && l<470){
                global.cardMove[0].position = {
                    x:-50,
                    y:-200,
                };
                global.aflag=0;
                global.bflag=1; 
                global.labalScence.position={
                    x:0,
                    y:100,
                };
                global.cardNowNumber = global.cardMove[0].cardNumber;
                global.changeCardLabel();
            };
            if(l>485 && l<572){
                global.cardMove[1].position = {
                    x:50,
                    y:-200,
                };

                global.zflag=1;
                global.labalScence.position={
                    x:0,
                    y:100,
                };
                global.cardNowNumber = global.cardMove[1].cardNumber;
                global.changeCardLabel();
        
                global.aflag=1;
                global.bflag=1;    
           };
        };
    },
    cardButtonClickedFunction1: function(){
            this.node.on(cc.Node.EventType.MOUSE_DOWN, function (event) {
                let hereX=event.getLocationX();
                let hereY=event.getLocationY();
                if(global.dflag==0){
                    if(global.bflag==1){
                        this.cancelPush(hereX,hereY);
                        console.log('2 kaishi');
                        event.stopPropagationImmediate();
                        global.dflag=1;
                    };
                 };
                if(global.dflag==0){
                    if(global.bflag==0){
                        let hereX=event.getLocationX();
                        let hereY=event.getLocationY();
                        this.pushCard(hereX,hereY);
                        console.log('1 kaishi');
                        event.stopPropagationImmediate();
                        global.dflag=1;
                    };
                };
               
            }, this);
        this.node.on(cc.Node.EventType.MOUSE_UP, function (event) {
            global.dflag=0;
        }, this);
    },
});
