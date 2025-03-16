document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-scroll-to]").forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();

            const targetId = button.getAttribute("data-scroll-to");
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const offset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;

                window.scrollTo({
                    top: elementPosition - offset,
                    behavior: "smooth",
                });
            }
        });
    });
});