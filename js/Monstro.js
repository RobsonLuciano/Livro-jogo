import { d6, d12 } from "./D6_D12.js";
 
class Monstro {
    constructor(nome, habilidade, energia, ataque) {
        this.nome = nome;
        this.habilidade = habilidade;
        this.energia = energia;
        this.ataque = ataque;
    }
    
    rolarHabilidade() {
        let dado = d12();
        return dado + this.habilidade
    }
}
export default Monstro;