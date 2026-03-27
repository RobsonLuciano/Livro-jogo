import Monstro from "./Monstro.js";
 
let dadosMonstro = null;
 
export async function carregarDadosMonstros() {
        const respMonstro = await fetch("/dados/monstros.json");
        if (!respMonstro.ok) throw new Error("Erro ao carregar monstros.json");
            dadosMonstro = await respMonstro.json();
}
    
export function invocarMonstro(id) {
    const data = dadosMonstro.Monstros[id];
    if (!data) return null;
    
    return new Monstro(
        data.nome,
        data.habilidade,
        data.energia,
        data.ataque
    );
}