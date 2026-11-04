
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
// "1" = personaje 1 (Odeng), "2" = personaje 2 (Drm Handwritten)
// Cada fila es una página. [] = página en blanco.
const paginasDialogo = [
  // Página 3 (izquierda)
  [
    ["2", `que si me atrevo?`],
    ["2", `no por cualquiera pero al parecer por ti si, chico de las pistas.`],
    ["2", `admiro tus palabras, respeto tu seleccion musical. . no se como me siento respecto a tu gusto por la exposicion publica pero debo confesar que me intrigas.`],
    ["2", `me preguntaste como me hace sentir esta epoca y sospecho que eres una de esas personas que aman la navidad. . . entonces espero me entiendas cuando te diga que es la epoca mas detestable de todas, la felicidad forzada, la gente amontonandose en todos lados. lo odio.`]
  ],
  // Página 4 (derecha)
  [
    ["2", `odio el sentimiento de que todos esperan que estes feliz incluso cuando no lo estas porque cuando estas solo en navidad de alguna forma es peor que lo regular. . si sabes a lo que me refiero, te deje un cupon para una pizzeria, pide algo para ti. . yo invito.`],
    ["2", `y si todavia te interesa conocerme, deja el cuaderno junto a la pelicula mas triste de navidad que puedas encontrar`]
  ],
  // Página 5 (izquierda)
  [
    ["1", `buen intento, me mandaste a una trampa.`],
    ["1", `me halagas chico misterioso pero no me vas a descubrir asi de facil.`],
    ["1", `si quieres saber de mi, tendra que ser mediante el cuaderno.. y si quieres saber mi nombre te lo tienes que ganar, con un reto.`]
  ],
  // Página 6 (derecha)
  [
    ["2", `querido armando,`],
    ["2", `tu ganas. . si haremos esto voy a tener que seguir tus reglas. nada de trampas, apodos, stalkear. . nada de presion para vernos en persona.`],
    ["2", `y si las preguntas personales nos las vamos a ganar con retos. .`],
    ["2", `dime armando:`],
    ["2", `que quieres para navidad?`]
  ],
  // Página 7 (izquierda)
  [
    ["1", `que quiero para navidad?`],
    ["1", `quiero saber mas de ti, chico misterioso.`],
    ["1", `llevame a un lugar especial, alguna parte de la ciudad que se sienta como tu.`]
  ],
  // Página 8 (derecha)
  [
    ["2", `lo que se siente mas "como yo" no es un lugar, armando.. es un momento.`],
    ["2", `ve a la central, antes de que llegue el primer tren, ya se que es muy temprano pero te prometo que vale completamente la pena.`],
    ["2", `hay muy pocos momentos en que la ciudad parece estar completamente quieta. . dime que ves`]
  ],
  // Página 9 (izquierda)
  [
    ["1", `veo las figuras sobre las ventanas, sigue estando muy oscuro afuera pero aqui adentro parece estar iluminado por las estrellas.. el mundo se siente tan grande pero tan pequeño. y tan mio.`]
  ],
  // Página 10 (derecha)
  [
    ["1", `bueno, ahora se que te gusta la quietud.. pero sabias que no debes despertar tan temprano para teneria?? solo necesitas una leccion de mi primo en el centro, tiene maestria en apagar todo el ruido a su alrededor. si puedes durar al menos 10 minutos haciendo lo que el hace, deja el cuaderno y el siguiente reto con el`]
  ],
  // Página 11 (izquierda, en medio)
  [
    ["1", `y una cosa mas... ya va siendo hora de que me des tu nombre, tu sabes el mio y pienso que es lo justo.`]
  ],
  // Página 12 (derecha)
  [
    ["2", `querido armando, valoro la justicia pero no puedo darte mi nombre porque tal vez seria muy sencillo que me encuentres pero te dare una pista:`],
    ["2", `mi nombre pertenece a un guitarrista que tambien sabe leer las estrellas`],
    ["2", `bueno, mientras escribo esto me estoy muriendo de hambre asi que vayamos por un snack, busca un carrito en la avenida principal y pregunta por "el wero"`]
  ],
  // Página 13 (izquierda)
  [
    ["1", `esa fue la experiencia culinaria mas rara de mi vida... es mi castigo por preguntar tu nombre? no me voy a rendir ok`],
    ["1", `entonces, guitarrista y estrellas.. solo puedo pensar en la cancion "arrullo de estrellas" de zoe. te llamas sergio?? asi se llama el guitarrista`]
  ],
  // Página 14 (derecha)
  [
    ["1", `bueno te voy a decir sergio, ni modo.`],
    ["1", `entonces, tus gustos en comida son cuestionables pero los mios para tu suerte son los mejores.`],
    ["1", `ya se que dices que odias la navidad pero para mi es la epoca mas dulce de todas entonces disfruta de los mejores roles de canela y cuentame cual fue tu mejor navidad, se que debes tener alguna historia`]
  ],
  // Página 15 (izquierda)
  [
    ["2", `primero que nada no me llamo sergio, a los sergios les gusta bailar.`],
    ["2", `ahora, respondiendo a tu reto:`],
    ["2", `tenia 10 , ese dia mis papas me dijeron que iba a tener dos navidades.. estaba muy emocionado porque eso significaba mas regalos no?? la emocion me duro poco porque luego me dijeron que se iban a divorciar. . y esa navidad solo pedi una cosa, que mis papas volvieran a estar juntos.`],
    ["2", `ntp sobrevivi pero mi mejor navidad fue esa, la ultima vez que crei en santa, en los milagros o en los papas.`],
    ["2", `pero suficiente sobre mi, hay que compartir desgracias:`],
    ["2", `hablame de tu peor navidad`]
  ],
  // Página 16 (derecha)
  [
    ["1", `mi peor navidad?`],
    ["1", `definitivamente esta, mis papas se fueron de viaje, mi abuelo vive en otra ciudad (que por cierto dice que solo va a mty por la carne asada pero estoy seguro de que ahi vive su novia)`],
    ["1", `asi que puedo decir que mi peor navidad es esta.`],
    ["1", `pero seria mentira. .me contaste algo personal, algo que te dolio asi que supongo que te debo lo mismo`]
  ],
  // Página 17 (izquierda)
  [
    ["1", `mi peor navidad fue cuando en la secundaria hice pulseras de la amistad y le rogue a mis papas que me dejaran ir a mi primera fiesta, siempre me ha encantado hacer cosas, yo hago mis propios accesorios.. asi que hice pulseras de amistad para darles a todos en la fiesta como regalo de navidad`]
  ],
  // Página 18 (derecha)
  [
    ["1", `habia un chico, lo vamos a llamar "m"`],
    ["1", `nunca me habia hablado pero mi cabeza estaba repleta de conversaciones que deseaba que tuvieramos algun dia, tenia un mega crush en el.. y ahi estaba el, pidiendome una de mis pulseras.`],
    ["1", `todos sus amigos estaban viendo y te juro que pense que ese era mi momento, que por fin tenia una oportunidad con el`],
    ["1", `despues lo vi tirar mi pulsera a la basura y llamarme "maricon" con todos sus amigos`]
  ],
  // Página 19 (izquierda)
  [
    ["1", `ahi aprendi que no todos pueden entenderme y que no iba a encajar en todos lados.`],
    ["1", `y estoy bien con eso, sigo siendo yo mismo.. y si o sea no soy de muchos amigos.. ni voy a fiestas. y al parecer lo que mejor se me da es contarle mis traumas a un desconocido en un cuaderno. .supongo que asi es mas facil.`],
    ["1", `si aun no te he asustado, deja tu siguiente reto en el centro, junto a la exposicion de raros (alicia en el pais de las maravillas)`]
  ],
  // Página 20 (derecha, en blanco)
  []
];
function crearPaginaDialogo(bloques) {
  const total = bloques.reduce((suma, [, texto]) => suma + texto.length, 0);
  const tamano =
    total <= 200 ? "tam-g" :
    total <= 400 ? "tam-m" :
    total <= 550 ? "tam-p" : "tam-xp";

  const parrafos = bloques
    .map(([autor, texto]) =>
      `<p class="dialogo ${autor === "1" ? "uno" : "dos"}">${escapeHTML(texto)}</p>`
    )
    .join("");

  return `
    <div class="page">
      <div class="page-content plain dialogo-page ${tamano}">
        ${parrafos}
      </div>
    </div>
  `;
}
function construirCuaderno() {
  const paginas = [
    crearPortada(),
    crearPaginaInicial(),
    crearPaginaPistas(),
    ...paginasDialogo.map(crearPaginaDialogo),
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
let hojaMostrada = false;

function soltarHoja() {
  const overlay = document.createElement("div");
  overlay.className = "hoja-overlay";
  overlay.innerHTML = `
    <div class="hoja-caja">
      <img src="hoja.jpg" alt="Hoja suelta con el estribillo">
    </div>
  `;
  document.body.appendChild(overlay);

  const caja = overlay.querySelector(".hoja-caja");
  let abierta = false;

  requestAnimationFrame(() => {
    overlay.classList.add("activa");
    caja.classList.add("cayendo");
  });

  setTimeout(() => {
    caja.classList.remove("cayendo");
    caja.classList.add("abriendo");
    setTimeout(() => { abierta = true; }, 1300);
  }, 1200);

  overlay.addEventListener("click", () => {
    if (!abierta) return;
    abierta = false;
    overlay.classList.remove("activa");
    caja.classList.remove("abriendo");
    caja.classList.add("cerrando");
    setTimeout(() => overlay.remove(), 600);
  });
}

function revisarHojaSuelta(numero) {
  if (!hojaMostrada && numero >= 3) {
    hojaMostrada = true;
    setTimeout(soltarHoja, 400);
  }
}
let imagenMostrada = false;

function crearPaginaArrancada() {
  return `
    <div class="page pagina-arrancada">
      <div class="resto-sombra">
        <div class="resto-papel"></div>
      </div>
    </div>
  `;
}

function soltarImagenFinal() {
  const overlay = document.createElement("div");
  overlay.className = "foto-overlay";
  overlay.innerHTML = `
    <div class="foto-caja">
      <img src="noche.jpg" alt="Noche buena pero muy mala, 2:00 am">
    </div>
  `;
  document.body.appendChild(overlay);

  const caja = overlay.querySelector(".foto-caja");
  let lista = false;

  requestAnimationFrame(() => {
    overlay.classList.add("activa");
    caja.classList.add("cayendo");
  });

  setTimeout(() => { lista = true; }, 1900);

  overlay.addEventListener("click", () => {
    if (!lista) return;
    lista = false;
    overlay.classList.remove("activa");
    caja.classList.remove("cayendo");
    caja.classList.add("cerrando");
    setTimeout(() => overlay.remove(), 600);
  });
}

function revisarImagenFinal(numero) {
  if (imagenMostrada || !pageFlip) return;
  const total = pageFlip.getPageCount();
  const vertical = pageFlip.getOrientation && pageFlip.getOrientation() === "portrait";
  const objetivo = vertical ? total - 2 : total - 3;

  if (numero >= objetivo) {
    imagenMostrada = true;
    setTimeout(soltarImagenFinal, 500);
  }
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

 function construirCuaderno() {
  const paginas = [
    crearPortada(),
    crearPaginaInicial(),
    crearPaginaPistas(),
    ...paginasDialogo.slice(0, -1).map(crearPaginaDialogo),
    crearPaginaArrancada(),
    crearContraportada()
  ];

  bookElement.innerHTML = paginas.join("");
}

  pageFlip.loadFromHTML(
    bookElement.querySelectorAll(".page")
  );

   pageFlip.on("flip", event => {
    actualizarControles(event.data);
    revisarHojaSuelta(event.data);
    revisarImagenFinal(event.data);
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
