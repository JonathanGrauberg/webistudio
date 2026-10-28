// Contornos vectoriales de "Webi." en Satoshi Black (extraídos de Acces/Satoshi/Fonts/OTF/Satoshi-Black.otf).
// Unidades de fuente (1000 = 1em), baseline en y=0, tracking -40 entre letras.
// Se usan como SVG para poder hacer zoom exacto dentro de la W sin perder nitidez.

export const WORDMARK = {
  /** Caja que ocupa la palabra completa */
  viewBox: { x: 0, y: -780, w: 2660, h: 820 },
  /** Vértice central de la W: la zona sólida más ancha, por donde entra el zoom */
  zoomOrigin: { x: 537, y: -615 },
  /** Radio aproximado de zona sólida alrededor del origen (unidades de fuente) */
  zoomSolidRadius: 120,
  glyphs: {
    W: { x: 0, adv: 1069, d: "M237 0H396L535 -486L670 0H828L1054 -740H889L790 -417C777 -374 766 -333 751 -258C738 -329 726 -374 714 -419L627 -740H446L355 -419C342 -373 330 -331 318 -258C306 -331 294 -375 281 -419L184 -740H15Z" },
    e: { x: 1029, adv: 575, d: "M1319 13C1456 13 1555 -58 1573 -169H1432C1421 -133 1380 -112 1322 -112C1254 -112 1217 -143 1208 -209L1571 -211V-250C1571 -413 1473 -516 1316 -516C1165 -516 1060 -407 1060 -251C1060 -97 1168 13 1319 13ZM1317 -391C1379 -391 1418 -357 1418 -304H1210C1222 -364 1256 -391 1317 -391Z" },
    b: { x: 1564, adv: 640, d: "M1767 0 1775 -64C1802 -18 1862 13 1932 13C2074 13 2173 -90 2173 -245C2173 -408 2084 -517 1944 -517C1872 -517 1806 -487 1776 -442V-754H1622V0ZM1777 -253C1777 -328 1827 -378 1899 -378C1972 -378 2018 -327 2018 -253C2018 -179 1972 -128 1899 -128C1827 -128 1777 -178 1777 -253Z" },
    i: { x: 2164, adv: 270, d: "M2298 -578C2346 -578 2385 -617 2385 -666C2385 -715 2346 -753 2298 -753C2249 -753 2210 -715 2210 -666C2210 -617 2249 -578 2298 -578ZM2222 0H2376V-500H2222Z" },
    dot: { x: 2394, adv: 308, d: "M2548 13C2597 13 2640 -28 2640 -77C2640 -127 2597 -168 2548 -168C2497 -168 2456 -127 2456 -77C2456 -28 2497 13 2548 13Z" },
  },
} as const
