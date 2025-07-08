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
    
  };
  card.onmouseout = () => {
    card.style.transform = "scale(1)";
    card.style.boxShadow = "0 2px 8px #ccc";
    
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

function generateStylingSuggestions(data) {
  const stylingSection = document.createElement("section");
  stylingSection.id = "styling-suggestions";
  stylingSection.style.padding = "100px 50px";
  stylingSection.style.backgroundColor = "#f4f9f8";

  const heading = document.createElement("h2");
  heading.textContent = "🧵 Styling Suggestions for You";
  heading.style.fontSize = "28px";
  heading.style.paddingTop = "50px";
  heading.style.textAlign = "center";
  stylingSection.appendChild(heading);

  const suggestions = getStylingSuggestions(data);

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

  // Table header
  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr style="background-color: #d9ead3; color: #333;">
      <th style="padding: 15px; border: 1px solid #ccc;">Element</th>
      <th style="padding: 15px; border: 1px solid #ccc;">Try</th>
      <th style="padding: 15px; border: 1px solid #ccc;">Avoid</th>
      <th style="padding: 15px; border: 1px solid #ccc;">Why It Works</th>
    </tr>
  `;
  table.appendChild(thead);

  // Table body
  const tbody = document.createElement("tbody");

  suggestions.forEach((item, index) => {
    const row = document.createElement("tr");
    row.style.backgroundColor = index % 2 === 0 ? "#ffffff" : "#f7fdf5";

    row.innerHTML = `
      <td style="padding: 12px; border: 1px solid #ddd;"><strong>${item.element}</strong></td>
      <td style="padding: 12px; border: 1px solid #ddd;">${item.try}</td>
      <td style="padding: 12px; border: 1px solid #ddd;">${item.avoid}</td>
      <td style="padding: 12px; border: 1px solid #ddd;">${item.why}</td>
    `;

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  stylingSection.appendChild(table);

  document.body.appendChild(stylingSection);

  stylingSection.scrollIntoView({ behavior: "smooth" });
}



function getStylingSuggestions(data) {
  const suggestions = [];

  const hipWaistRatio = data.hip / data.waist;
const bustHipsDiff = Math.abs(data.bust - data.hip);
const shoulderHipsDiff = Math.abs(data.shoulder - data.hip);
const bustShoulderDiff = Math.abs(data.bust - data.shoulder);

const hasShortTorso = data.torsoLength - data.legLength >= 3;
const hasLongLegs = data.legLength - data.torsoLength >= 3;
const hasBalancedProportion = Math.abs(data.torsoLength - data.legLength) <= 2;

const pearShaped = hipWaistRatio > 1.25 && data.hip > data.bust && data.hip > data.shoulder;
const rectangleShaped =
  Math.abs(data.shoulder - data.hip) < 4 &&
  Math.abs(data.waist - data.hip) < 6;
const hourglass =
  bustHipsDiff < 5 && shoulderHipsDiff < 5 && hipWaistRatio < 1.25;
const invertedTriangle = data.shoulder - data.hip > 5;

  // 1. Neckline
  if (invertedTriangle || bustShoulderDiff > 5) {
    suggestions.push({
      element: "Neckline",
      try: "V-neck, deep scoop, narrow plunges",
      avoid: "Boat neck, wide crewneck",
      why: "Creates vertical lines, reducing upper body width"
    });
  }
 

  
  else if (pearShaped || rectangleShaped) {
    suggestions.push({
      element: "Neckline",
      try: "Boat neck, square neck, off-shoulder",
      avoid: "Deep plunges, tight crews",
      why: "Adds width to the top and balances hip-heavy shapes"
    });
  } else {
    suggestions.push({
      element: "Neckline",
      try: "Scoop, jewel, sweetheart",
      avoid: "Super high necks",
      why: "Flatters balanced frames and opens up neckline"
    });
  }

  // 2. Sleeves
  if (pearShaped) {
    suggestions.push({
      element: "Sleeves",
      try: "Cap sleeves, flutter sleeves",
      avoid: "Sleeveless or tight sleeves",
      why: "Adds volume to shoulders and balances hips"
    });
  } else if (invertedTriangle) {
    suggestions.push({
      element: "Sleeves",
      try: "Slim sleeves, raglan, dolman",
      avoid: "Structured or puffed sleeves",
      why: "Minimizes upper body width"
    });
  } else {
    suggestions.push({
      element: "Sleeves",
      try: "3/4 sleeves, rolled cuffs",
      avoid: "Overly long or bulky",
      why: "Enhances arm shape without overpowering the frame"
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
} else if (hasLongLegs) {
  suggestions.push({
    element: "Top Length",
    try: "Hip-length or tunic-style",
    avoid: "Overly short tops",
    why: "Balances vertical proportions"
  });
} else {
  suggestions.push({
    element: "Top Length",
    try: "Waist to hip-length tops",
    avoid: "Very long or very short tops",
    why: "Keeps balanced look for equal leg-torso proportions"
  });
}


  // 4. Tuck/Untuck
  if (hasShortTorso) {
  suggestions.push({
    element: "Tuck/Untuck",
    try: "Half-tuck or untucked",
    avoid: "Full tuck into high-rise bottoms",
    why: "Avoids visually shortening torso"
  });
} else if (hasLongLegs) {
  suggestions.push({
    element: "Tuck/Untuck",
    try: "Full tuck or long top with mid-rise",
    avoid: "Short untucked tops",
    why: "Adds visual balance to a short torso"
  });
} else {
  suggestions.push({
    element: "Tuck/Untuck",
    try: "Neat full tuck or front-tuck",
    avoid: "Bulky untucked tops",
    why: "Defines waist while keeping balanced proportions"
  });
}


  // 5. Jeans Style
  if (pearShaped) {
    suggestions.push({
      element: "Jeans Style",
      try: "Wide-leg, bootcut, relaxed straight",
      avoid: "Tight skinny jeans with tight tops",
      why: "Balances hips and flatters legs"
    });
  } else if (invertedTriangle) {
    suggestions.push({
      element: "Jeans Style",
      try: "Flared, boyfriend, palazzo",
      avoid: "Slim or cigarette cuts",
      why: "Creates volume on the lower half"
    });
  } else {
    suggestions.push({
      element: "Jeans Style",
      try: "Straight or tapered",
      avoid: "Overly loose or overly skinny",
      why: "Keeps proportions sleek and flattering"
    });
  }

  // 6. Jeans Rise
  if (hasShortTorso) {
  suggestions.push({
    element: "Jeans Rise",
    try: "Mid-rise",
    avoid: "Ultra high-rise",
    why: "Avoids crowding the torso"
  });
} else if (hasLongLegs) {
  suggestions.push({
    element: "Jeans Rise",
    try: "High-rise",
    avoid: "Low-rise",
    why: "Defines waist and elongates torso"
  });
} else {
  suggestions.push({
    element: "Jeans Rise",
    try: "Mid to high-rise",
    avoid: "Super low-rise",
    why: "Maintains balanced silhouette"
  });
}


  // 7. Dress Type
  if (hourglass) {
    suggestions.push({
      element: "Dress Type",
      try: "Wrap, belted, fit & flare",
      avoid: "Boxy or shapeless",
      why: "Defines waist and curves"
    });
  } else if (pearShaped) {
    suggestions.push({
      element: "Dress Type",
      try: "Empire waist, A-line, off-shoulder",
      avoid: "Straight sheath",
      why: "Draws attention to upper body"
    });
  } else {
    suggestions.push({
      element: "Dress Type",
      try: "Shift, straight cut, slight flare",
      avoid: "Overly tight or belted",
      why: "Soft structure without forcing curves"
    });
  }

  // 8. Skirt Shape
  if (pearShaped || hourglass) {
    suggestions.push({
      element: "Skirt Shape",
      try: "A-line, bias cut, tulip",
      avoid: "Tight pencil unless balanced with bold top",
      why: "Glides over hips and adds movement"
    });
  } else {
    suggestions.push({
      element: "Skirt Shape",
      try: "Pencil, pleated, slight flare",
      avoid: "Heavy gathers",
      why: "Adds gentle curve and form"
    });
  }

  // 9. Skirt Length
  if (hasLongLegs) {
  suggestions.push({
    element: "Skirt Length",
    try: "Above-the-knee, midi",
    avoid: "Floor-length that hides legs",
    why: "Shows off long legs"
  });
} else if (hasShortTorso) {
  suggestions.push({
    element: "Skirt Length",
    try: "Just above the knee",
    avoid: "Very long skirts",
    why: "Adds visual length to lower body"
  });
} else {
  suggestions.push({
    element: "Skirt Length",
    try: "Knee to midi length",
    avoid: "Too short or floor-length",
    why: "Maintains visual proportion"
  });
}


  // 10. Jackets
  if (hasShortTorso) {
    suggestions.push({
      element: "Jackets",
      try: "Hip-length or slightly below",
      avoid: "Cropped or oversized long coats",
      why: "Lengthens upper body visually"
    });
  } else if (hasLongLegs) {
    suggestions.push({
      element: "Jackets",
      try: "Tunic-length, longline",
      avoid: "Boxy cropped jackets",
      why: "Balances lower-body length"
    });
  } else {
    suggestions.push({
      element: "Jackets",
      try: "Cropped or hip-length",
      avoid: "Extreme lengths",
      why: "Keeps proportions clean and balanced"
    });
  }

  // 11. Footwear
  if (hasLongLegs) {
  suggestions.push({
    element: "Footwear",
    try: "Ankle strap heels, pointed flats",
    avoid: "Heavy boots that cut the ankle",
    why: "Flatters long legs and adds structure"
  });
} else if (hasShortTorso) {
  suggestions.push({
    element: "Footwear",
    try: "Low vamp shoes, nude heels",
    avoid: "Chunky ankle boots",
    why: "Elongates leg line and balances proportions"
  });
} else {
  suggestions.push({
    element: "Footwear",
    try: "Classic loafers, clean sandals, neutral heels",
    avoid: "Overly bulky shoes",
    why: "Keeps the line smooth and proportional"
  });
}


  // 12. Accessories
  if (hasShortTorso) {
    suggestions.push({
      element: "Accessories",
      try: "Long necklaces, earrings",
      avoid: "Thick belts at waist",
      why: "Draws eye vertically and opens space"
    });
  } else {
    suggestions.push({
      element: "Accessories",
      try: "Waist belts, chokers, bold earrings",
      avoid: "Long layers that crowd lower body",
      why: "Defines natural waist and draws eye upward"
    });
  }

  // 13. Color Blocking
  if (pearShaped || rectangleShaped) {
  suggestions.push({
    element: "Color Blocking",
    try: "Light or bright tops with dark bottoms",
    avoid: "Loud bottoms with plain tops",
    why: "Pulls attention upward and balances lower body"
  });
} else if (invertedTriangle) {
  suggestions.push({
    element: "Color Blocking",
    try: "Dark or solid tops with lighter bottoms",
    avoid: "Light tops with dark bottoms",
    why: "Balances broader shoulders"
  });
} else {
  suggestions.push({
    element: "Color Blocking",
    try: "Monochrome or balanced color contrast",
    avoid: "Harsh color cuts at waist",
    why: "Keeps clean and proportional visual flow"
  });
}


  // 14. Prints & Lines
  if (pearShaped) {
    suggestions.push({
      element: "Prints & Lines",
      try: "Stripes, prints or ruffles on top",
      avoid: "Loud prints on bottom",
      why: "Adds width to upper body"
    });
  } else if (invertedTriangle) {
    suggestions.push({
      element: "Prints & Lines",
      try: "Patterns on pants, skirts",
      avoid: "Bold shoulder detailing",
      why: "Draws eye downward"
    });
  }

  return suggestions;
}




generateStylingSuggestions(data);




console.log("Result.js is loaded");
