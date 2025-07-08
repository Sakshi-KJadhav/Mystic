console.log("✅ JS is working!");
document.body.insertAdjacentHTML("beforeend", "<p style='color:red;'>JS loaded</p>");
const data = JSON.parse(localStorage.getItem("formData"));

async function getOutfits() {
  try {
    const res = await fetch("https://mystic-z9ep.onrender.com/api/recommendations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();


  

    const container = document.createElement("section");
    container.id = "outfit-results";
    container.style.padding = "150px";
    container.style.backgroundColor = "#fff";

    result.recommendations.forEach((cat) => {
      const sectionWrapper = document.createElement("div");
      sectionWrapper.style.marginTop = "60px";

      const heading = document.createElement("h3");
      heading.textContent = cat.category.toUpperCase();
      heading.classList.add("category-heading");

      const categoryBlock = document.createElement("div");
      categoryBlock.classList.add("outfit-grid");

      sectionWrapper.appendChild(heading);
      sectionWrapper.appendChild(categoryBlock);
      container.appendChild(sectionWrapper);

      cat.outfits.forEach((outfit) => {
  const card = document.createElement("div");
  card.style.border = "1px solid #ccc";
  card.style.borderRadius = "8px";
  card.style.overflow = "hidden";
  card.style.boxShadow = "0 2px 8px #819067";
  card.style.transition = "box-shadow 0.2s, background-color 0.2s";
  card.onmouseover = () => {
    card.style.transform = "scale(1.02)";
    card.style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)";
    card.style.backgroundColor =rgb(183, 200, 154);
  };
  card.onmouseout = () => {
    card.style.transform = "scale(1)";
    card.style.boxShadow = "0 2px 8px #ccc";
    card.style.backgroundColor = "#fff";
  };
  // Add click event to fill the search bar
  card.onclick = () => {
    const searchBar = document.getElementById('search-query');
    if (searchBar) {
      searchBar.value = typeof outfit === "string" ? outfit : outfit.title;
      searchBar.focus();
    }
  };
  card.innerHTML = `
    <div style="padding:10px;">
      <p style="font-size:14px;">${typeof outfit === "string" ? outfit : outfit.title}</p>
    </div>
  `;
  categoryBlock.appendChild(card);
});
      container.appendChild(categoryBlock);
    });

    document.body.appendChild(container);
    window.scrollTo({ top: container.offsetTop, behavior: "smooth" });

  } catch (err) {
    alert("Something went wrong! Please check the backend.");
    console.error(err);
  }
}

getOutfits();

document.getElementById('google-search-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const query = document.getElementById('search-query').value.trim();
  if (query) {
    // Open Google Images search in a new tab
    window.open('https://www.google.com/search?tbm=isch&q=' + encodeURIComponent(query), '_blank');
  }
});



