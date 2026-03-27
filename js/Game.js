import Personagem from "./Heroi.js";
import Inventario from "./Inventario.js";
import Equipamentos from "./Equipamentos.js";
import BlocoNotas from "./BlocoNotas.js";
import { d6, d12 } from "./D6_D12.js";
import {carregarDadosMonstros, invocarMonstro} from "./invocarMonstro.js";
import { carregarDados, criarArma, criarArmadura, criarItem } from "./fabricaEquipamentos.js";
 
class Game {
    constructor(UI) {
    this.UI = UI;
    this.heroi = null;
    this.inventario = null;
    this.equipamentos = null;
    this.blocoNotas = null;
    this.monstro = null;
    
    this.referenciaAtual = null;
    this.flags = {referencias: {}};
    }
    
    async iniciar() {
        this.UI.mostrarMenuInicial();
        this.vincularEventosMenuInicial();
        await carregarDados();
        await carregarDadosMonstros();
    }
    
    vincularEventosMenuInicial() {
        document.getElementById("btnIniciar")
            .addEventListener("click", () => this.iniciarJogo());
        document.getElementById("btnCarregar")
            .addEventListener("click", () => this.carregarJogo());
    }
    
    iniciarJogo() {
        this.heroi = new Personagem();
        this.inventario = new Inventario(this.heroi);
        this.equipamentos = new Equipamentos(this.heroi);
        this.blocoNotas = new BlocoNotas();
        this.UI.limparMenu();
        this.irParaReferencia(0);
    }
    
    carregarJogo() {
        const save = localStorage.getItem("saveJogo");
    
        if (!save) {
            alert("Nenhum save encontrado.");
            return;
        }
    
        const saveData = JSON.parse(save);
        // recria o herói corretamente
        this.heroi = new Personagem(
        saveData.personagem.nome,
        saveData.personagem.habilidade,
        saveData.personagem.energia,
        saveData.personagem.sorte
        );
        this.inventario = new Inventario(
        this.heroi,
        saveData.inventario.armas,
        saveData.inventario.itens,
        saveData.inventario.ouro,
        saveData.inventario.provisoes,
        saveData.inventario.folhas,
        );
        this.equipamentos = new Equipamentos(
        this.heroi,
        saveData.equipamentos.arma,
        saveData.equipamentos.elmo,
        saveData.equipamentos.armadura,
        saveData.equipamentos.escudo,
        saveData.equipamentos.acessorios,
        );
        this.blocoNotas = new BlocoNotas(
        saveData.notas.blocoNotas,
        );
    
        /* =========================
        1. Restaurar Personagem
        ========================== */
        this.heroi.nome = saveData.personagem.nome;
        this.heroi.habInicial = saveData.personagem.habInicial;
        this.heroi.max = saveData.personagem.max;
        this.heroi.atual = saveData.personagem.atual;
        this.heroi.mods = saveData.personagem.mods;
        this.heroi.danos = saveData.personagem.danos;
        
        /* =========================
        2. Restaurar Inventário
        ========================== */
        this.inventario.armas = saveData.inventario.armas;
        this.inventario.itens = saveData.inventario.itens.map(item => criarItem(item.id));
        this.inventario.ouro = saveData.inventario.ouro;
        this.inventario.provisoes = saveData.inventario.provisoes;
        this.inventario.folhas = saveData.inventario.folhas;
    
        /* =========================
        3. Restaurar Equipamentos
        ========================== */
        this.equipamentos.arma = saveData.equipamentos.arma;
        this.equipamentos.elmo = saveData.equipamentos.elmo;
        this.equipamentos.armadura = saveData.equipamentos.armadura;
        this.equipamentos.escudo = saveData.equipamentos.escudo;
        this.equipamentos.acessorios = saveData.equipamentos.acessorios;
        
        /* =========================
        4. Restaurar Notas
        ==========================*/ 
        this.blocoNotas.notas = saveData.notas.blocoNotas;
    
        /* =========================
        5. Restaurar Progresso
        ========================== */
        this.referenciaAtual = saveData.game.referenciaAtual; 
        this.flags = saveData.game.flags;
        
        // Recarrega a cena
        this.UI.mostrarMenuJogo();
        this.vincularEvnetosMenuJogo();
        this.irParaReferencia(this.referenciaAtual);
    }
    
