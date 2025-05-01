const nameForm = document.querySelector(".name-form");
const nameInput = document.querySelector(".name-input");
const displayName = document.getElementById("displayName");
const nationalitiesList = document.getElementById("nationalitiesList");

async function getUser(name) {
  try {
    const response = await fetch(`https://api.nationalize.io/?name=${name}`);
    const data = await response.json();

    displayName.textContent = name;

    nationalitiesList.innerHTML = ""; 

    if (data.country.length === 0) {
      nationalitiesList.innerHTML = "<li>Нет данных о национальности</li>";
    } else {
      data.country.forEach(country => {
        const listItem = document.createElement("li");
        listItem.textContent = `${country.country_id} - ${country.probability}`;
        nationalitiesList.appendChild(listItem);
      });
    }
  } catch (error) {
    console.error("Ошибка:", error);
    displayName.textContent = "Ошибка при получении данных";
    nationalitiesList.innerHTML = "<li>Ошибка при загрузке данных</li>";
  }
}

nameForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = nameInput.value;
  getUser(name);
});