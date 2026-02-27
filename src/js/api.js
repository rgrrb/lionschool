export const fetchAlunosByCourse = async (id) => {
    try {

        const resposta = await fetch(`https://lion-school-backend.onrender.com/alunos?curso_id=${id}`);
        const dados = resposta.json();
        return dados

    } catch (error) {
        return false
    }

}

export const fetchAluno = async (id) => {

    try {

        const resposta = await fetch(`https://lion-school-backend.onrender.com/alunos/${id}`);
        const dados = await resposta.json();
        return dados

    } catch (error) {
        return false
    }

}
