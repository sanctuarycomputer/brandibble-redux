export default (categories=[]) => {
  let allProducts = [];

  for(let i = 0; i < categories.length; i++) {
    let category = categories[i];
    if(category.items.length) {
      for(let h = 0; h < category.items.length; h++) {
        let item = category.items[h];
        allProducts.push(item);
      }
    }
    for(let j = 0; j < category.children.length; j++) {
      let child = category.children[j];
      for(let k = 0; k < child.items.length; k++) {
        let item = child.items[k];
        allProducts.push(item);
      }
    }
  }
  return allProducts;
}
