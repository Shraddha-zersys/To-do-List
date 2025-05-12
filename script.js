const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function saveDataAsync(data) {
  return new Promise((resolve) => {
    localStorage.setItem("data", data);
    resolve();
  });
}

function loadDataAsync() {
  return new Promise((resolve) => {
    const data = localStorage.getItem("data");
    resolve(data);
  });
}

async function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  await saveDataAsync(listContainer.innerHTML);
}

listContainer.addEventListener(
  "click",
  async function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
    }
    await saveDataAsync(listContainer.innerHTML);
  },
  false
);

async function showTask() {
  const data = await loadDataAsync();
  listContainer.innerHTML = data || "";
}

showTask();
