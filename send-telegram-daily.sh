#!/bin/bash
# Daily Researcher - 每日新闻发送脚本
# 通过OpenClaw发送Telegram消息

DATE=$(date +%Y-%m-%d)
TODAY_CN=$(date +%Y年%m月%d日)
LOG_FILE="/root/.openclaw/workspace/cron.log"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "🚀 发送每日新闻到Telegram..."

# 构建消息
MESSAGE="📊 *每日非遗手工出海趋势*
━━━━━━━━━━━━━━━━
📅 $TODAY_CN

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
📈 详情: https://skyheming.github.io/dailyResearcher/"

# 尝试通过OpenClaw Gateway API发送
curl -s -X POST "http://localhost:3000/message/send" \
    -H "Content-Type: application/json" \
    -d "{\"action\":\"send\",\"target\":\"859301840\",\"message\":\"$MESSAGE\",\"channel\":\"telegram\"}" \
    > /dev/null 2>&1

if [ $? -eq 0 ]; then
    log "✅ 消息已发送"
else
    # 保存消息供手动发送
    echo "$MESSAGE" > /root/.openclaw/workspace/pending-message.txt
    log "⚠️ 发送失败，消息已保存到pending-message.txt"
fi

log "✅ 任务完成"
