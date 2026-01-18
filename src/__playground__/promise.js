console.log(1);

function fetchProducts(page) {
  console.log("is suspended?");
  return fetch(`https://fakestoreapi.com/products?limit=1`)
    .then((res) => {
      console.log("We had waited for productPage to have data");
      return res.json();
    })
    .then((res) => {
      console.log("it seems so");
      return res;
    });
}

function donwloadData() {
  const productList = [];
  let currentPage = 0;

  console.log("Set function");
  while (currentPage < 5) {
    fetchProducts(currentPage).then((productData) => {
      productList.push(...productData);
    });
    console.log("finish page", currentPage);
    currentPage++;
  }

  console.log("end of function");
  return productList;
}

donwloadData();

console.log("end of main thread");

// This prints in console:
// 1
// Set function
// is suspended?
// finish page 0
// is suspended?
// finish page 1
// is suspended?
// finish page 2
// is suspended?
// finish page 3
// is suspended?
// finish page 4
// end of function
// end of main thread
// We had waited for productPage to have data
// We had waited for productPage to have data
// We had waited for productPage to have data
// it seems so
// it seems so
// it seems so
// We had waited for productPage to have data
// it seems so
// We had waited for productPage to have data
// it seems so
