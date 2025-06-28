class AccessibleTabs {
    constructor(container) {
        this.container = container;
        this.tabList = container.querySelector('[role="tablist"]');
        this.tabs = [...container.querySelectorAll('[role="tab"]')];
        this.panels = [...container.querySelectorAll('[role="tabpanel"]')];
        
        this.currentTab = 0;
        
        this.init();
    }
    
    init() {
        this.tabList.addEventListener('click', (e) => this.handleClick(e));
        this.tabList.addEventListener('keydown', (e) => this.handleKeydown(e));
        
        this.setActiveTab(0);
        
        this.tabs.forEach((tab, index) => {
            tab.addEventListener('focus', () => {
                this.currentTab = index;
            });
        });
    }
    
    handleClick(e) {
        const clickedTab = e.target.closest('[role="tab"]');
        if (!clickedTab) return;
        
        const tabIndex = this.tabs.indexOf(clickedTab);
        if (tabIndex !== -1) {
            this.activateTab(tabIndex);
        }
    }
    
    handleKeydown(e) {
        const { key } = e;
        let targetIndex = this.currentTab;
        
        switch (key) {
            case 'ArrowLeft':
                e.preventDefault();
                targetIndex = this.currentTab > 0 ? this.currentTab - 1 : this.tabs.length - 1;
                break;
                
            case 'ArrowRight':
                e.preventDefault();
                targetIndex = this.currentTab < this.tabs.length - 1 ? this.currentTab + 1 : 0;
                break;
                
            case 'Home':
                e.preventDefault();
                targetIndex = 0;
                break;
                
            case 'End':
                e.preventDefault();
                targetIndex = this.tabs.length - 1;
                break;
                
            case 'Enter':
            case ' ':
                e.preventDefault();
                this.activateTab(this.currentTab);
                return;
                
            default:
                return;
        }
        
        this.moveFocus(targetIndex);
    }
    
    moveFocus(index) {
        this.currentTab = index;
        this.tabs[index].focus();
    }
    
    activateTab(index) {
        this.setActiveTab(index);
        this.currentTab = index;
        
        const event = new CustomEvent('tabchange', {
            detail: {
                activeTab: index,
                activePanel: this.panels[index]
            }
        });
        this.container.dispatchEvent(event);
    }
    
    setActiveTab(index) {
        this.tabs.forEach((tab, i) => {
            const isActive = i === index;
            tab.setAttribute('aria-selected', isActive.toString());
            tab.setAttribute('tabindex', isActive ? '0' : '-1');
        });
        
        this.panels.forEach((panel, i) => {
            const isActive = i === index;
            panel.setAttribute('aria-hidden', (!isActive).toString());
            
            if (isActive) {
                panel.style.display = 'block';
                panel.setAttribute('tabindex', '0');
            } else {
                panel.style.display = 'none';
                panel.setAttribute('tabindex', '-1');
            }
        });
    }
    
    goToTab(index) {
        if (index >= 0 && index < this.tabs.length) {
            this.activateTab(index);
            this.tabs[index].focus();
        }
    }
    
    getActiveTab() {
        return this.currentTab;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const tabsContainer = document.querySelector('.tabs-container');
    const tabs = new AccessibleTabs(tabsContainer);
    
    tabsContainer.addEventListener('tabchange', (e) => {
        console.log('탭이 변경되었습니다 :', e.detail);
        
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = `${e.detail.activePanel.querySelector('h3').textContent} 패널이 선택되었습니다.`;
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    });
    
    window.tabs = tabs;
});