    vincularEvnetosMenuJogo() {
        this.UI.mostrarMenuJogo();
        document.getElementById("btnFicha")
            .addEventListener("click", () => this.chamarFicha());
        document.getElementById("btnCProv")
            .addEventListener("click", () => this.chamarProvisao());
        document.getElementById("btnItens")
            .addEventListener("click", () => this.chamarItens()); 
        document.getElementById("btnEquip")
            .addEventListener("click", () => this.chamarEquipamentos());
        document.getElementById("btnNotas")
            .addEventListener("click", () => this.chamarNotas());
        document.getElementById("btnRegras")
            .addEventListener("click", () => this.chamarRegras());
        document.getElementById("btnSalvar")
            .addEventListener("click", () => this.chamarSalvar());
    }
    
    chamarFicha() {
        this.UI.ficha(this.heroi, this.inventario, this.equipamentos);
        document.getElementById("voltarMenu")
            .addEventListener("click", () => this.vincularEvnetosMenuJogo());
    }
    
    chamarProvisao() {
        this.UI.comerProvisao(this.heroi, this.inventario, this.equipamentos);
        if(this.inventario.provisoes > 0) { 
            if (this.heroi.atual.energia == this.heroi.max.energia) {
                document.getElementById("prov").textContent = `Sua Energia está cheia!`;
            } else { this.inventario.comerProvisoes();
                document.getElementById("prov").textContent = `Você comeu uma provisão e restaurou 4 de Energia.`;}
        } else { 
            document.getElementById("prov").textContent = `Você não tem provisões!`;
        }
        
        // Botão para voltar ao Menu
        document.getElementById("voltarMenu").addEventListener("click", () => this.vincularEvnetosMenuJogo());
    }
    
