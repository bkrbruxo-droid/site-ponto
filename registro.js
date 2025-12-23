let registros = JSON.parse(localStorage.getItem("registros")) || [];
let registroEmAndamento = JSON.parse(localStorage.getItem("registroAtivo")) || null;

// 🔥 DATA E HORA DO SISTEMA (atualiza sozinha)
function dataHoraSistema() {
    const agora = new Date();
    return agora.toLocaleDateString("pt-BR") + " " +
           agora.toLocaleTimeString("pt-BR");
}

// atualiza o campo automaticamente
setInterval(() => {
    const campo = document.getElementById("dataHora");
    if (campo) {
        campo.value = dataHoraSistema();
    }
}, 1000);

// lista registros
function mostrarRegistros() {
    const ul = document.getElementById("listaRegistros");
    ul.innerHTML = "";

    if (registros.length === 0) {
        ul.innerHTML = "<li>Nenhum registro</li>";
        return;
    }

    registros.forEach(r => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>Líder:</strong> ${r.lider}<br>
            <strong>Guarnição:</strong> ${r.guarnicao}<br>
            <strong>Membros:</strong> ${r.membros}<br>
            <strong>Início:</strong> ${r.inicio}<br>
            <strong>Término:</strong> ${r.termino ?? "Em andamento"}
        `;
        ul.appendChild(li);
    });
}

// ▶ INICIAR
function iniciarRegistro() {
    if (registroEmAndamento) {
        document.getElementById("msg").innerText =
            "Já existe um registro em andamento";
        return;
    }

    const lider = document.getElementById("lider").value.trim();
    const guarnicao = document.getElementById("guarnicao").value.trim();
    const membros = document.getElementById("membros").value.trim();

    if (!lider || !guarnicao || !membros) {
        document.getElementById("msg").innerText =
            "Preencha todos os campos";
        return;
    }

    registroEmAndamento = {
        lider,
        guarnicao,
        membros,
        inicio: dataHoraSistema(),
        termino: null
    };

    localStorage.setItem("registroAtivo", JSON.stringify(registroEmAndamento));

    document.getElementById("msg").innerText =
        "Registro iniciado";
}

// ⏹ FINALIZAR
function finalizarRegistro() {
    if (!registroEmAndamento) {
        document.getElementById("msg").innerText =
            "Nenhum registro em andamento";
        return;
    }

    registroEmAndamento.termino = dataHoraSistema();
    registros.push(registroEmAndamento);

    localStorage.setItem("registros", JSON.stringify(registros));
    localStorage.removeItem("registroAtivo");

    registroEmAndamento = null;

    document.getElementById("msg").innerText =
        "Registro finalizado";

    document.getElementById("lider").value = "";
    document.getElementById("guarnicao").value = "";
    document.getElementById("membros").value = "";

    mostrarRegistros();
}

// inicia lista
mostrarRegistros();
function filtrarPorLider() {
    const nome = document.getElementById("filtroLider").value.trim().toLowerCase();

    if (!nome) {
        mostrarRegistros();
        return;
    }

    const filtrados = registros.filter(r =>
        r.lider.toLowerCase().includes(nome)
    );

    mostrarRegistros(filtrados);
}

// ATUALIZA mostrarRegistros PARA ACEITAR FILTRO
function mostrarRegistros(lista = registros) {
    const ul = document.getElementById("listaRegistros");
    ul.innerHTML = "";

    if (lista.length === 0) {
        ul.innerHTML = "<li>Nenhum registro encontrado</li>";
        return;
    }

    lista.forEach(r => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>Líder:</strong> ${r.lider}<br>
            <strong>Guarnição:</strong> ${r.guarnicao}<br>
            <strong>Membros:</strong> ${r.membros}<br>
            <strong>Início:</strong> ${r.inicio}<br>
            <strong>Término:</strong> ${r.termino}
        `;
        ul.appendChild(li);
    });
}
