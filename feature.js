var dataID = document.querySelectorAll("a[data-title=\"Add to wishlist\"")[0].getAttribute("data-original-product-id");
var applyClassObject = {
  "sac": "div.wc-pao-addon-sac-uzerine-uygulama",
  "etiket": "div.wc-pao-addon-etiket",
  "pvc": "div.wc-pao-addon-pvc-uzerine-uygulama",
  "laminasyon": "div.wc-pao-addon-laminasyon-koruyucu-yuzey-kaplama",
  "ciftyon": "div.wc-pao-addon-cift-yon-baski-secenegi"
}
var applyClassList = [
  "div.wc-pao-addon-sac-uzerine-uygulama",
  "div.wc-pao-addon-etiket",
  "div.wc-pao-addon-pvc-uzerine-uygulama",
  "div.wc-pao-addon-laminasyon-koruyucu-yuzey-kaplama",
  "div.wc-pao-addon-cift-yon-baski-secenegi"
]
// dekota, pvc, sac cift yonlu ve sadece secili boyut
function getSelectedValueByID(id) {
  e = document.querySelectorAll("select#" + id)[0];
  return e.options[e.selectedIndex].value;
}

function unhideOnlyOneChoice(selectedKey, elements) {
  for (var key in elements) {
    // var value = elements[key];
    // console.log(value, "value")
    document.querySelectorAll(elements[key])[0].hidden = !(selectedKey == key);
    // console.log(document.querySelectorAll(elements[selectedKey])[0], selectedKey == key, key, selectedKey)
  }

  // console.log(document.querySelectorAll(elements[selectedKey])[0], document.querySelectorAll(elements[selectedKey])[0].hidden)
  // Sending element if explicit it returns true
  return document.querySelectorAll(elements[selectedKey])[0].hidden === false;
}

// function unhideMainIfFitCurrentSize(size, elements) {
//   var main = document.querySelector(elements["main"])
//   if(elements.includes(size)){
//     // Current size is fits with component
//     if(main.hidden){
//       // Unhide the parent div if it is hiding 
//       main.hidden = false;
//     }
//   } else {
//     // Current size is not fitting with selected material
//     // Please hide parent div with all sizes
//     main.hidden = main.hidden
//       ? false // its already hidden do not require hiding again -but i did sorry-
//       : true  // its not hiding so we need to hide it
//   }
// }

function onlyOneSizeChoicesCanShow() {
  var currentSize = getSelectedValueByID("pa_olculer");

  var inputClassesLamination = {
    // "main": "div.wc-pao-addon-laminasyon-koruyucu-yuzey-kaplama",
    "8x12":
      "p.wc-pao-addon-" + dataID + "-laminasyon-koruyucu-yuzey-kaplama-6-0",
    "12x17":
      "p.wc-pao-addon-" + dataID + "-laminasyon-koruyucu-yuzey-kaplama-6-1",
    "17x25":
      "p.wc-pao-addon-" + dataID + "-laminasyon-koruyucu-yuzey-kaplama-6-2",
    "25x35":
      "p.wc-pao-addon-" + dataID + "-laminasyon-koruyucu-yuzey-kaplama-6-3",
    "35x50":
      "p.wc-pao-addon-" + dataID + "-laminasyon-koruyucu-yuzey-kaplama-6-4",
    "50x70":
      "p.wc-pao-addon-" + dataID + "-laminasyon-koruyucu-yuzey-kaplama-6-5",
    "70x100":
      "p.wc-pao-addon-" + dataID + "-laminasyon-koruyucu-yuzey-kaplama-6-6",
  };

  var inputClassesPlate = {
    // "main": "div.wc-pao-addon-sac-uzerine-uygulama",
    "25x35":
      "p.wc-pao-addon-" + dataID + "-sac-uzerine-uygulama-1-0",
    "35x50":
      "p.wc-pao-addon-" + dataID + "-sac-uzerine-uygulama-1-1",
    "50x70":
      "p.wc-pao-addon-" + dataID + "-sac-uzerine-uygulama-1-2",
    "70x100":
      "p.wc-pao-addon-" + dataID + "-sac-uzerine-uygulama-1-3",
  };

  var inputClassesDoubleSide = {
    // "main": "div.wc-pao-addon-cift-yon-baski-secenegi",
    "8x12": "p.wc-pao-addon-" + dataID + "-cift-yon-baski-secenegi-7-0",
    "12x17": "p.wc-pao-addon-" + dataID + "-cift-yon-baski-secenegi-7-1",
    "17x25": "p.wc-pao-addon-" + dataID + "-cift-yon-baski-secenegi-7-2",
    "25x35": "p.wc-pao-addon-" + dataID + "-cift-yon-baski-secenegi-7-3",
    "35x50": "p.wc-pao-addon-" + dataID + "-cift-yon-baski-secenegi-7-4",
    "50x70": "p.wc-pao-addon-" + dataID + "-cift-yon-baski-secenegi-7-5",
    "70x100": "p.wc-pao-addon-" + dataID + "-cift-yon-baski-secenegi-7-6",
  };
  unhideOnlyOneChoice(currentSize, inputClassesLamination);
  console.log(Object.keys(inputClassesDoubleSide).includes(currentSize));
  unhideOnlyOneChoice(currentSize, inputClassesDoubleSide);
  unhideOnlyOneChoice(currentSize, inputClassesPlate);
}

