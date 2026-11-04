
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
        <h2>Te atreves?</h2>
      </div>
    </div>
  `;
}
function crearPaginaInicial() {
  return `
    <div class="page">
      <div class="page-content plain">
        <p class="riddle-question">puedes descifrar la pregunta?</p>

        <p class="riddle-blanks">
          <span class="blank"><span>v</span><span>a</span><span>s</span></span>
          <span class="blank"><span>a</span></span>
          <span class="blank"><span>e</span><span>s</span><span>t</span><span>a</span><span>r</span></span>
        </p>

        <p class="riddle-blanks">
          <span class="blank"><span>s</span><span>o</span><span>l</span><span>o</span></span>
          <span class="blank"><span>e</span><span>s</span><span>t</span><span>a</span></span>
        </p>

        <p class="riddle-blanks">
          <span class="blank"><span>n</span><span>a</span><span>v</span><span>i</span><span>d</span><span>a</span><span>d</span></span>
          <span>?</span>
        </p>

        <p class="riddle-label">pistas :</p>

        <p class="riddle-clue">
          1. dicen que el orgullo puede impedir que dos personas se conozcan y que los prejuicios pueden hacer que se pierdan de una buena historia.. tus primeras dos palabras se encuentran en su romance: 252, 2, 5/6
        </p>
      </div>
    </div>
  `;
}
function crearPaginaPistas() {
  return `
    <div class="page">
      <div class="page-content plain clues-page">
        <p class="riddle-clue">
          2. hay historias de amor que terminan antes de empezar.. busca los apellidos que nunca debieron estar juntos. 141, 2, 11
        </p>

        <p class="riddle-clue">
          3. algunos reciben regalos, otros reciben visitas inesperadas. encuentra al que tuvo tres para aprender el verdadero significado de estas fechas. 24, 1, 15
        </p>

        <p class="riddle-clue">
          4. espero que no te de verguenza pues la siguiente pista esta en la seccion para adultos de la libreria, busca el best seller del mes. 40, 5, 2. (por cierto, si te interesa este libro en particular.. y solo ese tema del que se habla, puedes dejar el cuaderno, no seremos compatibles..)
        </p>

        <p class="riddle-clue">
          5. ya casi terminas!! para conseguir la ultima palabra debo saber.. eres valiente? conoces la cancion que lleva una invitacion por titulo? muy popular en esta epoca. recita su estribillo completo en el escenario para lectura.. cuando termines encontraras la ultima palabra
        </p>
      </div>
    </div>
  `;
}

function crearPaginaVacia(numero) {
  return `
    <div class="page">
      <div class="page-content">
        <div class="page-number">${numero}</div>
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
    crearPaginaPistas(),
    ...entradas.map((entrada, index) =>
      crearEntrada(entrada, index + 3)
    ),
    crearPaginaVacia(entradas.length + 3),
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
