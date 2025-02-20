document.addEventListener("DOMContentLoaded", () => {
    /* ----------------------------------------------------------------------------- */
    /* ------------------ SCRIPT PARA ABRIR e FECHAR MENU LATERAL ------------------ */
    /* ----------------------------------------------------------------------------- */
    const menuLateral = document.querySelector(".menu-lateral");
    const btnMenuLateral = document.querySelector(".menu-icone");
    const btnFecharMenu = document.querySelector(".icone-fechar");

    function abrirMenu() {
        menuLateral.style.left = "0";
        document.addEventListener("click", fecharMenuAoClicarFora);
    }
    function fecharMenu() {
        menuLateral.style.left = "-250px";
        document.removeEventListener("click", fecharMenuAoClicarFora);
    }
    function fecharMenuAoClicarFora(event) {
        if (!menuLateral.contains(event.target) && !btnMenuLateral.contains(event.target)) {
            fecharMenu();
        }
    }

    btnMenuLateral.addEventListener("click", (event) => {
        event.stopPropagation();
        abrirMenu();
    });
    btnFecharMenu.addEventListener("click", fecharMenu);

    /* ---------------------------------------------------------------------------------- */
    /* ------------------ SCRIPT PARA ALTERAR A OPACIDADE DO CABEÇALHO ------------------ */
    /* ---------------------------------------------------------------------------------- */
    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const opacity = Math.min(scrollPosition / 300, 0.4);

        if (scrollPosition + windowHeight >= documentHeight) {
            header.style.opacity = 1;
        } else {
            header.style.opacity = 1 - opacity;
        }
    });

    /* ---------------------------------------------------------------------------------------------------- */
    /* ------------------ SCRIPT PARA SUBSTITUIR IMAGENS em AULAS/TURMAS em CASO DE ERRO ------------------ */
    /* ---------------------------------------------------------------------------------------------------- */
    const imagens = document.querySelectorAll(".img_1 img, .img_2 img, .img_3 img");

    imagens.forEach((img) => {
        img.onerror = function () {
            img.style.display = "none";
        };
    });
    
    /* -------------------------------------------------------------------------------------- */
    /* ------------------ SCRIPT PARA AVANÇAR e RETROCEDER em NOSSA EQUIPE ------------------ */
    /* -------------------------------------------------------------------------------------- */
    const carousel = document.querySelector(".carousel-wrapper");
    const instrutores = document.querySelectorAll(".instrutor")
    const prevBtn = document.getElementById("seta-esq-equipe");
    const nextBtn = document.getElementById("seta-dir-equipe");
    const progressBar = document.querySelector(".progress-bar");

    const gap = 100;
    const initialTranslateX = 20;
    const instrutorWidth = instrutores[0].offsetWidth;
    const instrutorMaxWidth = instrutorWidth + gap;

    // **Valor a ser multiplicado que determina o quanto o scroll horizontal vai se mover;
    //   quanto menor a tela, maior vai ser o movimento do scroll horizontal **
    let scrollMov = 2.2
    if(window.innerWidth <= 1700) scrollMov = 2.3;
    if(window.innerWidth <= 1600) scrollMov = 2.4;
    if(window.innerWidth <= 1500) scrollMov = 2.5;
    if(window.innerWidth <= 1400) scrollMov = 2.7;
    if(window.innerWidth <= 1300) scrollMov = 2.9;

    // **Variáveis de scroll**
    let scrollAmount = 0;
    const scrollStep = instrutorMaxWidth * scrollMov;
    const maxScroll = scrollStep;

    function updateProgressBar() {
        if (scrollAmount === 0) {
            progressBar.style.width = "50%";
            progressBar.style.marginLeft = "0%";
        } else {
            progressBar.style.width = "50%";
            progressBar.style.marginLeft = "50%";
        }
    }

    nextBtn.addEventListener("click", () => {
        if (scrollAmount + scrollStep >= maxScroll) {
            scrollAmount = maxScroll;
        } else {
            scrollAmount += scrollStep;
        }
        carousel.style.transform = `translateX(calc(-${scrollAmount}px + ${initialTranslateX}%))`;
        updateProgressBar();
    });
    prevBtn.addEventListener("click", () => {
        if (scrollAmount - scrollStep <= 0) {
            scrollAmount = 0;
        } else {
            scrollAmount -= scrollStep;
        }
        carousel.style.transform = `translateX(calc(-${scrollAmount}px + ${initialTranslateX}%))`;
        updateProgressBar();
    });
    
    updateProgressBar();

    /* ------------------------------------------------------------------------- */
    /* ------------------ SCRIPT DE FECHAR e ABRIR CALENDÁRIO ------------------ */
    /* ------------------------------------------------------------------------- */
    const calendario = document.querySelector(".calendario");
    const botao = document.querySelector(".botao-mostrar");

    document.querySelector(".botao-mostrar").addEventListener("click", function() {
        if (botao.innerHTML === "Mostrar calendário")
            botao.innerHTML = "Fechar calendário";
        else
            botao.innerHTML = "Mostrar calendário";
            calendario.classList.toggle("aberto");
    });

    /* ---------------------------------------------------------- */
    /* ------------------ SCRIPT DO CALENDÁRIO ------------------ */
    /* ---------------------------------------------------------- */
    const btnJiuJitsu = document.querySelector(".botoes button:nth-child(2)");
    const btnMuayThai = document.querySelector(".botoes button:nth-child(1)");
    const btnRedefinir = document.querySelector(".botao-redefinir");
    const jiuJitsuCards = document.querySelectorAll(".jiu-jitsu");
    const muayThaiCards = document.querySelectorAll(".muay-thai");

    const horarioDuplo = document.querySelector(".horario-duplo");
    const jiuJitsuDuplo = document.getElementById("horario_1");
    const muayThaiDuplo = document.getElementById("horario_2");

    function esconderTodos() {
        jiuJitsuCards.forEach(card => card.classList.add("ocultar_informacoes"));
        muayThaiCards.forEach(card => card.classList.add("ocultar_informacoes"));
        
        horarioDuplo.classList.add("ocultar_item");
        jiuJitsuDuplo.classList.add("ocultar_item");
        muayThaiDuplo.classList.add("ocultar_item");
    }
    function mostrarJiuJitsu() {
        esconderTodos();
        jiuJitsuCards.forEach(card => card.classList.remove("ocultar_informacoes"));
        jiuJitsuDuplo.classList.remove("ocultar_item");

        btnRedefinir.classList.remove("ocultar_item");
        btnJiuJitsu.classList.add("botao-selecionado");
        btnMuayThai.classList.remove("botao-selecionado");
    }
    function mostrarMuayThai() {
        esconderTodos();
        muayThaiCards.forEach(card => card.classList.remove("ocultar_informacoes"));
        muayThaiDuplo.classList.remove("ocultar_item");

        btnRedefinir.classList.remove("ocultar_item");
        btnJiuJitsu.classList.remove("botao-selecionado");
        btnMuayThai.classList.add("botao-selecionado");
    }
    function mostrarTodos() {
        esconderTodos();
        jiuJitsuCards.forEach(card => card.classList.remove("ocultar_informacoes"));
        muayThaiCards.forEach(card => card.classList.remove("ocultar_informacoes"));
        horarioDuplo.classList.remove("ocultar_item");
        
        btnRedefinir.classList.add("ocultar_item");
        btnJiuJitsu.classList.remove("botao-selecionado");
        btnMuayThai.classList.remove("botao-selecionado");
    }

    btnJiuJitsu.addEventListener("click", mostrarJiuJitsu);
    btnMuayThai.addEventListener("click", mostrarMuayThai);
    btnRedefinir.addEventListener("click", mostrarTodos);

    mostrarTodos();

    /* -------------------------------------------------------------------------------------------------- */
    /* ------------------ SCRIPT DO CALENDÁRIO PARA TELAS DE DISPOSITIVOS MOBILE (1/2) ------------------ */
    /* -------------------------------------------------------------------------------------------------- */
    function atualizarCabecalhoTabela() {
        const colunas = document.querySelectorAll("thead th");
    
        if (window.innerWidth <= 890) {
            colunas[0].textContent = "";
            colunas[1].textContent = "SEG";
            colunas[2].textContent = "TER";
            colunas[3].textContent = "QUA";
            colunas[4].textContent = "QUI";
            colunas[5].textContent = "SEX";
        } else {
            colunas[0].textContent = "Horarios";
            colunas[1].textContent = "Segunda";
            colunas[2].textContent = "Terca";
            colunas[3].textContent = "Quarta";
            colunas[4].textContent = "Quinta";
            colunas[5].textContent = "Sexta";
        }
    }
    window.addEventListener("load", atualizarCabecalhoTabela);
    window.addEventListener("resize", atualizarCabecalhoTabela);
    
    /* -------------------------------------------------------------------------------------------------- */
    /* ------------------ SCRIPT DO CALENDÁRIO PARA TELAS DE DISPOSITIVOS MOBILE (2/2) ------------------ */
    /* -------------------------------------------------------------------------------------------------- */
    const horarioClicavel = document.querySelectorAll(".jiu-jitsu, .muay-thai");
    const modal = document.getElementById("modal");
    const modalText = document.getElementById("modal-text");
    const closeModal = document.querySelector(".close");

    let overlay = document.createElement("div");
    overlay.classList.add("modal-overlay");
    document.body.appendChild(overlay);

    let selectedCell = null;

    function openModal(event) {
        if (window.innerWidth <= 1100) {
            if (selectedCell) {
                selectedCell.classList.remove("selected");
            }
            selectedCell = event.target;
            selectedCell.classList.add("selected");

            const conteudo = event.target.innerHTML;
            const aula = event.target.classList.contains("jiu-jitsu") ? "JIU-JITSU" : "MUAY THAI";
            const dia = event.target.closest("td").id === "segunda" ? "Segunda" :
                        event.target.closest("td").id === "terca" ? "Terça" :
                        event.target.closest("td").id === "quarta" ? "Quarta" :
                        event.target.closest("td").id === "quinta" ? "Quinta" :
                        event.target.closest("td").id === "horario_1" ? "Quinta" :
                        event.target.closest("td").id === "horario_2" ? "Quinta" : "Sexta";
            
            modalText.innerHTML = `
                ${aula}<br><br>
                ${dia}<br><br><br>
                ${conteudo}
            `;
            
            if (event.target.classList.contains("jiu-jitsu")) {
                modal.style.backgroundColor = "#0062B7";
            } else if (event.target.classList.contains("muay-thai")) {
                modal.style.backgroundColor = "#AD1817";
            }
            
            modal.style.display = "block";
            overlay.style.display = "block";
            
            setTimeout(() => {
                modal.classList.add("show");
                overlay.classList.add("show");
            }, 10);
        }
    }

    function closeModalHandler() {
        modal.classList.remove("show");
        overlay.classList.remove("show");

        if (selectedCell) {
            selectedCell.classList.remove("selected");
            selectedCell = null;
        }

        setTimeout(() => {
            modal.style.display = "none";
            overlay.style.display = "none";
        }, 300);
    }
    
    // Interações de clique para abrir e fechar modal
    horarioClicavel.forEach(cell => {
        cell.addEventListener("click", openModal);
    });
    closeModal.addEventListener("click", closeModalHandler);
    overlay.addEventListener("click", closeModalHandler);

    // Fechar modal ao redimensionar a tela acima de 1100px
    window.addEventListener("resize", () => {
        if (window.innerWidth > 1100) {
            closeModalHandler();
        }
    });

    // Fechar modal ao scrollar e sair da visão do calendário
    const offsetCalendario = 600;
    window.addEventListener("scroll", () => {
        const rect = calendario.getBoundingClientRect();
        if (rect.bottom - offsetCalendario < 0 || rect.top + (offsetCalendario * 1.2) > window.innerHeight) {
            closeModalHandler();
        }
    });

    /* -------------------------------------------------------- */
    /* ------------------ SCRIPT DOS EVENTOS ------------------ */
    /* -------------------------------------------------------- */
    const events = [
        {
            title_h1: "Eventos",
            title_h2: "Defenda-se",
            description: "O Defenda-se é um projeto da Redbelt Club que ensina técnicas de autodefesa para mulheres e crianças, promovendo mais " +
                         "segurança e confiança. Além do evento especial no clube, a equipe também visita escolas para orientar crianças de" +
                         "forma lúdica e educativa. Participe e fortaleça sua defesa! 🏋️‍♀️💜",
            image: "./assets/images/Evento_Defenda-se.png",
            background_container: "linear-gradient(#342546, #532C6D)",
            background_ink: "./assets/icons/Elemento_fundo_1.png",
            background_h1: "#2D243C",
        },
        {
            title_h1: "Graduação",
            title_h2: "Muai Thay",
            description: "Um momento especial que celebra a evolução dos alunos, reconhecendo seu esforço, disciplina e dedicação à arte marcial. " +
                         "Mais do que trocar de cordão, é uma conquista que representa superação e aprendizado. 🥊🔥",
            image: "./assets/images/Graduacao_MuaiThay.png",
            background_container: "linear-gradient(#5D1D1E, #AD1817)",
            background_ink: "./assets/icons/Elemento_fundo_2.png",
            background_h1: "#431E20",
        },
        {
            title_h1: "Graduação",
            title_h2: "Jiu-jitsu",
            description: "A graduação no Jiu-Jitsu representa disciplina, superação e tradição. Cada faixa simboliza evolução técnica e mental, " + 
                         "reforçando a conexão com a comunidade e a dedicação ao esporte. 💪💙",
            image: "./assets/images/Graduacao_JiuJitsu.png",
            background_container: "linear-gradient(#191F3B, #111E73)",
            background_ink: "./assets/icons/Elemento_fundo_3.png",
            background_h1: "#17203B",
        },
        {
            title_h1: "Eventos",
            title_h2: "Festa junina",
            description: "A Festa Junina na Redbelt é um momento de diversão e união. Entre treinos e brincadeiras, alunos e professores " +
                         "celebram a tradição com comidas típicas, desafios e muita animação. A cultura e o esporte se encontram, fortalecendo " +
                         "os laços dentro e fora do tatame. 🎉🥋",
            image: "./assets/images/Evento_SaoJoao.png",
            background_container: "linear-gradient(#5F3F24, #EC7F29)",
            background_ink: "./assets/icons/Elemento_fundo_4.png",
            background_h1: "#5F4025",
        }
    ];

    let currentIndex = 0;

    const categEvento = document.querySelector(".eventos .info .title h1");
    const titleEvento = document.querySelector(".eventos .info h2");
    const descEvento = document.querySelector(".eventos .info p");
    const imgEvento = document.getElementById("img-evento");

    const setaEsquerda = document.getElementById("seta-esq-eventos");
    const setaDireita = document.getElementById("seta-dir-eventos");

    const eventosContainer = document.querySelector(".eventos-container");
    const imgBackground = document.getElementById("img-fundo");
    const placeholder = document.querySelector(".placeholder-evento");
    const titleBackground = document.querySelector(".title .background");

    function updateEvent(index) {
        categEvento.innerHTML = events[index].title_h1;
        titleEvento.innerHTML = events[index].title_h2;
        descEvento.innerHTML = events[index].description;
        imgEvento.src = events[index].image;

        eventosContainer.style.backgroundImage = events[index].background_container;
        imgBackground.src = events[index].background_ink;
        titleBackground.style.backgroundColor = events[index].background_h1;
    }
    imgEvento.onerror = function() {
        imgEvento.style.display = "none";
        placeholder.style.display = "block";
    };

    setaEsquerda.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + events.length) % events.length;
        updateEvent(currentIndex);
    });
    setaDireita.addEventListener("click", () => {
        currentIndex = (currentIndex + 1 + events.length) % events.length;
        updateEvent(currentIndex);
    });

    updateEvent(currentIndex);

    /* ------------------------------------------------------------------------ */
    /* ------------------ SCRIPT DA MUDANÇA DE COR DA PÁGINA ------------------ */
    /* ------------------------------------------------------------------------ */
    const container = document.querySelector(".container");
    const aulasSection = document.querySelector(".aulas");
    const turmas = document.querySelectorAll(".turma");
    const sectionPlanos = document.querySelector('.planos');
    const certificadoLoja = document.querySelectorAll('.certificado-loja .anuncio');

    const corPadrao = [25, 32, 35];
    const corJiuJitsu = [0, 58, 109]; // Azul
    const corMuayThai = [103, 14, 13]; // Vermelho
    const corBranca = [235, 235, 235];

    const offsetPlanos = 310;

    function interpolateColor(color1, color2, factor) {
        return color1.map((c, i) => Math.round(c + (color2[i] - c) * factor));
    }
    // Verifica se a seção "planos" está visível (retorna "true" ou "false")
    function isSectionInViewport(section) {
        const rect = section.getBoundingClientRect();
        return rect.top + offsetPlanos < window.innerHeight && rect.bottom >= 0;
    }

    function updateBackground() {
        const scrollY = window.scrollY;

        // Alteração de cor das turmas na seção de aulas
        const start = aulasSection.offsetTop - window.innerHeight / 2;
        const end = turmas[turmas.length - 1].offsetTop + turmas[turmas.length - 1].offsetHeight;
        const totalHeight = (end - start);

        let factor = (scrollY - start) / totalHeight;
        factor = Math.max(0, Math.min(1, factor));

        let color;
        if (factor < 0.4) {
            color = interpolateColor(corPadrao, corJiuJitsu, factor / 0.2); // De preto/cinza para azul
        } else if (factor < 0.8) {
            color = interpolateColor(corJiuJitsu, corMuayThai, (factor - 0.4) / 0.2); // De azul para vermelho
        } else {
            color = interpolateColor(corMuayThai, corPadrao, (factor - 0.8) / 0.2); // De vermelho de volta para preto/cinza
        }

        container.style.background = `rgb(${color.join(",")})`;

        // Alteração de cor da seção de planos
        if (isSectionInViewport(sectionPlanos)) {
            container.style.background = `rgb(${corBranca.join(",")})`; // Cor do fundo para planos
            sectionPlanos.querySelector('h1').style.color = "#192023";
            sectionPlanos.querySelector('p').style.color = "#000000";

            certificadoLoja[0].style.backgroundColor = "#12191B";
            certificadoLoja[1].style.backgroundColor = "#12191B";
        }
        else {
            certificadoLoja[0].style.backgroundColor = "#000000";
            certificadoLoja[1].style.backgroundColor = "#000000";
        }
    }

    window.addEventListener("scroll", updateBackground);
});