function cleanAllSelects() {
  clearSelect();
  clearInput();
}

function clearSelect() {
  // image highlight clear section
  document
    .getElementsByClassName("wc-pao-addon-ilave-dil-secenekleri")[0]
    .querySelectorAll(".wc-pao-addon-image-swatch")
    .forEach((el) => {
      el.classList.remove("selected");
    });

  // image highlight clear section
  document
    .getElementsByClassName("wc-pao-addon-levha-sekli-istege-bagli")[0]
    .querySelectorAll(".wc-pao-addon-image-swatch")
    .forEach((el) => {
      el.classList.remove("selected");
    });

  // select clear section
  document
    .getElementsByClassName("wc-pao-addon-ilave-dil-secenekleri")[0]
    .querySelectorAll("option")
    .forEach((el) => {
      el.selected = false;
    });
  // select clear section
  document
    .getElementsByClassName("wc-pao-addon-levha-sekli-istege-bagli")[0]
    .querySelectorAll("option")
    .forEach((el) => {
      el.selected = false;
    });
}

function clearInput() {
  document
    .getElementsByClassName("wc-pao-addons-container")[0]
    .querySelectorAll("input")
    .forEach((el) => {
      el.checked = false;
      el.value = "";
    });
}

function onlyTwoTypeOfProductsCanNotBeLamination() {
  var selectedOption = getSelectedValueByID("pa_malzeme-turu");
  console.log(selectedOption);
  var onlyThreeTypeOfProducts = ["sac", "etiket"];

  if (onlyThreeTypeOfProducts.includes(selectedOption)) {
    // wc-pao-addon wc-pao-addon-laminasyon-koruyucu-yuzey-kaplama
    // hide this class
    console.log("hide");
    document.querySelectorAll(
      "div.wc-pao-addon-laminasyon-koruyucu-yuzey-kaplama"
    )[0].hidden = true;
  } else {
    console.log("not hide");
    document.querySelectorAll(
      "div.wc-pao-addon-laminasyon-koruyucu-yuzey-kaplama"
    )[0].hidden = false;
  }
}

function theseProductsAreNotDoubleSide() {
  var selectedOption = getSelectedValueByID("pa_malzeme-turu");
  console.log(selectedOption);
  var products = ["etiket", "magnet"];

  if (products.includes(selectedOption)) {
    // wc-pao-addon-cift-yon-baski-secenegi
    // hide this class
    console.log("hide");
    document.querySelectorAll(
      "div.wc-pao-addon-cift-yon-baski-secenegi"
    )[0].hidden = true;
  } else {
    console.log("not hide");
    document.querySelectorAll(
      "div.wc-pao-addon-cift-yon-baski-secenegi"
    )[0].hidden = false;
  }
}

function reflectorAndPhotolumenCanApplyPlate() {
  var selectedOption = getSelectedValueByID("pa_malzeme-turu");
  var products = ["fotolumen", "reflektorlu"];

  if (products.includes(selectedOption)) {
    // wc-pao-addon-sac-uzerine-uygulama
    // hide this class
    document.querySelectorAll(
      "div.wc-pao-addon-sac-uzerine-uygulama"
    )[0].hidden = false;
  } else {
    // expose this class
    document.querySelectorAll(
      "div.wc-pao-addon-sac-uzerine-uygulama"
    )[0].hidden = true;
  }
}

