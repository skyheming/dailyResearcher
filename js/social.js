// Daily Researcher - Social Trends Page JavaScript

document.addEventListener('DOMContentLoaded', async function() {
    console.log('🎨 Social trends page loaded');
    
    Utils.updateTime();
    
    const data = await DataManager.loadJSON('data/social-trends.json');
    
    if (data) {
        renderTikTokTags(data.platformTrends);
        renderPinterestTrends(data.platformTrends);
        renderYouTubeTrends(data.platformTrends);
        renderIPOpportunities(data.ipOpportunities);
        renderColorTrends(data.designTrends);
        renderMaterialTrends(data.designTrends);
        renderStyleTrends(data.designTrends);
        renderCraftSuggestions(data.craftSuggestions);
    }
});

// 渲染TikTok标签
function renderTikTokTags(platforms) {
    const tiktok = platforms.find(p => p.platform === 'TikTok');
    const container = document.getElementById('tiktok-tags');
    if (!container || !tiktok || !tiktok.topTags) return;
    
    container.innerHTML = tiktok.topTags.slice(0, 15).map(tag => `
        <div class="product-item">
            <span class="product-rank">#</span>
            <div class="product-info">
                <div class="product-name">${tag.name}</div>
                <div class="product-meta">${Utils.formatNumber(tag.count)} 帖子 · ${tag.engagement}</div>
            </div>
            <span class="product-price" style="color: ${tag.trend === 'up' ? '#27ae60' : '#e74c3c'};">
                ${tag.trend === 'up' ? '📈' : '📉'} ${tag.weeklyChange}
            </span>
        </div>
    `).join('');
}

// 渲染Pinterest趋势
function renderPinterestTrends(platforms) {
    const pinterest = platforms.find(p => p.platform === 'Pinterest');
    const container = document.getElementById('pinterest-trends');
    if (!container || !pinterest || !pinterest.trendingPins) return;
    
    container.innerHTML = pinterest.trendingPins.slice(0, 8).map((pin, index) => `
        <div class="product-item">
            <span class="product-rank">${index + 1}</span>
            <div class="product-info">
                <div class="product-name">${pin.title}</div>
                <div class="product-meta">${pin.category} · ${pin.saveRate}保存率</div>
            </div>
        </div>
    `).join('');
}

// 渲染YouTube趋势
function renderYouTubeTrends(platforms) {
    const youtube = platforms.find(p => p.platform === 'YouTube');
    const container = document.getElementById('youtube-trends');
    if (!container || !youtube || !youtube.trendingVideos) return;
    
    container.innerHTML = youtube.trendingVideos.slice(0, 8).map((video, index) => `
        <div class="product-item">
            <span class="product-rank">${index + 1}</span>
            <div class="product-info">
                <div class="product-name">${video.title}</div>
                <div class="product-meta">${Utils.formatNumber(video.views)}观看 · ${video.duration}</div>
            </div>
        </div>
    `).join('');
}

// 渲染IP合作机会
function renderIPOpportunities(ips) {
    const container = document.getElementById('ip-grid');
    if (!container || !ips) return;
    
    container.innerHTML = ips.map(ip => `
        <div class="ip-item">
            <h4>${ip.icon} ${ip.name}</h4>
            <p>${ip.category}</p>
            <p style="font-size: 0.85rem; margin-top: 0.5rem; opacity: 0.9;">
                ${ip.suitability}
            </p>
        </div>
    `).join('');
}

// 渲染色彩趋势
function renderColorTrends(trends) {
    const container = document.getElementById('color-trends');
    if (!container || !trends || !trends.colors) return;
    
    container.innerHTML = trends.colors.map(color => `
        <div class="price-item" style="background: ${color.hex}; color: white;">
            <div class="price-name">${color.name}</div>
            <div class="price-value">${color.hex}</div>
        </div>
    `).join('');
}

// 渲染材料趋势
function renderMaterialTrends(trends) {
    const container = document.getElementById('material-trends');
    if (!container || !trends || !trends.materials) return;
    
    container.innerHTML = trends.materials.map((material, index) => `
        <div class="product-item">
            <span class="product-rank">${index + 1}</span>
            <div class="product-info">
                <div class="product-name">${material.name}</div>
                <div class="product-meta">${material.applications}</div>
            </div>
            <span class="product-price" style="color: ${material.growth > 0 ? '#27ae60' : '#e74c3c'};">
                ${material.growth > 0 ? '+' : ''}${material.growth}%
            </span>
        </div>
    `).join('');
}

// 渲染风格趋势
function renderStyleTrends(trends) {
    const container = document.getElementById('style-trends');
    if (!container || !trends || !trends.styles) return;
    
    container.innerHTML = trends.styles.map((style, index) => `
        <div class="product-item">
            <span class="product-rank">${index + 1}</span>
            <div class="product-info">
                <div class="product-name">${style.name}</div>
                <div class="product-meta">${style.description}</div>
            </div>
        </div>
    `).join('');
}

// 渲染传统工艺建议
function renderCraftSuggestions(suggestions) {
    const container = document.getElementById('craft-suggestions');
    if (!container || !suggestions) return;
    
    container.innerHTML = suggestions.map(suggestion => `
        <div class="suggestion-item">
            <h4>${suggestion.icon} ${suggestion.craft}</h4>
            <p><strong>方向：</strong>${suggestion.direction}</p>
            <p><strong>目标人群：</strong>${suggestion.targetAudience}</p>
            <p style="margin-top: 0.5rem; font-size: 0.9rem; color: #7f8c8d;">
                ${suggestion.keywords.join(' · ')}
            </p>
        </div>
    `).join('');
}
