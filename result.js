



// Function to generate styling suggestions based on body data
function generateStylingSuggestions(data) {
  





  const suggestions = [];

  const hipWaistRatio = data.hips / data.waist;
const bustHipsDiff = Math.abs(data.bust - data.hips);
const shoulderHipsDiff = Math.abs(data.shoulders - data.hips);
const bustShoulderDiff = Math.abs(data.bust - data.shoulders);

const hasShortTorso = data['torso-length'] - data['leg-length'] >= 3;
const hasLongLegs = data['leg-length'] - data['torso-length'] >= 3;
const hasBalancedProportion = Math.abs(data['torso-length'] - data['leg-length']) <= 2;

const pearShaped =
  hipWaistRatio > 1.15 &&
  data.hips > data.bust &&
  data.hips > data.shoulders;

const rectangleShaped =
  Math.abs(data.shoulders - data.hips) <= 3 &&
  Math.abs(data.waist - data.hips) <= 6;

const hourglass =
  bustHipsDiff <= 3 &&
  shoulderHipsDiff <= 3 &&
  Math.abs(data.waist - data.hips) > 7;

const invertedTriangle =
  data.shoulders - data.hips >= 5 &&
  data.shoulders > data.bust;

const appleShaped =
  data.bust >= data.hips &&
  data.waist >= data.bust * 0.75 &&
  data.waist >= data.hips * 0.75;

  const add = (element, tryThis, avoid, why) => {
    const imageQuery = tryThis.split(",")[0] + " outfit";
    suggestions.push({ element, try: tryThis, avoid, why, imageQuery });
  };

  

  // --- NECKLINE ---
  if (invertedTriangle || bustShoulderDiff > 5) {
    add("Neckline", "V-neck, deep scoop, narrow plunge", "Boat neck, high crewneck", "Minimizes broad shoulders and balances upper body");
  } else if (pearShaped || rectangleShaped) {
    add("Neckline", "Square, boat, wide scoop", "Tight crewnecks, deep plunges", "Adds width to upper body and balances hips");
  } else if (appleShaped) {
    add("Neckline", "V-neck, scoop neck", "High necks", "Draws attention upward and elongates the torso");
  } else {
    add("Neckline", "Scoop neck, open necklines", "Overly high necks", "Keeps proportions balanced");
  }

  // --- SLEEVES ---
  if (pearShaped) {
    add("Sleeves", "Puff, flutter, cap sleeves", "Sleeveless, tight short sleeves", "Adds volume to shoulders and balances hips");
  } else if (invertedTriangle) {
    add("Sleeves", "Slim, raglan, dolman", "Puffed or shoulder-padded sleeves", "Softens the shoulder line");
  } else if (rectangleShaped) {
    add("Sleeves", "Bell, puff, layered sleeves", "Straight sleeves", "Adds curves and dimension");
  } else if (hourglass) {
    add("Sleeves", "Fitted sleeves, 3/4 sleeves", "Boxy or bulky sleeves", "Accentuates curves without hiding shape");
  } else  {
    add("Sleeves", "Flowy, elbow-length, dolman sleeves", "Tight short sleeves", "Camouflages upper arm and adds ease");
  }

  // --- TOP LENGTH ---
  if (hasShortTorso) {
    add("Top Length", "Waist-length or just below", "High cropped tops or very long tunics", "Keeps torso looking balanced");
  } else if (hasLongLegs) {
    add("Top Length", "Hip-length or tunic-style", "Super short tops", "Lengthens the torso visually");
  } else  {
    add("Top Length", "Mid-length tops", "Overly long tops", "Keeps body proportions harmonious");
  }

 // --- TUCK/UNTUCK ---
if (hasShortTorso) {
  add("Tuck/Untuck", "Half-tuck or front tuck", "Full tuck with high waist", "Prevents upper body from looking squashed");
} else if (hasLongLegs) {
  add("Tuck/Untuck", "Full tuck or belted tops", "Untucked long tops", "Defines waist and balances longer legs");
} else  {
  add("Tuck/Untuck", "Tuck into mid-rise", "Shapeless untucked tops", "Keeps torso and legs in harmony");
}


  // --- JEANS STYLE ---
  if (pearShaped) {
    add("Jeans Style", "Straight, wide-leg, bootcut", "Tight skinnies with tight tops", "Balances out hips and draws attention downward");
  } else if (rectangleShaped) {
    add("Jeans Style", "Curvy fit, pocket details, wide-leg", "Flat front, no shape", "Adds volume and creates curves");
  } else if (hourglass) {
    add("Jeans Style", "High-waist skinny, flared", "Loose fit", "Follows natural curves and defines waist");
  } else if (invertedTriangle) {
    add("Jeans Style", "Flared, bootcut, wide-leg", "Skinny with padded shoulders", "Adds volume to lower half");
  } else  {
    add("Jeans Style", "Straight-leg, mid-rise, tummy control", "Low-rise skinnies", "Flattens tummy and balances shape");
  }

  // --- JEANS RISE ---
  if (hasShortTorso) {
    add("Jeans Rise", "Mid-rise", "Ultra high-rise", "Avoids cutting off your torso visually");
  } else if (hasLongLegs) {
    add("Jeans Rise", "High-rise", "Low-rise", "Balances vertical proportion and adds shape");
  } else  {
    add("Jeans Rise", "Mid to high rise", "Low or ultra-high rise extremes", "Keeps everything proportional");
  }

  // --- SKIRT SHAPE ---
  if (pearShaped || hourglass) {
    add("Skirt Shape", "A-line, bias-cut, tulip", "Tight pencil skirts", "Skims hips without clinging");
  } else if (rectangleShaped) {
    add("Skirt Shape", "Ruffled, flared, bubble", "Straight boxy skirts", "Creates volume and illusion of curves");
  } else if (invertedTriangle) {
    add("Skirt Shape", "Full circle, pleated, A-line", "Mini pencil skirts", "Adds lower body volume and balances shoulders");
  } else {
    add("Skirt Shape", "Straight, structured skirts", "Overly gathered ones", "Maintains line and shape");
  }

 // --- SKIRT LENGTH ---
if (hasLongLegs) {
  add("Skirt Length", "Midi, mini, above knee", "Floor-length", "Highlights long legs");
} else if (hasShortTorso) {
  add("Skirt Length", "Just above knee or midi", "Long skirts with long tops", "Avoids visually shrinking upper body");
} else  {
  add("Skirt Length", "Just above knee or classic midi", "Too short or too long", "Maintains overall balance");
}

  // --- DRESS TYPE ---
  if (hourglass) {
    add("Dress Type", "Wrap, fit & flare, belted", "Boxy, shapeless dresses", "Defines waist and follows curves");
  } else if (pearShaped) {
    add("Dress Type", "A-line, empire, off-shoulder", "Straight sheath", "Highlights waist and adds volume to top");
  } else if (appleShaped) {
    add("Dress Type", "Empire waist, trapeze, shift", "Tight bodycon", "Skims midsection and flatters bust");
  } else if (rectangleShaped) {
    add("Dress Type", "Peplum, tiered, belted", "Straight tube dresses", "Creates curves with volume or belts");
  } else {
    add("Dress Type", "Flared skirt, off-shoulder, empire", "Strappy bodycon", "Balances wide shoulders with volume below");
  }

  // --- JACKETS ---
if (hasShortTorso) {
  add("Jackets", "Cropped, waist-fitted", "Long oversized jackets", "Keeps upper body from looking shorter");
} else if (hasLongLegs) {
  add("Jackets", "Hip to mid-thigh length", "Very short cropped jackets", "Balances vertical proportion");
} else  {
  add("Jackets", "Hip-length, open style", "Heavy midsection coats", "Keeps silhouette flowing");
}

// --- FOOTWEAR ---
if (hasLongLegs) {
  add("Footwear", "Ankle straps, flats, kitten heels", "Chunky ankle boots", "Flatters the leg line");
} else if (hasShortTorso) {
  add("Footwear", "Low vamp pointed flats", "High-top sneakers or bulky soles", "Elongates leg and balances torso");
} else  {
  add("Footwear", "Neutral-tone shoes, slim heels", "Overly bulky shoes", "Keeps body streamlined");
}


  // --- ACCESSORIES ---
if (hasShortTorso) {
  add("Accessories", "Long chains, slim earrings", "Chunky wide belts", "Draws eye vertically, elongating torso");
} else if (hasLongLegs) {
  add("Accessories", "Waist belts, short chains", "Long chunky necklaces", "Draws attention to balanced center");
} else  {
  add("Accessories", "Medium-length necklaces, medium belts", "Extreme size accessories", "Adds polish without cutting lines");
}

  // --- COLOR BLOCKING ---
  if (pearShaped || rectangleShaped) {
    add("Color Blocking", "Bright/light tops, dark bottoms", "Loud bright bottoms with plain tops", "Shifts attention upward");
  } else if (appleShaped) {
    add("Color Blocking", "Monochrome or vertical blocks", "Bold midsection color blocks", "Streamlines shape visually");
  } else {
    add("Color Blocking", "Balanced contrast or monochrome", "Half top/bottom extreme contrast", "Keeps things flowing");
  }

  // --- PRINTS & LINES ---
  if (pearShaped) {
    add("Prints & Lines", "Bold prints on top", "Heavy prints on bottom", "Balances out larger hips");
  } else if (invertedTriangle) {
    add("Prints & Lines", "Stripes/prints on bottom", "Bold top prints with shoulder pads", "Shifts volume downward");
  } else if (appleShaped) {
    add("Prints & Lines", "Vertical lines, small prints", "Big horizontal stripes around waist", "Slenderizes and flatters");
  } else if (rectangleShaped) {
    add("Prints & Lines", "Diagonal, curved patterns", "Straight blocky prints", "Creates illusion of curves");
  } else {
    add("Prints & Lines", "Subtle all-over patterns", "Midsection-focused prints", "Keeps figure clean and balanced");
  }




  const stylingSection = document.createElement("section");
  stylingSection.id = "styling-suggestions";
   stylingSection.style.padding = "20px";
  stylingSection.style.backgroundColor = "#f4f9f8";

  const heading = document.createElement("h2");
  heading.textContent = "🧵 Styling Suggestions for You";
  heading.style.fontSize = "28px";
  heading.style.paddingTop = "250px";
  heading.style.textAlign = "center";
  heading.style.color = "#0A400C";
  stylingSection.appendChild(heading);


  if (!suggestions.length) {
    const noneText = document.createElement("p");
    noneText.textContent = "No styling suggestions available.";
    stylingSection.appendChild(noneText);
    return;
  }

  // Create table
  const table = document.createElement("table");
  table.style.width = "100%";
  table.style.borderCollapse = "collapse";
  table.style.backgroundColor = "#fff";
  table.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.05)";
  table.style.borderRadius = "12px";
  table.style.overflow = "hidden";
  table.style.fontSize = "16px";
  table.style.padding = " 50px";
  // Table header
  const thead = document.createElement("thead");
 thead.innerHTML = `
  <tr style="background-color:#819067; color: #0A400C;">
    <th style="padding: 15px; border: 1px solid #0A400C;">Element</th>
    <th style="padding: 15px; border: 1px solid #0A400C;">Try</th>
    <th style="padding: 15px; border: 1px solid #0A400C;">Avoid</th>
    <th style="padding: 15px; border: 1px solid #0A400C;">Why It Works</th>
  </tr>
`;
  table.appendChild(thead);

  // Table body
  const tbody = document.createElement("tbody");
