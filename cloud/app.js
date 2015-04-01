// 在 Cloud code 里初始化 Express 框架
var express = require('express');
var common = require('cloud/common.js');
var main = require('cloud/main.js');
var app = express();

// App 全局配置
app.use(express.bodyParser());    // 读取请求 body 的中间件
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type");
  res.header("Access-Control-Allow-Methods", "POST");
  next();
});

APPID = AV.applicationId; // 你的应用 id
MASTER_KEY = AV.masterKey; //你的应用 master key

// 使用 Express 路由 API 服务
//为聊天 SDK 登陆服务器的签名
app.post('/signConnect', function(request, response) {
   var client_id = request.body['client_id'];  // 当前用户的 client_id
   var super_peer = request.body['sp']; //是否超级用户

   var result = common.signConnect(client_id,super_peer);

   response.set({'Access-Control-Allow-Origin': request.get('Origin') || "*"})
       .json(result);
});

//为创建对话的签名
app.post('/signStartConversation', function(request, response) {
    var client_id = request.body['client_id'];
    var convId = request.body['convid'] || [];

    var result = common.signQueryHistory(client_id,memberIds);

    response.set({'Access-Control-Allow-Origin': request.get('Origin') || "*"})
       .json(result);
});

//为对话成员管理的签名
app.post('/signActionOnCoversation', function(request, response) {
    var conversationId = request.body['conversation_id'];
    var client_id = request.body['client_id'];
    var memberIds = request.body['member_ids'] || [];
    var action = request.body['action'];

    var result = common.signActionOnConversation(conversationId,client_id,memberIds,action);

    response.set({'Access-Control-Allow-Origin': request.get('Origin') || "*"})
           .json(result);
});

//为聊天历史记录的签名
app.post('signQueryHistory',function(request, response) {
     var client_id = request.params['client_id'];
     var convId = request.params['convid'] || [];

     var result = common.signQueryHistory(client_id,memberIds);

     response.set({'Access-Control-Allow-Origin': request.get('Origin') || "*"})
                .json(result);
});

// 最后，必须有这行代码来使 express 响应 HTTP 请求
app.listen();
