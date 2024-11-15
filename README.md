智能语音助手系统（我的邮箱： heiak@foxmail.com）。
一、软件介绍
这是一个基于网页的智能语音助手系统，具有以下功能：
·  语音唤醒（唤醒词："小路"）
·  语音对话
·  智能问答（基于百度文心一言）
·  语音合成（文字转语音回答）
二、准备工作
·  环境要求
·  # 安装 Node.js（建议 v14 或更高版本）
·  # 从 https://nodejs.org 下载并安装
·  # 创建项目文件夹
·  mkdir zhinengyinxiang
·  cd zhinengyinxiang
·  # 初始化项目
·  npm init -y
·  # 安装必需的包
·  npm install express cors axios
·  
·  ·  获取百度文心一言 API 密钥
·  访问百度千帆 AI 开放平台：https://console.bce.baidu.com/qianfan/ais/console/applicationConsole/application
·  注册/登录账号
·  创建应用，获取 API Key 和 Secret Key
·  开通文心一言服务
·  文件结构
zhinengyinxiang/
·  ├── server.js
·  ├── package.json
·  └── public/
·      └── index.html
·  
·  三、使用方法
·  配置密钥
·  打开 public/index.html
·  找到以下代码并填入您的密钥：
const API_KEY = '您的API Key';
·  const SECRET_KEY = '您的Secret Key';
·  
·  ·  启动服务器
Bash
·  Ask
·  Copy
·  Run
·  # 在项目根目录下运行
·  node server.js
·  # 看到以下输出表示启动成功：
·  Server running on http://localhost:3000
·  等待连接...
·  
·  ·  使用系统
·  打开浏览器访问：http://localhost:3000
·  允许浏览器使用麦克风
·  说出唤醒词"小路"
·  听到"我在听"后说出您的问题
·  等待 AI 回答
四、常见问题解决
·  麦克风权限
·  确保浏览器有麦克风使用权限
·  Chrome 设置 → 隐私设置和安全性 → 网站设置 → 麦克风
·  语音识别问题
·  确保使用支持语音识别的浏览器（推荐 Chrome）
·  确保网络连接稳定
·  说话时保持适当音量和清晰度
·  API 认证失败
·  检查 API Key 和 Secret Key 是否正确填写
·  确认千帆平台服务是否正常开通
·  检查 API 调用额度是否充足
五、注意事项
1. 浏览器兼容性
·  推荐使用 Google Chrome 浏览器
·  需要支持 Web Speech API
·  网络要求
·  需要稳定的网络连接
·  建议使用有线网络或信号良好的 WiFi
·  使用限制
·  注意 API 的调用频率限制
·  遵守百度文心一言的使用规范
六、开发建议
如果您想进行二次开发：
·  可以修改唤醒词（修改 WAKE_WORD 常量）
·  可以调整 UI 样式（修改 CSS）
·  可以添加更多功能（如保存对话历史）
·  可以优化语音识别的准确度
