let users = JSON.parse(localStorage.getItem("users")) || [];

const formRegister = document.querySelector("#formRegister");
const containerUsers = document.querySelector("#containerUsers");
const titleForm = document.querySelector("#titleForm");
const btnForm = document.querySelector("#btnForm");

let userEditing = null;

function printUsers() {
    let html = "";

    users.forEach(({ id, mailUser, nameUser }) => {
        html += `
            <tr>
                <td>${nameUser}</td>
                <td>${mailUser}</td>
                <td id="${id}">
                    <button type="button" class="btn btn-danger">DEL</button>
                    <button type="button" class="btn btn-warning">EDIT</button>
                </td>
            </tr>
        `;
    });

    containerUsers.innerHTML = html;
}

formRegister.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameUser = e.target.nameUser.value.trim();
    const mailUser = e.target.mailUser.value.trim();

    if (nameUser === "" || mailUser === "")
        return alert("Todos los campos son necesarios");

    const formUser = { id: crypto.randomUUID(), nameUser, mailUser };

    if (userEditing) {
        const newArray = users.map((user) =>
            user.id === userEditing.id
                ? {
                      ...formUser,
                      id: userEditing.id,
                  }
                : user
        );

        users = newArray;

        userEditing = null;
        titleForm.textContent = "Registrar usuario";
        btnForm.textContent = "Registrar";
        btnForm.classList.remove("btn-warning");
    } else {
        users.push(formUser);
    }

    formRegister.reset();
    printUsers();

    localStorage.setItem("users", JSON.stringify(users));
});

containerUsers.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-danger")) {
        const id = e.target.parentElement.id;
        const res = confirm("Estas seguro que quieres eliminar");

        if (!res) return;

        const newArray = users.filter((user) => user.id !== id);
        users = newArray;
        printUsers();
        localStorage.setItem("users", JSON.stringify(users));
    }

    if (e.target.classList.contains("btn-warning")) {
        const id = e.target.parentElement.id;

        userEditing = users.find((user) => user.id === id);

        titleForm.textContent = "Editando usuario";
        btnForm.textContent = "Editar";
        btnForm.classList.add("btn-warning");

        formRegister.nameUser.value = userEditing.nameUser;
        formRegister.mailUser.value = userEditing.mailUser;
    }
});

printUsers();
