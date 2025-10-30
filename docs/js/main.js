// Funzione di esempio per futura logica JS dinamica
function toggleContent(id) {
    const content = document.getElementById(id);
    if (content) {
      content.classList.toggle('d-none');
    }
  }
  
function handleCardClick(card) {
  card.classList.toggle('flipped');
  if (card.classList.contains('flipped')) {
    setTimeout(() => card.classList.remove('flipped'), 10000); // ritorna dopo 5s
  }
}

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".license-btn");

    buttons.forEach((btn, index) => {
        btn.addEventListener("click", function () {
            const contentId = `content${index + 2}`;
            const textId = `toggle-text${index + 2}`;
            const arrowId = `arrow${index + 2}`;
            
            const box = document.getElementById(contentId);
            const span = document.getElementById(textId);
            const arrow = document.getElementById(arrowId);

            if (!box || !span) return;

            const isVisible = box.offsetParent !== null;

            // Alterna visibilità
            box.style.display = isVisible ? "none" : "block";

            // Cambio testo
            if (!span.dataset.original) span.dataset.original = span.textContent;
            span.textContent = isVisible ? span.dataset.original : "Hide";

            // Ruota freccia (div con maschera)
            if (arrow) {
                arrow.classList.remove("arrow-up", "arrow-down");
                arrow.classList.add(isVisible ? "arrow-down" : "arrow-up");
            }
        });
    });
});



/*SEARCH*/
// ============================================
// 🔍 SISTEMA RICERCA COMPLETO
// ============================================

const pageKeywords = [
  {
    name: "Check-In Info",
    url: "boxes/apartament/info.html",
    keywords: ["check-in", "checkin", "info", "informazioni", "appartamento", "apartment", "arrivo", "arrival", "istruzioni", "instructions"]
  },
  {
    name: "Mobility",
    url: "boxes/mobility/mobility.html",
    keywords: [
      "taxi", "transport", "bus", "tram", "car", "limousine", "rickshaw", "sharing", 
      "public transport", "private transport", "move", "get around", "shuttle", "mobility", 
      "ride", "journey", "commute", "driver", "passenger", "vehicle", "pulman", "pullman", 
      "autobus", "scooter", "bike"
    ]
  },
  {
    name: "Luggage Stores",
    url: "boxes/luggage-store/luggage-store.html",
    keywords: [
      "deposito bagagli", "valigia", "luggage", "storage", "bag", "locker", "deposit", 
      "left luggage", "suitcase", "store", "baggage", "bounce", "luggagepoint", 
      "bag storage", "luggage deposit"
    ]
  },
  {
    name: "At Your Door",
    url: "boxes/at-your-door/at-your-door.html",
    keywords: [
      "delivery", "babysitter", "beauty", "home service", "pasta", "pet sitting", 
      "yoga", "at home", "door", "personal", "service", "wellness at home", 
      "massage", "chef", "personal trainer"
    ]
  },
  {
    name: "Wine",
    url: "boxes/wine/wine-home.html",
    keywords: [
      "vino", "wine tasting", "cantina", "degustazione", "bottle", "winery", 
      "enoteca", "drink", "red wine", "white wine", "fill bottle", "wine bar", 
      "vineyard", "sommelier"
    ]
  },
  {
    name: "Wellness",
    url: "boxes/wellness/wellness.html",
    keywords: [
      "spa", "relax", "massaggio", "beauty", "soulspace", "yoga", "benessere", 
      "wellbeing", "treatment", "wellness center", "massage", "health", "sauna", 
      "meditation"
    ]
  },
  {
    name: "Experiences",
    url: "boxes/experiences/experience.html",
    keywords: [
      "tour", "activity", "florence", "ebike", "painting", "cooking", "chianti", 
      "van tour", "walking", "adventure", "things to do", "eventi", "local experience", 
      "wine tasting", "cooking class", "city tour", "fiat 500"
    ]
  },
  {
    name: "Restaurants",
    url: "boxes/restaurants/restaurants.html",
    keywords: [
      "ristorante", "trattoria", "osteria", "eat", "food", "dining", "cibo", 
      "dove mangiare", "ristoranti", "menu", "chef", "lunch", "dinner", "pizza", 
      "seafood", "vegetarian", "vegan"
    ]
  },
  {
    name: "Drinking Water",
    url: "boxes/water/water.html",
    keywords: [
      "acqua", "water", "fontanello", "drinking", "tap water", "bottle refill", 
      "fountain", "bere", "refill", "potabile", "free water", "hydration"
    ]
  },
  {
    name: "Street Food",
    url: "boxes/street-food/street-food.html",
    keywords: [
      "cibo di strada", "panino", "kebab", "arancino", "bakery", "falafel", 
      "night bakeries", "street", "food truck", "snack", "takeaway", "fast food", 
      "pizza slice", "gelato"
    ]
  },
  {
    name: "Shopping",
    url: "boxes/shopping/shopping.html",
    keywords: [
      "negozi", "shop", "boutique", "fashion", "abbigliamento", "cheese", 
      "local", "souvenir", "market", "store", "shopping", "clothes", "artisan"
    ]
  },
  {
    name: "Nightlife & Events",
    url: "boxes/nightlife/nightlife.html",
    keywords: [
      "night", "club", "bar", "eventi", "serata", "music", "party", "concert", 
      "dj", "nightclub", "disco", "live music", "cocktail", "dance", "tenax", 
      "habana", "salsa", "techno"
    ]
  },
  {
    name: "Private Event Space",
    url: "boxes/private-space/private-space.html",
    keywords: [
      "event", "private", "location", "party", "affitto", "space", "meeting", 
      "venue", "sala", "room", "eventi privati", "prenotazione", "wedding", 
      "corporate event"
    ]
  },
  {
    name: "Ship Your Package",
    url: "boxes/ship-package/ship-package.html",
    keywords: [
      "spedizione", "ship", "package", "parcel", "posta", "mail", "send", 
      "delivery", "courier", "box", "shipping", "inviare", "dhl"
    ]
  }
];

