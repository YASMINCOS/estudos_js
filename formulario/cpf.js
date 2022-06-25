class ValidaCPF {
  constructor(cpf) {
    Object.defineProperty(this, 'cpfEntrada', {
      writable: false,
      enumerable: false,
      configurable: false,
      value: cpf.replace(/\D+/g, '')
    });
  }

  valida() {
    if(!this.cpfEntrada) return false;
    if(typeof this.cpfEntrada !== 'string') return false;
    if(this.cpfEntrada.length !== 11) return false;
    if(this.isSequencia()) return false;

    const cpfParcial = this.cpfEntrada.slice(0, -2);
    const digito1 = ValidaCPF.criaDigito(cpfParcial);
    const digito2 = ValidaCPF.criaDigito(cpfParcial + digito1)
    const novoCPF = cpfParcial + digito1 + digito2

    return novoCPF === this.cpfEntrada;
  }

  static criaDigito(cpfParcial) {
    const cpfArray = Array.from(cpfParcial);
    let mult = cpfArray.length + 1;

    const total = cpfArray.reduce((ac, atual) => {
      ac += Number(atual) * mult;
      mult--;
      return ac
    }, 0)
    const saida = 11 - (total % 11)

    return saida > 9 ? '0' : String(saida)
  }

  isSequencia() {
    const sequencia = this.cpfEntrada[0].repeat(11)
    return sequencia === this.cpfEntrada
  }
}