// Daily Researcher - Global Trends Dashboard - Main JavaScript

// 配置
const CONFIG = {
    dataPath: 'data/',
    updateInterval: 300000, // 5分钟
};

// 工具函数
const Utils = {
    // 格式化日期
    formatDate(date) {
        return new Date(date).toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    },

    // 格式化数字
    formatNumber(num) {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1) + 'B';
        } else if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    },

    // 获取标签大小等级
    getTagSize(count, maxCount) {
        const ratio = count / maxCount;
        if (ratio > 0.8) return 'size-5';
        if (ratio > 0.6) return 'size-4';
        if (ratio > 0.4) return 'size-3';
        if (ratio > 0.2) return 'size-2';
        return 'size-1';
    },

    // 加载JSON数据
    async loadJSON(url) {
        try {
            console.log('Loading:', url);
            const response = await fetch(url);
            if (!response.ok) {
                console.error(`HTTP error! status: ${response.status} for ${url}`);
                return null;
            }
            const data = await response.json();
            console.log('Loaded:', url, data ? 'success' : 'empty');
            return data;
        } catch (error) {
            console.error(`Error loading ${url}:`, error);
            return null;
        }
    },

    // 更新页面时间
    updateTime() {
        const timeElements = document.querySelectorAll('#update-time');
        const now = this.formatDate(new Date());
        timeElements.forEach(el => {
            el.textContent = now;
        });
    }
};

// 图表工具
const ChartUtils = {
    // 创建折线图
    createLineChart(ctx, labels, datasets, options = {}) {
        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: datasets.map((dataset, index) => ({
                    label: dataset.label,
                    data: dataset.data,
                    borderColor: [
                        '#3498db', '#e74c3c', '#27ae60', '#f39c12', '#9b59b6'
                    ][index % 5],
                    backgroundColor: 'transparent',
                    tension: 0.4,
                    fill: false
                }))
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false
                    }
                },
                ...options
            }
        });
    },

    // 创建饼图
    createPieChart(ctx, labels, data, colors = null) {
        const defaultColors = [
            '#3498db', '#e74c3c', '#27ae60', '#f39c12', '#9b59b6',
            '#1abc9c', '#e67e22', '#34495e', '#16a085', '#c0392b'
        ];
        
        return new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors || defaultColors.slice(0, labels.length),
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    }
};

// 数据管理器
const DataManager = {
    async loadAllData() {
        const data = {};
        
        // 并行加载所有数据文件
        const promises = [
            { key: 'competitor', file: 'competitor-trends.json' },
            { key: 'social', file: 'social-trends.json' },
            { key: 'supply', file: 'supply-chain-weekly.json' }
        ];
        
        for (const { key, file } of promises) {
            data[key] = await Utils.loadJSON(CONFIG.dataPath + file);
        }
        
        return data;
    },

    // 获取竞品数据
    getCompetitorData() {
        return this.competitorData;
    },

    // 获取社交数据  
    getSocialData() {
        return this.socialData;
    },

    // 获取供应链数据
    getSupplyData() {
        return this.supplyData;
    }
};

// 导出工具
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Utils, ChartUtils, DataManager, CONFIG };
}
