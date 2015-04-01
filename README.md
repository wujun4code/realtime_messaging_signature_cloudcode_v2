# LeanCloud 实时通信签名实例-云代码
LeanCloud 实时通信签名实例云代码版。

## 部署方法

* 下载本项目的代码，或者 clone 到本地
* 修改 /config/global.json 里面的配置项：

  ```
  {
    "applicationName" : "Signatire sapmle",
    "applicationId": "YOUR APPID",
    "applicationKey": "YOUR APPKEY",
    "global": {
        "avVersion": "0.3.1"
    }
  }
  ```
`applicationId` 和 `applicationKey` 需要替换成开发者自己的 LeanCloud 应用的 AppId 以及 AppKey。

* 部署到云代码，并且发布

## 调试方法

* 调试方法有2种：
 1. 使用 SDK 自带的 callCloudFunction 的方式，直接调用云函数
 2. 使用 HTTP 请求直接，直接请求对应 web hosting 的二级域名下的对应的方法


## 与 SDK 联调

在 iOS，Android，Windows Phone 等官方 SDK 中都有一个设置签名工厂的方法提供给开发者实现签名的 hook：

* iOS

  ```
  AVIMClient *imClient = [[AVIMClient alloc] init];
imClient.delegate = self;
imClient.signatureDataSource = signatureDelegate;
  ```
* Android
  
  ```
  AVIMClient.setSignatureFactory(factory)
  ```
* Windows Phone
  
  ```
  AVIMClient client = new AVIMClient("Tom");
client.SignatureFactory = new SampleSignatureFactory();//这里是一个开发者自己实现的接口的具体的类
  ```
  
只要开发者在实现指定的接口（代理，工厂）里面，调用本项目里面的 4 个方法，分别实现所需签名的种类即可。
SDK 在真正执行的时候会逐步的去调用接口里面的方法实现签名。 