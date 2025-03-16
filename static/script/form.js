document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const phoneInput = document.getElementById("phone");
    const emailInput = document.getElementById("email");

    // Форматирование телефона в реальном времени
    phoneInput.addEventListener("input", () => {
        formatPhone(event);
        validatePhoneField(phoneInput); // Проверка телефона в реальном времени
    });
    phoneInput.addEventListener("keydown", preventInvalidKeys);
    phoneInput.addEventListener("paste", handlePaste);

    // Валидация email
    emailInput.addEventListener("input", () => validateField(emailInput, validateEmail));

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = sanitizeInput(document.getElementById("name"));
        const phone = phoneInput.value.trim();
        const email = sanitizeInput(emailInput);
        const message = sanitizeInput(document.getElementById("message"), false) ? sanitizeInput(document.getElementById("message"), false) : 'Нет комментария'

        let isValid = true;

        // Проверка имени
        if (!name) {
            showError("name");
            isValid = false;
        } else {
            hideError("name");
        }

        // Проверка телефона
        if (!validatePhone(phone)) {
            showError("phone");
            isValid = false;
        } else {
            hideError("phone");
        }

        // Проверка почты
        if (!validateEmail(email)) {
            showError("email");
            isValid = false;
        } else {
            hideError("email");
        }

        if (!isValid) return;

        // Отправка формы
        const formData = { name, phone, email, message };
        try {
            await sendFormData(formData);
            document.getElementById("successModal").style.display = "flex";
            form.reset();
        } catch (error) {
            console.error("Ошибка при отправке:", error);
        }
    });
});

// 📌 Функция автоформатирования номера (с сохранением кода страны)
function formatPhone(event) {
    let value = event.target.value.replace(/[^\d]/g, ""); // Убираем всё, кроме цифр

    // Если поле пустое, оставляем его пустым
    if (value.length === 0) {
        event.target.value = "";
        return;
    }

    // Если поле не пустое, подставляем +7, если это первый ввод
    if (value.charAt(0) === "+" && value.length === 1) {
        event.target.value = "+7";
        return;
    }

    // Форматируем номер с +7
    let formatted = "+7";

    if (value.length > 1) formatted += " " + value.slice(1, 4);
    if (value.length > 4) formatted += " " + value.slice(4, 7);
    if (value.length > 7) formatted += " " + value.slice(7, 9);
    if (value.length > 9) formatted += " " + value.slice(9, 11);

    event.target.value = formatted;
}

// 📌 Проверка номера телефона и изменение границы
function validatePhoneField(input) {
    if (validatePhone(input.value)) {
        input.classList.add("valid");
        input.classList.remove("error");
    } else {
        input.classList.add("error");
        input.classList.remove("valid");
    }
}

// 📌 Запрещаем ввод букв и символов, кроме цифр и управляющих клавиш
function preventInvalidKeys(event) {
    const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
    if (!/\d/.test(event.key) && !allowedKeys.includes(event.key)) {
        event.preventDefault();
    }
}

// 📌 Обрабатываем вставку из буфера обмена
function handlePaste(event) {
    event.preventDefault();
    let paste = event.clipboardData.getData("text").replace(/[^\d]/g, ""); // Убираем всё, кроме цифр
    event.target.value = paste;
    formatPhone({ target: event.target });
}

// 📌 Очистка XSS через DOMPurify
function sanitizeInput(element, isRequired = true) {
    const value = DOMPurify.sanitize(element.value.trim());
    return isRequired ? value || "" : value;
}

// 📌 Валидация телефона (Любая страна +XXX XXX XXX-XX-XX)
function validatePhone(phone) {
    const phoneRegex = /^\+7 \d{3} \d{3} \d{2} \d{2}$/;
    return phoneRegex.test(phone);
}

// 📌 Валидация почты
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 📌 Функция показа ошибки
function showError(fieldId) {
    document.getElementById(fieldId).classList.add("error");
}

// 📌 Функция скрытия ошибки
function hideError(fieldId) {
    document.getElementById(fieldId).classList.remove("error");
}

// 📌 Валидация поля с обратной связью
function validateField(input, validateFn) {
    if (validateFn(input.value)) {
        hideError(input.id);
    } else {
        showError(input.id);
    }
}

// 📌 Функция отправки данных
async function sendFormData(formData) {
    return fetch("http://localhost:3001/api/send-notification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    });
}


document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("successModal");
    const closeBtn = document.querySelector(".modal .close");

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});