#!/bin/bash
# Daily Researcher - 每日自动执行脚本
# 执行时间: 每天 9:00 GMT+8

DATE=$(date +%Y-%m-%d)
TODAY_CN=$(date +%Y年%m月%d日)
LOG_FILE="/root/.openclaw/workspace/cron.log"

# 从环境变量获取GitHub token (如果没有则从文件读取)
if [ -z "$GH_TOKEN" ]; then
    GH_TOKEN=$(cat ~/.config/github_token 2>/dev/null || echo "")
fi

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "🚀 ========== 开始执行每日任务 =========="

# 检查是否是工作日 (周一到周五, 1-5)
WEEKDAY=$(date +%u)
if [ "$WEEKDAY" -ge 6 ]; then
    log "周末，跳过新闻调研任务"
    exit 0
fi

log "📰 收集每日新闻..."

# 创建今日数据目录
mkdir -p /root/.openclaw/workspace/data/competitor/$DATE
mkdir -p /root/.openclaw/workspace/data/social/$DATE

# ... 其余脚本内容
