# 📋 Lista de Tarefas  

Aplicação web de **Lista de Tarefas (To-Do List)** desenvolvida com **HTML, CSS, JavaScript (frontend)** e **Node.js + Express + MySQL (backend)**.  
Permite **criar, editar, excluir e visualizar tarefas**, com interface moderna e responsiva.  

---

## 🚀 Funcionalidades  

- ✅ Adicionar nova tarefa  
- ✏️ Editar tarefa existente  
- ❌ Excluir tarefa  
- 📄 Listar todas as tarefas  
- 📱 Interface responsiva e moderna  

---

## 🗂 Estrutura do Projeto  

# bash
_base.html                # Template base

📁 backend/               # Backend Node.js
 ├── package.json         # Dependências do backend
 └── server.js            # Servidor principal

📁 frontend/              # Frontend web
 ├── index.html           # Página principal (lista de tarefas)
 ├── new_task.html        # Página para adicionar tarefa
 ├── edit_task.html       # Página para editar tarefa
 ├── delete_task.html     # Página para excluir tarefa
 └── assets/              # Recursos estáticos (CSS, JS, imagens, fontes)

📁 MATERIAL/
 └── database.sql         # Script SQL para criar o banco de dados#

⚙️ Como Executar
🔹 1. Clonar repositório
git clone https://github.com/usuario/lista-de-tarefas.git
cd lista-de-tarefas

🔹 2. Instalar dependências do backend
cd backend
npm install

🔹 3. Configurar banco de dados (MySQL)

Crie o banco e a tabela utilizando o script em MATERIAL/database.sql ou rode diretamente:

CREATE DATABASE lista_tarefas;
USE lista_tarefas;

CREATE TABLE tarefas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  descricao VARCHAR(255) NOT NULL,
  status ENUM('pendente', 'concluida') DEFAULT 'pendente',
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

🔹 4. Iniciar o servidor
node server.js

🔹 5. Acessar o frontend

Abra o arquivo frontend/index.html no navegador
ou configure o backend para servir os arquivos estáticos.

🛠 Tecnologias Utilizadas

⚡ Node.js

🚀 Express.js

🗄 MySQL

🎨 HTML5 / CSS3 (Bootstrap)

🖊 JavaScript

🎭 FontAwesome

📸 Demonstração (opcional)
<img width="1920" height="1038" alt="FotoDemonstrativa" src="https://github.com/user-attachments/assets/ee632acf-4aab-4431-a7ed-11565db085da" />

(imagem real do seu projeto)

Lista de Tarefas	Nova Tarefa

	
📌 Próximos Passos

🔑 Autenticação de usuários

🔍 Filtros de tarefas (pendentes, concluídas, todas)


👨‍💻 Autor

Feito com 💙 por Leonardo Castro 🚀

🔗 LinkedIn 
 | https://www.linkedin.com/in/leocastrodev

📄 Licença

Este projeto está sob a licença MIT.
Você pode usá-lo, modificá-lo e distribuí-lo livremente.



