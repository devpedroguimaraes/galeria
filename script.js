/* =====================================================
   CONFIGURAÇÃO
===================================================== */

const TEMPO_TODAS = 3000; // 1 segundo mostrando todas
const TEMPO_FOTO = 5000;  // 5 segundos foto grande

const TOTAL_FOTOS = 10;


/* =====================================================
   ELEMENTOS
===================================================== */

const galeria =
    document.getElementById("galeria");

const telaFoto =
    document.getElementById("fotoFullscreen");

const imagemGrande =
    document.getElementById("imagemGrande");

const fotos =
    document.querySelectorAll(".foto");

const fullscreenBtn =
    document.getElementById("fullscreenBtn");


/* =====================================================
   CONTROLE
===================================================== */

let fotoAtual = 0;


/* =====================================================
   MOSTRAR TODAS AS FOTOS
===================================================== */

function mostrarTodasAsFotos() {

    /*
       Esconde a foto em tela cheia
    */

    telaFoto.classList.remove("ativa");


    /*
       Mostra a galeria
    */

    galeria.style.display = "flex";

}


/* =====================================================
   MOSTRAR FOTO EM TELA CHEIA
===================================================== */

function mostrarFoto() {

    /*
       Pega a foto atual
    */

    const foto =
        fotos[fotoAtual];


    const imagem =
        foto.querySelector("img");


    /*
       Coloca a imagem no
       modo tela cheia
    */

    imagemGrande.src =
        imagem.src;


    /*
       Esconde a galeria
    */

    galeria.style.display =
        "none";


    /*
       Mostra a foto grande
    */

    telaFoto.classList.add(
        "ativa"
    );


    /*
       Mantém a foto por 5 segundos
    */

    setTimeout(() => {

        /*
           Próxima foto
        */

        fotoAtual++;


        /*
           Se chegou ao final,
           volta para a primeira
        */

        if (fotoAtual >= TOTAL_FOTOS) {

            fotoAtual = 0;

        }


        /*
           ANTES DA PRÓXIMA FOTO,
           MOSTRA TODAS NOVAMENTE
        */

        mostrarTodasAsFotos();


        /*
           Fica 1 segundo mostrando
           todas as fotos
        */

        setTimeout(() => {

            mostrarFoto();

        }, TEMPO_TODAS);


    }, TEMPO_FOTO);

}


/* =====================================================
   INICIAR APRESENTAÇÃO
===================================================== */

function iniciarApresentacao() {

    /*
       Começa mostrando todas
    */

    mostrarTodasAsFotos();


    /*
       Espera 1 segundo
    */

    setTimeout(() => {

        mostrarFoto();

    }, TEMPO_TODAS);

}


/* =====================================================
   TELA CHEIA ANDROID
===================================================== */

async function alternarTelaCheia() {

    try {

        if (!document.fullscreenElement) {

            await document.documentElement
                .requestFullscreen();

        } else {

            await document.exitFullscreen();

        }

    } catch (erro) {

        console.log(
            "Não foi possível ativar a tela cheia:",
            erro
        );

    }

}


/* =====================================================
   BOTÃO TELA CHEIA
===================================================== */

if (fullscreenBtn) {

    fullscreenBtn.addEventListener(
        "click",
        alternarTelaCheia
    );

}


/* =====================================================
   INICIAR QUANDO CARREGAR
===================================================== */

window.addEventListener(
    "load",
    () => {

        /*
           Pequeno tempo para carregar
           todas as imagens
        */

        setTimeout(() => {

            iniciarApresentacao();

        }, 500);

    }
);