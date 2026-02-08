document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        updateButtonIcon(savedTheme);
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light-mode');
            updateButtonIcon('light-mode');
        } else {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
            updateButtonIcon('dark-mode');
        }
    });

    function updateButtonIcon(theme) {
        if (theme === 'dark-mode') {
            themeToggleBtn.textContent = '☀️'; // Sun icon for light mode
        } else {
            themeToggleBtn.textContent = '🌙'; // Moon icon for dark mode
        }
    }
});
