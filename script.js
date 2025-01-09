document.addEventListener("DOMContentLoaded", () => {
    const addItemBtn = document.getElementById("addItemBtn");
    const itemName = document.getElementById("itemName");
    const itemQuantity = document.getElementById("itemQuantity");
    const shoppingList = document.getElementById("shoppingList");
    const clearListBtn = document.getElementById("clearListBtn");

    // Завантаження з Local Storage
    const loadShoppingList = () => {
        const items = JSON.parse(localStorage.getItem("shoppingList")) || [];
        shoppingList.innerHTML = "";
        items.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${item.name} (Кількість: ${item.quantity}) 
                            <button data-index="${index}">Видалити</button>`;
            shoppingList.appendChild(li);
        });
    };

    // Додавання нового товару
    const addItem = () => {
        const name = itemName.value.trim();
        const quantity = itemQuantity.value.trim();
        // Якщо нічого не ввели
        if (name === "" || quantity === "") {
            alert("Ви не ввели товар і кількість!");
            return;
        }

        const newItem = { name, quantity: parseInt(quantity) };
        const items = JSON.parse(localStorage.getItem("shoppingList")) || [];
        items.push(newItem);
        localStorage.setItem("shoppingList", JSON.stringify(items));

        itemName.value = "";
        itemQuantity.value = "";
        loadShoppingList();
    };

    // Видалення товару
    const removeItem = (index) => {
        const items = JSON.parse(localStorage.getItem("shoppingList")) || [];
        items.splice(index, 1);
        localStorage.setItem("shoppingList", JSON.stringify(items));
        loadShoppingList();
    };

    // Очистити весь список
    const clearList = () => {
        localStorage.removeItem("shoppingList");
        loadShoppingList();
    };

    // Обробка подій
    addItemBtn.addEventListener("click", addItem);
    shoppingList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const index = e.target.getAttribute("data-index");
            removeItem(index);
        }
    });
    clearListBtn.addEventListener("click", clearList);

    // Завантажити список покупок при завантаженні сторінки
    loadShoppingList();
});