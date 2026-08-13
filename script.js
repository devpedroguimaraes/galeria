/* =====================================
   TROCA DE TELAS
===================================== */

function trocarTela(id) {

    document.querySelectorAll(".tela").forEach(tela => {

        tela.classList.remove("ativa");

    });

    const tela = document.getElementById(id);

    tela.classList.add("ativa");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =====================================
   CORAÇÕES FLUTUANTES
===================================== */

function criarCoracao() {

    const container = document.querySelector(".hearts");

    const heart = document.createElement("div");

    heart.classList.add("heart");

    const tipos = [
        "❤️",
        "💕",
        "💗",
        "💖",
        "💘",
        "💓"
    ];

    heart.innerHTML =
        tipos[Math.floor(Math.random() * tipos.length)];

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.fontSize =
        (15 + Math.random() * 25) + "px";

    heart.style.animationDuration =
        (5 + Math.random() * 5) + "s";

    container.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 10000);
}

setInterval(criarCoracao, 500);


/* =====================================
   INÍCIO
===================================== */

function comecar() {

    trocarTela("carta");

    iniciarCarta();

}


/* =====================================
   CARTA COM EFEITO DE DIGITAÇÃO
===================================== */

let cartaIniciada = false;

function iniciarCarta() {

    if (cartaIniciada) return;

    cartaIniciada = true;

    const texto = `
Eduarda,

eu poderia simplesmente escrever algumas palavras
e te fazer uma pergunta...

Mas eu queria fazer algo diferente.

Queria criar um pequeno lugar para guardar alguns
dos momentos que fizeram você se tornar alguém
tão especial para mim.

Talvez você nem imagine o quanto alguns momentos
ao seu lado significam para mim.

E quanto mais eu pensava no que queria te dizer,
mais eu percebia que não queria guardar isso
somente comigo.

Então...

continua comigo. ❤️
`;

    const elemento = document.getElementById("textoCarta");

   let i = 0;

    const velocidadeDigitacao = 210;

function escrever() {

    if (i < texto.length) {

        elemento.innerHTML +=
            texto.charAt(i);

        i++;

        setTimeout(
            escrever,
            velocidadeDigitacao
        );

    } else {

        document
            .getElementById("botaoCarta")
            .classList.add("mostrar");

    }

}

escrever();

    escrever();
}


/* =====================================
   MOSTRAR FOTOS
===================================== */

function mostrarFotos() {

    trocarTela("fotos");

}


/* =====================================
   MOSTRAR PEDIDO
===================================== */

function mostrarPedido() {

    trocarTela("pedido");

}


/* =====================================
   BOTÃO NÃO FOGE
===================================== */

const botaoNao =
    document.getElementById("nao");

function fugir() {

    const largura =
        window.innerWidth;

    const altura =
        window.innerHeight;

    const larguraBotao =
        botaoNao.offsetWidth;

    const alturaBotao =
        botaoNao.offsetHeight;

    const margem = 30;

    const x =
        Math.random() *
        (largura - larguraBotao - margem * 2)
        + margem;

    const y =
        Math.random() *
        (altura - alturaBotao - margem * 2)
        + margem;

    botaoNao.style.position = "fixed";

    botaoNao.style.left = x + "px";

    botaoNao.style.top = y + "px";

}

if (botaoNao) {

    botaoNao.addEventListener(
        "mouseenter",
        fugir
    );

    botaoNao.addEventListener(
        "touchstart",
        function(event) {

            event.preventDefault();

            fugir();

        }
    );

}


/* =====================================
   ELA ACEITOU ❤️
===================================== */

function aceitou() {

    criarExplosao();

    setTimeout(() => {

        trocarTela("final");

    }, 700);

}


/* =====================================
   EXPLOSÃO DE CORAÇÕES
===================================== */

function criarExplosao() {

    const quantidade = 80;

    for (let i = 0; i < quantidade; i++) {

        const heart =
            document.createElement("div");

        heart.innerHTML = [
            "❤️",
            "💕",
            "💖",
            "💗",
            "💘"
        ][Math.floor(Math.random() * 5)];

        heart.style.position = "fixed";

        heart.style.left = "50%";

        heart.style.top = "50%";

        heart.style.zIndex = "9999";

        heart.style.pointerEvents = "none";

        heart.style.fontSize =
            (15 + Math.random() * 35) + "px";

        const angulo =
            Math.random() * Math.PI * 2;

        const distancia =
            200 + Math.random() * 500;

        const destinoX =
            Math.cos(angulo) * distancia;

        const destinoY =
            Math.sin(angulo) * distancia;

        heart.animate(

            [
                {
                    transform:
                        "translate(-50%, -50%) scale(0)",
                    opacity: 1
                },

                {
                    transform:
                        `translate(
                            calc(-50% + ${destinoX}px),
                            calc(-50% + ${destinoY}px)
                        )
                        scale(1.5)`,

                    opacity: 0
                }
            ],

            {
                duration:
                    1200 + Math.random() * 1000,

                easing: "cubic-bezier(.17,.67,.35,1)"
            }

        );

        document.body.appendChild(heart);

        setTimeout(() => {

            heart.remove();

        }, 2500);

    }

}

