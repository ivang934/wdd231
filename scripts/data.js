/*
  Static member data used directly by index.js (avoids fetch/CORS issues when
  testing locally with file://). directory.html can later fetch
  data/members.json instead once the site is served over http(s), or reuse
  this same array — keep the two files in sync.
*/
const members = [
  {
    name: "Café Tortoni Digital",
    address: "Av. de Mayo 825, Monserrat",
    phone: "+54 11 4342-4328",
    website: "https://example.com/tortoni-digital",
    image: "images/members/cafe-tortoni.jpg",
    description: "Coworking café blending Buenos Aires literary tradition with fast wifi and espresso.",
    level: "gold"
  },
  {
    name: "Estudio Puerto Madero Arquitectos",
    address: "Av. Alicia Moreau de Justo 1150, Puerto Madero",
    phone: "+54 11 5236-7900",
    website: "https://example.com/puerto-madero-arq",
    image: "images/members/puerto-madero.jpg",
    description: "Architecture studio specializing in adaptive reuse of historic warehouses.",
    level: "gold"
  },
  {
    name: "Librería El Ateneo Norte",
    address: "Av. Santa Fe 1860, Recoleta",
    phone: "+54 11 4813-6052",
    website: "https://example.com/ateneo-norte",
    image: "images/members/libreria-ateneo.jpg",
    description: "Independent bookstore and cultural venue hosting monthly author talks.",
    level: "silver"
  },
  {
    name: "Sabor Porteño Catering",
    address: "Humboldt 452, Palermo",
    phone: "+54 11 4772-1190",
    website: "https://example.com/sabor-porteno",
    image: "images/members/sabor-porteno.jpg",
    description: "Full-service catering for corporate events across Capital Federal.",
    level: "silver"
  },
  {
    name: "Academia de Tango San Telmo",
    address: "Defensa 1179, San Telmo",
    phone: "+54 11 4361-6621",
    website: "https://example.com/tango-santelmo",
    image: "images/members/tango-santelmo.jpg",
    description: "Group and private tango lessons for locals, tourists, and corporate teams.",
    level: "silver"
  },
  {
    name: "Fundación Barrios de Pie",
    address: "Av. Rivadavia 4200, Almagro",
    phone: "+54 11 4958-3310",
    website: "https://example.com/barrios-de-pie",
    image: "images/members/fundacion.jpg",
    description: "Community non-profit supporting small vendor cooperatives.",
    level: "non-profit"
  },
  {
    name: "Taller Mecánico Belgrano",
    address: "Cabildo 2140, Belgrano",
    phone: "+54 11 4780-5541",
    website: "https://example.com/mecanica-belgrano",
    image: "images/members/mecanica-belgrano.jpg",
    description: "Family-run auto shop serving the Belgrano and Núñez neighborhoods since 1988.",
    level: "non-profit"
  },
  {
    name: "NeoCode Software Studio",
    address: "Av. Corrientes 3100, Balvanera",
    phone: "+54 11 4864-2277",
    website: "https://example.com/neocode",
    image: "images/members/neocode.jpg",
    description: "Custom web and mobile development for local SMEs.",
    level: "gold"
  }
];
