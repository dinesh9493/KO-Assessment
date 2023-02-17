$(document).ready(() => {
  let productViewModel = {
    productNumber: ko.observable(),
    productDescription: ko.observable(),
    weightPerUnitOfMeasure: ko.observable(),
    activeProduct: ko.observable(),
    listPrice: ko.observable(),

    toastBackgroundColorClassName: ko.observable(),
    toastMessage: ko.observable(),

    saveProductDetails: () => {
      let valid = validateBeforeSave();
      if (valid) {
        let payload = preparePayload();
        postProductDetails(payload);
      } else {
        showToastMessage(
          PRODUCT_FORM_ERROR_MESSAGE,
          CLASS_NAME_FOR_ERROR_TOAST
        );
      }
    },
  };

  ko.applyBindings(productViewModel);

  function validateBeforeSave() {
    let valid = false;
    if (
      productViewModel.productNumber() &&
      productViewModel.productDescription() &&
      productViewModel.weightPerUnitOfMeasure() &&
      productViewModel.activeProduct() &&
      productViewModel.listPrice()
    ) {
      valid = true;
    }
    return valid;
  }

  function showToastMessage(message, bgColor) {
    productViewModel.toastMessage(message);
    productViewModel.toastBackgroundColorClassName(bgColor);
    const toastForProduct = document.getElementById(
      "toastForProductDetailsForm"
    );
    const toast = new bootstrap.Toast(toastForProduct);
    toast.show();
  }

  function preparePayload() {
    let payload = {
      productNumber: productViewModel.productNumber(),
      productDescription: productViewModel.productDescription(),
      weightPerUnitOfMeasure: productViewModel.weightPerUnitOfMeasure(),
      activeProduct: productViewModel.activeProduct(),
      listPrice: productViewModel.listPrice(),
    };
    return payload;
  }

  function postProductDetails(payload) {
    let jsonPayload = ko.toJSON(payload);
    let promise = fetch(URL_LIST.PRODUCT_SAVE_URL, {
      method: "post",
      body: jsonPayload,
      headers: {
        "content-type": "application/json",
      },
    });
    promise
      .then((e) => e.json())
      .then((response) => {
        showToastMessage(
          PRODUCT_FORM_SAVED_SUCCESS_MESSAGE,
          CLASS_NAME_FOR_SUCCESS_TOAST
        );
        console.log(response);
      });
  }
});