/* =====================================================
   TELA CHEIA ANDROID
===================================================== */

const fullscreenBtn =
    document.getElementById("fullscreenBtn");


async function alternarTelaCheia() {

    try {

        if (!document.fullscreenElement) {

            await document.documentElement.requestFullscreen();

            atualizarBotaoFullscreen();

        } else {

            await document.exitFullscreen();

            atualizarBotaoFullscreen();

        }

    } catch (erro) {

        console.log(
            "Não foi possível ativar a tela cheia:",
            erro
        );

    }

}


/* =====================================================
   ATUALIZA ÍCONE
===================================================== */

function atualizarBotaoFullscreen() {

    if (!fullscreenBtn) return;


    if (document.fullscreenElement) {

        fullscreenBtn.innerHTML = "⛶";

        fullscreenBtn.title =
            "Sair da tela cheia";

    } else {

        fullscreenBtn.innerHTML = "⛶";

        fullscreenBtn.title =
            "Entrar em tela cheia";

    }

}


document.addEventListener(
    "fullscreenchange",
    atualizarBotaoFullscreen
);


/* =====================================================
   ESCONDER BOTÃO DEPOIS DE UM TEMPO
===================================================== */

let temporizadorFullscreen;


function esconderBotaoFullscreen() {

    if (!fullscreenBtn) return;


    fullscreenBtn.style.opacity = "0";

}


function mostrarBotaoFullscreen() {

    if (!fullscreenBtn) return;


    fullscreenBtn.style.opacity = "1";


    clearTimeout(
        temporizadorFullscreen
    );


    temporizadorFullscreen =
        setTimeout(
            esconderBotaoFullscreen,
            5000
        );

}


document.addEventListener(
    "mousemove",
    mostrarBotaoFullscreen
);


document.addEventListener(
    "touchstart",
    mostrarBotaoFullscreen
);


mostrarBotaoFullscreen();

/* =====================================================
   FOTO AMPLIADA
===================================================== */

let modalFoto = null;
let imagemModal = null;
let textoModal = null;

let temporizadorFoto = null;


/* Criar o modal */

function criarModalFoto() {

    if (document.getElementById("modalFoto")) {
        return;
    }


    modalFoto =
        document.createElement("div");

    modalFoto.id = "modalFoto";

    modalFoto.className = "modal-foto";


    /* Botão fechar */

    const fechar =
        document.createElement("button");

    fechar.className =
        "fechar-foto";

    fechar.innerHTML = "×";

    fechar.setAttribute(
        "aria-label",
        "Fechar foto"
    );


    /* Imagem */

    imagemModal =
        document.createElement("img");

    imagemModal.alt =
        "Foto ampliada";


    /* Texto */

    textoModal =
        document.createElement("div");

    textoModal.className =
        "texto-modal-foto";


    modalFoto.appendChild(fechar);

    modalFoto.appendChild(imagemModal);

    modalFoto.appendChild(textoModal);

    document.body.appendChild(modalFoto);


    /* Fechar pelo botão */

    fechar.addEventListener(
        "click",
        fecharFoto
    );


    /* Fechar tocando fora da imagem */

    modalFoto.addEventListener(
        "click",
        function(event) {

            if (
                event.target === modalFoto
            ) {

                fecharFoto();

            }

        }
    );

}


/* =====================================================
   ABRIR FOTO
===================================================== */

function abrirFoto(foto) {

    criarModalFoto();


    /* Cancela temporizador anterior */

    clearTimeout(
        temporizadorFoto
    );


    imagemModal.src =
        foto.querySelector("img").src;


    textoModal.textContent =
        foto.querySelector("span")?.textContent || "";


    modalFoto.classList.add(
        "aberta"
    );


    /*
       Fecha automaticamente
       depois de 5 segundos
    */

    temporizadorFoto =
        setTimeout(
            fecharFoto,
            5000
        );

}


/* =====================================================
   FECHAR FOTO
===================================================== */

function fecharFoto() {

    if (!modalFoto) return;


    clearTimeout(
        temporizadorFoto
    );


    modalFoto.classList.remove(
        "aberta"
    );

}


/* =====================================================
   ATIVAR NAS 8 FOTOS
===================================================== */

document
    .querySelectorAll(".foto")
    .forEach(foto => {

        foto.style.cursor = "pointer";


        foto.addEventListener(
            "click",
            function() {

                abrirFoto(this);

            }
        );

    });