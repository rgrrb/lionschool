'use strict'

const main = document.getElementById("main")


function criarMain() {

    main.replaceChildren()


    main.append(criarLeftContent(), criarEstudante(), criarRightContent())

}
function criarLeftContent() {

    const leftContent = document.createElement("div")
    leftContent.classList.add("left-content")
    leftContent.append(criarTitulo(), criarImagemDoDispositivo())
    return leftContent
}
function criarRightContent() {

    const rightContent = document.createElement("div")
    rightContent.classList.add("right-content")

    const botaoDesenvolvimento = criarBotao("dscourseicon.svg", "DS")
    const botaoRedes = criarBotao("redescourseicon.svg", "REDES")

    botaoDesenvolvimento.addEventListener("click", criarAlunosDesenvolvimento)
    botaoRedes.addEventListener("click", criarAlunosRede)

    rightContent.append(botaoDesenvolvimento, botaoRedes)
    return rightContent
}
function criarImagemDoDispositivo() {

    const imgLeftContent = document.createElement("img")

    imgLeftContent.src = "./src/img/devices.png"

    return imgLeftContent

};
function criarTitulo() {

    const titleTextContent = document.createElement("div")

    const tituloMain = document.createElement("p")

    const curso = document.createElement("span")
    curso.textContent = "curso"

    const titulo2Main = document.createElement("span")

    tituloMain.textContent = `Escolha um `

    titulo2Main.textContent = "curso"

    const titulo3Main = document.createElement("p")

    titulo3Main.textContent = " para gerenciar"

    tituloMain.append(titulo2Main, titulo3Main)

    titleTextContent.classList.add("title-text-content")

    titleTextContent.append(tituloMain)

    return titleTextContent

};
function criarEstudante() {

    const studantMain = document.createElement("img")

    studantMain.src = "./src/img/studant.png"

    return studantMain

}
function criarBotao(img, texto) {

    const button = document.createElement("button")
    const icone = document.createElement("img")
    const text = document.createElement("span")

    icone.src = `./src/img/${img}`
    text.textContent = texto

    button.append(icone, text)

    return button
}

function criarCards(imagem, nome) {

    const card = document.createElement("div")
    card.classList.add("card")

    const span = document.createElement("span")
    span.textContent = nome.toUpperCase()

    const img = document.createElement("img")
    img.src = imagem

    card.append(img, span)

    return card
}

async function criarAlunosRede() {

    const resposta = await fetch('https://lion-school-backend.onrender.com/alunos?curso_id=2');
    const dados = await resposta.json();

    main.replaceChildren()

    const listagemAlunos = document.createElement("div")
    listagemAlunos.classList.add("students-list")



    dados.forEach(aluno => {
        const cards = criarCards(aluno.foto, aluno.nome)
        cards.addEventListener("click", () => criarInformacoesDoAluno(aluno.id));
        listagemAlunos.append(cards)
    })


    main.append(listagemAlunos)

}
async function criarAlunosDesenvolvimento() {

    const resposta = await fetch('https://lion-school-backend.onrender.com/alunos?curso_id=1');
    const dados = await resposta.json();

    main.replaceChildren()

    const listagemAlunos = document.createElement("div")
    listagemAlunos.classList.add("students-list")

    const sair = document.getElementById("exit")
    sair.addEventListener('click', criarMain)

    dados.forEach(aluno => {
        const cards = criarCards(aluno.foto, aluno.nome)
        cards.addEventListener("click", () => criarInformacoesDoAluno(aluno.id));
        listagemAlunos.append(cards)
    })


    main.append(listagemAlunos)
}

async function criarInformacoesDoAluno(id) {
    console.log(id)

    const resposta = await fetch(`https://lion-school-backend.onrender.com/alunos/${id}`);
    const dados = await resposta.json();

    console.log(dados)
    main.replaceChildren()

    const infoAluno = document.createElement("div")
    infoAluno.classList.add("aluno-info")

    const alunoImagem = document.createElement("img")
    alunoImagem.src = dados.foto
    const alunoNome = document.createElement("span")
    alunoNome.textContent = dados.nome

    infoAluno.append(alunoImagem, alunoNome)

    const studentStatistics = document.createElement("div")
    studentStatistics.classList.add("student-statistics")

    const infoMateria = document.createElement("div")
    infoMateria.classList.add("info-materia")
    const porcentagem = document.createElement("span")    
    porcentagem.textContent = dados.valor

    const nomeMateria = document.createElement("span")
    nomeMateria.textContent = dados.categoria

    dados.desempenho.forEach(info => {
        const barra = document.createElement("div")
        barra.classList.add("barra")
        barra.style.height = `calc(${info.valor}px * 4)`
        infoMateria.append(porcentagem, barra, nomeMateria)
    })




    studentStatistics.append(infoMateria)

    main.style.gap = '200px'

    main.append(infoAluno, studentStatistics)
}

criarMain()