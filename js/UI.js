class UI {
    static init({ texto, refBtn, menu }) {
    this.texto = texto;
    this.refBtn = refBtn;
    this.menu = menu;
    }
    
    static mostrarMenuInicial() {
        this.texto.innerHTML = `
            <div class="box_game"><div class="boxGame">
                <p>Aventuras em Tandanun – O Enigma das Ervas Antigas</p>
            </div></div>`;
        this.refBtn.innerHTML = `
            <div class="box_refs">
                <p>
                ⚔️ <span class="palavraAtributo">Teste sua Habilidade</span><br>
                🍖 Gerencie suas <span class="palavraItem">Provisões</span><br>
                🍀 Confie — ou não — em sua <span class="palavraMagia">Sorte</span><br>
                ☠️ Evite os perigos que drenam sua 
                <span class="palavraPerigo">Energia</span>
                </p>
            </div>`;
        this.limparMenu();
        this.menu.innerHTML = `
            <div class="box_menu">
                <button class="menu" id="btnIniciar">Iniciar Jogo</button>
                <button class="menu" id="btnCarregar">Carregar Jogo</button>
            </div>
        `;
    }
    
    static mostrarMenuJogo() {
        this.limparMenu();
        this.menu.innerHTML = `
            <div class="box_menu">
                <button class="menu" id="btnFicha">Ficha de personagem</button>
                <button class="menu" id="btnCProv">Comer Provisões</button>
                <button class="menu" id="btnItens">Itens</button>
                <button class="menu" id="btnEquip">Equipamentos</button>
                <button class="menu" id="btnNotas">Anotações</button>
                <button class="menu" id="btnRegras">Regras do Jogo</button>
                <button class="menu" id="btnSalvar">Salvar</button>
            </div>
        `;
    }
    
    static ficha(heroi, inventario, equipamentos) {
        this.limparMenu();
        this.menu.innerHTML = `
            <div class="box_menu">
                <div class="titulo">
                    <h2 class="palavraTitulo">FICHA DE PERSONAGEM</h2>
                </div>
                <div class="textMenu">
                    <div class="menuCxLinha">
                        <div class="menuCaixa">
                            <p><b>Nome:</b> ${heroi.nome}</p>
                        </div>
                    </div>
                    <div class="menuCxLinha">
                        <div class="menuCaixa">
                            <b>Habilidade:</b> 
                            <p><i>Inicial:</i> ${heroi.habilidadeMax}</p>
                            <p><i>Atual:</i> ${heroi.atual.habilidade}</p>
                        </div>
                        <div class="menuCaixa">
                            <b>Energia:</b> 
                            <p><i>Inicial:</i> ${heroi.energiaMax}</p>
                            <p><i>Atual:</i> ${heroi.atual.energia}</p>
                        </div>
                        <div class="menuCaixa">
                            <b>Sorte:</b> 
                            <p><i>Inicial:</i> ${heroi.sorteMax}</p>
                            <p><i>Atual:</i> ${heroi.atual.sorte}</p>
                        </div>
                    </div>
                    <div class="menuCxLinha">
                        <div class="menuCaixa">
                            <p><b>Ouro:</b> ${inventario.ouro}</p>
                        </div>
                        <div class="menuCaixa">
                            <p><b>Provisões:</b> ${inventario.provisoes}</p>
                        </div>
                        <div class="menuCaixa">
                            <p><b>Pergaminhos:</b> ${inventario.folhas}</p>
                        </div>
                    </div>
                    <div class="menuCxLinha">
                        <div class="menuCaixa">
                            <p><b>Arma:</b></p><p>${equipamentos.nomeArma}</p>
                        </div>
                        <div class="menuCaixa">
                            <p><b>Escudo:</b></p><p>${equipamentos.nomeEscudo}</p>
                        </div>
                    </div>
                    <div class="menuCxLinha">
                        <div class="menuCaixa">
                            <p><b>Elmo:</b></p><p>${equipamentos.nomeElmo}</p>
                        </div>
                        <div class="menuCaixa">
                            <p><b>Armadura:</b></p><p>${equipamentos.nomeArmadura}</p>
                        </div>
                    </div>
                    <div class="menuCxLinha">
                        <div class="menuCaixa">
                            <p><b>Acessórios:</b> ${equipamentos.listaAcessorios}</p>
                        </div>
                    </div>
                </div>
                <button class="menu" id="voltarMenu">Voltar Menu</button>
            </div> `;
    }
    
    static comerProvisao() {
        this.limparMenu();
        this.menu.innerHTML = `
            <div class="box_menu">
                <div class="titulo">
                    <h2 class="palavraTitulo">PROVISÕES</h2>
                </div>
                <div class="textMenu">
                    <div class="menuCxLinha">
                        <div class="menuCaixa">
                            <p class="centro" id="prov"></p>
                        </div>
                    </div>
                </div>
                <button class="menu" id="voltarMenu">Voltar Menu</button>
            </div>`;
    }
    
    static itens(inventario) {
        this.limparMenu();
        let html = `
            <div class="box_menu">
                <div class="titulo">
                    <h2 class="palavraTitulo">ITENS</h2>
                </div>`;
                
                if (inventario.itens.length === 0) { html += `
                    <div class="textMenu">
                        <div class="menuCxLinha">
                            <div class="menuCaixa">
                                <p class="centro">Você não possui itens no inventário.</p>
                            </div>
                        </div>
                    </div>`;}
                else {inventario.itens.forEach((item, index) => { html += `
                    <div class="textMenu">
                        <div class="menuCxLinha">
                            <div class="menuCaixa centro">
                                <button class="menu item-btn" data-index="${index}">${item.nome}</button>
                            </div>
                        </div>
                    </div>`;
                });} 
            
            html += `<button class="menu" id="voltarMenu">Voltar Menu</button></div>`;
        this.menu.innerHTML = html;
    }
    
    static equipamentos(inventario, equipamentos) {
        this.limparMenu();
        let html = `
            <div class="box_menu">
                <div class="titulo">
                    <h2 class="palavraTitulo">EQUIPAMENTOS</h2>
                </div>
                <div class="textMenu">
                    <div class="menuCxLinha">
                        <div class="menuCaixa">
                            <p><b>Arma:</b></p><p>${equipamentos.nomeArma}</p>
                        </div>
                        <div class="menuCaixa">
                            <p><b>Escudo:</b></p><p>${equipamentos.nomeEscudo}</p>
                        </div>
                    </div>
                    <div class="menuCxLinha">
                        <div class="menuCaixa">
                            <p><b>Elmo:</b></p><p>${equipamentos.nomeElmo}</p>
                        </div>
                        <div class="menuCaixa">
                            <p><b>Armadura:</b></p><p>${equipamentos.nomeArmadura}</p>
                        </div>
                    </div>
                    <div class="menuCxLinha">
                        <div class="menuCaixa">
                            <span><b>Acessórios:</b> ${equipamentos.listaAcessorios}</span>
                        </div>
                    </div>
                </div>`;
                
                if (inventario.armas.length === 0) { html += `
                    <div class="textMenu">
                        <div class="menuCxLinha">
                            <div class="menuCaixa">
                                <p class="centro">Você não possui armas no inventário.</p>
                            </div>
                        </div>
                    </div>`;}
                else {inventario.armas.forEach((armas, index) => { html += `
                    <div class="textMenu">
                        <div class="menuCxLinha">
                            <div class="menuCaixa centro">
                                <button class="menu armas-btn" data-index="${index}">${armas.nome}</button>
                            </div>
                        </div>
                    </div>`;
                });} 
                
            html += `<button class="menu" id="voltarMenu">Voltar Menu</button></div>`;
        this.menu.innerHTML = html;
    } 
    
    static notas(blocoNotas, inventario) {
        this.limparMenu();
        let html = `
            <div class="box_menu">
                <div class="titulo">
                    <h2 class="palavraTitulo">Bloco de Notas</h2>
                </div>`;
            
                if (inventario.folhas == 0) { html += `
                    <div class="textMenu">
                        <div class="menuCxLinha">
                            <div class="menuCaixa">
                                <p class="centro">Você não possui folhas no inventário.</p>
                            </div>
                        </div>
                    </div>`;} 
                else { if (blocoNotas.notas.length === 0) { html += `
                            <div class="textMenu">
                                <div class="menuCxLinha">
                                    <div class="menuCaixa">
                                        <p class="centro">Seu bloco está vazio.</p>
                                    </div>
                                </div>
                            </div>`;}
                        else {blocoNotas.notas.forEach((notas, index) => { html += `
                            <div class="textNotas">
                                <p id="notas">${notas}</p>
                                <button class="btnNotas escNotas" data-index="${index}">Excluir nota</button>
                            </div>`;
                        });}
                    html += `
                    <div class="textNotas">
                        <input type="text" id="notaTexto" required />
                        <button class="btnNotas" id="addNota">Salvar nota</button>
                    </div>`;
                }
            html += `<button class="menu" id="voltarMenu">Voltar Menu</button></div>`;
        this.menu.innerHTML = html;
    }
    
    static regras() {
        this.limparMenu();
        this.menu.innerHTML = `
            <div class="box_menu">
                <div class="titulo">
                    <h2 class="palavraTitulo">REGRAS DO JOGO</h2>
                </div>
                <div class="textMenu">
                    <div class="menuCaixa">
                        <p><b>-TESTAR HABILIDADE:</b></p>
                        <p>Lance 2 dados.</p>
                        <p>Se o total for menor ou igual à sua Habilidade, você passa no teste.</p>
                    </div>
                    <div class="menuCaixa">
                        <p><b>-TESTAR SORTE:</b></p>
                        <p>Lance 2 dados.</p>
                        <p>Se o total for menor ou igual à sua Sorte, você é bem-sucedido.</p> 
                        <p>Reduza 1 ponto de Sorte após cada teste.</p>
                    </div>
                    <div class="menuCaixa">
                        <p><b>-BATALHA:</b></p>
                        <p>Lance 2 dados e some à sua Habilidade.</p> 
                        <p>O inimigo faz o mesmo.</p> 
                        <p>Quem tiver o maior total acerta o golpe.</p>
                    </div>
                    <div class="menuCaixa">
                        <p><b>-DANO:</b></p>
                        <p>Quando você acerta, reduza 2 pontos de Energia do inimigo.</p> 
                        <p>Quando o inimigo acerta, reduza 2 pontos da sua Energia.</p>
                    </div>
                    <div class="menuCaixa">
                        <p><b>-TESTAR SORTE NA BATALHA:</b></p>
                        <p>Se tiver acertado o golpe e passar no teste de Sorte, cause +2 de dano.</p> 
                        <p>Se falhar, cause apenas 1 de dano.</p>
                        <p>Se tiver levado dano e passar no teste de Sorte, reduza o dano em 1.</p> 
                        <p>Se falhar, receba +1 de dano.</p>
                    </div>
                    <div class="menuCaixa">
                        <p><b>-PROVISÃO:</b></p>
                        <p>Cada porção recupera 4 pontos de sua Energia.</p>
                    </div>
                </div>
            <p><button class="menu" id="voltarMenu">Voltar Menu</button></p>
        </div>`;
    }
    
    static salvar() {
        this.limparMenu();
        this.menu.innerHTML = `
            <div class="box_menu">
                <div class="textMenu">
                    <div class="menuCaixa centro">
                        <p>Jogo salvo com sucesso!</p>
                    </div>
                </div>
            <p><button class="menu" id="voltarMenu">Voltar Menu</button></p>
        </div>`;
    }
    
    static lutaria(heroi, monstro, atkM, atkH) {
        this.limparMenu();
        this.texto.innerHTML = `
            <div class="box_game"><div class="boxGame">
                <div class="titulo">
                    <h2 class="palavraTitulo">LUTARIA E BRIGAÇÃO</h2>
                </div>
                
                <div class="lutCabWrapper">
                    <div class="menuCxLinha">
                        <div class="menuCaixa">
                            <span class="linha">
                                <p><span class="nomeHeroi">${heroi.nome}</span></p>
                                <span class="palavraAtributo">
                                    <p>Habilidade: ${heroi.atual.habilidade}</p>
                                    <p>Energia: ${heroi.atual.energia}</p>
                                    <p>Sorte: ${heroi.atual.sorte}</p>
                                </span>
                            </span>
                        </div>
                        <div class="menuCaixa">
                            <span class="linha">
                                <p><span class="nomeMonstro">${monstro.nome}</span></p>
                                <span class="palavraAtributo">
                                    <p>Habilidade: ${monstro.habilidade}</p>
                                    <p>Energia: ${monstro.energia}</p>
                                    <p>Ataque: ${monstro.ataque}</p>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
                
                <div class="lutCabBoton">
                    <button class="btnGame" id="atkM">Definir ataque do<br>${monstro.nome}</button>
                    <button class="btnGame" id="atkH" disabled>Definir ataque do<br>${heroi.nome}</button>
                </div>
                    
                <div class="lutaria" id="lutaria">
                    
                    <div class="menuCxLinha">
                        <div class="menuCaixa itemCentro nomeMonstro">
                            <p>Ataque ${monstro.nome}</p><p id="resultadoatkM">_</p>
                        </div>
                        <div class="menuCaixa itemCentro nomeHeroi">
                            <p>Ataque ${heroi.nome}</p><p id="resultadoatkH">_</p>
                        </div>
                    </div>
                    <div class="menuCaixa resultado">
                        <p id="resultado">Quem será o mais forte?</p>
                    </div> 
                    <div class="menuCaixa sorteBtl itemCentro">
                        <p id="sorteBtl">Os dados estão do seu lado?</p>
                        <p id="sorteResultado"></p>
                    </div> 
                    <div class="menuCaixa resultado palavraPerigo">
                        <span id="dano"></span>
                    </div>
                    <p><button class="btnGame" id="restart" disabled>Próximo turno</button></p>
                
                </div>
            </div></div>
        `;
    }
    
    static mostrarTexto(id, heroi, etapa) {
    
        switch (id) {
            case 0: {
                if (etapa === 0) {
                    this.texto.innerHTML = `
                    <div class="box_game"><div class="boxGame">
                        <p class="negrito">Então é você o tal Aventureiro?</p>
                        <p>Hmm...</p>
                        <p>Já vi galinha de quintal mais imponente...</p>
                        <p>Bom. Melhor do que nada.</p>
                        <p>E você ao menos tem um nome?</p>
                        <p>Coloca teu nome aqui: <input type="text" id="inputNome" required />
                        <button class="btnGame" id="btnSalvarNome">Salvar Nome</button></p>
                    </div></div>`;
                }
                if (etapa === 1) {
                    this.texto.innerHTML = `
                    <div class="box_game"><div class="boxGame">
                        <p>Como é que é!?</p>
                        <p class="nomeHeroi">${heroi.nome}!?</p>
                        <p>É... já ouvi nomes piores. Mas não muitos.</p>
                        <p>Agora vamos definir seus valores de <b>Habilidade, Energia e Sorte.</b></p>
                        <div class="linhaPergaminho"></div>
                        <p class="negrito sublinhado">HABILIDADE:</p>
                        <p>Representa sua destreza e capacidade em combate. Quanto maior, melhor.</p>
                        <p>Role um dado de 6 lados e some 6 ao resultado.
                        <button class="btnGame" id="D6H">Rolar o D6</button></p>
                    </div></div>`;
                }
                if (etapa === 2) {
                    this.texto.innerHTML = `
                    <div class="box_game"><div class="boxGame">
                        <p class="palavraAtributo">Sua HABILIDADE é: ${heroi.habilidadeMax}</p>
                        <div class="linhaPergaminho"></div>
                        <p class="negrito sublinhado">ENERGIA:</p>
                        <p>Indica sua forca vital. Se chegar a zero, sua aventura termina.</p>
                        <p>Role um dado de 12 lados e some 12 ao resultado.
                        <button class="btnGame" id="D12E">Rolar o D12</button></p>
                    </div></div>`;
                }
                if (etapa === 3) {
                    this.texto.innerHTML = `
                    <div class="box_game"><div class="boxGame">
                        <p class="palavraAtributo">Sua ENERGIA é: ${heroi.energiaMax}</p>
                        <div class="linhaPergaminho"></div>
                        <p class="negrito sublinhado">SORTE:</p>
                        <p>Mede sua capacidade de contar com a sorte.</p> 
                        <p>Quanto maior, mais chances de sucesso.</p>
                        <p>Role um dado de 6 lados e some 6 ao resultado.
                        <button class="btnGame" id="D6S">Rolar o D6</button></p>
                    </div></div>`;
                } 
                if (etapa === 4) {
                    this.texto.innerHTML = `
                    <div class="box_game"><div class="boxGame">
                        <p class="palavraAtributo">Sua SORTE é: ${heroi.sorteMax}</p>
                        <div class="linhaPergaminho"></div>
                        <p>Agora escute bem, ${heroi.nome}.</p>
                        <p>Preciso que você recupere uma <span class="ervaRara"><i>erva rara</i></span> em uma masmorra.</p>
                        <p class="negrito">... O que eu vou fazer com a erva não é da sua conta!</p>
                        <p>Basta saber que ela é... importante.</p>
                        <p>Mas antes, vamos ao básico...</p>
                        <p>Você não tem arma? Nem uma moeda? Nem um pão dormido?</p>
                        <p>Que tipo de aventureiro é você?</p>
                        <p>Tsc... por sorte, tenho aqui uma Espada e um Escudo.</p>
                        <p>E já que você parece mais quebrado que carroça sem roda...</p>
                        <p>Vou te dar 10 moedas de ouro e 10 provisões.</p>
                        <p>Cada porção recupera 4 pontos da sua Energia. <b>Não gaste tudo de uma vez!</b></p>
                        <p>Agora vá logo!</p>
                        <p>Só de olhar pra sua cara já sinto dor de cabeça... 
                        <button class="btnGame" id="pegaritens">Pegar itens</button></p>
                    </div></div>`;
                }
                if (etapa === 5) {
                    this.texto.innerHTML = `
                    <div class="box_game"><div class="boxGame">
                        <p>Ah!</p>
                        <p>Você pode ver os itens e equipamentos que eu te entreguei em</p> 
                        <p><span class="palavraMagia">FICHA DE PERSONAGENS.</span></p>
                        <p>E pra seguir viagem só clicar no botão Iniciar aventura aí abaixo.</p>
                        <p>Vá logo!</p>
                        <p>Não fica aí me olhando com essa cara...</p>
                    </div></div>`;
                    
                    this.refBtn.innerHTML = `
                    <div class="box_refs">
                        <button class="refs" id="01">Iniciar aventura</button>
                    </div>`;
                }
                break
            }
            
            case 1: {
                this.texto.innerHTML = `
                <div class="box_game"><div class="boxGame">
                    <p>À frente, a entrada úmida da masmorra sob as Colinas Verdes.</p>
                    <p>Dizem que os homens-lagarto escravizam goblinoides aqui.</p>
                    <div id="fortuna"></div>
                    <p>Dois túneis: um com cheiros de peixe <b>(02)</b> e outro com passos leves <b>(03)</b>.</p>
                    <p>Qual túnel vai seguir?</p>
                </div></div>`;
                
                this.refBtn.innerHTML = `
                <div class="box_refs">
                    <button class="refs" id="02">Ir para 02</button>
                    <button class="refs" id="03">Ir para 03</button>
                </div>`;
                break
            }
            
            case 2: {
                this.texto.innerHTML = `
                <div class="box_game"><div class="boxGame">
                    <div id="02_luta">
                        <p>Você avança pelo corredor úmido.</p>
                        <p>Um Homem-Lagarto Patrulheiro aparece farejando o ar!</p>
                        <div class="centro">
                            <button class="btnGame" id="lutaria">Vai encarar?</button>
                            <button class="btnGame" id="fuga">Ou fugir?</button>
                        </div>
                    /div>
                </div></div>`;
                
                this.refBtn.innerHTML = `
                <div class="box_refs">
                    <div id="B02">
                        <p>
                            ⚔️ <span class="palavraAtributo">Teste sua Habilidade</span><br>
                            🍖 Gerencie suas <span class="palavraItem">Provisões</span><br>
                            🍀 Confie — ou não — em sua <span class="palavraMagia">Sorte</span><br>
                            ☠️ Evite os perigos que drenam sua 
                            <span class="palavraPerigo">Energia</span>
                        </p>
                    </div>
                </div>`;
                break
            }
            
            case 3: {
                this.texto.innerHTML = `
                <div class="box_game"><div class="boxGame">
                    <p>Corredor de pedras irregulares. Você pisa em falso! 
                    <button class="btnGame" id="pisosS">Testar Sorte</button></p>
                    <div id="sorteCorredor"></div>
                </div></div>`;
                
                this.refBtn.innerHTML = `
                <div class="box_refs">
                    <button class="refs" id="04">Ir para 04</button>
                </div>`;
                break
            }
            
            case 4: {
                this.texto.innerHTML = `
                <div class="box_game"><div class="boxGame">
                    <div id="04_correntes">
                        <p>Salão das Correntes.</p>
                        <p>Um Capataz Lagarto vigia Orcs acorrentados.</p>
                        <p>Você pode tentar libertar um Orc ou atacar direto o Capataz Lagarto.</p>
                        <p>Ou se preferir pode fugir.</p>
                    </div>
                </div></div>`;
                
                this.refBtn.innerHTML = `
                <div class="box_refs">
                    <div id="B04">
                        <button class="refs" id="06">Liberar Orc</button>
                        <button class="refs" id="08">Atacar</button>
                        <button class="refs" id="fuga">Fugir</button>
                    </div>
                </div>`;
                break
            }
            
            case 5: {
                this.texto.innerHTML = `
                <div class="box_game"><div class="boxGame">
                    <div id="05_luta">
                        <p>Túnel do Vapor.</p>
                        <p>O ar fica quente e perfumado.</p>
                        <p>Um Goblin ronda distraído, fungando o ar!</p>
                        <div class="centro">
                            <button class="btnGame" id="lutaria">Vai encarar?</button>
                            <button class="btnGame" id="fuga">Ou fugir?</button>
                        </div>
                    </div>
                </div></div>`;
                
                this.refBtn.innerHTML = `
                <div class="box_refs">
                    <div id="B05">
                        <p>
                            ⚔️ <span class="palavraAtributo">Teste sua Habilidade</span><br>
                            🍖 Gerencie suas <span class="palavraItem">Provisões</span><br>
                            🍀 Confie — ou não — em sua <span class="palavraMagia">Sorte</span><br>
                            ☠️ Evite os perigos que drenam sua 
                            <span class="palavraPerigo">Energia</span>
                        </p>
                    </div>
                </div>`;
                break
            }
            
            case 6: {
                this.texto.innerHTML = `
                <div class="box_game"><div class="boxGame">
                    <div id="06_luta">
                        <p>Você corre às correntes! <span class="palavraAtributo">Teste a Sorte</span> para soltar rápido: 
                        <button class="btnGame" id="correntesS">Testar Sorte</button></p>
                        <div id="sorteCorrentes"></div><
                    /div>
                </div></div>`;
                
                this.refBtn.innerHTML = `
                <div class="box_refs">
                    <div id="B06">
                        <p>
                            ⚔️ <span class="palavraAtributo">Teste sua Habilidade</span><br>
                            🍖 Gerencie suas <span class="palavraItem">Provisões</span><br>
                            🍀 Confie — ou não — em sua <span class="palavraMagia">Sorte</span><br>
                            ☠️ Evite os perigos que drenam sua 
                            <span class="palavraPerigo">Energia</span>
                        </p>
                    </div>
                </div>`;
                break
            }
            
            case 7: {
                this.texto.innerHTML = `
                <div class="box_game"><div class="boxGame">
                    <div id="07_luta">
                        <p>Antecâmara do Jardim Fervente. Um portão rúnico pulsa.</p>
                        <p>Há um Chefe Trançascamas na porta, olhos frios.</p>
                        <p class="centro">
                        <button class="btnGame" id="lutaria">Vai encarar?</button>
                        <button class="btnGame" id="fuga">Ou fugir?</button></p>
                    </div>
                </div></div>`;
                
                this.refBtn.innerHTML = `
                <div class="box_refs">
                    <div id="B07">
                        <p>
                            ⚔️ <span class="palavraAtributo">Teste sua Habilidade</span><br>
                            🍖 Gerencie suas <span class="palavraItem">Provisões</span><br>
                            🍀 Confie — ou não — em sua <span class="palavraMagia">Sorte</span><br>
                            ☠️ Evite os perigos que drenam sua 
                            <span class="palavraPerigo">Energia</span>
                        </p>
                    </div>
                </div>`;
                break
            }
            
            case 8: {
                this.texto.innerHTML = `
                <div class="box_game"><div class="boxGame">
                    <div id="08_luta"></div>
                </div></div>`;
                
                this.refBtn.innerHTML = `
                <div class="box_refs">
                    <div id="B08">
                        <p>
                            ⚔️ <span class="palavraAtributo">Teste sua Habilidade</span><br>
                            🍖 Gerencie suas <span class="palavraItem">Provisões</span><br>
                            🍀 Confie — ou não — em sua <span class="palavraMagia">Sorte</span><br>
                            ☠️ Evite os perigos que drenam sua 
                            <span class="palavraPerigo">Energia</span>
                        </p>
                    </div>
                </div>`;
                break 
            }
            
            case 9: {
                this.texto.innerHTML = `
                <div class="box_game"><div class="boxGame">
                    <p>O salão abre duas saídas: um túnel com vapor <b>(05)</b> e escadas íngremes <b>(07)</b>.</p>
                </div></div>`;
                
                this.refBtn.innerHTML = `
                <div class="box_refs">
                    <button class="refs" id="05">Ir para 05</button>
                    <button class="refs" id="07">Ir para 07</button>
                </div>`; 
                break 
            }
            
            case 10: {
                this.texto.innerHTML = `
                <div class="box_game"><div class="boxGame">
                    <p>Você entra no Jardim Fervente: um salão circular com uma fonte de água quente.</p>
                    <p><span class="ervaRara">Ervas verde-azuladas</span> balançam com o vapor, exalando um perfume doce.</p>
                    <p>Você colhe a erva antiga — <i>a tal procurada por Eliont.</i></p>
                    <div class="linhaPergaminho"></div>
                    <p>Você retorna à casa de Eliont, exausto da aventura.</p>
                    <p>Ele olha para a erva em suas mãos com um sorriso maroto.</p>
                    <p>— Ahhh, finalmente! — diz ele, pegando a planta.</p>
                    <p>O velho prepara um bule, ferve água e coloca a erva.</p>
                    <p>Você observa, confuso, enquanto ele assopra a xícara e toma um gole.</p>
                    <p>— Hmmm... nada como um bom chá para os nervos!</p>
                    <p>Ele solta um arroto e encosta na cadeira, satisfeito.</p>
                    <p>Você encara a cena, sem acreditar.</p>
                    <br>
                    <p>— <b>ESPERA AÍ!</b> — você grita. — Eu quase morri contra homens-lagartos, goblins e armadilhas...</p>
                    <p>... tudo isso por um <b>CHÁ!?!</b></p>
                    <p>Eliont responde:<br></p>
                    <p>— Ué, e você queria o quê? <i>A juventude eterna?</i> Hahaha!</p>
                    <br>
                    <div class="linhaPergaminho"></div>
                    <br>
                    <p>Fim da aventura. Mas pelo menos... o chá estava bom.</p>
                    <br>
                    <div class="linhaPergaminho"></div>
                    <br>
                    <p>A tela escurece...</p>
                    <p>De repente, uma vozinha surge nos créditos...</p>
                    <p>— Hehehe... esses tolos nunca desconfiam.</p>
                    <p>Um pequeno goblin, encapuzado, aparece roendo uma cenoura.</p>
                    <p>— Essa erva não é só chá... ela prolonga a vida por séculos!</p>
                    <p>Ele cospe a cenoura e ri.</p>
                    <p>— É por isso que aquele velho ainda não virou pó! Hahaha!</p>
                    <p>O goblin some nas sombras...</p>
                    <br>
                    <div class="linhaPergaminho"></div>
                    <br>
                    <p><b>FIM</b> <i>(ou será?)</i></p>
                </div></div>`;
                
                this.refBtn.innerHTML = `
                <div class="box_refs">
                    <button class="refs btnRestart" id="10">Reiniciar Aventura </button>
                </div>`; 
                break
            }
        }
    }
    
    static limparMenu() {
        this.menu.replaceChildren();
    }
 
}
 export default UI;