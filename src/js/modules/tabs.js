const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = 'block') => {
    const tabs = document.querySelectorAll(tabSelector),
          content = document.querySelectorAll(contentSelector),
          header = document.querySelector(headerSelector);

    function hideTabContent() {
        content.forEach(item => {
            item.style.display = 'none';
        })

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        })
    }

    function showTabContent(i = 0) {
        content[i].style.display = display;
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    header.addEventListener('click', (e) => {
        if (e.target.classList.contains(tabSelector.replace(/\./g, '')) ||
        e.target.parentNode.classList.contains(tabSelector.replace(/\./g, ''))) {
            tabs.forEach((item, i) => {
                if (e.target == item || e.target.parentNode == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    })
};

export default tabs;