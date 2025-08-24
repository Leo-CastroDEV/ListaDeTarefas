// javascript do index.html

let id_user = 1;

let colors = [
{
  task_status: 'novo',
  select_bg_color: 'bg-white'
}, {
  task_status: 'em progresso',
  select_bg_color: 'bg-info'
}, {
  task_status: 'cancelar',
  select_bg_color: 'bg-danger'
}, {
  task_status: 'feito',
  select_bg_color: 'bg-success'
},
];

window.onload = () => {
  get_username(id_user);
  get_user_tasks(id_user);
};

// ---------------------------------------------------
function get_username(id_user) {
  fetch(`http://localhost:3000/user/${id_user}`)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        console.log("ERRO!");
      }
    })
    .then((dados) => {
      if (dados.length === 0) {
        console.log("Erro!");
      } else {
        document.querySelector("#username").textContent = dados[0].username;
      }
    });
}
// ---------------------------------------------------
function get_user_tasks(id_user, status = "all") {
  fetch(`http://localhost:3000/user/${id_user}/tasks/${status}`)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        console.log("ERRO!");
      }
    })
    .then(tarefas => {
      if (tarefas.length === 0) {
        document.querySelector("#no_tasks").classList.remove("d-none");
        document.querySelector("#total_tasks").classList.add("d-none");
      } else {

        document.querySelector("#tasks_container").innerHTML = null;

        tarefas.forEach(tarefa => {

          let color = colors.find(item => item.task_status == tarefa.task_status);

          let html = `
            <div class="col-12 border border-dark-subtle rounded shadow p-3 mb-3 bg-body-tertiary rounded p-3">
                <div class="row align-items-center">
                    <div class="col-8">
                        <div class="d-flex align-items-center">
                            <h5 class="me-3 text-info"><i class="fa-solid fa-chevron-right"></i></h5>
                            <h6>${tarefa.task_text}</h6>
                        </div>
                    </div>
                    <div class="col-2">
                        <select id="task_status_${tarefa.id}" onchange="change_task_status(${tarefa.id})" class="form-select p-2 ${color.select_bg_color}">
                            <option value="novo" ${tarefa.task_status == "novo" ? "selected" : ""}>Novo</option>
                            <option value="em progresso" ${tarefa.task_status == "em progresso" ? "selected" : ""}>Em progresso</option>
                            <option value="cancelar" ${tarefa.task_status == "cancelar" ? "selected" : ""}>Cancelar</option>
                            <option value="feito" ${tarefa.task_status == "feito" ? "selected" : ""}>Feito</option>
                        </select>
                    </div>
                    <div class="col-1 text-end">
                        <span class="edit_link" onclick="edit_task(${tarefa.id})"><i class="fa-solid fa-pen-to-square me-2"></i>Editar</span>
                    </div>
                    <div class="col-1 text-end">
                        <span class="delete_link" onclick="delete_task(${tarefa.id})"><i class="fa-solid fa-trash-can me-2"></i>Deletar</span>
                    </div>
                </div>
            </div>`;

          let new_task = document.createElement("div");
          new_task.classList.add("row", "mx-4");
          new_task.innerHTML = html;

          document.querySelector("#tasks_container").appendChild(new_task);
        });

        document.querySelector("#no_tasks").classList.add("d-none");
        document.querySelector("#total_tasks").classList.remove("d-none");
        document.querySelector("#total_tasks > div > h5 > span").textContent = tarefas.length;
      }
    });
}
// ---------------------------------------------------
function edit_task(id_task) {
  const url = window.location.origin + "/frontend/edit_task.html?id_task=" + id_task;
  window.location.href = url;
}
// ---------------------------------------------------
function delete_task(id_task) {
  const url = window.location.origin + "/frontend/delete_task.html?id_task=" + id_task;
  window.location.href = url;
}
// ---------------------------------------------------
function change_task_status(id_task) {

  let status = document.querySelector("#task_status_" + id_task).value;

  fetch(`http://localhost:3000/user/tasks/update_status`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id_task, status })
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
    })

  // update select color based on task status
  let color_obj = colors.find(e => e.task_status == status);
  let select = document.querySelector(`#task_status_${id_task}`)

  let colors_tmp = colors.map(c => { return c.select_bg_color })
  select.classList.remove(...colors_tmp)
  select.classList.add(color_obj.select_bg_color);
}
// ---------------------------------------------------
document.querySelector("#btn_new_task").addEventListener('click', () => {
  const url = window.location.origin + "/frontend/new_task.html?id_user=" + id_user;
  window.location.href = url;
})
// ---------------------------------------------------
document.querySelector('#select_filter').addEventListener('change', () => {
  let task_status = document.querySelector('#select_filter').value
  get_user_tasks(id_user, task_status);
})