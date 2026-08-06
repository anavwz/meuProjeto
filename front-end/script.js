const searchToggle = document.querySelector(".searchToggle"),
      searchBox = document.querySelector(".searchBox");

        searchToggle.addEventListener("click", () => {
        searchBox.classList.toggle("active");
});

document.addEventListener('DOMContentLoaded', () => {
    carregarItens();
});

async function carregarItens() {
    try {
        const response = await fetch('http://localhost:3000/itens');
        const itens = await response.json();

        console.log('Itens cadastrados no banco:', itens);
        
        // Se houver um container na intro.html com id "container-itens", você pode renderizá-los aqui
    } catch (error) {
        console.error('Erro ao buscar itens:', error);
    }
}