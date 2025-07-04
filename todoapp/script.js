
        const btn = document.querySelector('.btn')
        const inputBox = document.getElementById("inputBox");
        const listContainer = document.getElementById("listContainer");

    function addTask(){      
        if(inputBox.value === ''){
            alert("you must write something")
        }else{
              let li = document.createElement("li");
              li.innerHTML = inputBox.value;
              listContainer.appendChild(li);

              let span = document.createElement("span")
              span.innerHTML = "\u00d7"    // "\u00d7" is a code for cross symbol
              li.appendChild(span);
        }

        inputBox.value = "";
        saveData();
    }


    inputBox.addEventListener("keydown", function(e){
        if(e.key === "Enter"){
            addTask()
        }
    })


    listContainer.addEventListener("click", function(e) {
        if(e.target.tagName === "LI"){
            e.target.classList.toggle("checked")
            saveData();
        }else if(e.target.tagName === "SPAN"){
            e.target.parentElement.remove();
            saveData();
        }
    }, false);
    
function saveData(){
    localStorage.setItem("data", listContainer.innerHTML)
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();