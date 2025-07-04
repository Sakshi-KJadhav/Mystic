   window.addEventListener("scroll", () => {
 const navbar = document.getElementById("navbar");
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
window.addEventListener("scroll", () => {
  const design = document.querySelector("slay-animate");
  if (window.scrollY > 50) {
    design.classList.add("scrolled");
  } else {
    design.classList.remove("scrolled");
  }
});
    // script.js

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const inputs = document.querySelectorAll("input, select");
  const data = {};
  inputs.forEach((input) => {
    if (input.type === "number") {
      data[input.placeholder.split(" ")[0].toLowerCase()] = parseFloat(input.value);
    } else if (input.tagName === "SELECT") {
      data.colorTone = input.value;
    }
  });

  localStorage.setItem("formData", JSON.stringify(data));
  window.location.href = "result.html";
});
 document.getElementById('photo-upload-form').addEventListener('submit', function(e) {
      e.preventDefault();
      const input = document.getElementById('photo-upload');
      const preview = document.getElementById('photo-preview');
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
          preview.innerHTML = '<img src="' + e.target.result + '" style="max-width:200px; border-radius:12px;"/>';
        }
        reader.readAsDataURL(input.files[0]);
      }
    });