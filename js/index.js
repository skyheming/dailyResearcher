// Daily Researcher - Index Page JavaScript

document.addEventListener('DOMContentLoaded', async function() {
    console.log('📊 Daily Researcher Dashboard loaded');
    
    // 更新显示时间
    Utils.updateTime();
    
    // 加载数据
    const data = await DataManager.loadAllData();
    
    if (data.competitor) {
        renderHotTopics(data.competitor);
        renderTagCloud(data.competitor);
        renderCharts(data);
    }
    
    if (data.social) {
        renderTagCloudFromSocial(data.social);
    }
});

// 渲染热门话题
function renderHotTopics(data) {
    const container = document.getElementById('hot-topics');
    if (!container || !data.hotProducts) return;
    
    const hotProducts = data.hotProducts.slice(0, 5);
    
    container.innerHTML = hotProducts.map((product, index) => `
        <li class="product-item">
            <span class="product-rank">${index + 1}</span>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-meta">${product.platform} · ${product.price}</div>
            </div>
            <span class="product-price">${product.sales}</span>
        </li>
    `).join('');
}

// 渲染标签云
function renderTagCloud(data) {
    const container = document.getElementById('tag-cloud');
    if (!container || !data.trendingTags) return;
    
    const maxCount = Math.max(...data.trendingTags.slice(0, 15).map(t => t.count));
    
    container.innerHTML = data.trendingTags.slice(0, 15).map(tag => `
        <span class="tag ${Utils.getTagSize(tag.count, maxCount)}" title="${tag.count.toLocaleString()} posts">
            ${tag.name}
        </span>
    `).join('');
}

// 从社交数据渲染标签云
function renderTagCloudFromSocial(data) {
    const container = document.getElementById('tag-cloud');
    if (!container || !data.platformTrends) return;
    
    const tiktokData = data.platformTrends.find(p => p.platform === 'TikTok');
    if (!tiktokData || !tiktokData.topTags) return;
    
    // 如果竞品数据的标签云已有内容，跳过
    const existingContent = container.innerHTML;
    if (existingContent && existingContent.trim() !== '') return;
    
    const maxCount = Math.max(...tiktokData.topTags.slice(0, 15).map(t => t.count));
    
    container.innerHTML = tiktokData.topTags.slice(0, 15).map(tag => `
        <span class="tag ${Utils.getTagSize(tag.count, maxCount)}" title="${tag.count.toLocaleString()} posts">
            ${tag.name}
        </span>
    `).join('');
}

// 渲染图表
function renderCharts(data) {
    // 趋势图表
    const trendCtx = document.getElementById('trendChart');
    if (trendCtx && data.competitor && data.competitor.trendData) {
        const trendData = data.competitor.trendData;
        ChartUtils.createLineChart(trendCtx.getContext('2d'), trendData.labels, trendData.datasets);
    }
    
    // 品类分布图表
    const categoryCtx = document.getElementById('categoryChart');
    if (categoryCtx && data.competitor && data.competitor.categoryDistribution) {
        const catData = data.competitor.categoryDistribution;
        ChartUtils.createPieChart(categoryCtx.getContext('2d'), catData.labels, catData.data);
    }
}

// 页面刷新时更新
setInterval(() => {
    Utils.updateTime();
    DataManager.loadAllData();
}, CONFIG.updateInterval);
