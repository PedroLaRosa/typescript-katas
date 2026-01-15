console.log(1);

async function donwloadData() {
  const productList = [];
  let page = 1;

  console.log("Set function");
  while (true) {
    const productData = await fetchProducts(page);
    if (productData.length === 0) {
      break;
    }

    productList.push(...productData);
    console.log("finish page", page);
    page++;
  }

  console.log("end of function");
  return productList;
}

console.log(donwloadData(), "Call Fn");
// donwloadData();

console.log("end of main thread");

async function fetchProducts(page) {
  const pokemonPerPage = 100;
  console.log("is suspended?");
  const productPage = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${pokemonPerPage}&offset=${pokemonPerPage * Math.max(page - 1, 0)}`,
  );
  console.log("We had waited for productPage to have data");
  const productData = await productPage.json();

  console.log("it seems so");

  return productData.results;
}

// This prints in console:
// 1
// Set function
// is suspended?
// end of main thread
// We had waited for productPage to have data
// it seems so
// finish page 0
// is suspended?
// We had waited for productPage to have data
// it seems so
// finish page 1
// is suspended?
// We had waited for productPage to have data
// it seems so
// finish page 2
// is suspended?
// We had waited for productPage to have data
// it seems so
// finish page 3
// is suspended?
// We had waited for productPage to have data
// it seems so
// finish page 4
// end of function
