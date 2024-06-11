const fetchItemsByCategory = async (holder, category) => {
  const resp = await fetch("../data.json");
  const data = await resp.json();
  let idx = 0;
  const filteredProducts = data["products"].filter((product) => {
    product["index"] = idx++;
    return product["category"] == category;
  });

  filteredProducts.forEach((product) => {
    let div = document.createElement("div");
    div.innerHTML =
      `<div class="cards">
                      <div class="productImg">
                        <img
                          src="${product["src"]}"
                          alt=""
                        />
                      </div>
                      <div class="productDetail">
                        <div class="productDesc">
                          ${product["name"]}
                        </div>
                        <div class="productPrice">${product["price"]}</div>
                        <div class="cartBtn"><button onclick="addToLocalStorage(${product["index"]})">Add to cart</button></div>
                      </div>
  
                    </div>`;
    holder.appendChild(div);
  });
};

export default fetchItemsByCategory;