    chamarItens() {
        this.UI.itens(this.inventario);
        document.querySelectorAll(".item-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const index = Number(btn.dataset.index);
                const item = this.inventario.itens[index];
                if (!item) return;
                
                item.aplicar(this.heroi);
                this.inventario.perderItemPorIndice(index);
                
                this.chamarItens();}); 
            }
        );
        
        document.getElementById("voltarMenu")
            .addEventListener("click", () => this.vincularEvnetosMenuJogo());
    }
        
    chamarEquipamentos() {
        this.UI.equipamentos(this.inventario, this.equipamentos);
        document.querySelectorAll(".armas-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const index = Number(btn.dataset.index);
                const novaArma = this.inventario.armas[index];
                if (!novaArma) return;
                // remove a arma escolhida do inventário
                this.inventario.perderArmaPorIndice(index);
                // troca no equipamento
                const armaAntiga = this.equipamentos.trocarArma(novaArma);
                // arma antiga volta para o inventário
                if (armaAntiga) {this.inventario.adicionarArma(armaAntiga);}
                
                this.chamarEquipamentos();}
            ); }
        );
            
        document.getElementById("voltarMenu")
        .   addEventListener("click", () => this.vincularEvnetosMenuJogo());
    }
    
    chamarNotas() {
        this.UI.notas(this.blocoNotas, this.inventario);
        
        if (this.inventario.folhas > 0) {
            // add Nota
            document.getElementById("addNota").addEventListener("click", () => {
                const texto = document.getElementById("notaTexto").value;
                if (!texto) return; this.blocoNotas.anotar(texto);
                this.chamarNotas()}
            ); 
            // esc Nota
            document.querySelectorAll(".escNotas").forEach(btn => {
                btn.addEventListener("click", () => { 
                const index = Number(btn.dataset.index);
                this.blocoNotas.remover(index), this.chamarNotas()}
                )}
            );
        }
        
        document.getElementById("voltarMenu")
            .addEventListener("click", () => this.vincularEvnetosMenuJogo());
    }
    
    chamarRegras() {
        this.UI.regras();
        document.getElementById("voltarMenu")
            .addEventListener("click", () => this.vincularEvnetosMenuJogo());
    }
    
    chamarSalvar() {
        this.UI.salvar();
        const saveData = {
            personagem: {
                nome: this.heroi.nome,
                habInicial: this.heroi.habInicial,
                max: this.heroi.max,
                atual: this.heroi.atual,
                mods: this.heroi.mods,
                danos: this.heroi.danos,
            },
            inventario: {
                armas: this.inventario.armas,
                itens: this.inventario.itens.map(item => ({id: item.id})),
                ouro: this.inventario.ouro,
                provisoes: this.inventario.provisoes,
                folhas: this.inventario.folhas
            },
            equipamentos: {
                arma: this.equipamentos.arma,
                elmo: this.equipamentos.elmo,
                armadura: this.equipamentos.armadura,
                escudo: this.equipamentos.escudo,
                acessorios: this.equipamentos.acessorios
            },
            notas: {
                blocoNotas: this.blocoNotas.notas,
            },
            game: { 
                referenciaAtual: this.referenciaAtual, 
                flags: this.flags
            },
        }
        localStorage.setItem("saveJogo", JSON.stringify(saveData));
        document.getElementById("voltarMenu")
            .addEventListener("click", () => this.vincularEvnetosMenuJogo());
    }
    
    chamarLutaria(monstro, { flagMorte }) {
        this.monstro = monstro;
        let atkM = 0; let atkH = 0;
        this.UI.lutaria(this.heroi, this.monstro, atkM, atkH);
        
        // Verificar energias
        // Monstro energia == 0
        if (this.monstro.energia <= 0) {
            if (!this.flags.referencias[this.referenciaAtual]) {this.flags.referencias[this.referenciaAtual] = {};}
            this.flags.referencias[this.referenciaAtual][flagMorte] = true;
            this.monstro = null;
            this.vincularEvnetosMenuJogo();
            this.irParaReferencia(this.referenciaAtual);
            return;
        }
        
        // Herói energia == 0
        if (this.heroi.atual.energia <= 0) {
            alert("Você morreu!");
            this.monstro = null;
            location.reload(); 
            return;
        }
        
        // Fase de definição de ataques.
        // Ataque monstro.
        document.getElementById("atkM").addEventListener("click", () => {
            atkM = this.monstro.rolarHabilidade();
            document.getElementById("atkM").disabled = true;
            document.getElementById("atkH").disabled = false;
            document.getElementById("resultadoatkM").innerHTML = `${atkM}`;}
        );
        
        // Ataque heroi.
        document.getElementById("atkH").addEventListener("click", () => {
            atkH = this.heroi.rolarHabilidade();
            document.getElementById("atkM").disabled = true;
            document.getElementById("atkH").disabled = true;
            document.getElementById("resultadoatkH").innerHTML = `${atkH}`;
            resultado(atkM, atkH, this.monstro, this.heroi);}
        );
        
        // Fase de resultados.
        const resultado = (atkM, atkH, monstro, heroi) => {
            // Resultado da batalha.
            // Herói bate Monstro
            if (atkH > atkM) {
                document.getElementById("resultado").innerHTML = `
                    <p class="nomeHeroi">${this.heroi.nome} acertou!</p>`;
                document.getElementById("sorteBtl").innerHTML = `
                    <p>Quer testar a sorte para dobrar o dano?</p>
                    <p><button class="btnGame" id="SSB">Sim</button> 
                    <button class="btnGame" id="NSB">Não</button></p>`;
                // Testando sorte
                document.getElementById("SSB").addEventListener("click", () => {
                    document.getElementById("SSB").disabled = true;
                    document.getElementById("NSB").disabled = true;
                    const sortudo = this.heroi.testarSorte();
                    if (sortudo == true) {
                        monstro.energia -= 4;
                        document.getElementById("sorteResultado").innerHTML = `
                            <p class="nomeHeroi">${this.heroi.nome} foi sortudo!</p>`
                        document.getElementById("dano").innerHTML += `
                            <p>${this.monstro.nome} recebeu 4 de dano!</p>`;
                        continuar(atkM, atkH, monstro, heroi);
                    } else {
                        monstro.energia -= 1;
                        document.getElementById("sorteResultado").innerHTML = `
                            <p class="nomeHeroi">${this.heroi.nome} foi azarado!</p>`;
                        document.getElementById("dano").innerHTML += `
                            <p>${this.monstro.nome} recebeu 1 de dano!</p>`;
                        continuar(atkM, atkH, monstro, heroi);}
                });
                // Não testando sorte
                document.getElementById("NSB").addEventListener("click", () => {
                    document.getElementById("SSB").disabled = true;
                    document.getElementById("NSB").disabled = true;
                    monstro.energia -= 2;
                    document.getElementById("dano").innerHTML += `
                        <p>${this.monstro.nome} recebeu 2 de dano!</p>`;
                    continuar(atkM, atkH, monstro, heroi);
                });
            
            // Monstro bate herói
            } else if (atkM > atkH) {
                document.getElementById("resultado").innerHTML = `
                    <p class="nomeMonstro">O ${this.monstro.nome} acertou!</p>`;
                document.getElementById("sorteBtl").innerHTML = `
                    <p>Quer testar a sorte para reduzir o dano?</p>
                    <p><button class="btnGame" id="SSB">Sim</button>
                    <button class="btnGame" id="NSB">Não</button></p>`;
                // Testando sorte
                document.getElementById("SSB").addEventListener("click", () => {
                    document.getElementById("SSB").disabled = true;
                    document.getElementById("NSB").disabled = true;
                    const sortudo = this.heroi.testarSorte();
                    if (sortudo == true) {
                        for (let i = 0; i < monstro.ataque; i++) {
                            document.getElementById("sorteResultado").innerHTML = `
                                <p class="nomeHeroi">${this.heroi.nome} foi sortudo!</p>`;
                            document.getElementById("dano").innerHTML += `
                                <p>Dano reduziu para 1!</p>`;
                            heroi.danoEnergia(1);
                        }
                        continuar(atkM, atkH, monstro, heroi);
                    } else {
                        for (let i = 0; i < monstro.ataque; i++) {
                            document.getElementById("sorteResultado").innerHTML = `
                                <p class="nomeHeroi">${this.heroi.nome} foi azarado!</p>`;
                            document.getElementById("dano").innerHTML += `
                                <p>Dano dobrou para 4!</p>`;
                            heroi.danoEnergia(4);
                        }
                        continuar(atkM, atkH, monstro, heroi);}
                });
                // Não testando sorte
                document.getElementById("NSB").addEventListener("click", () => {
                    document.getElementById("SSB").disabled = true;
                    document.getElementById("NSB").disabled = true;
                    for (let i = 0; i < monstro.ataque; i++) {
                        document.getElementById("dano").innerHTML += `
                            <p>${this.heroi.nome} recebeu 2 de dano!</p>`;
                        heroi.danoEnergia(2);
                    }
                    continuar(atkM, atkH, monstro, heroi);
                });
            
            } else {
            document.getElementById("dano").innerHTML = `<p>Empatou!</p>`;
            continuar(atkM, atkH, monstro, heroi);}
        
        };
        
        // Fase recurssão.
        const continuar = (atkM, atkH, monstro, heroi) => {
            document.getElementById("restart").disabled = false;
            document.getElementById("restart").addEventListener("click", () => {
                this.chamarLutaria(monstro, { flagMorte });}
            ); 
        };
        
    }
    
    irParaReferencia(id) {
    
        switch (id) {
            case 0: {
                this.referenciaAtual = id;
                if (!this.flags.referencias[0]) {this.flags.referencias[0] = { etapa: 0 };} // Define etapa do texto em flag
                const etapa = this.flags.referencias[0].etapa; // Define etapa do texto no flag
                this.UI.mostrarTexto(id, this.heroi, etapa); 
                
                // Definindo nome
                if (etapa === 0) {
                    document.getElementById("btnSalvarNome").addEventListener("click", () => {
                        const nome = document.getElementById("inputNome").value;
                        if (!nome) { alert("Seu Troll de inteligência -3. Tem que colocar seu nome!"); return; } 
                        this.heroi.nome = nome; 
                        this.flags.referencias[0].etapa = 1;
                        this.irParaReferencia(0);
                    }); 
                }
                
                // Definindo habilidade energia sorte 
                // Habilidade 
                if (etapa === 1) {
                    document.getElementById("D6H").addEventListener("click", () => {
                        this.heroi.max.habilidade = d6() + 6; 
                        this.heroi.atual.habilidade = this.heroi.habilidadeMax;
                        this.heroi.habInicial = this.heroi.atual.habilidade;
                        this.flags.referencias[0].etapa = 2;
                        this.irParaReferencia(0);
                    });
                }
                // Energia
                if (etapa === 2) {
                    document.getElementById("D12E").addEventListener("click", () => {
                        this.heroi.max.energia = d12() + 12; 
                        this.heroi.atual.energia = this.heroi.energiaMax;
                        this.flags.referencias[0].etapa = 3;
                        this.irParaReferencia(0);
                    });
                }
                // Sorte
                if (etapa === 3) {
                    document.getElementById("D6S").addEventListener("click", () => {
                        this.heroi.max.sorte = d6() + 6; 
                        this.heroi.atual.sorte = this.heroi.sorteMax;
                        this.flags.referencias[0].etapa = 4;
                        this.irParaReferencia(0);
                    });
                }
                
                // add itens 
                if (etapa === 4) {
                    document.getElementById("pegaritens").addEventListener("click", () => { 
                        if (this.flags.referencias[0]?.itens) return;
                        this.inventario.adicionarOuro(10);
                        this.inventario.adicionarProvisoes(10);
                        this.inventario.adicionarFolhas(1)
                        this.equipamentos.equiparArma(criarArma("espada"));
                        this.equipamentos.equiparEscudo(criarArmadura("escudo_madeira"));
                        this.equipamentos.equiparArmadura(criarArmadura("couraca_couro"));
                        this.flags.referencias[0] = {...this.flags.referencias[0],itens: true};
                        this.flags.referencias[0].etapa = 5;
                        this.irParaReferencia(0);
                    });
                }
                
                // Botão para próxima referência
                if (etapa === 5) {
                    document.getElementById("01").addEventListener("click", () => this.irParaReferencia(1));
                }
                break
            }
            
            case 1: {
                this.referenciaAtual = id;
                this.UI.mostrarMenuJogo();
                this.vincularEvnetosMenuJogo();
                this.UI.mostrarTexto(id, this.heroi);
                
                // Verifica flag fortuna
                if (!this.flags.referencias[1]?.fortuna) {
                    document.getElementById("fortuna").innerHTML = `
                        <p>Bem na entrada da masmorra você encontra uma <span class="palavraItem">Poção da Fortuna.</span></p>
                        <p>Você a guarda e entra na masmorra.</p>`; 
                    this.inventario.adicionarItem(criarItem("pocao_fortuna"));
                    if (!this.flags.referencias[this.referenciaAtual]) {this.flags.referencias[this.referenciaAtual] = {};}
                    this.flags.referencias[1].fortuna = true;
                }
                
                // Botão para próxima referência 
                document.getElementById("02").addEventListener("click", () => this.irParaReferencia(2));
                document.getElementById("03").addEventListener("click", () => this.irParaReferencia(3));
                
                break
            }
            
            case 2: {
                this.referenciaAtual = id;
                this.UI.mostrarTexto(id, this.heroi);
                
                // Verifica flag monstroMorto
                if (this.flags.referencias[2]?.homem_lagartoMorto) {
                    document.getElementById("02_luta").innerHTML = `
                        <p>O patrulheiro cai!</p>
                        <p>Você pega o seu <span class="palavraItem">Machado</span> e segue por uma passagem estreita até um salão com correntes.</p>`; 
                    this.inventario.adicionarArma(criarArma("machado"));
                    // Botão para próxima referência
                    document.getElementById("B02").innerHTML =`<button class="refs" id="04">Ir para 04</button>`;
                    document.getElementById("04").addEventListener("click", () => this.irParaReferencia(4));
                } else {
                    // Lutaria e Brigação!!!
                    document.getElementById("lutaria").addEventListener("click", () => {
                        const homem_lagarto = invocarMonstro("homem_lagarto"); 
                        this.chamarLutaria(homem_lagarto, { flagMorte: "homem_lagartoMorto" });
                    });
                }
                
                // Arrego.
                const btnFuga = document.getElementById("fuga");
                if (btnFuga) {
                    btnFuga.addEventListener("click", () => {
                        document.getElementById("02_luta").innerHTML = `
                            <p>Pela sua covardia vai tomar uma pelas costas e <span class="palavraPerigo">perder 2 pontos de Energia!</span></p>`;
                        this.heroi.danoEnergia(2);
                        // Botão para próxima referência
                        document.getElementById("B02").innerHTML =`<button class="refs" id="04">Ir para 04</button>`;
                        document.getElementById("04").addEventListener("click", () => this.irParaReferencia(4));
                    });
                }
                
                break
            }
            
            case 3: {
                this.referenciaAtual = id;
                this.UI.mostrarTexto(id, this.heroi);
                
                document.getElementById("pisosS").addEventListener("click", () => {
                    const sortudo = this.heroi.testarSorte();
                    if (sortudo == true) {
                        document.getElementById("pisosS").textContent = `Sortudo`;
                        document.getElementById("pisosS").disabled = true;
                        document.getElementById("sorteCorredor").innerHTML += `
                            <p>Você se segura na parede! Sem dano. Sussurros adiante…</p>`;
                        // Botão para próxima referência
                        document.getElementById("04").addEventListener("click", () => this.irParaReferencia(4)); 
                    } else {
                        document.getElementById("pisosS").textContent = `Azardo`;
                        document.getElementById("pisosS").disabled = true;
                        document.getElementById("sorteCorredor").innerHTML += `
                            <p class="palavraPerigo">Torceu o pé! Perde 1 de Energia.</p>`;
                        this.heroi.danoEnergia(1);
                        // Botão para próxima referência
                        document.getElementById("04").addEventListener("click", () => this.irParaReferencia(4));
                    }
                });
                
                break
            }
            
            case 4: {
                this.referenciaAtual = id;
                this.UI.mostrarTexto(id, this.heroi);
                
                // Botão para próxima referência 
                document.getElementById("06").addEventListener("click", () => this.irParaReferencia(6)); // Liberer Orc
                document.getElementById("08").addEventListener("click", () => this.irParaReferencia(8)); // Atacar direto
                
                // Arrego.
                const btnFuga = document.getElementById("fuga");
                if (btnFuga) {
                    btnFuga.addEventListener("click", () => {
                        document.getElementById("04_correntes").innerHTML = `
                            <p>Pela sua covardia vai tomar uma pelas costas e <span class="palavraPerigo">perder 2 pontos de Energia!</span></p>
                            <p>Você foge desordenado e cai em um túnel lateral.</p>`;
                        this.heroi.danoEnergia(2);
                        // Botão para próxima referência
                        document.getElementById("B04").innerHTML =`<button class="refs" id="05">Ir para 05</button>`;
                        document.getElementById("05").addEventListener("click", () => this.irParaReferencia(5));
                    });
                }
                
                break
            }
            
            case 5: {
                this.referenciaAtual = id;
                this.UI.mostrarTexto(id, this.heroi);
                
                // Verifica flag monstroMorto
                if (this.flags.referencias[5]?.goblinMorto) {
                    document.getElementById("05_luta").innerHTML = `
                        <p>Você o derrota e alcança uma antecâmara com portão rúnico.</p>`;
                    // Botão para próxima referência
                    document.getElementById("B05").innerHTML =`<button class="refs" id="07">Ir para 07</button>`;
                    document.getElementById("07").addEventListener("click", () => this.irParaReferencia(7));
                } else {
                    // Lutaria e Brigação!!!
                    document.getElementById("lutaria").addEventListener("click", () => {
                        const goblin = invocarMonstro("goblin"); 
                        this.chamarLutaria(goblin, { flagMorte: "goblinMorto" });
                    });
                }
                
                // Arrego.
                const btnFuga = document.getElementById("fuga");
                if (btnFuga) {
                    btnFuga.addEventListener("click", () => {
                        document.getElementById("05_luta").innerHTML = `
                            <p>Pela sua covardia vai tomar uma pelas costas e <span class="palavraPerigo">perder 2 pontos de Energia!</span></p>
                            <p>Volta ao Salão das Correntes.</p>`;
                        this.heroi.danoEnergia(2);
                        // Botão para próxima referência
                        document.getElementById("B05").innerHTML =`<button class="refs" id="04">Ir para 04</button>`;
                        document.getElementById("04").addEventListener("click", () => this.irParaReferencia(4));
                    });
                }
                
                break
            }
            
            case 6: {
                this.referenciaAtual = id;
                this.UI.mostrarTexto(id, this.heroi);
                
                // Verifica flag monstroMorto
                if (this.flags.referencias[6]?.capataz_lagartoMorto) {
                    document.getElementById("06_luta").innerHTML = `
                        <p>O Capataz cai morto!</p>
                        <p>O Orc acena positivamente com a cabeça e sai pelo corredor por onde você entrou.</p>
                        <p>Você guarda <span class="palavraItem">${this.equipamentos.nomeArma}</span> e segue adiante.</p>`;
                    this.heroi.mods.habilidadeMax -= 4; 
                    this.heroi.atualizarStatus();
                    // Botão para próxima referência
                    document.getElementById("B06").innerHTML =`<button class="refs" id="09">Ir para 09</button>`;
                    document.getElementById("09").addEventListener("click", () => this.irParaReferencia(9));
                }
                
                // Teste de sorte para soltar corrente.
                const btnCorrentes = document.getElementById("correntesS");
                if (btnCorrentes) {
                    btnCorrentes.addEventListener("click", () => {
                        const sortudo = this.heroi.testarSorte();
                        if (sortudo == true) {
                            document.getElementById("correntesS").textContent = `Sortudo!`;
                            document.getElementById("correntesS").disabled = true;
                            document.getElementById("sorteCorrentes").innerHTML += `
                                <p>Conseguiu!<br>
                                <p>O Orc se solta e ataca o capataz ao seu lado, ajudando você.</p>
                                <p>Você recebe +4 em <span class="palavraAtributo">Habilidade</span> nesta batalha pela ajuda.
                                <button class="btnGame" id="lutaria">Lutaria</button></p>`;
                            this.heroi.mods.habilidadeMax += 4; 
                            this.heroi.atualizarStatus();
                            // Lutaria e Brigação!!!
                            document.getElementById("lutaria").addEventListener("click", () => {
                                const capataz_lagarto = invocarMonstro("capataz_lagarto"); 
                                this.chamarLutaria(capataz_lagarto, { flagMorte: "capataz_lagartoMorto" });
                            }); 
                        } else {
                            document.getElementById("correntesS").textContent = `Azarado!`;
                            document.getElementById("correntesS").disabled = true;
                            document.getElementById("sorteCorrentes").innerHTML += `
                                <p>Demorou!</p>
                                <p>O Capataz Lagarto o ataca pelas costas!</p>
                                <p class="palavraPerigo">Recebeu 2 de dano pelo ataque.</p>
                                <button class="btnGame" id="lutaria">Lutaria</button>`;
                            this.heroi.danoEnergia(2);
                            // Lutaria e Brigação!!!
                            document.getElementById("lutaria").addEventListener("click", () => {
                                const capataz_lagarto = invocarMonstro("capataz_lagarto"); 
                                this.chamarLutaria(capataz_lagarto, { flagMorte: "capataz_lagartoMorto" });
                            });
                        }
                    });
                }
                
                break
            }
            
            case 7: {
                this.referenciaAtual = id;
                this.UI.mostrarTexto(id, this.heroi);
                
                // Verifica flag monstroMorto
                if (this.flags.referencias[7]?.chefe_trancascamasMorto) {
                    document.getElementById("07_luta").innerHTML = `
                        <p>O chefe cai!</p>
                        <p>As runas se apagam. O portão se abre para o <span class="palavraMagia">Jardim Fervente…</span></p>`; 
                    // Botão para próxima referência
                    document.getElementById("B07").innerHTML =`<button class="refs" id="10">Ir para 10</button>`;
                    document.getElementById("10").addEventListener("click", () => this.irParaReferencia(10));
                } else {
                    // Lutaria e Brigação!!!
                    document.getElementById("lutaria").addEventListener("click", () => {
                        const chefe_trancascamas = invocarMonstro("chefe_trancascamas"); 
                        this.chamarLutaria(chefe_trancascamas, { flagMorte: "chefe_trancascamasMorto" });
                    });
                }
                
                // Arrego.
                const btnFuga = document.getElementById("fuga");
                if (btnFuga) {
                    btnFuga.addEventListener("click", () => {
                        document.getElementById("07_luta").innerHTML = `
                            <p>Pela sua covardia vai tomar uma pelas costas e <span class="palavraPerigo">perder 2 pontos de Energia!</span></p>
                            <p>Você recua para o Salão das Correntes.</p>`;
                        this.heroi.danoEnergia(2);
                        // Botão para próxima referência
                        document.getElementById("B07").innerHTML =`<button class="refs" id="04">Ir para 04</button>`;
                        document.getElementById("04").addEventListener("click", () => this.irParaReferencia(4));
                    });
                }
                
                break
            }
            
            case 8: {
                this.referenciaAtual = id;
                this.UI.mostrarTexto(id, this.heroi);
                
                // Verifica flag monstroMorto
                if (this.flags.referencias[8]?.capataz_lagartoMorto) {
                    document.getElementById("08_luta").innerHTML = `
                        <p>O Capataz cai morto!</p>
                        <p>Você guarda <span class="palavraItem">${this.equipamentos.nomeArma}</span> e segue adiante.</p>`; 
                    // Botão para próxima referência
                    document.getElementById("B08").innerHTML =`<button class="refs" id="09">Ir para 09</button>`;
                    document.getElementById("09").addEventListener("click", () => this.irParaReferencia(9));
                } else {
                    // Lutaria e Brigação!!!
                    const capataz_lagarto = invocarMonstro("capataz_lagarto"); 
                    this.chamarLutaria(capataz_lagarto, { flagMorte: "capataz_lagartoMorto" });
                }
                
                break
            }
            
            case 9: {
                this.referenciaAtual = id;
                this.UI.mostrarTexto(id, this.heroi);
                
                // Botão para próxima referência 
                document.getElementById("05").addEventListener("click", () => this.irParaReferencia(5));
                document.getElementById("07").addEventListener("click", () => this.irParaReferencia(7));
                
                break
            }
            
            case 10: {
                this.referenciaAtual = id;
                this.UI.mostrarTexto(id, this.heroi);
                // Botão para próxima referência 
                document.getElementById("10").addEventListener("click", () => location.reload());
                break 
            }
        
        }
    }
}
 export default Game;