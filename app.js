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

            <!-- Modal Button -->
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#id_${idMeal}">
                Details
                </button>

                <!-- Modal -->
                <div class="modal fade" id="id_${idMeal}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="id_${idMeal}Label" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="id_${idMeal}Label">${strMeal}</h5>

                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img src="${strMealThumb}" class="card-img-top" alt="${strMeal}">
                                <p class="card-text">${strInstructions}</p>
                                <a target="_blank" href="${strYoutube}" class="btn btn-primary">YouTube</a>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onclick="addToCart('${idMeal}')" id="${idMeal}" class="btn btn-primary" >Add</button>
                    </div>
                    </div>
                </div>
                </div>
                <!-- -->

                
              <button onclick="addToCart('${idMeal}')" id="${idMeal}" class="btn btn-primary" >Add</button>
            </div>
        </div>
        `;
    div2.innerHTML = card;
    div.appendChild(div2);
  });
  cardWrapper.appendChild(div);
};

const addToCart = (mealId) => {
  //   console.log(mealId, " => Line No: 55");
  let cart = localStorage.getItem("cart");
  if (cart) {
    cart = JSON.parse(cart);
    const newCart = cart?.totalCart?.find((item) => {
      return item.mealId == mealId;
    });
    if (newCart) {
      newCart.quantity += 1;
    } else {
      cart?.totalCart?.push({ mealId, quantity: 1 });
    }
    console.log(newCart, " => Line No: 96");
    console.log(cart.totalCart, " => Line No: 89");
  } else {
    cart = { totalCart: [{ mealId, quantity: 1 }] };
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log(cart, " => Last Line");
};
