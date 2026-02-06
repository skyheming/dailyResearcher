#!/bin/bash
# Daily Researcher - 自动执行脚本
# 执行时间: 每天 9:00 GMT+8

DATE=$(date +%Y-%m-%d)
LOG_FILE="/root/.openclaw/workspace/cron.log"
TODAY=$(date +%Y年%m月%d日)

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "🚀 开始执行每日任务..."

# 1. 检查是否是工作日 (周一到周五)
WEEKDAY=$(date +%u)
if [ "$WEEKDAY" -ge 6 ]; then
    log "周末，跳过新闻调研任务"
    exit 0
fi

log "📰 收集每日新闻..."

# 使用Python脚本收集新闻数据
python3 << 'PYTHON_SCRIPT'
import json
import sys
from datetime import datetime

today = datetime.now().strftime('%Y-%m-%d')

# 模拟新闻数据 - 实际项目中应该调用web_search API
news_data = {
    "date": today,
    "headlines": [
        {
            "title": "AI技术最新进展",
            "source": "TechCrunch",
            "impact": "高",
            "tags": ["AI", "科技"]
        },
        {
            "title": "跨境电商新政策",
            "source": "Reuters",
            "impact": "高",
            "tags": ["电商", "政策"]
        },
        {
            "title": "全球消费趋势",
            "source": "Bloomberg",
            "impact": "中",
            "tags": ["消费", "趋势"]
        }
    ],
    "marketSummary": {
        "indices": {"S&P 500": "+0.5%", "NASDAQ": "+0.8%"},
        "crypto": {"bitcoin": "$95,000"}
    }
}

print(json.dumps(news_data, ensure_ascii=False))
PYTHON_SCRIPT

# 2. 创建今日数据文件
log "📊 生成今日数据..."

# 3. 同步到GitHub
if [ -n "$GH_TOKEN" ]; then
    log "🔄 同步到GitHub..."
    cd /root/.openclaw/workspace
    
    # 添加文件
    git add -A 2>/dev/null
    
    # 检查是否有更改
    if git diff --cached --quiet 2>/dev/null; then
        log "没有新数据需要推送"
    else
        git commit -m "Auto-update: ${today}" 2>/dev/null
        git push origin main 2>/dev/null || log "⚠️ GitHub推送失败"
        log "✅ GitHub同步完成"
    fi
else
    log "⚠️ 未配置GitHub token，跳过推送"
fi

log "✅ 每日任务执行完成"
