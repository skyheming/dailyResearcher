// Daily Researcher - Supply Chain Page JavaScript

document.addEventListener('DOMContentLoaded', async function() {
    console.log('📦 Supply chain page loaded');
    
    Utils.updateTime();
    
    const data = await DataManager.loadJSON('data/supply-chain-weekly.json');
    
    if (data) {
        renderShandong(data.regions?.shandong);
        renderJiangsu(data.regions?.jiangsu);
        renderMaterialPrices(data.materialPrices);
        renderPolicyList(data.policyUpdates);
        renderCooperationOpportunities(data.cooperationOpportunities);
    }
});

// 渲染山东产区
function renderShandong(region) {
    const container = document.getElementById('shandong');
    if (!container || !region) return;
    
    container.innerHTML = `
        <div class="region-item">
            <h4>🏭 ${region.name}</h4>
            <p>${region.overview}</p>
        </div>
        ${region.keyProducts.map(product => `
            <div class="region-item">
                <h4>${product.icon} ${product.name}</h4>
                <p><strong>产值：</strong>${product.outputValue}</p>
                <p><strong>企业数量：</strong>${product.companies}</p>
                <p><strong>从业人数：</strong>${product.employees}</p>
            </div>
        `).join('')}
        ${region.highlights.map(highlight => `
            <div class="region-item" style="border-left-color: #27ae60;">
                <h4>${highlight.icon} ${highlight.title}</h4>
                <p>${highlight.description}</p>
            </div>
        `).join('')}
    `;
}

// 渲染江苏产区
function renderJiangsu(region) {
    const container = document.getElementById('jiangsu');
    if (!container || !region) return;
    
    container.innerHTML = `
        <div class="region-item">
            <h4>🏺 ${region.name}</h4>
            <p>${region.overview}</p>
        </div>
        ${region.keyProducts.map(product => `
            <div class="region-item">
                <h4>${product.icon} ${product.name}</h4>
                <p><strong>产值：</strong>${product.outputValue}</p>
                <p><strong>企业数量：</strong>${product.companies}</p>
                <p><strong>从业人数：</strong>${product.employees}</p>
            </div>
        `).join('')}
        ${region.highlights.map(highlight => `
            <div class="region-item" style="border-left-color: #9b59b6;">
                <h4>${highlight.icon} ${highlight.title}</h4>
                <p>${highlight.description}</p>
            </div>
        `).join('')}
    `;
}

// 渲染原材料价格
function renderMaterialPrices(prices) {
    const container = document.getElementById('material-prices');
    if (!container || !prices) return;
    
    container.innerHTML = prices.map(price => `
        <div class="price-item">
            <div class="price-name">${price.name}</div>
            <div class="price-value">${price.unit}</div>
            <div class="price-change ${price.trend > 0 ? 'up' : 'down'}">
                ${price.trend > 0 ? '📈' : '📉'} ${price.trend > 0 ? '+' : ''}${price.change}%
            </div>
        </div>
    `).join('');
}

// 渲染政策列表
function renderPolicyList(policies) {
    const container = document.getElementById('policy-list');
    if (!container || !policies) return;
    
    container.innerHTML = policies.map(policy => `
        <div class="policy-item">
            <span class="policy-icon">${policy.icon}</span>
            <div class="policy-content">
                <div class="policy-title">${policy.title}</div>
                <div class="policy-date">${policy.date} · ${policy.source}</div>
            </div>
        </div>
    `).join('');
}

// 渲染合作机会
function renderCooperationOpportunities(opportunities) {
    const container = document.getElementById('coop-opportunities');
    if (!container || !opportunities) return;
    
    container.innerHTML = opportunities.map(opp => `
        <div class="policy-item">
            <span class="policy-icon">${opp.icon}</span>
            <div class="policy-content">
                <div class="policy-title">${opp.title}</div>
                <div class="policy-date">${opp.description}</div>
            </div>
        </div>
    `).join('');
}
