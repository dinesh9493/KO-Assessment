$(document).ready(() => {
  let productViewModel = {
    saveProductDetails: () => {
      let valid = validateBeforeSave();
      if (valid) {
        console.log(valid);
      }
    },
  };
  ko.applyBindings(productViewModel);
});

function validateBeforeSave() {
  return true;
}