function getStylingSuggestions(data) {
  const suggestions = [];

  const torsoLegRatio = data.torsoLength / data.legLength;
  const waistHipRatio = data.waist / data.hip;
  const shoulderHipDiff = data.shoulder - data.hip;
  const bustShoulderDiff = data.shoulder - data.bust;
  const upperWidth = (data.shoulder + data.bust) / 2;
  const lowerWidth = (data.waist + data.hip) / 2;

  const hasShortTorso = torsoLegRatio < 0.75;
  const hasLongLegs = data.legLength > data.torsoLength;
  const pearShaped = data.hip > data.shoulder + 5;
  const rectangleShaped = Math.abs(data.shoulder - data.hip) < 4 && Math.abs(data.waist - data.hip) < 6;
  const hourglass = Math.abs(data.shoulder - data.hip) < 4 && waistHipRatio < 0.75;
  const invertedTriangle = data.shoulder - data.hip > 5;

  // 1. Neckline
  if (invertedTriangle || bustShoulderDiff > 5) {
    suggestions.push({
      element: "Neckline",
      try: "V-neck, deep scoop, narrow plunge",
      avoid: "Boat neck, high crewneck",
      why: "Minimizes broad shoulders and balances upper body"
    });
  } else if (pearShaped || rectangleShaped) {
    suggestions.push({
      element: "Neckline",
      try: "Square, boat, wide scoop",
      avoid: "Tight crewnecks, deep plunges",
      why: "Adds width to upper body and balances hips"
    });
  }

  // 2. Sleeves
  if (pearShaped) {
    suggestions.push({
      element: "Sleeves",
      try: "Puff, flutter, cap sleeves",
      avoid: "Sleeveless, tight short sleeves",
      why: "Enhances shoulder width to balance hips"
    });
  } else if (invertedTriangle) {
    suggestions.push({
      element: "Sleeves",
      try: "Slim, raglan, dolman",
      avoid: "Puffed or structured shoulders",
      why: "Softens the shoulder line"
    });
  }

  // 3. Top Length
  if (hasShortTorso) {
    suggestions.push({
      element: "Top Length",
      try: "Waist-length or just below",
      avoid: "High cropped tops or long tunics",
      why: "Keeps torso balanced and avoids shortening"
    });
  } else {
    suggestions.push({
      element: "Top Length",
      try: "Hip-length or tunic-style",
      avoid: "Overly short tops",
      why: "Enhances torso length proportionally"
    });
  }

  // 4. Tuck/Untuck
  suggestions.push({
    element: "Tuck/Untuck",
    try: hasShortTorso ? "Half-tuck at mid-rise" : "Tuck into high-waist",
    avoid: hasShortTorso ? "Full tuck into high-rise" : "Untucked long tops",
    why: hasShortTorso ? "Avoids shortening torso" : "Accentuates waistline"
  });

  // 5. Jeans Style
  if (pearShaped) {
    suggestions.push({
      element: "Jeans Style",
      try: "Straight, wide-leg, bootcut",
      avoid: "Tight skinny jeans with tight tops",
      why: "Balances wider hips and flatters legs"
    });
  } else if (invertedTriangle) {
    suggestions.push({
      element: "Jeans Style",
      try: "Flared or wide-leg to add lower width",
      avoid: "Skinny with shoulder pads",
      why: "Adds volume to lower half"
    });
  } else {
    suggestions.push({
      element: "Jeans Style",
      try: "Slim-straight or tapered",
      avoid: "Baggy cuts",
      why: "Keeps lines neat and flattering"
    });
  }

  // 6. Jeans Rise
  suggestions.push({
    element: "Jeans Rise",
    try: hasShortTorso ? "Mid-rise" : "High-rise",
    avoid: hasShortTorso ? "Ultra high-rise" : "Low-rise",
    why: hasShortTorso
      ? "Mid-rise supports waist without crowding torso"
      : "High-rise elongates legs and defines waist"
  });

  // 7. Dress Type
  if (hourglass) {
    suggestions.push({
      element: "Dress Type",
      try: "Wrap, fit & flare, belted styles",
      avoid: "Boxy shapes",
      why: "Emphasizes natural curves"
    });
  } else if (pearShaped) {
    suggestions.push({
      element: "Dress Type",
      try: "A-line, empire waist, off-shoulder",
      avoid: "Straight or shapeless cuts",
      why: "Skims hips and highlights waist/shoulders"
    });
  }

  // 8. Skirt Shape
  if (pearShaped || hourglass) {
    suggestions.push({
      element: "Skirt Shape",
      try: "A-line, tulip, bias cut",
      avoid: "Tight pencil (unless with bold top)",
      why: "Glides over hips and flatters curves"
    });
  } else {
    suggestions.push({
      element: "Skirt Shape",
      try: "Pencil, box pleat",
      avoid: "Heavy gathers",
      why: "Adds shape where needed"
    });
  }

  // 9. Skirt Length
  suggestions.push({
    element: "Skirt Length",
    try: hasLongLegs ? "Above-the-knee, midi" : "Just above the knee",
    avoid: hasLongLegs ? "Floor-length that hides legs" : "Micro mini",
    why: hasLongLegs
      ? "Shows off leg length"
      : "Keeps vertical proportion moderate"
  });

  // 10. Jackets
  suggestions.push({
    element: "Jackets",
    try: hasShortTorso ? "Cropped or waist-fitted" : "Mid-thigh open jackets",
    avoid: hasShortTorso ? "Long oversized coats" : "Very cropped boleros",
    why: hasShortTorso
      ? "Keeps torso from looking shorter"
      : "Adds vertical lines and elongates"
  });

  // 11. Footwear
  suggestions.push({
    element: "Footwear",
    try: hasLongLegs ? "Ankle strap heels, pointed flats" : "Low-vamp shoes",
    avoid: "Chunky ankle boots",
    why: "Enhances leg line"
  });

  // 12. Accessories
  suggestions.push({
    element: "Accessories",
    try: hasShortTorso ? "Long pendants, layered necklaces" : "Waist belts",
    avoid: hasShortTorso ? "Wide waist belts" : "Heavy neck chokers",
    why: hasShortTorso
      ? "Draws attention upward and adds length"
      : "Emphasizes waistline"
  });

  // 13. Color Blocking
  if (pearShaped || rectangleShaped) {
    suggestions.push({
      element: "Color Blocking",
      try: "Bright/light tops, dark bottoms",
      avoid: "Bright bottoms with plain tops",
      why: "Pulls focus upward and balances lower width"
    });
  }

  // 14. Prints & Lines
  if (pearShaped) {
    suggestions.push({
      element: "Prints & Lines",
      try: "Horizontal stripes or prints on top",
      avoid: "Loud prints on bottoms",
      why: "Adds visual weight to upper body"
    });
  }

  return suggestions;
}


generateStylingSuggestions(data);




console.log("Result.js is loaded");
