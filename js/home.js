window.addEventListener("load", start);
let url =
  "https://kea0209-5a57.restdb.io/rest/ullo-products?fetchchildren=true";
const options = {
  headers: {
    "x-apikey": "6082d28c28bf9b609975a5db",
  },
};

function start() {
  fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => data.forEach(showBulb))
    .catch((e) => {
      console.error("An error occured:", e.message);
    });
}

const productTemplate = document.querySelector(".product_template").content;
const productParent = document.querySelector(".products_list");

function showBulb(bulb) {
  //console.log(bulb);
  const productClone = productTemplate.cloneNode(true);
  productClone.querySelector(".product_title").textContent = bulb.title;
  if (bulb.price_current == bulb.price_regular) {
    //console.log("not sale");
    productClone.querySelector(".sale").classList.add("hidden");
    productClone.querySelector(".price_number").textContent =
      bulb.price_current;
  } else {
    //console.log("sale");
    productClone.querySelector(".sale_price").textContent = bulb.price_regular;
    productClone.querySelector(".price_number").textContent =
      bulb.price_current;
  }
  productClone.querySelector("img").src = bulb.images[0].link;
  productClone.querySelector("img").alt = bulb.title;
  productClone.querySelector(
    ".product_link"
  ).href = `individual_product.html?id=${bulb._id}`;
  productClone.querySelector(
    ".title_product_link"
  ).href = `individual_product.html?id=${bulb._id}`;
  productParent.appendChild(productClone);
}