function showPlateIfOnlySizeFits() {
  var selectedOption = getSelectedValueByID("pa_malzeme-turu");
  var currentSize = getSelectedValueByID("pa_olculer");

  var products = ["fotolumen", "reflektorlu"];
  var sizes = ["25x35", "35x50", "50x70", "70x100"];

  if (products.includes(selectedOption) && sizes.includes(currentSize)) {
    // wc-pao-addon-sac-uzerine-uygulama
    // hide this class
    document.querySelectorAll(
      "div.wc-pao-addon-sac-uzerine-uygulama"
    )[0].hidden = false;
  } else {
    // expose this class
    document.querySelectorAll(
      "div.wc-pao-addon-sac-uzerine-uygulama"
    )[0].hidden = true;
  }
}

function sameProductsNeedHide() {
  var selectedOption = getSelectedValueByID("pa_malzeme-turu");
  console.log(selectedOption, applyClassList[selectedOption], document.querySelectorAll(
    applyClassList[selectedOption]
  )[0])
  for(var element of applyClassList) {  // Expose firstly all elements
    document.querySelector(element).hidden = false;
  }
  // Now hide which one we need
  // We need same elements
  if (applyClassObject[selectedOption].length > 0) {  // If selected same with apply type
    // same like: plate can not apply to plate
    // Unhide if match
    // console.log("Unhide if match")
    document.querySelectorAll(
      applyClassObject[selectedOption]
    )[0].hidden = true;
  } else {
    // expose this class
    document.querySelectorAll(
      applyClassObject[selectedOption]
    )[0].hidden = false;
  }
}


/*
// check it later new approach for next development
function reflectorAndPhotolumenCanApplyPlate() {
  var selectedOption = getSelectedValueByID("pa_malzeme-turu");
  var products = ["fotolumen", "reflektorlu"];
  var classList = [
    "div.wc-pao-addon-sac-uzerine-uygulama",
    "div.wc-pao-addon-etiket",
    "div.wc-pao-addon-pvc-uzerine-uygulama",
    "div.wc-pao-addon-laminasyon-koruyucu-yuzey-kaplama",
    "div.wc-pao-addon-cift-yon-baski-secenegi"
  ]
  for(var element of classList) {
    if (products.includes(selectedOption)) {
      // wc-pao-addon-sac-uzerine-uygulama
      // hide this class
      document.querySelectorAll(element)[0].hidden = true;
    } else {
      // expose this class
      document.querySelectorAll(element)[0].hidden = false;
    }
  }
}
*/

// feature.js start

document
  .querySelectorAll("select#pa_malzeme-turu")[0]
  .addEventListener("click", () => {
    onlyTwoTypeOfProductsCanNotBeLamination();
    onlyOneSizeChoicesCanShow();
  });
  document
    .querySelectorAll("select#pa_olculer")[0]
    .addEventListener("click", () => {
      onlyTwoTypeOfProductsCanNotBeLamination();
      onlyOneSizeChoicesCanShow();
    });
  // When product select change
document
  .querySelectorAll("select#pa_malzeme-turu")[0]
  .addEventListener("change", () => {
    cleanAllSelects();
    theseProductsAreNotDoubleSide();
    reflectorAndPhotolumenCanApplyPlate();
    sameProductsNeedHide()
  });

    // When product size select change
document
.querySelectorAll("select#pa_olculer")[0]
.addEventListener("change", () => {
  showPlateIfOnlySizeFits();
});


  // document.querySelectorAll("select#pa_malzeme-turu")[0].setAttribute( "onchange", "setData(this.value)" );
  // document.querySelectorAll("select#pa_olculer")[0].setAttribute( "onchange", "setData(this.value)" );

window.onload = function () {
  onlyOneSizeChoicesCanShow();
  reflectorAndPhotolumenCanApplyPlate();
  theseProductsAreNotDoubleSide();
  cleanAllSelects();
  sameProductsNeedHide()
  for (
    var i = 0;
    i < document.querySelectorAll("input.wc-pao-addon-checkbox").length;
    i++
  ) {
    document
      .querySelectorAll("input.wc-pao-addon-checkbox")
      [i].setAttribute("onchange", "singleChoice(this.value)");
  }
 
};

