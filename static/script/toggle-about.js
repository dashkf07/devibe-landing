

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll(".about__toggle_button").forEach(button => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".about__toggle_button").forEach(btn => 
                btn.classList.remove("about__toggle_button--active")
            );
            button.classList.add("about__toggle_button--active");

            // Исправленная строка
            const active = document.querySelector('.about__content--active')
            if (active) {
                active.classList.remove("about__content--active");
            }

            document.getElementById(button.dataset.target).classList.add("about__content--active");
        });
    });


    document.querySelectorAll(".partners__toggle_button").forEach(button => {
        button.addEventListener("click", () => {
            // Убираем активный класс у всех кнопок
            document.querySelectorAll(".partners__toggle_button").forEach(btn => 
                btn.classList.remove("partners__toggle_button--active")
            );
            button.classList.add("partners__toggle_button--active");
    
            // Убираем активный класс у всех partners__content
            document.querySelectorAll(".partners__content").forEach(content => 
                content.classList.remove("partners__content--active")
            );
    
            // Добавляем активный класс к нужным элементам
            document.querySelectorAll(`#${button.dataset.target}`).forEach(target => 
                target.classList.add("partners__content--active")
            );
        });
    });
});


