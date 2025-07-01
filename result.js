const data = JSON.parse(localStorage.getItem("formData"));

async function getOutfits() {
  try {
    const res = await fetch("http://127.0.0.1:5050/api/recommendations", {
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
  card.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
  card.style.transition = "box-shadow 0.2s, background-color 0.2s";
  card.onmouseover = () => {
    card.style.transform = "scale(1.02)";
    card.style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)";
    card.style.backgroundColor = "rgb(255, 228, 249)";
  };
  card.onmouseout = () => {
    card.style.transform = "scale(1)";
    card.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
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