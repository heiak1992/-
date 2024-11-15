const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// 获取 access token
app.post('/get-token', async (req, res) => {
    try {
        const { API_KEY, SECRET_KEY } = req.body;
        const response = await axios.post(
            `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${API_KEY}&client_secret=${SECRET_KEY}`
        );
        console.log('Token response:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Token error:', error.response?.data || error.message);
        res.status(500).json({ error: error.message });
    }
});

// 调用文心一言API
app.post('/chat', async (req, res) => {
    try {
        const { message, access_token } = req.body;
        console.log('Sending message to API:', message);

        const response = await axios.post(
            'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions_pro',
            {
                messages: [{
                    role: 'user',
                    content: message
                }],
                stream: false,
                temperature: 0.95,
                top_p: 0.8
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                }
            }
        );
        
        console.log('Raw API Response:', JSON.stringify(response.data, null, 2));
        
        // 检查API错误
        if (response.data.error_code) {
            throw new Error(`API Error: ${response.data.error_msg}`);
        }
        
        // 检查所有可能的响应格式
        let result = null;
        if (response.data.result) {
            result = response.data.result;
        } else if (response.data.response) {
            result = response.data.response;
        } else if (response.data.results && response.data.results.length > 0) {
            result = response.data.results[0].content;
        } else if (response.data.content) {
            result = response.data.content;
        } else if (response.data.choices && response.data.choices.length > 0) {
            result = response.data.choices[0].content;
        }

        if (!result) {
            console.error('API Response Structure:', response.data);
            throw new Error('无法从API响应中提取内容');
        }
        
        // 发送响应
        res.json({ result });
        
        // 记录成功的响应
        console.log('Processed response:', { result });
        
    } catch (error) {
        // 详细的错误日志
        console.error('Chat error:', error);
        if (error.response) {
            console.error('Error response:', {
                status: error.response.status,
                headers: error.response.headers,
                data: error.response.data
            });
        }
        
        // 发送错误响应
        res.status(500).json({ 
            error: error.message,
            details: error.response?.data || '未知错误'
        });
    }
});

// 健康检查端点
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('等待连接...');
    console.log('提示：确保已经正确配置了API密钥');
});

// 优雅关闭
process.on('SIGTERM', () => {
    console.log('收到 SIGTERM 信号，准备关闭服务器...');
    server.close(() => {
        console.log('服务器已关闭');
        process.exit(0);
    });
});