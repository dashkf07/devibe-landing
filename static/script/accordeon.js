document.addEventListener('DOMContentLoaded', () => {
document.querySelectorAll(".questions__accordeon_header").forEach(header => {
    header.addEventListener("click", () => {
        const accordeon = header.parentElement;
        const content = accordeon.querySelector(".questions__accordeon_content");

        if (accordeon.classList.contains("active")) {
            // Закрываем аккордеон
            content.style.maxHeight = "0px";
            accordeon.classList.remove("active");
        } else {
            // Закрываем все остальные аккордеоны
            document.querySelectorAll(".questions__accordeon").forEach(acc => {
                acc.classList.remove("active");
                acc.querySelector(".questions__accordeon_content").style.maxHeight = "0px";
            });

            // Открываем текущий
            content.style.maxHeight = content.scrollHeight + "px";
            accordeon.classList.add("active");
        }
    });
});
});