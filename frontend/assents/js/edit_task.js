let id_task = null;

window.addEventListener('DOMContentLoaded', () => {

    // get id_task 
    const url = new URL(window.location.href);
    id_task = url.searchParams.get('id_task');

    //get task data
    fetch(`http://localhost:3000/user/tasks/get_task/${id_task}`)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("Erro ao buscar a tarefa.");
            }
        })
        .then(task => {
            if (task && task.length > 0 && task[0].task_text !== undefined) {
                document.querySelector("#text_task_text").value = task[0].task_text;
            } else {
                throw new Error("Dados da tarefa inválidos.");
            }
        })
        .catch(error => {
            const errorElem = document.querySelector("#error");
            if (errorElem) {
                errorElem.textContent = error.message;
                errorElem.classList.remove("d-none");
            }
            console.error(error);
        });
});

document.querySelector("#btn_atualizar").addEventListener('click', () => {

    let task_text = document.querySelector("#text_task_text").value;
    let error = document.querySelector("#error");

    // check if input is empty
    if (task_text == null || task_text == '') {
        error.textContent = "Preencha o campo de texto.";
        error.classList.remove("d-none");
        return;
    }

    // check if length if lower ther 100
    if (task_text.length > 100) {
        error.textContent = "O texto deve ter menos de 100 caracteres.";
        error.classList.remove("d-none");
        return;
    }

    // update task in database
    fetch(`http://localhost:3000/user/tasks/update_task`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_task, task_text })
    })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("Erro ao atualizar a tarefa.");
            }
        })
        .then(data => {
            // redirect to homepage after successful update
            window.location.href = window.location.origin + "/frontend/index.html";
        })
        .catch(error => {
            error.textContent = "Erro ao atualizar a tarefa.";
            error.classList.remove("d-none");
            console.error(error);
        });

})
