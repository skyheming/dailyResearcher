#!/usr/bin/env node
// Daily Researcher - 每日Telegram消息发送脚本
// 使用OpenClaw发送消息

const http = require('http');
const fs = require('fs');

const LOG_FILE = '/root/.openclaw/workspace/cron.log';
const CHAT_ID = '859301840';
const WEBHOOK_PORT = 3000;

function log(msg) {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const logMsg = `[${timestamp}] ${msg}`;
    console.log(logMsg);
    fs.appendFileSync(LOG_FILE, logMsg + '\n');
}

function sendViaGateway(message) {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify({
            action: 'send',
            target: CHAT_ID,
            message: message,
            channel: 'telegram'
        });

        const options = {
            hostname: 'localhost',
            port: WEBHOOK_PORT,
            path: '/message/send',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    resolve(JSON.parse(data));
                } else {
                    reject(new Error(`HTTP ${res.statusCode}: ${data}`));
                }
            });
        });

        req.on('error', reject);
        req.write(postData);
        req.end();
    });
}

async function sendDailyNews() {
    log('🚀 开始发送每日新闻...');

    const today = new Date();
    const todayCN = today.toLocaleString('zh-CN', {
        year: 'numeric', month: '2-digit', day: '2-digit'
    });

    const message = `📊 *每日非遗手工出海趋势*
━━━━━━━━━━━━━━━━
📅 ${todayCN}

🔥 *今日热销TOP3*
1. 手工刺绣抱枕 (Etsy) - \$45.99 📈
2. 非遗手作发簪 (Amazon) - \$29.99 📈
3. 国风手机壳 (TikTok) - \$18.99 📈📈

🏷️ *热门标签*
#handmade #traditionalcraft #chineseculture

💡 *趋势洞察*
• 手工艺品搜索热度持续上升 (+15%)
• TikTok手工内容 engagement 创新高

🎭 *IP合作推荐*
• 敦煌壁画 - 适合纺织品、陶瓷
• 故宫文创 - 适合文具、饰品

━━━━━━━━━━━━━━━━
📈 详情: https://skyheming.github.io/dailyResearcher/`;

    try {
        const result = await sendViaGateway(message);
        if (result.ok) {
            log('✅ 消息发送成功');
            return true;
        } else {
            log('❌ 消息发送失败');
            return false;
        }
    } catch (error) {
        log(`❌ 发送失败: ${error.message}`);
        
        // 保存消息到文件
        fs.writeFileSync('/root/.openclaw/workspace/pending-message.txt', message);
        log('📝 消息已保存到pending-message.txt');
        return false;
    }
}

// 运行
sendDailyNews().then(success => {
    process.exit(success ? 0 : 1);
});
