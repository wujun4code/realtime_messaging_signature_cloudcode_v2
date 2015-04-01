var crypto = require('crypto');

APPID = AV.applicationId; // 你的应用 id
MASTER_KEY = AV.masterKey; //你的应用 master key

function sign(text, key) {
  // Hmac-sha1 hex digest
  return crypto.createHmac('sha1', key).update(text).digest('hex');
}

function getNonce(chars){
  var d = [];
  for (var i=0; i<chars; i++) {
    d.push(parseInt(Math.random()*10));
  }
  return d.join('');
}

//登陆时的签名。
function signConnect(client_id,super_peer){
  // UTC 时间戳，秒数
  var ts = parseInt(new Date().getTime() / 1000);
  // 随机字符串
  var nonce = getNonce(5);

  // 构建签名消息
  var msg = [APPID, client_id, '', ts, nonce].join(':');
  if (super_peer) {
    msg = msg + ':sp';
  }

  // 签名
  sig = sign(msg, MASTER_KEY)

  // 回复：其中 nonce, timestamp, signature 是必要字段，
  // 需要客户端返回给实时通信服务
  return {
   "nonce": nonce,
   "timestamp": ts,
   "signature": sig,
   "sp": super_peer,
   "msg": msg
   };
}

//为对话的成员的操作签名。
function signActionOnConversation(conversationId,client_id,memberIds,action){

   // 排序
   memberIds.sort();

   var ts = parseInt(new Date().getTime() / 1000);
   var nonce = getNonce(5);

   // 构建签名消息

   msg = [APPID, client_id, conversationId, memberIds.join(':'), ts, nonce, action].join(':');

   sig = sign(msg, MASTER_KEY);

   // 返回结果,需要的主要是 nonce, timestamp, signature,
   // memberIds,conversationId,action,msg 这几个字段
   return {
    "nonce": nonce,
    "timestamp": ts,
    "signature": sig,
    "memberIds": memberIds,
    "conversationId": conversationId,
    "action": action,
    "msg": msg
    };
   //以上返回的签名是一个 合法 的签名，合法的意思是 client_id 可以 对 conversationId 进行 action 的操作
   //也就是签名这项操作就是为了鉴权，为了提供一个 Hook 给开发者去管理 Client 是否 对某一个 Conversation 有 某一个 Action 的操作权限，如果有就按照如上的代码正确返回
   //如果没有就返回一个错误的签名，错误的签名可以是任何字符串
}

//为创建对话的操作签名。
function signCreateConversation(client_id,memberIds){
   // 排序
   memberIds.sort();

   var ts = parseInt(new Date().getTime() / 1000);
   var nonce = getNonce(5);

   msg = [APPID, client_id, memberIds.join(':'), ts, nonce].join(':');

   sig = sign(msg, MASTER_KEY);

   // 返回结果，同上，需要的主要是 nonce, timestamp, signature,
   // memberIds 这几个字段
   return {
    "nonce": nonce,
    "timestamp": ts,
    "signature": sig,
    "memberIds": memberIds,
    "msg": msg
   };
}

//为调用获取聊天记录操作签名。
function signQueryHistory(client_id,convId){

    var ts = parseInt(new Date().getTime() / 1000);
    var nonce = getNonce(5);

    msg = [APPID, client_id, convId, ts, nonce].join(':');

    sig = sign(msg, MASTER_KEY);

    // 返回结果，同上，需要的主要是 nonce, timestamp, signature,
    return {
    "nonce": nonce,
    "timestamp": ts,
    "signature": sig,
    "convId": convId,
    "msg": msg
    };
}

module.exports = {
  'sign': sign,
  'getNonce': getNonce,
  'signConnect':signConnect,
  'signActionOnConversation':signActionOnConversation,
  'signCreateConversation':signCreateConversation,
  'signQueryHistory':signQueryHistory
};
