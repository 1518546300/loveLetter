const mysql = require('mysql');
let client = undefined;
const query = function(sql , cb){
    console.log('query = ' + sql);
    client.getConnection(function(err , connection){
        if(err){
            console.log('Connect mysql err = ' + err);
            cb(err);
            throw err;
        }else{
            connection.query(sql , function(connerr , result , fileds){
                if(connerr){
                    console.log('query connect err = ' + connerr);
                    cb(connerr);
                }else{
                    cb(null , result);
                }
                connection.release();
            });
        }
    })
};

const insertSql = function(table , data){
    let sql = 'insert into ' + table;
    let valuesStr = ' values(';
    let keyStr = '(';
    for(let i in data){
        keyStr += i + ',';
        valuesStr += "'" + data[i] + "'" + ',';
    }
    keyStr = keyStr.substring(0 , keyStr.length - 1);
    valuesStr = valuesStr.substring(0 , valuesStr.length - 1);
    keyStr += ')';
    valuesStr += ')';
    sql += keyStr + valuesStr;
    return sql;
};

const updateSql = function(table , mainKey , mainValue , data){
    //let sql = table + mainKey + JSON.stringify(data) + '';
    let sql = 'update ' + table + ' set ';
    for(let i in data){
        sql += i + '=' + "'" + data[i] + "'" + ',';
    }
    sql = sql.substring(0 , sql.length - 1);
    sql += ' where ' + mainKey + '=' + "'" + mainValue + "'" + ';';
    return sql;
};

exports.checkPlayerId = function(uniqueID , cb){
    //检查玩家数据
    let sql = 'select * from t_userData where userId = ' + uniqueID + ';';
    query(sql , function(err , data){
        if(err){
            console.log('err = ' + err);
        }
        console.log('check player = ' + JSON.stringify(data));
        cb(err , data);
    });
};

exports.checkPlayerPassWord = function(id , password , cb){
    //检查玩家数据
    let sql = 'select * from t_userData where userId = ' + "'" + id +  "' and " + 'userPassword = ' + "'" + password + "'" + ';';
    query(sql , function(err , data){
        if(err){
            console.log('err = ' + err);
        }
        console.log('check player = ' + JSON.stringify(data));
        cb(err , data);
    });
};

exports.checkPlayerNickName = function(nickName , cb){
    //检查玩家数据
    let sql = 'select * from t_userData where userNickName = ' + "'" + nickName +  "'" + ';';
    query(sql , function(err , data){
        if(err){
            console.log('err = ' + err);
        }
        console.log('check player = ' + JSON.stringify(data));
        cb(err , data);
    });
};

exports.insertPlayerInfo = function(data){
    //插入玩家数据
    let sql = insertSql('t_userData' , data);
    console.log('sql = ' + sql);
    query(sql , function (err , res) {
        if(err){
            console.log('insert playerinfo err = ' + err);
        }else{
            console.log('res = ' + JSON.stringify(res));
        }
    })
    //let sql = 'insert into t_playerinfo (unique_id , uid , nickname , avatar_url) values(' + data.uniqueID +',' + data.uid + ',' + data.nickname + ',' + data.avatarUrl + '')';
};

exports.updatePlayerInfo = function(mainKey , mainValue , data){
    //更新玩家数据
    let sql = updateSql('t_userData' , mainKey , mainValue , data);
    query(sql , function(err , data){
        if(err){
            console.log('update player info err = ' + err);
        }else{
            console.log('update player info success = ' + JSON.stringify(data));
        }
    });
};

exports.connect = function(config){
    client = mysql.createPool(config);
};