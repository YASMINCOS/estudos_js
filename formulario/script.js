(function myScope(){
  class ValidaFormulario {
    constructor(nome, sobrenome, cpf, usuario, senha, repSenha) {
      this.nome = nome;
      this.sobrenome = sobrenome;
      this.cpf = cpf.replace(/\D+/g, '');
      this.usuario = usuario;
      this.senha = senha;
      this.repSenha = repSenha;
    }

    verifica(){
      this.validaNome();
      this.validaSobrenome();
      this.validaCPF();
      this.validaUsuario();
      this.validaSenha();
      this.validaRepSenha();
    }

    validaNome() {
      const erros = [];
      if(!this.nome) erros.push(`O campo nome não pode estar vazio`);
      ValidaFormulario.adicionaErros(erros, '.erros-nome');
    }

    validaSobrenome() {
      const erros = [];
      if(!this.sobrenome) erros.push(`O campo sobrenome não pode estar vazio`);
      ValidaFormulario.adicionaErros(erros, '.erros-sobrenome');
    }

    validaCPF() {
      const erros = [];
      const cpf = new ValidaCPF(this.cpf)
      if(!this.cpf) erros.push(`O campo cpf não pode estar vazio`);
      if(!cpf.valida()) erros.push(`CPF inválido`);
      ValidaFormulario.adicionaErros(erros, '.erros-cpf');
    }

    validaUsuario() {
      const erros = [];
      if(!this.usuario) erros.push(`O campo usuario não pode estar vazio`);
      if(this.usuario.length < 3 || this.usuario.length > 12) erros.push(`Usuário deverá ter entre 3 e 12 caracteres`);
      if(!this.usuario.match(/^[a-zA-Z0-9]+$/g)) erros.push('Usuário só poderá conter letras e/ou números');
      ValidaFormulario.adicionaErros(erros, '.erros-usuario');
    }

    validaSenha() {
      const erros = [];
      if(!this.senha) erros.push(`O campo senha não pode estar vazio`);
      if(this.senha !== this.repSenha) erros.push(`O campo senha e repetir-senha precisam ser iguais`)
      ValidaFormulario.adicionaErros(erros, '.erros-senha');
    }

    validaRepSenha() {
      const erros = [];
      if(!this.repSenha) erros.push( `O campo repetir-senha não pode estar vazio`);
      if(this.senha !== this.repSenha) erros.push(`O campo senha e repetir-senha precisam ser iguais`);
      ValidaFormulario.adicionaErros(erros, '.erros-repetirSenha');
    }

    static adicionaErros(erros, classe) {
      const divPai = document.querySelector(classe);

      for(const erro of erros) {
        const p = document.createElement('p');
        const texto = document.createTextNode(erro);
        p.appendChild(texto)
        divPai.appendChild(p);
      }

    }
  }

  const formulario = document.querySelector('.formulario')

  formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.querySelector('.nome').value;
    const sobrenome = document.querySelector('.sobrenome').value;
    const cpf = document.querySelector('.cpf').value;
    const usuario = document.querySelector('.usuario').value;
    const senha = document.querySelector('.senha').value;
    const repSenha = document.querySelector('.repetirSenha').value;


    const novoFormulario = new ValidaFormulario(nome, sobrenome, cpf, usuario, senha, repSenha)
    novoFormulario.verifica()
  })
})()