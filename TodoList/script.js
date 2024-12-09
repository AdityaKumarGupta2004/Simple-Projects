  const mainTodoElem = document.querySelector(".todo-lists-elem");
      const inputvalue = document.getElementById("inputValue");
      
      const getTodoListFromLocal = () => {
        return JSON.parse(localStorage.getItem("adityaTodo"));
      };

      const addTodoListStorage = (locoTodoLists) => {
        localStorage.setItem("adityaTodo", JSON.stringify(locoTodoLists));
      };

      let locoTodoLists = getTodoListFromLocal() || [];

      const addTodoDynamicElement = (curElem) => {
        const divElement = document.createElement("div");
        divElement.classList.add("main_todo_div");
        
        divElement.innerHTML = `
          <li>${curElem}</li>
          <button class="deletebtn">Delete</button>`;
        mainTodoElem.append(divElement);
      };

      const addTodoList = (e) => {
        e.preventDefault();
        const todoListValue = inputvalue.value.trim();
        inputvalue.value = "";
        if (todoListValue !== "" && !locoTodoLists.includes(todoListValue)) { 
          locoTodoLists.push(todoListValue);
          locoTodoLists = [...new Set(locoTodoLists)];
          addTodoListStorage(locoTodoLists);
          addTodoDynamicElement(todoListValue);
        }
      };

      const showtodoList = () => {
        locoTodoLists.forEach((curElem) => {
          addTodoDynamicElement(curElem);
        });
      };

      const removeTodoElem = (e) => {
        const todoremove = e.target;
        let todoListCont = todoremove.previousElementSibling.innerText; // ✅ Correct
        let parentElem = todoremove.parentElement; // ❌ Fixed: "parentElemenyt" -> "parentElement"
        locoTodoLists = locoTodoLists.filter((curTodo) => {
          return curTodo.toLowerCase() !== todoListCont.toLowerCase(); // Optional: Case-insensitivity
        });
        addTodoListStorage(locoTodoLists);
        parentElem.remove();
      };

      mainTodoElem.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target.classList.contains("deletebtn")) { // ❌ Fixed: "deleteBtn" -> "deletebtn" (case-sensitive match)
          removeTodoElem(e);
        }
      });

      document.querySelector(".btn").addEventListener("click", (e) => {
        addTodoList(e);
      });

      // Show existing todo items on page load
      showtodoList();
