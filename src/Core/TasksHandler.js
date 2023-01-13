const taskModel = require("../Models/TaskModel");

class TasksHandler {
  constructor() {}

  async gravar(req) {
    try {
      const { tarefa } = req.body;
      const params_1 = [tarefa];
      const userQuery = `SELECT * FROM tasks WHERE VALUE_TASK =?`;
      const user = await taskModel(userQuery, params_1);
      if (user.length > 0) throw new Error("Esta tarefa já existe");

      const params_2 = [tarefa, "PENDENTE"];
      const query = "INSERT INTO tasks (VALUE_TASK,STATE_TASK) VALUES (?,?)";
      await taskModel(query, params_2);
      return { mensagem: "Tarefa criada com sucesso!!!" };
    } catch (error) {
      return { message: error.message, code: 500 };
    }
  }

  async buscar() {
    try {
      const query = "SELECT * FROM tasks";
      return await taskModel(query);
    } catch (error) {
      return {
        message: "falha ao buscar usuarios no banco de dados",
        code: 500,
      };
    }
  }

  async deletar(req) {
    try {
      const { id } = req.params;
      const params_1 = [id];
      const userQuery = `SELECT * FROM tasks WHERE ID_TASKS =?`;
      const user = await taskModel(userQuery, params_1);
      if (user.length == 0) throw new Error("Esta tarefa nao existe");

      const params_2 = [id];
      const query = "DELETE FROM tasks WHERE ID_TASKS =?";
      await taskModel(query, params_2);
      return { mensagem: "Tarefa deletada com sucesso!!!" };
    } catch (error) {
      return { message: error.message, code: 500 };
    }
  }

  async atualizar(req) {
    try {
      const { id } = req.params;
      const params_1 = [id];
      const userQuery = `SELECT * FROM tasks WHERE ID_TASKS =?`;
      const user = await taskModel(userQuery, params_1);

      const [inf] = user;
      const { estado } = inf;

      function estadoCorreto(estado) {
        if (estado === "PENDENTE") {
          const infEdit = "CONCLUIDO";
          return infEdit;
        }
        if (estado === "CONCLUIDO") {
          const infEdit = "PENDENTE";
          return infEdit;
        }
      }
      const estados = estadoCorreto(estado);

      if (user.length == 0) throw new Error("Esta tarefa nao existe");

      const params_2 = [estados, id];
      const query = "UPDATE tasks SET STATE_TASK = ? WHERE ID_TASKS =?";
      await taskModel(query, params_2);
      return { mensagem: "Estado atualizado com sucesso!!!" };
    } catch (error) {
      return { message: error.message, code: 500 };
    }
  }

  async buscarId(req) {
    try {
      const { id } = req.params;
      const params_1 = [id];
      const userQuery = `SELECT * FROM tasks WHERE ID_TASKS =?`;
      const user = await taskModel(userQuery, params_1);
      if (user.length == 0)
        return { mensagem: "Esta tarefa nao existe", code: 500 };

      return user;
    } catch (error) {
      return {
        message: "falha ao buscar usuarios no banco de dados",
        code: 500,
      };
    }
  }

  async buscarBody(req) {
    try {
      const { tarefa } = req.body;
      const params_1 = [tarefa];
      const userQuery = `SELECT * FROM tasks WHERE VALUE_TASK =?`;
      const user = await taskModel(userQuery, params_1);
      if (user.length == 0)
        return { mensagem: "Esta tarefa nao existe", code: 500 };

      return user;
    } catch (error) {
      return {
        message: "falha ao buscar usuarios no banco de dados",
        code: 500,
      };
    }
  }
}

module.exports = TasksHandler;