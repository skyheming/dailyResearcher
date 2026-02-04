#!/bin/bash

# Daily Researcher - GitHub Pages Deploy Script

# 配置
REPO_DIR="/root/.openclaw/workspace/github-pages"
GITHUB_REPO="skyheming/dailyResearcher"
BRANCH="main"
COMMIT_MSG="Update data - $(date '+%Y-%m-%d %H:%M:%S')"

echo "🚀 开始部署到GitHub Pages..."
echo "📁 目录: $REPO_DIR"

# 检查是否是git仓库
if [ ! -d "$REPO_DIR/.git" ]; then
    echo "📦 初始化Git仓库..."
    cd "$REPO_DIR"
    git init
    git checkout -b $BRANCH
    git remote add origin "https://github.com/$GITHUB_REPO.git"
else
    echo "✅ Git仓库已存在"
    cd "$REPO_DIR"
    git status
fi

# 拉取最新代码
echo "📥 拉取最新代码..."
git pull origin $BRANCH --rebase || echo "⚠️ 拉取失败，继续执行..."

# 添加所有文件
echo "📝 添加文件..."
git add -A

# 提交
echo "💾 提交更改..."
git commit -m "$COMMIT_MSG" || echo "⚠️ 没有新内容需要提交"

# 推送到GitHub
echo "🚀 推送到GitHub..."
git push origin $BRANCH || echo "❌ 推送失败"

echo ""
echo "✅ 部署完成！"
echo "🌐 网站将在几分钟内更新: https://skyheming.github.io/dailyResearcher/"
