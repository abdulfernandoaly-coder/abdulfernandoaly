let recolhas = JSON.parse(localStorage.getItem("recolhas")) || [];

const formulario = document.getElementById("formRecolha");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const novaRecolha = {
        id: Date.now(),
        nome: document.getElementById("nome").value,
        bairro: document.getElementById("bairro").value,
        tipoLixo: document.getElementById("tipoLixo").value,
        data: document.getElementById("data").value,
        estado: "Pendente"
    };

    recolhas.push(novaRecolha);
    guardarDados();
    formulario.reset();
    mostrarRecolhas();
    alert("Solicitação cadastrada com sucesso!");
});

function mostrarRecolhas(lista = recolhas) {
    const tabela = document.getElementById("tabelaRecolhas");
    tabela.innerHTML = "";

    lista.forEach(function(recolha) {
        const linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${recolha.id}</td>
            <td>${recolha.nome}</td>
            <td>${recolha.bairro}</td>
            <td>${recolha.tipoLixo}</td>
            <td>${recolha.data}</td>
            <td>${recolha.estado}</td>
            <td>
                <button class="btn-recolha" onclick="alterarEstado(${recolha.id})">Alterar Estado</button>
                <button class="btn-eliminar" onclick="eliminarRecolha(${recolha.id})">Eliminar</button>
            </td>`;
        tabela.appendChild(linha);
    });
    atualizarEstatisticas();
}

function alterarEstado(id) {
    const recolha = recolhas.find(item => item.id === id);
    if (!recolha) return;

    if (recolha.estado === "Pendente") recolha.estado = "Em recolha";
    else if (recolha.estado === "Em recolha") recolha.estado = "Recolhido";
    else recolha.estado = "Pendente";

    guardarDados();
    mostrarRecolhas();
}

function eliminarRecolha(id) {
    if (!confirm("Deseja realmente eliminar esta solicitação?")) return;
    recolhas = recolhas.filter(item => item.id !== id);
    guardarDados();
    mostrarRecolhas();
}

document.getElementById("pesquisa").addEventListener("input", function() {
    const texto = this.value.toLowerCase();
    const resultado = recolhas.filter(recolha =>
        recolha.nome.toLowerCase().includes(texto) ||
        recolha.bairro.toLowerCase().includes(texto)
    );
    mostrarRecolhas(resultado);
});

function guardarDados() {
    localStorage.setItem("recolhas", JSON.stringify(recolhas));
}

function atualizarEstatisticas() {
    document.getElementById("total").textContent = recolhas.length;
    document.getElementById("pendentes").textContent =
        recolhas.filter(item => item.estado === "Pendente").length;
    document.getElementById("emRecolha").textContent =
        recolhas.filter(item => item.estado === "Em recolha").length;
    document.getElementById("recolhidos").textContent =
        recolhas.filter(item => item.estado === "Recolhido").length;
}

mostrarRecolhas();
