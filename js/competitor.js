// Daily Researcher - Competitor Page JavaScript

document.addEventListener('DOMContentLoaded', async function() {
    console.log('🛒 Competitor page loaded');
    
    Utils.updateTime();
    
    const data = await DataManager.loadJSON('data/competitor-trends.json');
    
    if (data) {
        renderAmazon(data.etsyTop);
        renderEtsy(data.etsyTop);
        renderTikTok(data.tiktokShop);
        renderEtsyTrends(data.etsyTrends);
        renderPriceDistribution(data.priceDistribution);
        renderCategoryRankings(data.categoryRankings);
        renderChinaOpportunities(data.chinaOpportunities);
    }
});

// 渲染Amazon榜单
function renderAmazon(products) {
    const container = document.getElementById('amazon-list');
    if (!container || !products) return;
    
    container.innerHTML = products.slice(0, 10).map((product, index) => `
        <div class="product-item">
            <span class="product-rank">${index + 1}</span>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-meta">${product.category} · ${product.source || 'Amazon'}</div>
            </div>
            <span class="product-price">${product.price}</span>
        </div>
    `).join('');
}

// 渲染Etsy榜单
function renderEtsy(products) {
    const container = document.getElementById('etsy-list');
    if (!container || !products) return;
    
    container.innerHTML = products.slice(0, 10).map((product, index) => `
        <div class="product-item">
            <span class="product-rank">${index + 1}</span>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-meta">${product.category} · ${product.note || ''}</div>
            </div>
            <span class="product-price">${product.price}</span>
        </div>
    `).join('');
}

// 渲染TikTok Shop爆款
function renderTikTok(products) {
    const container = document.getElementById('tiktok-list');
    if (!container || !products) return;
    
    container.innerHTML = products.slice(0, 10).map((product, index) => `
        <div class="product-item">
            <span class="product-rank">${index + 1}</span>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-meta">#${product.hashtag} · ${Utils.formatNumber(product.views)}播放</div>
            </div>
            <span class="product-price">${product.price}</span>
        </div>
    `).join('');
}

// 渲染Etsy趋势
function renderEtsyTrends(trends) {
    const container = document.getElementById('etsy-trends');
    if (!container || !trends) return;
    
    container.innerHTML = trends.map(trend => `
        <div class="region-item">
            <h4>${trend.name}</h4>
            <p>${trend.description}</p>
            <p style="font-size: 0.85rem; color: var(--text-light);">代表产品: ${trend.products}</p>
        </div>
    `).join('');
}

// 渲染价格分布
function renderPriceDistribution(data) {
    const container = document.getElementById('price-distribution');
    if (!container || !data) return;
    
    // 检查是否已有图表
    if (container.querySelector('canvas')) return;
    
    const ctx = document.createElement('canvas');
    ctx.id = 'priceChart';
    container.appendChild(ctx);
    
    ChartUtils.createPieChart(ctx.getContext('2d'), data.labels, data.data);
}

// 渲染品类排行
function renderCategoryRankings(data) {
    const container = document.getElementById('category-rankings');
    if (!container || !data) return;
    
    container.innerHTML = `
        <table style="width:100%; border-collapse: collapse;">
            <thead>
                <tr style="background: var(--bg-color);">
                    <th style="padding: 8px; text-align: left;">排名</th>
                    <th style="padding: 8px; text-align: left;">品类</th>
                    <th style="padding: 8px; text-align: right;">增长率</th>
                    <th style="padding: 8px; text-align: right;">毛利率</th>
                </tr>
            </thead>
            <tbody>
                ${data.map((item, index) => `
                    <tr style="border-bottom: 1px solid #eee;">
                        <td style="padding: 8px; width: 40px;">${index + 1}</td>
                        <td style="padding: 8px;">${item.name}</td>
                        <td style="padding: 8px; text-align: right; color: #27ae60;">+${item.growth}%</td>
                        <td style="padding: 8px; text-align: right; color: #3498db;">${item.margin}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// 渲染中国供应链优势
function renderChinaOpportunities(data) {
    const container = document.getElementById('china-opportunities');
    if (!container || !data) return;
    
    container.innerHTML = data.map(item => `
        <div class="suggestion-item">
            <h4>${item.icon} ${item.category}</h4>
            <p>${item.description}</p>
            <p style="font-size: 0.85rem; color: #27ae60; margin-top: 0.5rem;">
                💰 ${item.margin}
            </p>
            <p style="font-size: 0.8rem; margin-top: 0.3rem;">
                优先级: ${item.priority || '中'}
            </p>
        </div>
    `).join('');
}
