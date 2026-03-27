export default class Item {
    constructor(id, nome, tipo, efeito, bonus = {}) {
        this.id = id;
        this.nome = nome;
        this.tipo = tipo;
        this.efeito = efeito;
        this.bonus = bonus;
    }
    
    
    aplicar(personagem) {
        switch (this.efeito) {
            case "restaurar_habilidade":
                personagem.atual.habilidade = personagem.habilidadeMax;
                break;
            
            case "restaurar_energia":
                personagem.atual.energia = personagem.energiaMax;
                break;
            
            case "aumentar_sorte_max":
                personagem.max.sorte += 1;
                personagem.atual.sorte = personagem.sorteMax;
                break;
            }
        }
}