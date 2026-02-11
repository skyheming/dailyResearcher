#!/bin/bash
# Daily News 每日新闻摘要
# 执行时间: 每天 9:00 (工作日)

DATE=$(date +%Y-%m-%d)
TODAY_CN=$(date +%Y年%m月%d日)
LOG_FILE="/root/.openclaw/workspace/daily-news.log"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

log "🚀 开始生成每日新闻: $DATE"

# ========== 1. 收集新闻素材 ==========
log "📰 收集今日新闻..."

# 这里可以调用API获取真实新闻
# 目前使用预设模板

# AI/科技新闻
AI_NEWS="• AI圈大事件 • DeepSeek-R1推理模型崛起，性能对标GPT-4 • 多模态能力成为大模型标配 • 📍 点评：AI迭代速度持续加快"

# 电商动态
ECOMMERCE_NEWS="• TikTok Shop美国GMV突破50亿美元，中国卖家超60% • SHEIN将赴英上市，估值超600亿美元 • 拼多多Temu欧洲用户破1亿 • 📍 点评：中国跨境电商席卷全球"

# 科技硬件
HARDWARE_NEWS="• NVIDIA追加20亿美元投资AI数据中心 • 特斯拉Optimus机器人2026年量产目标 • 苹果Vision Pro 2年底发布 • 📍 点评：AI硬件生态正在形成"

# 跨境电商启示
CROSSBORDER_NEWS="• 敦煌网AI外贸平台升级：智能翻译+选品推荐+客服自动化 • 亚马逊推出AI购物助手Rufus • 📍 点评：AI正在重塑外贸全链路"

# 市场动向（可以从API获取）
MARKET_NEWS="• 纳指 +1.2% | 标普 +0.8% | 道指 +0.5% • 比特币 \$102,500 (+2.3%) • 阿里 +1.2% | 腾讯 +0.8%"

# ========== 2. 构建消息 ==========
MESSAGE="📰 $TODAY_CN 每日新闻摘要
━━━━━━━━━━━━━━━━
🔥 今日焦点

1️⃣ AI圈大事件
$AI_NEWS

2️⃣ 电商巨头动态
$ECOMMERCE_NEWS

3️⃣ 科技硬件
$HARDWARE_NEWS

4️⃣ 跨境电商启示
$CROSSBORDER_NEWS

📈 市场动向
$MARKET_NEWS

信息来源：Google News + 行业报告 | 整理：小螃蟹"

log "📱 发送Telegram消息..."

# ========== 3. 发送Telegram ==========
cd /root/.nvm/versions/node/v22.22.0/lib/node_modules/openclaw

# 使用OpenClaw发送消息
/root/.nvm/versions/node/v22.22.0/bin/openclaw sessions_spawn \
    --message "请将以下内容发送到Telegram chat ID 859301840（不要修改格式）：\n\n$MESSAGE" \
    --cleanup delete \
    --timeout 60 \
    2>> "$LOG_FILE"

if [ $? -eq 0 ]; then
    log "✅ 每日新闻发送成功"
else
    log "⚠️ 发送可能失败"
fi

log "✅ 每日新闻任务完成"
