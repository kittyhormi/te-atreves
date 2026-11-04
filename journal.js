
const entradas = [
  {
    autor: "personaje1",
    fecha: "December 12",
    titulo: "A strange beginning",
    texto: "I found something rather unusual today.\n\nI'm not entirely sure what to make of it yet, but I suppose curiosity has always been my weakness."
  },
  {
    autor: "personaje2",
    fecha: "December 13",
    titulo: "An answer",
    texto: "So you actually found it.\n\nI was beginning to think nobody would notice. I suppose I owe you a proper introduction."
  },
  {
    autor: "personaje1",
    fecha: "December 14",
    titulo: "Well, then...",
    texto: "I have a question for you.\n\nAre you always this mysterious, or am I getting special treatment?"
  }
];

const bookElement = document.getElementById("book");
const nextButton = document.getElementById("nextPage");
const prevButton = document.getElementById("prevPage");
const counter = document.getElementById("pageCounter");

let pageFlip = null;

function escapeHTML(text) {
  return String(text).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function crearPortada() {
  return `
    <div class="page cover" data-density="hard">
      <div class="cover-inner">
        <div class="ornament">✦</div>
        <h2>¿Te atreves?</h2>
        <p class="cover-subtitle">A little mystery awaits...</p>
        <div class="bottom-ornament">✧ ✦ ✧</div>
      </div>
    </div>
  `;
}

function crearPaginaInicial() {
  return `
    <div class="page">
      <div class="page-content">
        <p class="inside-title">Every story begins somewhere...</p>
        <p class="handwriting" style="margin-top:45px;">
          Two strangers.
          One notebook.
          And a question neither of them
          expected to answer.
        </p>
        <div class="page-number">1</div>
      </div>
    </div>
  `;
}

function crearEntrada(entrada, numero) {
  const clase = entrada.autor === "personaje1"
    ? "writer-one"
    : "writer-two";

  return `
    <div class="page">
      <div class="page-content">
        <div class="entry-date">${escapeHTML(entrada.fecha)}</div>
        <h3 class="entry-title">${escapeHTML(entrada.titulo)}</h3>
        <div class="handwriting ${clase}">${escapeHTML(entrada.texto)}</div>
        <div class="page-number">${numero}</div>
      </div>
    </div>
  `;
}

function crearContraportada() {
  return `
    <div class="page back-cover" data-density="hard"></div>
  `;
}

function construirCuaderno() {
  const paginas = [
    crearPortada(),
    crearPaginaInicial(),
    ...entradas.map((entrada, index) =>
      crearEntrada(entrada, index + 2)
    ),
    crearContraportada()
  ];

  bookElement.innerHTML = paginas.join("");
}

function actualizarControles(numero) {
  const total = pageFlip.getPageCount();

  counter.textContent = numero === 0
    ? "Portada"
    : `Página ${numero} / ${total - 2}`;

  prevButton.disabled = numero === 0;
  nextButton.disabled = numero >= total - 1;
}

function iniciarCuaderno() {
  if (!bookElement) {
    console.error("No se encontró el elemento #book");
    return;
  }

  if (typeof St === "undefined" || !St.PageFlip) {
    console.error("PageFlip no se pudo cargar.");
    counter.textContent = "Error al cargar";
    return;
  }

  construirCuaderno();

  pageFlip = new St.PageFlip(bookElement, {
    width: 400,
    height: 560,
    size: "stretch",
    minWidth: 280,
    maxWidth: 430,
    minHeight: 390,
    maxHeight: 600,
    showCover: true,
    usePortrait: true,
    flippingTime: 1000,
    maxShadowOpacity: 0.45,
    drawShadow: true,
    mobileScrollSupport: false,
    useMouseEvents: true,
    startPage: 0
  });

  pageFlip.loadFromHTML(
    bookElement.querySelectorAll(".page")
  );

  pageFlip.on("flip", event => {
    actualizarControles(event.data);
  });

  bookElement.style.visibility = "visible";

  actualizarControles(0);

  bookElement.addEventListener("click", event => {
    if (
      pageFlip &&
      pageFlip.getCurrentPageIndex() === 0 &&
      event.target.closest(".cover")
    ) {
      pageFlip.flipNext();
    }
  });
}

nextButton.addEventListener("click", () => {
  if (pageFlip) pageFlip.flipNext();
});

prevButton.addEventListener("click", () => {
  if (pageFlip) pageFlip.flipPrev();
});

iniciarCuaderno();
