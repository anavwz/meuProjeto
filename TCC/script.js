const searchToggle = document.querySelector(".searchToggle"),
      searchBox = document.querySelector(".searchBox");

        searchToggle.addEventListener("click", () => {
        searchBox.classList.toggle("active");
});