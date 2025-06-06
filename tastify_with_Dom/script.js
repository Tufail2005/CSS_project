const formInput = document.getElementById("formInput");
const main = document.querySelector(".main");
let create_id = 1;
function showInputForm({
  sectionContainer, //container
}) {
  // Hide all section
  main.style.display = "none";

  // Create input elements
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.classList.add("card-description");
  titleInput.placeholder = "Enter title";

  const descriptionInput = document.createElement("input");
  descriptionInput.type = "text";
  descriptionInput.classList.add("card-description");
  descriptionInput.placeholder = "Enter description";

  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Submit";
  submitBtn.classList.add("card-description");

  // Wrapper
  const inputWrapper = document.createElement("div");
  inputWrapper.classList.add("inputWrapper");
  inputWrapper.appendChild(titleInput);
  inputWrapper.appendChild(descriptionInput);
  inputWrapper.appendChild(submitBtn);

  // Append form temporarily to body or section
  document.body.appendChild(inputWrapper);

  submitBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

    if (!title || !description) {
      alert("Both fields are required.");
      return;
    }

    // Create new card
    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.setAttribute("draggable", "true");
    newCard.id = create_id; //creating dynamic id for future(drag and drop)
    create_id++;

    const titleElement = document.createElement("h2");
    titleElement.classList.add("card-title");
    titleElement.textContent = title;

    const descriptionElement = document.createElement("p");
    descriptionElement.classList.add("card-description");
    descriptionElement.textContent = description;

    // type select start ++++++++++++++++++++++++
    const selectElement = document.createElement("select");
    selectElement.classList.add = "typeSelect";

    const options = [
      { text: "Select a type", value: "default" },
      { text: "Urgent", value: "urgent" },
      { text: "low", value: "low" },
      { text: "Medium", value: "medium" },
    ];

    options.forEach((opt) => {
      const option = document.createElement("option");
      option.textContent = opt.text;
      option.value = opt.value;
      selectElement.appendChild(option);
    });

    // selectElement.style.appearance = "none";
    selectElement.addEventListener("change", function () {
      const selectedValue = this.value;

      switch (selectedValue) {
        case "urgent":
          this.style.backgroundColor = "#ff6b6b";
          this.style.color = "white";
          break;
        case "low":
          this.style.backgroundColor = "#0ecc5a";
          this.style.color = "white";
          break;
        case "medium":
          this.style.backgroundColor = "#ffa235";
          this.style.color = "white";
          break;
        default:
          this.style.backgroundColor = "";
          this.style.color = "";
      }
    });

    // type select end -----------------------------------
    const date = new Date();
    const format = { year: "numeric", month: "long", day: "numeric" };
    const currTime = date.toLocaleDateString("en-US", format);

    //Card foooooooooooooooter start +++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    const addedTime = document.createElement("p");
    addedTime.classList.add("time");
    addedTime.innerHTML = currTime;

    const clockIcon = document.createElement("div");
    clockIcon.classList.add("clockIcon");
    clockIcon.innerHTML = `<i class="ri-time-line"></i>`;

    const cardFooter = document.createElement("div");
    cardFooter.classList.add("cardFooter");

    cardFooter.appendChild(selectElement);
    cardFooter.appendChild(clockIcon);
    cardFooter.appendChild(addedTime);
    //Card fooooooooooter end -------------------------------------------------------------------

    newCard.appendChild(titleElement);
    newCard.appendChild(descriptionElement);
    newCard.appendChild(cardFooter);

    // Append card to target container
    sectionContainer.appendChild(newCard);
    //dragstart +++++++++++++++++++++++++++
    newCard.addEventListener("dragstart", dragStartHandler);
    // Cleanup
    inputWrapper.remove();
    main.style.display = "flex";
  });
}

//for Todo:
const todoContainer = document.getElementById("todo");
const todoCard = document.getElementById("todoCard");
const todoBtn = document.getElementById("todoBtn");

todoBtn.addEventListener("click", () => {
  showInputForm({
    sectionContainer: todoContainer,
    triggerButton: todoBtn,
    targetCardContainer: todoCard,
  });
});

//for In Progress

const inProgress = document.getElementById("inProgress");
const inProgressCard = document.getElementById("inProgressCard");
const inProgressBtn = document.getElementById("inProgressBtn");

inProgressBtn.addEventListener("click", () => {
  showInputForm({
    sectionContainer: inProgress,
    triggerButton: inProgressBtn,
    targetCardContainer: inProgressCard,
  });
});

//Under Review
const underReview = document.getElementById("underReview");
const underReviewCard = document.getElementById("underReviewCard");
const underReviewBtn = document.getElementById("underReviewBtn");

underReviewBtn.addEventListener("click", () => {
  showInputForm({
    sectionContainer: underReview,
    triggerButton: underReviewBtn,
    targetCardContainer: underReviewCard,
  });
});

//Finished
const Finished = document.getElementById("finished");
const finishedCard = document.getElementById("finishedCard");
const finishedBtn = document.getElementById("finishedBtn");

finishedBtn.addEventListener("click", () => {
  showInputForm({
    sectionContainer: Finished,
    triggerButton: finishedBtn,
    targetCardContainer: finishedCard,
  });
});

//drag and drop handlers +++++++++++++++++++++++++++++++++++++++++++++++++

const cards = document.querySelectorAll(".card");
const containers = document.querySelectorAll(".container");

cards.forEach((card) => {
  card.addEventListener("dragstart", dragStartHandler);
});

containers.forEach((container) => {
  container.addEventListener("dragover", dragOverHandler);
  container.addEventListener("drop", dropHandler);
  container.addEventListener("dragleave", dragLeaveHandler);
});

function dragStartHandler(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
  e.target.id;
}

function dragOverHandler(e) {
  e.preventDefault();
  e.currentTarget.classList.add("drag-over");
}

function dragLeaveHandler(e) {
  e.currentTarget.classList.remove("drag-over");
}

function dropHandler(e) {
  e.preventDefault();
  const id = e.dataTransfer.getData("text/plain");
  console.log("Dropped:", id);
  const draggedEl = document.getElementById(id);
  e.currentTarget.appendChild(draggedEl);
  e.currentTarget.classList.remove("drag-over");
}
