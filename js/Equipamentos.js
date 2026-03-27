export default class Equipamentos {
    constructor(personagem) {
        this.personagem = personagem;
        
        this.arma = null;
        this.elmo = null;
        this.armadura = null;
        this.escudo = null;
        this.acessorios = [];
    }
    
    // Armas
    equiparArma(arma) {
        this.arma = arma;
        this.atualizarEquip();
    }
    
    desequiparArma() {
        this.arma = null;
        this.atualizarEquip();
    }
    
    trocarArma(novaArma) {
        const armaAnterior = this.arma;
        this.arma = novaArma;
        this.atualizarEquip();
        return armaAnterior;
    }
    
    // Elmos
    equiparElmo(elmo) {
        this.elmo = elmo;
        this.atualizarEquip();
    }
    
    desequiparElmo() {
        this.elmo = null;
        this.atualizarEquip();
    }
    
    trocarElmo(novoElmo) {
        const elmoAnterior = this.elmo;
        this.elmo = novoElmo;
        this.atualizarEquip();
        return elmoAnterior;
    }
    
    // Armaduras
    equiparArmadura(armadura) {
        this.armadura = armadura;
        this.atualizarEquip();
    }
    
    desequiparArmadura() {
        this.armadura = null;
        this.atualizarEquip();
    }
    
    trocarArmadura(novaArmadura) {
        const armaduraAnterior = this.armadura;
        this.armadura = novaArmadura;
        this.atualizarEquip();
        return armaduraAnterior;
    }
    
    // Escudos
    equiparEscudo(escudo) {
        this.escudo = escudo;
        this.atualizarEquip();
    }
    
    desequiparEscudo() {
        this.escudo = null;
        this.atualizarEquip();
    }
    
    trocarEscudo(novoEscudo) {
        const escudoAnterior = this.escudo;
        this.escudo = novoEscudo;
        this.atualizarEquip();
        return escudoAnterior;
    }
    
    // Acessórios
    adicionarAcessorio(acessorio) {
        this.acessorios.push(acessorio);
        this.atualizarEquip();
    }
    
    removerAcessorio(acessorio) {
        this.acessorios = this.acessorios.filter(a => a !== acessorio);
        this.atualizarEquip();
    }
    
    get listaAcessorios() {
        if (this.acessorios.length === 0) return "Nenhum";
        return this.acessorios.map(a => a.nome).join(", ");
    }
    
    get nomeArma() {
        return this.arma ? this.arma.nome : "Nenhuma";
    }
    
    get nomeEscudo() {
        return this.escudo ? this.escudo.nome : "Nenhum";
    }
    
    get nomeElmo() {
        return this.elmo ? this.elmo.nome : "Nenhum";
    }
    
    get nomeArmadura() {
        return this.armadura ? this.armadura.nome : "Nenhuma";
    }
    
    
    // ===== ATUALIZAÇÃO DE MODS =====
    atualizarEquip() {
        const mods = this.personagem.mods;
        
        // reset
        mods.habilidadeMax = 0;
        mods.energiaMax = 0;
        mods.sorteMax = 0;
        
        const aplicarBonus = (item) => {
            if (!item || !item.bonus) return;
            for (const chave in item.bonus) {
                mods[chave] += item.bonus[chave];
            }
        };
        
        aplicarBonus(this.arma);
        aplicarBonus(this.elmo);
        aplicarBonus(this.armadura);
        aplicarBonus(this.escudo);
        this.acessorios.forEach(aplicarBonus);
        
        this.personagem.atualizarStatus();
    }
}