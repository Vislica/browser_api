/**
 * Вы разрабатываете веб-страницу для отображения расписания занятий в спортивном клубе.
 * Каждое занятие имеет название, время проведения, максимальное количество участников и текущее количество записанных участников.
 *
 * 1. Создайте веб-страницу с заголовком "Расписание занятий" и областью для отображения занятий.
 *
 * 2. Загрузите информацию о занятиях из предоставленных JSON-данных.
 * Каждое занятие должно отображаться на странице с указанием его названия, времени проведения, максимального количества участников и текущего количества записанных участников.
 *
 * 3. Пользователь может нажать на кнопку "Записаться" для записи на занятие. Если максимальное количество участников уже достигнуто, кнопка "Записаться" становится неактивной.
 *
 * 4. После успешной записи пользователя на занятие, обновите количество записанных участников и состояние кнопки "Записаться".
 *
 * 5. Запись пользователя на занятие можно отменить путем нажатия на кнопку "Отменить запись". После отмены записи, обновите количество записанных участников и состояние кнопки.
 *
 * 6. Все изменения (запись, отмена записи) должны сохраняться и отображаться в реальном времени на странице.
 *
 * 7. При разработке используйте Bootstrap для стилизации элементов.
 */
var scheduleData = [
  { id: 1, name: "1", time: "10:00", maxParticipants: 5, currentParticipants: 4 },
  { id: 2, name: "2", time: "12:00", maxParticipants: 8, currentParticipants: 2 },
  { id: 3, name: "3", time: "14:00", maxParticipants: 11, currentParticipants: 0 }
];

function loadSchedule() {
  var storedData = JSON.parse(localStorage.getItem("schedule")) || scheduleData;
  var scheduleContainer = document.getElementById("schedule");
  scheduleContainer.innerHTML = "";
  storedData.forEach(activity => {
    var isFull = activity.currentParticipants >= activity.maxParticipants;
    scheduleContainer.innerHTML += `
      <div class="col-md-4">
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">${activity.name}</h5>
            <p class="card-text">Время: ${activity.time}</p>
            <p class="card-text">Записано: ${activity.currentParticipants} / ${activity.maxParticipants}</p>
            <button class="btn btn-success" onclick="signUp(${activity.id})" ${isFull ? 'disabled' : ''}>Записаться</button>
            <button class="btn btn-danger" onclick="cancelSignUp(${activity.id})">Отменить запись</button>
          </div>
        </div>
      </div>`;
  });
}

function updateStorage(data) {
  localStorage.setItem("schedule", JSON.stringify(data));
  loadSchedule();
}

function signUp(id) {
  var storedData = JSON.parse(localStorage.getItem("schedule")) || scheduleData;
  var activity = storedData.find(a => a.id === id);
  if (activity && activity.currentParticipants < activity.maxParticipants) {
    activity.currentParticipants++;
    updateStorage(storedData);
  }
}

function cancelSignUp(id) {
  var storedData = JSON.parse(localStorage.getItem("schedule")) || scheduleData;
  var activity = storedData.find(a => a.id === id);
  if (activity && activity.currentParticipants > 0) {
    activity.currentParticipants--;
    updateStorage(storedData);
  }
}

window.addEventListener("load", loadSchedule);
