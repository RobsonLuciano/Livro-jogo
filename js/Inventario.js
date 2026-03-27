const MAX_ARMAS = 5;
const MAX_ITENS = 10;
 
class Inventario {
    constructor(personagem) {
    this.personagem = personagem;
    
    this.armas = [];
    this.itens = [];
    this.ouro = 0;
    this.provisoes = 0;
    this.folhas = 0;
    }
    
    adicionarArma(nome) {
        if (this.armas.length < MAX_ARMAS) {
            this.armas.push(nome);
            return true;
        } else {
            return false;
        }
    }
    
    perderArma(nome) {
        const index = this.armas.indexOf(nome);
        if (index !== -1) {
            this.armas.splice(index, 1);
            return true;
        }
        return false;
    }
    
    perderArmaPorIndice(index) {
        if (index >= 0 && index < this.armas.length) {
            this.armas.splice(index, 1);
            return true;
        }
        return false;
    }
    
    adicionarItem(item) {
        if (this.itens.length < MAX_ITENS) {
            this.itens.push(item);
            return true;
        } else {
            return false;
        }
    }
    
    perderItem(item) {
        const index = this.itens.indexOf(item);
        if (index !== -1) {
            this.itens.splice(index, 1);
            return true;
        }
        return false;
    }
    
    perderItemPorIndice(index) {
        if (index >= 0 && index < this.itens.length) {
            this.itens.splice(index, 1);
            return true;
        }
        return false;
    }
    
    adicionarOuro(qtdA) {
        this.ouro += qtdA;
    }
    
    gastarOuro(qtdA) {
        this.ouro -= qtdA;
        this.atualizarItens();
    }
    
    adicionarProvisoes(qtdP) {
        this.provisoes += qtdP;
    }
    
    comerProvisoes() {
        this.personagem.atual.energia += 4;
        this.provisoes -- ;
        this.atualizarItens();
        this.personagem.atualizarStatus(); 
    }
    
    adicionarFolhas(qtd = 1) {
        this.folhas += qtd;
    }
    
    perderFolhas(qtd) {
        this.folhas -= qtd;
        this.atualizarItens();
    }
    
    atualizarItens() {
        if (this.ouro < 0) {
            this.ouro = 0;
        }
        
        if (this.provisoes < 0) {
            this.provisoes = 0;
        }
        
        if (this.folhas < 0) {
            this.folhas = 0;
        }
    }
}
export default Inventario;