// 📍 Funzione per posizionare il box suggestions
function positionSuggestionsBox() {
  const searchBar = document.getElementById('search-bar');
  const suggestionsBox = document.getElementById('search-suggestions');
  if (!searchBar || !suggestionsBox) return;
  
  const rect = searchBar.getBoundingClientRect();
  suggestionsBox.style.position = 'absolute';
  suggestionsBox.style.top = `${window.scrollY + rect.bottom + 4}px`;
  suggestionsBox.style.left = `${window.scrollX + rect.left}px`;
  suggestionsBox.style.width = `${rect.width}px`;
}

// 🎯 Inizializzazione ricerca
const searchBar = document.getElementById('search-bar');
const suggestionsBox = document.getElementById('search-suggestions');

if (searchBar && suggestionsBox) {
  // Input - filtra risultati
  searchBar.addEventListener('input', function () {
    const query = this.value.trim().toLowerCase();
    
    if (!query) {
      suggestionsBox.classList.add('d-none');
      suggestionsBox.innerHTML = '';
      return;
    }
    
    const results = pageKeywords.filter(page =>
      page.name.toLowerCase().includes(query) ||
      page.keywords.some(k => k.toLowerCase().includes(query))
    );
    
    if (results.length === 0) {
      suggestionsBox.classList.add('d-none');
      suggestionsBox.innerHTML = '';
      return;
    }
    
    suggestionsBox.innerHTML = results.map(page =>
      `<div class="suggestion-item" data-url="${page.url}">
         <strong>${page.name}</strong><br>
         <span class="suggestion-keywords">${page.keywords.slice(0, 4).join(', ')}</span>
       </div>`
    ).join('');
    
    suggestionsBox.classList.remove('d-none');
    positionSuggestionsBox();
  });

  // Focus - riposiziona box
  searchBar.addEventListener('focus', positionSuggestionsBox);
  
  // Resize/Scroll - riposiziona box
  window.addEventListener('resize', positionSuggestionsBox);
  window.addEventListener('scroll', positionSuggestionsBox);

  // Click su suggestion - vai alla pagina
  suggestionsBox.addEventListener('click', function (e) {
    const item = e.target.closest('.suggestion-item');
    if (item && item.dataset.url) {
      window.location.href = item.dataset.url;
    }
  });

  // Click fuori - chiudi suggestions
  document.addEventListener('click', function (e) {
    if (!suggestionsBox.contains(e.target) && e.target !== searchBar) {
      suggestionsBox.classList.add('d-none');
    }
  });
}