// function setData(value) {
//   e = document.querySelectorAll("select#pa_malzeme-turu")[0];
//   document.querySelectorAll("input[value=\'25x35\']")[0].checked = false;
//   document.querySelectorAll("input[value=\'35x50\']")[0].checked = false;
//   document.querySelectorAll("input[value=\'50x70\']")[0].checked = false;
//   document.querySelectorAll("input[value=\'70x100\']")[0].checked = false;
//   var selectedOption = e.options[e.selectedIndex].value;

//   // case 1
//   if ((selectedOption == "fotolumen") | (selectedOption == "reflektorlu")) {
//     document.querySelectorAll(
//       "div.wc-pao-addon-pvc-uzerine-uygulama"
//     )[0].hidden = false;
//     document.querySelectorAll("div.wc-pao-addon-etiket")[0].hidden = false;

//     if (value == "8x12") {
//       document.querySelectorAll(
//         "div.wc-pao-addon-sac-uzerine-uygulama"
//       )[0].hidden = true;
//       return;
//     }
//     if (value == "12x17") {
//       document.querySelectorAll(
//         "div.wc-pao-addon-sac-uzerine-uygulama"
//       )[0].hidden = true;
//       return;
//     }
//     if (value == "17x25") {
//       document.querySelectorAll(
//         "div.wc-pao-addon-sac-uzerine-uygulama"
//       )[0].hidden = true;
//       return;
//     }
//     document.querySelectorAll(
//       "div.wc-pao-addon-sac-uzerine-uygulama"
//     )[0].hidden = false;
//     var classes = {
//       "25x35": "p.wc-pao-addon-" + dataID + "-sac-uzerine-uygulama-3-0",
//       "35x50": "p.wc-pao-addon-" + dataID + "-sac-uzerine-uygulama-3-1",
//       "50x70": "p.wc-pao-addon-" + dataID + "-sac-uzerine-uygulama-3-2",
//       "70x100": "p.wc-pao-addon-" + dataID + "-sac-uzerine-uygulama-3-3",
//     };

//     var elements = ["25x35", "35x50", "50x70", "70x100"];

//     if (value == selectedOption) {
//       document.querySelectorAll(classes[elements[0]])[0].hidden = false;
//       document.querySelectorAll(classes[elements[1]])[0].hidden = true;
//       document.querySelectorAll(classes[elements[2]])[0].hidden = true;
//       document.querySelectorAll(classes[elements[3]])[0].hidden = true;
//     }

//     elements = elements.remove(value);
//     value != selectedOption
//       ? (document.querySelectorAll(classes[value])[0].hidden = false)
//       : {};
//     value != selectedOption
//       ? (document.querySelectorAll(classes[elements[0]])[0].hidden = true)
//       : {};
//     value != selectedOption
//       ? (document.querySelectorAll(classes[elements[1]])[0].hidden = true)
//       : {};
//     value != selectedOption
//       ? (document.querySelectorAll(classes[elements[2]])[0].hidden = true)
//       : {};
//   } else {
//     document.querySelectorAll(
//       "div.wc-pao-addon-sac-uzerine-uygulama"
//     )[0].hidden = true;
//     document.querySelectorAll(
//       "div.wc-pao-addon-pvc-uzerine-uygulama"
//     )[0].hidden = true;
//     document.querySelectorAll("div.wc-pao-addon-etiket")[0].hidden = true;
//   }
// }

function singleChoice(except) {
  inputs = document.querySelectorAll("input.wc-pao-addon-checkbox");
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value == except) {
      continue;
    }
    inputs[i].checked = false;
  }
}

Array.prototype.remove = function (from, to) {
  orj = from;
  this.splice(
    from,
    (to = [0, from || 1, ++to - from][arguments.length]) < 0
      ? this.length + to
      : to
  );
  return this.filter((orj) => to.indexOf(orj) === -1);
};

// feature.js end

function specifications() {
  var openHideDiv = document.getElementsByClassName(
    "wc-pao-addons-container"
  )[0].style;
  if (openHideDiv.display == "block") {
    openHideDiv.display = "none";
  } else {
    openHideDiv.display = "block";
  }
  change("up-down-icon");
  onlyTwoTypeOfProductsCanNotBeLamination();
  onlyOneSizeChoicesCanShow();
}

function change(iconID) {
  if (document.getElementById(iconID).className == "icon-angle-up") {
    document.getElementById(iconID).className = "icon-angle-down";
  } else {
    document.getElementById(iconID).className = "icon-angle-up";
  }
}