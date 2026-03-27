import { d6, d12 } from "./D6_D12.js";
import Equipamentos from "./Equipamentos.js";
 
class Personagem {
    constructor(nome, habilidade, energia, sorte) {
    this.nome = nome;
    this.habInicial = habilidade;
    this.max = {habilidade, energia, sorte};
    this.atual = {habilidade, energia, sorte};
    this.mods = {habilidadeMax: 0, energiaMax: 0, sorteMax: 0}; 
    this.danos = {habilidadeDano: 0, energiaDano: 0, sorteDano: 0};
    this.equipamentos = new Equipamentos(this);
    }
    
    // ===== GETTERS =====
    get habilidadeMax() {return this.max.habilidade + this.mods.habilidadeMax;}
    get energiaMax() {return this.max.energia + this.mods.energiaMax;}
    get sorteMax() {return this.max.sorte + this.mods.sorteMax;}
    
    // ===== MÉTODOS DE JOGO =====
    rolarHabilidade() {
        let dado = d12();
        return dado + this.atual.habilidade
    }
    
    testarSorte() {
        let dado = d12();
        if (dado <= this.atual.sorte) {
            this.atual.sorte--;
            return true;
        } else {
            this.atual.sorte--;
            return false;
        }
    }
    
    danoHabilidade(danoH) {
        this.danos.habilidadeDano += danoH;
        this.atualizarStatus();
    }
    
    danoEnergia(danoE) {
        this.atual.energia -= danoE;
        this.atualizarStatus();
    }
    
    // ===== ATUALIZAÇÃO / CLAMP =====
    atualizarStatus() {
        this.atual.habilidade = this.habInicial;
        this.atual.habilidade -= this.danos.habilidadeDano;
        if (this.atual.energia > this.energiaMax) {this.atual.energia = this.energiaMax;}
        if (this.atual.sorte > this.sorteMax) {this.atual.sorte = this.sorteMax;}
        if (this.atual.habilidade > this.habilidadeMax) {this.atual.habilidade = this.habilidadeMax;}
        if (this.mods.habilidadeMax > 0) {this.atual.habilidade += this.mods.habilidadeMax;}
        
        if (this.danos.habilidadeDano < 0) this.danos.habilidadeDano = 0;
        if (this.atual.habilidade < 0) this.atual.habilidade = 0;
        if (this.atual.sorte < 0) this.atual.sorte = 0;
    }
}
export default Personagem;