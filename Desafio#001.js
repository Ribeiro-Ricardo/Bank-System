class User {
  constructor() {
    this.arrayClient = [];
    this.transactionsHistory = [];
  }

  getAccount() {
    const initialValue = this.arrayClient.map((element) => {
      return element.account.balance;
    });
    const loginName = this.arrayClient.map((element) => {
      return element.name;
    });
    const menuClient = Number(window.prompt("Bem vindo " + loginName + "! Seu saldo atual e de: " + initialValue + "\n1. Depositar Valor: \n2. Sacar Valor: \n3. Transações:", ""));
    switch (menuClient) {
      case 1:
        this.getDeposit();
        break;
      case 2:
        this.getWithdraw();
        break;
      case 3:
        this.getTransactions();
        break;
      default:
        this.loadError();
        break;
    }
  }

  uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }

  createClient() {
    const addClient = {};
      addClient.id = this.uuidv4();
      addClient.name = prompt("Nome do Cliente:"),
      addClient.birthday = prompt("Data de Nascimento"),
      addClient.email = prompt("Email:", ""),
      addClient.cpf = prompt("CPF:", ""),
      addClient.address = {
        street: prompt("Nome da Rua:", ""),
        streetNumber: prompt("Numero da Residência:", ""),
        zipCode: prompt("Cep:", ""),
        country: prompt("País:", "")
      };
    addClient.account = {
      balance: 0.0
    };
    this.arrayClient.push(addClient);

    const novo = Number(window.prompt("Deseja adicionar novo cliente?\n1. Sim\n2. Nao", ""));
    switch (novo) {
      case 1:
        this.createClient();
        break;
      case 2:
        this.loadManager();
        break;
      default:
        this.loadError();
        break;
    }
    console.log(this.arrayClient);
  }

  listClients() {
    if (!this.arrayClient.length) {
      alert("Não há clientes cadastrado");
      this.loadManager();
    } else {
      const client = this.arrayClient.map((element) => {
        return element.name;
      });

      const cpf = this.arrayClient.map((element) => {
        return element.cpf;
      });

      const indice = this.arrayClient.map((_, index) => {
        return index;
      });

      const list = Number(window.prompt("Lista de Clientes:\n " + indice + ": " + client + ":\n" + cpf + "\n\n1. Editar Cliente\n2. Deletar Cliente\n3. Voltar", ""));
      switch (list) {
        case 1:
          this.editClient();
          break;
        case 2:
          this.deleteClient();
          break;
        case 3:
          this.loadManager();
          break;
        default:
          this.loadError();
          break;
      }
    }
  }
  editClient() {}

  deleteClient() {
    const delet = Number(window.prompt("Digite o índice do cliente que deseja deletar:", ""));

    if (this.arrayClient.splice(delet, 1)) {
      alert("Cliente deletado com sucesso!");
    }
    this.listClients();
  }

  getWithdraw() {
    const withdraw = Number(window.prompt("Digite o valor que deseja sacar:"), "");
    const balances = this.arrayClient.map((element) => {
      return element.account.balance;
    });
    if (withdraw <= 0) {
      alert("Digite um valor maior que 0!");
      this.getWithdraw();
    }
    if (balances <= 0) {
      alert("Saldo insuficiente!");
      this.getAccount();
    }
    if (withdraw > balances) {
      alert("Saldo insuficiente!");
      this.getAccount();
    } else {
      alert("Transação efetuada com sucesso!");
      this.arrayClient.map((element) => {
        element.account.balance -= withdraw;
        return element;
      });
      this.getAccount();
    }
  }

  getDeposit() {
    const deposit = Number(window.prompt("Digite o valor que deseja depositar:", ""));
    if (deposit > 0) {
      alert("Transação efetuada com sucesso!");
      this.arrayClient.map((element) => {
        element.account.balance += deposit;
        return element;
      });
      this.getAccount();
    } else {
      alert("Digite um valor maior que 0!");
      this.getDeposit();
    }
  }

  getTransactions() {
    
  }
}
class Bank extends User {
  constructor() {
    super();
    this.operation = null;
  }

  loadClient() {
    const cpf = Number(window.prompt("--- Cliente ---\nEntre com seu CPF:", ""));
    if (cpf === !this.arrayClient.length) {
      alert("Cliente não encontrado!");
      return this.loadSystem();
    } else {
      if (this.arrayClient.filter((user) => user.cpf === cpf)) {
        this.getAccount();
      }
    }
  }
  loadManager() {
    alert("--- Sistema Gerente ---");
    const managerSystem = Number(window.prompt("Insira a opção desejada:\n1. Listar Cliente\n2. Criar Cliente\n3. Sair", ""));
    switch (managerSystem) {
      case 1:
        this.listClients();
        break;
      case 2:
        this.createClient();
        break;
      case 3:
        this.loadSystem();
        break;
      default:
        this.loadError();
        break;
    }
  }

  loadError() {
    const result = Number(window.prompt("Opção inválida. Voce deseja tentar novamente?\n1. Sim\n2. Não", ""));
    if (result === 1) {
      return this.loadSystem();
    } else {
      return this.exitSystem();
    }
  }

  exitSystem() {
    alert("--- Muito obrigado por usar nosso sistema. Até logo! ---");
  }

  loadSystem() {
    alert("--- Olá, seja bem vindo ao Banco do Brasil ---");
    const menu = Number(window.prompt("Insira a opcao desejada:\n1. Gerente\n2. Cliente", ""));
    switch (menu) {
      case 1:
        this.loadManager();
        break;
      case 2:
        this.loadClient();
        break;
      default:
        this.loadError();
        break;
    }
  }
}
const loadBankSystem = () => {
  const bankMenu = new Bank();
  bankMenu.loadSystem();
};
loadBankSystem();