tbody.style.backgroundColor = "#f7fdf5";
suggestions.forEach((item, index) => {
  const row = document.createElement("tr");
  row.style.backgroundColor = index % 2 === 0 ? "#ffffff" : "#f7fdf5";

  // Split by comma and trim each phrase
  const tryWords = item.try.split(",").map(w => w.trim());

  // Create clickable spans for each word/phrase
  const tryCell = document.createElement("td");
  tryCell.style.padding = "12px";
  tryCell.style.border = "1px solid #0A400C";
  tryWords.forEach(word => {
  const span = document.createElement("span");
  span.textContent = word;
  span.style.cursor = "pointer";
  span.style.marginRight = "8px";
  span.style.color = "#0A400C";
  span.addEventListener("click", (e) => {
    e.stopPropagation();
    const searchBar = document.getElementById('search-query');
    if (searchBar) {
      if (item.element === "Color Blocking" || item.element === "Prints & Lines") {
        searchBar.value = word; // Only the word/phrase
      } else {
        searchBar.value = `${word} ${item.element.toLowerCase()}`;
      }
      searchBar.focus();
    }
  });
  tryCell.appendChild(span);
});

  row.innerHTML = `
    <td style="padding: 12px; border: 1px solid #0A400C;"><strong>${item.element}</strong></td>
    <td></td>
    <td style="padding: 12px; border: 1px solid #0A400C;">${item.avoid}</td>
    <td style="padding: 12px; border: 1px solid #0A400C;">${item.why}</td>
  `;
  // Replace the empty "Try" cell with your clickable spans
  row.replaceChild(tryCell, row.children[1]);

  row.addEventListener("click", () => {
    // Optional: row click logic
  });

  tbody.appendChild(row);








  // ...existing code...

// Create clickable spans for each word/phrase in Avoid
const avoidWords = item.avoid.split(",").map(w => w.trim());
const avoidCell = document.createElement("td");
avoidCell.style.padding = "12px";
avoidCell.style.border = "1px solid #0A400C";
avoidWords.forEach(word => {
  const span = document.createElement("span");
  span.textContent = word;
  span.style.cursor = "pointer";
  span.style.marginRight = "8px";
  span.style.textDecoration = "none";
  span.addEventListener("click", (e) => {
    e.stopPropagation();
    const searchBar = document.getElementById('search-query');
    if (searchBar) {
      if (item.element === "Color Blocking" || item.element === "Prints & Lines") {
        searchBar.value = word;
      } else {
        searchBar.value = `${word} ${item.element.toLowerCase()}`;
      }
      searchBar.focus();
    }
  });
  avoidCell.appendChild(span);
});


// ...existing code...

row.innerHTML = `
  <td style="padding: 12px; border: 1px solid #0A400C;"><strong>${item.element}</strong></td>
  <td></td>
  <td></td>
  <td style="padding: 12px; border: 1px solid #0A400C;">${item.why}</td>
`;
// Replace the empty "Try" cell with your clickable spans
row.replaceChild(tryCell, row.children[1]);
// Replace the empty "Avoid" cell with your clickable spans
row.replaceChild(avoidCell, row.children[2]);

// ...existing code...
});


  table.appendChild(tbody);
  stylingSection.appendChild(table);

  document.body.appendChild(stylingSection);

  stylingSection.scrollIntoView({ behavior: "smooth" });


  
  document.body.appendChild(table);

  };
 










generateStylingSuggestions(data);

// Add hover preview for styling suggestions table cells



console.log("Result.js is loaded");