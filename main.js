const form = document.getElementById("addForm");
const itemsList = document.getElementById("items");
const filter = document.getElementById("filter");

let tasks = [];

//  1.1 Идём в LS есть ли в нем данные по ключу tasks
// 1.2 Если данные есть, тогда забираем их, парсим из JSON в массив и записываем в массив tasks
// 1.3 Если нет данных, тогда оставляем переменную tasks пустой и получаем оттуда задачу

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

// 1.4 На основе массива tasks Рендерим эти задачи на страницу
tasks.forEach(function (task) {
  renderTask(task);
});

// Добавление новой задачи прослушка события
form.addEventListener("submit", addItem);

// Удаление элемента - прослушка клика
itemsList.addEventListener("click", removeItem);

// Фильтрация списка дел - прослушка ввода
filter.addEventListener("keyup", filterItems);

// Рендерим текст
function renderTask(taskText) {
  // Создаем элемент для новой задачи
  const newElement = document.createElement("li");
  newElement.className = "list-group-item";

  // Добавим текст в новый элемент
  const newTextNode = document.createTextNode(taskText);
  newElement.appendChild(newTextNode);

  // Создаем кнопку
  const deleteBtn = document.createElement("button");
  // Добавляем текст
  deleteBtn.appendChild(document.createTextNode("Удалить"));
  // Добавляем CSS class
  deleteBtn.className = "btn btn-light btn-sm float-right";
  // Добавляем data атрибут
  deleteBtn.dataset.action = "delete";

  // Помещаем кнопку внутрь тега li
  newElement.appendChild(deleteBtn);

  // Добавляем новую задачу в список со всеми задачами
  itemsList.prepend(newElement);
}

// Добавление новой задачи функция
function addItem(e) {
  // Отменяем отправку формы
  e.preventDefault();

  //2.1 Отображаем задачу в разметке html

  // Находим инпут с текстом для новой задачи
  const newItemInput = document.getElementById("newItemText");
  // Получаем текст из инпута
  const newItemText = newItemInput.value;

  renderTask(newItemText);

  // 2.2 Добавляем задачу в массив с задачами
  tasks.push(newItemText);
  //console.log(tasks);

  //2.3 Обновить список задач в localstorage

  const jsonTasks = JSON.stringify(tasks);
  localStorage.setItem("tasks", jsonTasks);

  // Очистим поле добавления новой задачи
  newItemInput.value = "";
}

// Удаление элемента - ф-я
function removeItem(e) {
  if (
    e.target.hasAttribute("data-action") &&
    e.target.getAttribute("data-action") == "delete"
  ) {
    // 3.1 Удаление задачи из html разметки
    if (confirm("Удалить задачу?")) {
      e.target.parentNode.remove();
      //  3.2 Удалить задачу из массива
      // Получаем текст задачи, которую удаляем
      const taskText =
        e.target.closest(".list-group-item").firstChild.textContent;

      // Находим индекс задачи в массиве
      const index = tasks.findIndex(function (item) {
        if (taskText === item) {
          return true;
        }
      });
      // Удаляем задачу в массиве tasks
      if (index !== -1) {
        tasks.splice(index, 1);
      }
      // Обновляем LS
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }
}

// Фильтрация списка дел ф-я
function filterItems(e) {
  // Получаем фразу для поиска и переводим ее в нижний регистр
  const searchedText = e.target.value.toLowerCase();

  // 1. Получаем списко всех задач
  const items = itemsList.querySelectorAll("li");

  // 2. Перебираем циклом все найденные теги li с задачами
  items.forEach(function (item) {
    // Получаем текст задачи из списка и переводим его в нижний регистр
    const itemText = item.firstChild.textContent.toLowerCase();

    // Проверяем вхождение искомой подстроки в текст задачи
    if (itemText.indexOf(searchedText) != -1) {
      // Если вхождение есть - показываем элемент с задачей
      item.style.display = "block";
    } else {
      // Если вхождения нет - скрываем элемент с задачей
      item.style.display = "none";
    }
  });
}

/*
Описание процесса пользования

1. Открываем приложение
1.1 Идём в LS есть ли в нем данные по ключу tasks
1.2 Если данные есть, тогда забираем их, парсим из JSON в массив и записываем в массив tasks
1.3 Если нет данных, тогда оставляем переменную tasks пустой и получаем оттуда задачу
1.4 На основе массива tasks Рендерим эти задачи на страницу

2. Добавляем задачу в список
2.1 Отображаем задачу в разметке html
2.2 Добавляем задачу в массив с задачами
2.3 Обновить список задач в localstorage


3. Удаление задачи
3.1 Удаление задачи из html разметки
3.2 Удалить задачу из массива
3.3 Обновить список задач в LS

*/
