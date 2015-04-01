require("cloud/app.js");

var common = require('cloud/common.js');

APPID = AV.applicationId; // 你的应用 id
MASTER_KEY = AV.masterKey; //你的应用 master key

//为聊天 SDK 登陆服务器的签名
AV.Cloud.define("connect", function(request, response) {
  var client_id = request.params['client_id'];
  var super_peer = request.params['sp'];

  var result = common.signConnect(client_id,super_peer);

  response.success(result);
});

//为创建对话的签名
AV.Cloud.define("startConversation", function (request, response) {
     var client_id = request.params['client_id'];
     var memberIds = request.params['member_ids'] || [];
     var result = common.signCreateConversation(client_id,memberIds);
     response.success(result)
});

//为对话成员管理的签名
AV.Cloud.define("actionOnCoversation", function (request, response) {
    var conversationId = request.params['conversation_id'];
    var client_id = request.params['client_id'];
    var memberIds = request.params['member_ids'] || [];
    var action = request.params['action'];

    var result = common.signActionOnConversation(conversationId,client_id,memberIds,action);

    response.success(result)

});

//为聊天历史记录的签名
AV.Cloud.define("queryHistory", function (request, response) {
     var client_id = request.params['client_id'];
     var convId = request.params['convid'] || [];

     var result = common.signQueryHistory(client_id,memberIds);

     response.success(result)
});

// 实时通信云代码 hook，消息到达
AV.Cloud.define("_messageReceived", function(request, response) {
  // 关于 request 中可用的参数可以查看文档
  // https://leancloud.cn/docs/realtime.html#%E4%BA%91%E4%BB%A3%E7%A0%81-hook
  response.success({});
});

// 实时通信云代码 hook，收件人离线
AV.Cloud.define("_receiversOffline", function(request, response) {
  // 关于 request 中可用的参数可以查看文档
  // https://leancloud.cn/docs/realtime.html#%E4%BA%91%E4%BB%A3%E7%A0%81-hook
  response.success({});
});
