const dqs = (name) => document.querySelector(name);
dqs("#searchBtn").addEventListener("click", () => {
  const value = dqs("#searchInput").value;
  if (value) {
    if (value.length === 1) {
      try {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`)
          .then((r) => r.json())
          .then((d) => displayItem(d));
      } catch (e) {
        console.log(e, " => Line No: 11");
      }
    } else if (value.length >= 2) {
      try {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
          .then((r) => r.json())
          .then((d) => displayItem(d));
      } catch (e) {
        console.log(e, " => Line No: 20");
      }
    }
  }
});

const displayItem = (item) => {
  const cardWrapper = dqs("#cardWrapper");
  cardWrapper.innerHTML = "";
  const div = document.createElement("div");
  div.classList.add("d-flex");
  div.classList.add("items-center");
  div.classList.add("justify-center");
  div.classList.add("flex-wrap");
  item?.meals?.map((item) => {
    const div2 = document.createElement("div");
    const { idMeal, strMeal, strMealThumb, strInstructions, strYoutube } = item;
    const card = `
        <div id="${idMeal}" class="card m-2" style="width: 18rem;">
            <img src="${strMealThumb}" class="card-img-top" alt="${strMeal}">
            <div class="card-body">
                <h5 class="card-title">${strMeal}</h5>
                <p class="card-text">${strInstructions.slice(0, 80)}</p>
                <a target="_blank" href="${strYoutube}" class="btn btn-primary">YouTube</a>
              <button onclick="addToCart('${idMeal}')" id="${idMeal}" class="btn btn-primary" >Add</button>
            </div>
        </div>
        `;
    div2.innerHTML = card;
    div.appendChild(div2);
  });
  cardWrapper.appendChild(div);

  console.log(item.meals, " => Line No: 25");
};
const addToCart = (id) => {
  console.log(id, " => Line No: 55");
};
