// Daily Researcher - Social Trends Page JavaScript

document.addEventListener('DOMContentLoaded', async function() {
    console.log('🎨 Social trends page loaded');
    
    Utils.updateTime();
    
    try {
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
        } else {
            showError('tiktok-tags', 'TikTok数据加载失败');
            showError('pinterest-trends', 'Pinterest数据加载失败');
            showError('youtube-trends', 'YouTube数据加载失败');
        }
    } catch (error) {
        console.error('Error loading social data:', error);
        showError('tiktok-tags', '数据加载失败');
        showError('pinterest-trends', '数据加载失败');
        showError('youtube-trends', '数据加载失败');
    }
});

// 显示错误信息
function showError(elementId, message) {
    const container = document.getElementById(elementId);
    if (container) {
        container.innerHTML = `<div class="error">${message}</div>`;
    }
}

// 渲染TikTok标签
function renderTikTokTags(platforms) {
    const tiktok = platforms?.find(p => p.platform === 'TikTok');
    const container = document.getElementById('tiktok-tags');
    
    if (!container || !tiktok || !tiktok.topTags || tiktok.topTags.length === 0) {
        showError('tiktok-tags', '暂无TikTok数据');
        return;
    }
    
    container.innerHTML = tiktok.topTags.slice(0, 10).map(tag => `
        <div class="product-item">
            <span class="product-rank">#</span>
            <div class="product-info">
                <div class="product-name">${tag.name}</div>
                <div class="product-meta">${Utils.formatNumber(tag.count || 0)} 帖子 · ${tag.engagement || '中'}</div>
            </div>
            <span class="product-price" style="color: ${tag.trend === 'up' ? '#27ae60' : '#e74c3c'};">
                ${tag.trend === 'up' ? '📈' : '📉'} ${tag.weeklyChange || '0%'}
            </span>
        </div>
    `).join('');
}

// 渲染Pinterest趋势
function renderPinterestTrends(platforms) {
    const pinterest = platforms?.find(p => p.platform === 'Pinterest');
    const container = document.getElementById('pinterest-trends');
    
    if (!container || !pinterest || !pinterest.trendingPins || pinterest.trendingPins.length === 0) {
        showError('pinterest-trends', '暂无Pinterest数据');
        return;
    }
    
    container.innerHTML = pinterest.trendingPins.slice(0, 8).map((pin, index) => `
        <div class="product-item">
            <span class="product-rank">${index + 1}</span>
            <div class="product-info">
                <div class="product-name">${pin.title}</div>
                <div class="product-meta">${pin.category} · ${pin.saveRate}保存率</div>
            </div>
            <span style="font-size: 0.8rem; color: var(--text-light);">${pin.trend || ''}</span>
        </div>
    `).join('');
}

// 渲染YouTube趋势
function renderYouTubeTrends(platforms) {
    const youtube = platforms?.find(p => p.platform === 'YouTube');
    const container = document.getElementById('youtube-trends');
    
    if (!container || !youtube || !youtube.trendingVideos || youtube.trendingVideos.length === 0) {
        showError('youtube-trends', '暂无YouTube数据');
        return;
    }
    
    container.innerHTML = youtube.trendingVideos.slice(0, 8).map((video, index) => `
        <div class="product-item">
            <span class="product-rank">${index + 1}</span>
            <div class="product-info">
                <div class="product-name">${video.title}</div>
                <div class="product-meta">${Utils.formatNumber(video.views || 0)}观看 · ${video.duration || ''}</div>
            </div>
            <span style="font-size: 0.8rem; color: var(--text-light);">${video.trend || ''}</span>
        </div>
    `).join('');
}

// 渲染IP合作机会
function renderIPOpportunities(ips) {
    const container = document.getElementById('ip-grid');
    
    if (!container || !ips || ips.length === 0) {
        if (container) container.innerHTML = '<div class="error">暂无IP合作数据</div>';
        return;
    }
    
    // 按优先级排序
    const sortedIps = [...ips].sort((a, b) => (a.priority || 99) - (b.priority || 99));
    
    container.innerHTML = sortedIps.map(ip => `
        <div class="ip-item">
            <h4>${ip.icon} ${ip.name}</h4>
            <p>${ip.category}</p>
            <p style="font-size: 0.8rem; margin-top: 0.5rem; opacity: 0.9;">
                ${ip.suitability || ''}
            </p>
            <p style="font-size: 0.75rem; margin-top: 0.3rem; color: ${ip.opportunity === '极高' || ip.opportunity === '高' ? '#27ae60' : '#f39c12'};">
                机会: ${ip.opportunity || '中'}
            </p>
        </div>
    `).join('');
}

// 渲染色彩趋势
function renderColorTrends(trends) {
    const container = document.getElementById('color-trends');
    
    if (!container || !trends || !trends.colors || trends.colors.length === 0) {
        return;
    }
    
    container.innerHTML = trends.colors.slice(0, 5).map(color => `
        <div class="price-item" style="background: ${color.hex || '#ccc'}; color: white;">
            <div class="price-name">${color.name || '未知'}</div>
            <div class="price-value">${color.hex || ''}</div>
            <div style="font-size: 0.75rem; opacity: 0.9;">${(color.description || '').substring(0, 25)}...</div>
        </div>
    `).join('');
}

// 渲染材料趋势
function renderMaterialTrends(trends) {
    const container = document.getElementById('material-trends');
    
    if (!container || !trends || !trends.materials || trends.materials.length === 0) {
        return;
    }
    
    container.innerHTML = trends.materials.map((material, index) => `
        <div class="product-item">
            <span class="product-rank">${index + 1}</span>
            <div class="product-info">
                <div class="product-name">${material.name || '未知'}</div>
                <div class="product-meta">${material.applications || ''}</div>
            </div>
            <span class="product-price" style="color: ${(material.trend || '').includes('up') ? '#27ae60' : '#e74c3c'};">
                ${material.growth > 0 ? '+' : ''}${material.growth || 0}%
            </span>
        </div>
    `).join('');
}

// 渲染风格趋势
function renderStyleTrends(trends) {
    const container = document.getElementById('style-trends');
    
    if (!container || !trends || !trends.styles || trends.styles.length === 0) {
        return;
    }
    
    container.innerHTML = trends.styles.slice(0, 6).map((style, index) => `
        <div class="product-item">
            <span class="product-rank">${index + 1}</span>
            <div class="product-info">
                <div class="product-name">${style.name || '未知'}</div>
                <div class="product-meta">${style.description || ''}</div>
            </div>
        </div>
    `).join('');
}

// 渲染传统工艺建议
function renderCraftSuggestions(suggestions) {
    const container = document.getElementById('craft-suggestions');
    
    if (!container || !suggestions || suggestions.length === 0) {
        if (container) container.innerHTML = '<div class="error">暂无工艺建议数据</div>';
        return;
    }
    
    container.innerHTML = suggestions.map(suggestion => `
        <div class="suggestion-item">
            <h4>${suggestion.icon || '📦'} ${suggestion.craft || '未知'}</h4>
            <p><strong>方向：</strong>${suggestion.direction || ''}</p>
            <p><strong>目标：</strong>${suggestion.targetAudience || ''}</p>
            <p style="font-size: 0.8rem; color: #27ae60; margin-top: 0.5rem;">
                优先级: ${suggestion.priority || '中'}
            </p>
            <p style="margin-top: 0.5rem; font-size: 0.8rem; color: #7f8c8d;">
                ${(suggestion.keywords || []).slice(0, 3).join(' · ')}
            </p>
        </div>
    `).join('');
}
