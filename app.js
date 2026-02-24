'use strict'

const main = document.getElementById("main")


function criarMain() {

    main.replaceChildren()

    const home = document.createElement('div')
    home.classList.add("home")
    home.append(criarLeftContent(), criarEstudante(), criarRightContent())
    main.appendChild(home)
    
    main.style.flexDirection = "column"
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

    const titulo = document.createElement("h1")
    titulo.classList.add("titulo-curso")
    titulo.textContent = "Redes"

    const listagemAlunos = document.createElement("div")
    listagemAlunos.classList.add("students-list")


    dados.forEach(aluno => {
        const cards = criarCards(aluno.foto, aluno.nome)
        cards.addEventListener("click", () => criarInformacoesDoAluno(aluno.id));
        listagemAlunos.append(cards)
    })

    main.append(titulo, listagemAlunos)

}
async function criarAlunosDesenvolvimento() {

    const resposta = await fetch('https://lion-school-backend.onrender.com/alunos?curso_id=1');
    const dados = await resposta.json();

    main.replaceChildren()

    const titulo = document.createElement("h1")
    titulo.classList.add("titulo-curso")
    titulo.textContent = "Desenvolvimento de Sistemas"

    const listagemAlunos = document.createElement("div")
    listagemAlunos.classList.add("students-list")

    const sair = document.getElementById("exit")
    sair.addEventListener('click', criarMain)

    dados.forEach(aluno => {
        const cards = criarCards(aluno.foto, aluno.nome)
        cards.addEventListener("click", () => criarInformacoesDoAluno(aluno.id));
        listagemAlunos.append(cards)
    })


    main.append(titulo, listagemAlunos)
}

async function criarInformacoesDoAluno(id) {
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


    dados.desempenho.forEach(info => {

        const performance = document.createElement("div")
        performance.classList.add("performance")

        const porcentagem = document.createElement("span")    
        porcentagem.textContent = info.valor
    
        const nomeMateria = document.createElement("span")
        nomeMateria.textContent = info.categoria

        const bar = document.createElement("div")
        bar.classList.add("bar")

        const fill = document.createElement("div")
        fill.classList.add("fill")
        fill.style.height = `${info.valor}%`

        if(info.valor <= 4){
            fill.style.backgroundColor = "red"
            porcentagem.style.color = "red"
        }else if (info.valor >= 5 && info.valor < 7){
            fill.style.backgroundColor = "yellow"
            porcentagem.style.color = "yellow"
        }else{
            fill.style.backgroundColor = "#3347B0"
            porcentagem.style.color = "#3347B0"
        }

        bar.appendChild(fill)

        performance.append(porcentagem, bar, nomeMateria)
        studentStatistics.appendChild(performance)
    })
   
    main.style.gap = '200px'
    main.style.flexDirection = "row"

    main.append(infoAluno, studentStatistics)
}

criarMain()