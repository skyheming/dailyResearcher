#!/bin/bash
# 生成完整的每日数据
# 包含所有必要的字段

DATE=$1
if [ -z "$DATE" ]; then
    DATE=$(date +%Y-%m-%d)
fi

TODAY_CN=$(echo $DATE | sed 's/\([0-9]*\)-\([0-9]*\)-\([0-9]*\)/\1年\2月\3日/')

echo "生成 $DATE 的数据..."

# 竞品数据 - 完整版
cat > /root/.openclaw/workspace/data/competitor/$DATE.json << EOF
{
  "date": "$DATE",
  "hotProducts": [
    {"name": "手工刺绣抱枕", "platform": "Etsy", "price": "\$45.99", "sales": "+120%"},
    {"name": "非遗手作发簪", "platform": "Amazon", "price": "\$29.99", "sales": "+85%"},
    {"name": "国风手机壳", "platform": "TikTok Shop", "price": "\$18.99", "sales": "+200%"},
    {"name": "陶瓷茶杯套装", "platform": "Etsy", "price": "\$89.00", "sales": "+65%"},
    {"name": "丝绸刺绣围巾", "platform": "Amazon", "price": "\$59.99", "sales": "+95%"}
  ],
  "trendingTags": [
    {"name": "handmade", "count": 1250000, "trend": "up"},
    {"name": "traditionalcraft", "count": 89000, "trend": "up"},
    {"name": "chineseculture", "count": 45000, "trend": "up"},
    {"name": "artisan", "count": 780000, "trend": "stable"},
    {"name": "giftideas", "count": 2300000, "trend": "up"}
  ],
  "trendData": {
    "labels": ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    "datasets": [
      {"label": "搜索热度", "data": [65, 72, 68, 75, 82, 78, 80]}
    ]
  },
  "categoryDistribution": {
    "labels": ["家居装饰", "服饰配件", "艺术品", "礼品", "其他"],
    "data": [35, 28, 18, 12, 7]
  }
}
EOF

# 社交数据 - 完整版
cat > /root/.openclaw/workspace/data/social/$DATE.json << EOF
{
  "date": "$DATE",
  "platformTrends": [
    {
      "platform": "TikTok",
      "topTags": [
        {"name": "handmadetok", "count": 890000, "trend": "up", "weeklyChange": "+15%", "engagement": "高"},
        {"name": "artisansoftiktok", "count": 560000, "trend": "up", "weeklyChange": "+22%", "engagement": "高"},
        {"name": "crafttok", "count": 2300000, "trend": "stable", "weeklyChange": "+3%", "engagement": "中"},
        {"name": "diyproject", "count": 1200000, "trend": "up", "weeklyChange": "+18%", "engagement": "中"},
        {"name": "homemade", "count": 3400000, "trend": "up", "weeklyChange": "+8%", "engagement": "高"}
      ]
    },
    {
      "platform": "Pinterest",
      "trendingPins": [
        {"title": "新中式客厅装饰", "category": "家居", "saveRate": "8.5%"},
        {"title": "汉服配饰灵感", "category": "时尚", "saveRate": "12.3%"},
        {"title": "传统纹样印花", "category": "艺术", "saveRate": "15.7%"}
      ]
    }
  ],
  "ipOpportunities": [
    {"name": "敦煌壁画", "category": "文化IP", "suitability": "适合纺织品、陶瓷", "priority": 1},
    {"name": "故宫文创", "category": "博物馆", "suitability": "适合文具、饰品", "priority": 2},
    {"name": "十二生肖", "category": "传统文化", "suitability": "适合礼品、装饰", "priority": 3},
    {"name": "水墨画", "category": "艺术", "suitability": "适合家居装饰", "priority": 4}
  ],
  "craftSuggestions": [
    {"craft": "苏绣", "direction": "现代家居装饰", "targetAudience": "欧美中高端消费者", "priority": "高"},
    {"craft": "苗族银饰", "direction": "时尚配饰", "targetAudience": "年轻女性", "priority": "中"},
    {"craft": "景德镇陶瓷", "direction": "餐具茶具", "targetAudience": "礼品市场", "priority": "高"},
    {"craft": "蜀绣", "direction": "服饰配件", "targetAudience": "收藏爱好者", "priority": "中"}
  ]
}
EOF

echo "✅ $DATE 数据生成完成"
