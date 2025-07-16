const data = JSON.parse(localStorage.getItem("formData"));
if (data) {
  generateStylingSuggestions(data);
} else {
  console.error("Form data not found!");
}


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
    const tryList = tryThis.split(",").map(w => w.trim());
    const avoidList = avoid.split(",").map(w => w.trim());
    suggestions.push({ element, tryList, avoidList, why });
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
  stylingSection.style.backgroundColor = "#FEFAE0";
  stylingSection.style.color = "#0A400C";
  stylingSection.style.fontFamily = "'Michroma', sans-serif";

  const heading = document.createElement("h2");
  heading.textContent = "🧵 Styling Suggestions for You";
  heading.style.fontSize = "28px";
  heading.style.paddingTop = "150px";
  heading.style.textAlign = "center";
  stylingSection.appendChild(heading);

  suggestions.forEach((item) => {
    const block = document.createElement("div");
    block.style.border = "2px solid #0A400C";
    block.style.borderRadius = "12px";
    block.style.margin = "40px auto";
    block.style.maxWidth = "700px";
    block.style.padding = "20px";
    block.style.backgroundColor = "#fff";
    block.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.05)";

    const title = document.createElement("h3");
    title.textContent = item.element;
    title.style.fontSize = "24px";
    title.style.marginBottom = "20px";
    block.appendChild(title);

    // Try section
    const tryContainer = document.createElement("div");
    const tryTitle = document.createElement("h4");
    tryTitle.textContent = "✅ Try";
    tryContainer.appendChild(tryTitle);

    const tryImage = document.createElement("img");
    tryImage.style.width = "100%";
    tryImage.style.height = "auto";
    tryImage.style.borderRadius = "8px";
    tryImage.style.marginBottom = "5px";
    tryContainer.appendChild(tryImage);

    const tryCaption = document.createElement("p");
    tryCaption.style.textAlign = "center";
    tryCaption.style.marginBottom = "10px";
    tryContainer.appendChild(tryCaption);
const tryLabel = document.createElement("p");
    let tryIndex = 0;
    const updateTryImage = () => {
  tryImage.src = `/styling-images/${item.element.toLowerCase().replace(/\s+/g, "-")}/${item.tryList[tryIndex].toLowerCase().replace(/\s+/g, "-")}.jpg`;
  tryLabel.textContent = item.tryList[tryIndex];
  tryIndex = (tryIndex + 1) % item.tryList.length;
};

    updateTryImage();
    setInterval(updateTryImage, 5000);

    block.appendChild(tryContainer);

    // Avoid section
    const avoidContainer = document.createElement("div");
    const avoidTitle = document.createElement("h4");
    avoidTitle.textContent = "🚫 Avoid";
    avoidContainer.appendChild(avoidTitle);

    const avoidImage = document.createElement("img");
    avoidImage.style.width = "100%";
    avoidImage.style.height = "auto";
    avoidImage.style.borderRadius = "8px";
    avoidImage.style.marginBottom = "5px";
    avoidContainer.appendChild(avoidImage);

    const avoidCaption = document.createElement("p");
    avoidCaption.style.textAlign = "center";
    avoidCaption.style.marginBottom = "10px";
    avoidContainer.appendChild(avoidCaption);

    let avoidIndex = 0;
    const updateAvoidImage = () => {
      avoidImage.src = `/styling-images/${item.element.toLowerCase().replace(/\s+/g, "-")}/${item.avoidList[avoidIndex].toLowerCase().replace(/\s+/g, "-")}.jpg`;
      avoidCaption.textContent = item.avoidList[avoidIndex];
      avoidIndex = (avoidIndex + 1) % item.avoidList.length;
    };
   


    block.appendChild(avoidContainer);

    // Why section
    const whySection = document.createElement("div");
    const whyTitle = document.createElement("h4");
    whyTitle.textContent = "💡 Why It Works";
    whySection.appendChild(whyTitle);

    const whyText = document.createElement("p");
    whyText.textContent = item.why;
    whySection.appendChild(whyText);
    block.appendChild(whySection);

    stylingSection.appendChild(block);
  });

  document.body.appendChild(stylingSection);
  stylingSection.scrollIntoView({ behavior: "smooth" });
}

console.log("Result.js is loaded");
