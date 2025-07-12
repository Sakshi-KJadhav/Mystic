console.log("✅ JS is working!");
document.body.insertAdjacentHTML("beforeend", "<p style='color:red;'>JS loaded</p>");
const data = JSON.parse(localStorage.getItem("formData"));


document.addEventListener("DOMContentLoaded", () => {
  const preview = document.createElement("img");
  preview.className = "preview-image";
  document.body.appendChild(preview);

  document.querySelectorAll("td").forEach(cell => {
    const keyword = cell.textContent.trim().split(",")[0] + " outfit";
    const imageURL = `https://in.pinterest.com/320/240/${encodeURIComponent(keyword)}`;

    cell.addEventListener("mouseenter", (e) => {
      preview.src = imageURL;
      preview.style.top = (e.pageY + 10) + "px";
      preview.style.left = (e.pageX + 10) + "px";
      preview.style.display = "block";
    });

    cell.addEventListener("mousemove", (e) => {
      preview.style.top = (e.pageY + 10) + "px";
      preview.style.left = (e.pageX + 10) + "px";
    });

    cell.addEventListener("mouseleave", () => {
      preview.style.display = "none";
    });
  });
});

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


    const heading = document.createElement("h2");
    heading.textContent = `👗Outfit Suggestions`;
    heading.style.textAlign = "center";
    document.body.appendChild(heading);

    const container = document.createElement("section");
    container.id = "outfit-results";
   
    container.style.backgroundColor = "#fff";

    result.recommendations.forEach((cat) => {
      const sectionWrapper = document.createElement("div");
      sectionWrapper.style.marginTop = "20px";

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
    card.style.boxShadow = "0 2px 8px   #819067" ;
    
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



// Function to generate styling suggestions based on body data
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
  // const keyword = item.imageQuery.split(",")[0].split(" ")[0]; // e.g. "Wrap"
  // const imgSrc = `https://source.unsplash.com/160x160/?${encodeURIComponent(keyword + " outfit")}`;

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

//   function renderStylingTable(suggestions) {
//   const table = document.createElement("table");
//   table.style.borderCollapse = "collapse";
//   table.style.width = "100%";
//   table.style.marginTop = "80px";
//   table.style.fontFamily = "Arial, sans-serif";
//   table.style.boxShadow = "0 0 12px rgba(0,0,0,0.1)";
//   table.style.borderRadius = "10px";
//   table.style.overflow = "hidden";

//   // Table header
//   table.innerHTML = `
//     <thead style="background:#f2f2f2; font-weight:bold;">
//       <tr>
//         <th style="padding:12px; border:1px solid #ccc;">Element</th>
//         <th style="padding:12px; border:1px solid #ccc;">Try</th>
//         <th style="padding:12px; border:1px solid #ccc;">Avoid</th>
//         <th style="padding:12px; border:1px solid #ccc;">Why</th>
//         <th style="padding:12px; border:1px solid #ccc;">Image</th>
//       </tr>
//     </thead>
//     <tbody>
//       ${suggestions
//         .map(
//           (item) => `
//         <tr>
//           <td style="padding:10px; border:1px solid #eee;">${item.element}</td>
//           <td style="padding:10px; border:1px solid #eee;">${item.try}</td>
//           <td style="padding:10px; border:1px solid #eee;">${item.avoid}</td>
//           <td style="padding:10px; border:1px solid #eee;">${item.why}</td>
//           <td style="padding:10px; border:1px solid #eee;">
//             <img src="https://source.unsplash.com/160x160/?${encodeURIComponent(
//               item.imageQuery
//             )}" alt="${item.imageQuery}" style="max-height:100px; border-radius:6px;" />
//           </td>
//           <td><img src="${imgSrc}" style="max-height:100px; border-radius:6px;" /></td>

//         </tr>
      // Create table
// const table = document.createElement("table");
// table.style.width = "100%";
// table.style.borderCollapse = "collapse";
// table.style.backgroundColor = "#fff";
// table.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.05)";
// table.style.borderRadius = "12px";
// table.style.overflow = "hidden";
// table.style.fontSize = "16px";

// // Table header
// table.innerHTML = `
//   <thead style="background:#f2f2f2; font-weight:bold;">
//     <tr>
//       <th style="padding:12px; border:1px solid #ccc;">Element</th>
//       <th style="padding:12px; border:1px solid #ccc;">Try</th>
//       <th style="padding:12px; border:1px solid #ccc;">Avoid</th>
//       <th style="padding:12px; border:1px solid #ccc;">Why</th>
//       <th style="padding:12px; border:1px solid #ccc;">Image</th>
//     </tr>
//   </thead>
//   <tbody>
//     ${suggestions
//       .map((item, index) => {
//         const keyword = item.imageQuery.split(",")[0].split(" ")[0];
//         const imgSrc = `https://source.unsplash.com/160x160/?${encodeURIComponent(keyword + " outfit")}`;
//         return `
//         <tr style="background-color: ${index % 2 === 0 ? "#ffffff" : "#f7fdf5"}">
//           <td style="padding:10px; border:1px solid #eee;"><strong>${item.element}</strong></td>
//           <td style="padding:10px; border:1px solid #eee;">${item.try}</td>
//           <td style="padding:10px; border:1px solid #eee;">${item.avoid}</td>
//           <td style="padding:10px; border:1px solid #eee;">${item.why}</td>
//           <td style="padding:10px; border:1px solid #eee;"><img src="${imgSrc}" style="max-height:100px; border-radius:6px;" /></td>
//         </tr>`;
//       })
//       .join("")}
//   </tbody>
// `;

stylingSection.appendChild(table);
document.body.appendChild(stylingSection);
stylingSection.scrollIntoView({ behavior: "smooth" });

       

  // Add table to page
  document.body.appendChild(table);
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
  const rectangleShaped = Math.abs(data.shoulder - data.hip) < 4 && Math.abs(data.waist - data.hip) < 6;
  const hourglass = bustHipsDiff < 5 && shoulderHipsDiff < 5 && hipWaistRatio < 1.25;
  const invertedTriangle = data.shoulder - data.hip > 5;
  const appleShaped = data.bust > data.hip && hipWaistRatio < 1.1 && data.waist > data.hip * 0.85;

  const add = (element, tryThis, avoid, why) => {
  const imageQuery = tryThis.split(",")[0] + " outfit"; // V-neck -> V-neck outfit
  suggestions.push({ element, try: tryThis, avoid, why, imageQuery });
};


  // --- NECKLINE ---
  if (invertedTriangle || bustShoulderDiff > 5) {
    add("Neckline", "V-neck, deep scoop, narrow plunge", "Boat neck, high crewneck", "Minimizes broad shoulders and balances upper body");
  } else if (pearShaped || rectangleShaped) {
    add("Neckline", "Square, boat, wide scoop", "Tight crewnecks, deep plunges", "Adds width to upper body and balances hips");
  } else {
    add("Neckline", "Scoop neck, open necklines", "Overly high necks", "Keeps proportions balanced");
  }

  // --- SLEEVES ---
  if (pearShaped) {
    add("Sleeves", "Puff, flutter, cap sleeves", "Sleeveless, tight short sleeves", "Enhances shoulder width to balance hips");
  } else if (invertedTriangle) {
    add("Sleeves", "Slim, raglan, dolman", "Puffed or structured shoulders", "Softens the shoulder line");
  } else {
    add("Sleeves", "Fitted sleeves", "Oversized sleeves", "Maintains natural silhouette");
  }

  // --- TOP LENGTH ---
  if (hasShortTorso) {
    add("Top Length", "Waist-length or just below", "High cropped tops or long tunics", "Keeps torso balanced and avoids shortening");
  } else if (hasLongLegs) {
    add("Top Length", "Hip-length or tunic-style", "Overly short tops", "Balances vertical proportion");
  } else {
    add("Top Length", "Mid-length tops", "Extra long tunics", "Keeps proportion harmonious");
  }

  // --- TUCK/UNTUCK ---
  if (hasShortTorso) {
    add("Tuck/Untuck", "Half-tuck at mid-rise", "Full tuck into high-rise", "Avoids shortening torso");
  } else {
    add("Tuck/Untuck", "Tuck into high-waist", "Untucked long tops", "Accentuates waistline and adds shape");
  }

  // --- JEANS STYLE ---
  if (pearShaped) {
    add("Jeans Style", "Straight, wide-leg, bootcut", "Tight skinny jeans with tight tops", "Balances wider hips and flatters legs");
  } else if (invertedTriangle) {
    add("Jeans Style", "Flared or wide-leg", "Skinny jeans with shoulder pads", "Adds volume to lower half");
  } else {
    add("Jeans Style", "Slim-straight or tapered", "Baggy jeans", "Keeps silhouette neat");
  }

  // --- JEANS RISE ---
  if (hasShortTorso) {
    add("Jeans Rise", "Mid-rise", "Ultra high-rise", "Supports waist without crowding torso");
  } else if (hasLongLegs) {
    add("Jeans Rise", "High-rise", "Low-rise", "Elongates torso and defines waist");
  } else if (hasBalancedProportion) {
    add("Jeans Rise", "Mid to high rise", "Ultra low rise", "Keeps proportions balanced");
  }

  // --- SKIRT SHAPE ---
  if (pearShaped || hourglass) {
    add("Skirt Shape", "A-line, tulip, bias cut", "Tight pencil skirts", "Glides over hips and flatters curves");
  } else {
    add("Skirt Shape", "Pencil, box pleat", "Heavy gathers", "Adds shape where needed");
  }

  // --- SKIRT LENGTH ---
  if (hasLongLegs) {
    add("Skirt Length", "Above-the-knee, midi", "Floor-length", "Shows off leg length");
  } else {
    add("Skirt Length", "Just above the knee", "Micro mini", "Keeps vertical proportion moderate");
  }

  // --- DRESS TYPE ---
  if (hourglass) {
    add("Dress Type", "Wrap, fit & flare, belted styles", "Boxy shapes", "Emphasizes natural curves");
  } else if (pearShaped) {
    add("Dress Type", "A-line, empire waist, off-shoulder", "Straight or shapeless cuts", "Skims hips and highlights waist/shoulders");
  } else if (appleShaped) {
    add("Dress Type", "Empire waist, flowy or trapeze", "Tight bodycon", "Skims tummy and adds vertical flow");
  } else {
    add("Dress Type", "Belted, shift or straight cuts", "Overly oversized styles", "Adds structure to the frame");
  }

  // --- JACKETS ---
  if (hasShortTorso) {
    add("Jackets", "Cropped or waist-fitted", "Long oversized coats", "Keeps torso from looking shorter");
  } else {
    add("Jackets", "Mid-thigh open jackets", "Very cropped boleros", "Adds vertical lines and elongates");
  }

  // --- FOOTWEAR ---
  if (hasLongLegs) {
    add("Footwear", "Ankle strap heels, pointed flats", "Chunky ankle boots", "Enhances leg line");
  } else {
    add("Footwear", "Low-vamp shoes, pointed toes", "High-top sneakers", "Elongates the legs");
  }

  // --- ACCESSORIES ---
  if (hasShortTorso) {
    add("Accessories", "Long pendants, layered necklaces", "Wide waist belts", "Draws attention upward and adds length");
  } else {
    add("Accessories", "Waist belts, short chains", "Heavy neck chokers", "Emphasizes waistline");
  }

  // --- COLOR BLOCKING ---
  if (pearShaped || rectangleShaped) {
    add("Color Blocking", "Bright/light tops, dark bottoms", "Bright bottoms with plain tops", "Pulls focus upward and balances shape");
  } else {
    add("Color Blocking", "Single-tone or balanced contrast", "Half-split top/bottom contrast", "Maintains flow and balance");
  }

  // --- PRINTS & LINES ---
  if (pearShaped) {
    add("Prints & Lines", "Horizontal stripes or prints on top", "Loud prints on bottoms", "Adds visual weight to upper body");
  } else if (invertedTriangle) {
    add("Prints & Lines", "Subtle prints on top, bold bottom", "Bold shoulders + prints", "Reduces attention on broad shoulders");
  } else {
    add("Prints & Lines", "Balanced prints, vertical lines", "Wide horizontal on midsection", "Keeps body aligned and proportioned");
  }

  return suggestions;
}






generateStylingSuggestions(data);





console.log("Result.js is loaded");
