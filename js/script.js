document.addEventListener("DOMContentLoaded", function () {
  const umidade = document.getElementById("umidade");
  const temperatura = document.getElementById("temperatura");
  const folhas = document.getElementById("folhas");
  const preservacao = document.getElementById("preservacao");

  const valorUmidade = document.getElementById("valorUmidade");
  const valorTemperatura = document.getElementById("valorTemperatura");
  const valorFolhas = document.getElementById("valorFolhas");
  const valorPreservacao = document.getElementById("valorPreservacao");

  const risco = document.getElementById("risco");
  const barraRisco = document.getElementById("barraRisco");
  const tituloResultado = document.getElementById("tituloResultado");
  const textoResultado = document.getElementById("textoResultado");

  const botaoResetar = document.getElementById("botaoResetar");
  const salvarAnalise = document.getElementById("salvarAnalise");

  const cardUmidade = document.getElementById("cardUmidade");
  const cardTemperatura = document.getElementById("cardTemperatura");
  const cardFolhas = document.getElementById("cardFolhas");
  const cardPreservacao = document.getElementById("cardPreservacao");

  const listaRecomendacoes = document.getElementById("listaRecomendacoes");
  const historicoLista = document.getElementById("historicoLista");
  const historicoVazio = document.getElementById("historicoVazio");

  const perguntaQuiz = document.getElementById("perguntaQuiz");
  const opcoesQuiz = document.getElementById("opcoesQuiz");
  const feedbackQuiz = document.getElementById("feedbackQuiz");
  const progressoQuiz = document.getElementById("progressoQuiz");
  const pontosQuiz = document.getElementById("pontosQuiz");
  const proximaPergunta = document.getElementById("proximaPergunta");
  const reiniciarQuiz = document.getElementById("reiniciarQuiz");

  let numeroAnalise = 0;
  let perguntaAtual = 0;
  let pontos = 0;
  let respondeu = false;

  function calcular() {
    const u = Number(umidade.value);
    const t = Number(temperatura.value);
    const f = Number(folhas.value);
    const p = Number(preservacao.value);

    valorUmidade.textContent = u;
    valorTemperatura.textContent = t;
    valorFolhas.textContent = f;
    valorPreservacao.textContent = p;

    cardUmidade.textContent = u + "%";
    cardTemperatura.textContent = t + "°C";
    cardFolhas.textContent = f + "%";
    cardPreservacao.textContent = p + "%";

    let calculo = 20;
    calculo = calculo + f * 0.6;

    if (t > 28) {
      calculo = calculo + (t - 28) * 2;
    }

    if (u < 45) {
      calculo = calculo + (45 - u) * 0.9;
    }

    if (u > 75) {
      calculo = calculo + (u - 75) * 0.5;
    }

    calculo = calculo - p * 0.25;
    calculo = Math.round(calculo);

    if (calculo < 0) {
      calculo = 0;
    }

    if (calculo > 100) {
      calculo = 100;
    }

    risco.textContent = calculo;
    barraRisco.style.width = calculo + "%";

    if (calculo >= 70) {
      barraRisco.style.background = "#b42318";
      tituloResultado.textContent = "Risco alto";
      textoResultado.textContent = "A lavoura precisa de atenção. Verifique folhas, água e solo.";
    } else if (calculo >= 40) {
      barraRisco.style.background = "#e8782e";
      tituloResultado.textContent = "Risco moderado";
      textoResultado.textContent = "Existem sinais de alerta. Continue o monitoramento.";
    } else {
      barraRisco.style.background = "#246b38";
      tituloResultado.textContent = "Risco baixo";
      textoResultado.textContent = "A lavoura está em bom equilíbrio.";
    }

    atualizarRecomendacoes(u, t, f, p, calculo);
  }

  function atualizarRecomendacoes(u, t, f, p, calculo) {
    listaRecomendacoes.innerHTML = "";

    const itens = [];

    if (calculo >= 70) {
      itens.push("Fazer inspeção detalhada na lavoura.");
    }

    if (u < 45) {
      itens.push("Planejar irrigação consciente.");
    }

    if (u > 75) {
      itens.push("Verificar drenagem do solo.");
    }

    if (t > 32) {
      itens.push("Evitar manejo no horário mais quente.");
    }

    if (f > 55) {
      itens.push("Observar sinais de pragas nas folhas.");
    }

    if (p < 50) {
      itens.push("Aumentar áreas verdes e preservar nascentes.");
    }

    if (itens.length === 0) {
      itens.push("Manter o monitoramento preventivo.");
    }

    itens.forEach(function (texto) {
      const li = document.createElement("li");
      li.textContent = texto;
      listaRecomendacoes.appendChild(li);
    });
  }

  function reiniciarAnalise() {
    umidade.value = 50;
    temperatura.value = 25;
    folhas.value = 30;
    preservacao.value = 60;

    numeroAnalise = 0;

    historicoLista.innerHTML = "";
    historicoVazio.style.display = "block";

    calcular();

    tituloResultado.textContent = "Nova análise iniciada";
    textoResultado.textContent = "A simulação foi reiniciada com valores padrão.";
  }

  function salvarHistorico() {
    numeroAnalise++;

    historicoVazio.style.display = "none";

    const li = document.createElement("li");
    li.textContent =
      "Análise " + numeroAnalise +
      " | Risco: " + risco.textContent + "%" +
      " | Umidade: " + umidade.value + "%" +
      " | Temperatura: " + temperatura.value + "°C" +
      " | Folhas: " + folhas.value + "%" +
      " | Preservação: " + preservacao.value + "%";

    historicoLista.prepend(li);
  }

  const perguntas = [
    {
      pergunta: "Qual atitude ajuda a economizar água no campo?",
      opcoes: ["Irrigação eficiente", "Desmatamento", "Desperdício", "Queimada"],
      correta: 0
    },
    {
      pergunta: "Por que proteger o solo é importante?",
      opcoes: ["Evita erosão", "Aumenta desperdício", "Remove nutrientes", "Seca nascentes"],
      correta: 0
    },
    {
      pergunta: "Como a tecnologia ajuda o produtor?",
      opcoes: ["Monitorando dados", "Ignorando riscos", "Aumentando perdas", "Destruindo o solo"],
      correta: 0
    }
  ];

  function mostrarPergunta() {
    respondeu = false;

    const atual = perguntas[perguntaAtual];

    progressoQuiz.textContent = "Pergunta " + (perguntaAtual + 1) + " de " + perguntas.length;
    pontosQuiz.textContent = pontos;
    perguntaQuiz.textContent = atual.pergunta;
    feedbackQuiz.textContent = "";
    opcoesQuiz.innerHTML = "";

    atual.opcoes.forEach(function (opcao, indice) {
      const botao = document.createElement("button");
      botao.type = "button";
      botao.className = "botao secundario";
      botao.textContent = opcao;

      botao.addEventListener("click", function () {
        if (respondeu) {
          return;
        }

        respondeu = true;

        if (indice === atual.correta) {
          pontos++;
          pontosQuiz.textContent = pontos;
          feedbackQuiz.textContent = "Resposta correta!";
          botao.style.background = "#246b38";
          botao.style.color = "#ffffff";
        } else {
          feedbackQuiz.textContent = "Resposta incorreta.";
          botao.style.background = "#b42318";
          botao.style.color = "#ffffff";
        }
      });

      opcoesQuiz.appendChild(botao);
    });
  }

  function avancarPergunta() {
    if (perguntaAtual < perguntas.length - 1) {
      perguntaAtual++;
      mostrarPergunta();
    } else {
      perguntaQuiz.textContent = "Quiz concluído!";
      opcoesQuiz.innerHTML = "";
      progressoQuiz.textContent = "Resultado final";
      feedbackQuiz.textContent = "Você fez " + pontos + " ponto(s) de " + perguntas.length + ".";
    }
  }

  function reiniciarQuizCompleto() {
    perguntaAtual = 0;
    pontos = 0;
    mostrarPergunta();
  }

  umidade.addEventListener("input", calcular);
  temperatura.addEventListener("input", calcular);
  folhas.addEventListener("input", calcular);
  preservacao.addEventListener("input", calcular);

  botaoResetar.addEventListener("click", reiniciarAnalise);
  salvarAnalise.addEventListener("click", salvarHistorico);

  proximaPergunta.addEventListener("click", avancarPergunta);
  reiniciarQuiz.addEventListener("click", reiniciarQuizCompleto);

  calcular();
  mostrarPergunta();
});
