class ValidaFormulario {
  constructor() {
    this.formulario = document.querySelector('.formulario');
    this.eventos();
  }

  eventos() {
    this.formulario.addEventListener('submit', e => {
      this.handleSubmit(e);
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const camposValidos = this.camposSaoValidos();
    const senhasValidas = this.senhasValidas();
    if(camposValidos && senhasValidas) {
      alert('Formulario enviado');
      this.formulario.submit();
    }
  }

  senhasValidas() {
    let valido = true;
    const senha = this.formulario.querySelector('.senha');
    const repetSenha = this.formulario.querySelector('.repetirSenha');

    if(senha.value !== repetSenha.value) {
      this.criaErro(senha, 'As senhas precisam ser iguais');
      this.criaErro(repetSenha, 'As senhas precisam ser iguais')
      valido = false
    }
    if(senha.value.length < 5 || senha.value.length > 10) {
      this.criaErro(senha, 'Senha precisa ter entre 5 e 10 caracteres')
      valido = false;
    }

    return valido
  }

  camposSaoValidos() {
    let valido = true;

    for(let erro of this.formulario.querySelectorAll('.erro-flag')) {
      erro.remove()
    }

    for(let campo of this.formulario.querySelectorAll('.validar')) {
      const label = campo.previousElementSibling;

      if(!campo.value) {
        this.criaErro(campo, `O campo "${label.innerText}" preencha os dados, nenhum pode estar em branco.`)
        valido = false;
      }

      if(campo.classList.contains('cpf')) {
        if(!this.validaCPF(campo)) valido = false;
      }

      if(campo.classList.contains('usuario')) {
        if(!this.validaUsuario(campo)) valido = false;
      }
    }

    return valido
  }

  validaUsuario(campo) {
    const usuario = campo.value;
    if(usuario.length > 10 || usuario.length < 5) {
      this.criaErro(campo, 'Usuário deverá ter entre 5 e 10 caracteres');
    }
    if(!usuario.match(/^[a-zA-Z0-9]+$/g)) {
      this.criaErro(campo, 'Usuário só poderá conter letras e/ou números');
      return false
    }
    return true
  }

  validaCPF(campo) {
    const cpf = new ValidaCPF(campo.value)

    if(!cpf.valida()) {
      this.criaErro(campo, 'CPF inválido');
      return false;
    }

    return true;
  }

  criaErro(campo, msg) {
    const div = document.createElement('div');
    div.innerHTML = msg;
    div.classList.add('erro-flag');
    campo.insertAdjacentElement('afterend', div)
  }
}

const valida = new ValidaFormulario()