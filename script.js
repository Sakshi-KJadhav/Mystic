// SCROLL EFFECTS
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  const design = document.querySelector("slay-animate");
  if (design) {
    if (window.scrollY > 50) {
      design.classList.add("scrolled");
    } else {
      design.classList.remove("scrolled");
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("yourFormID");

  if (!form) {
    console.error("Form not found!");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
      bust: Number(document.getElementById("bust").value),
      waist: Number(document.getElementById("waist").value),
      hip: Number(document.getElementById("hip").value),
      shoulder: Number(document.getElementById("shoulder").value),
      torsoLength: Number(document.getElementById("torsoLength").value),
      legLength: Number(document.getElementById("legLength").value)
    };

    localStorage.setItem("formData", JSON.stringify(data));

    // Hide the form
    form.style.display = "none";

    // Show the result cards
    document.getElementById("resultOptions").style.display = "flex";
   document.getElementById("resultOptions").scrollIntoView({
  behavior: "smooth"
   });
  });
  
});
// Navigation handlers
function showStyling() {
  window.location.href = "styling.html";
}

function showOutfits() {
  window.location.href = "outfit.html";
}
