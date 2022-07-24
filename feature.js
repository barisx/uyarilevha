var dataID = document.querySelectorAll("a[data-title=\"Add to wishlist\"")[0].getAttribute("data-original-product-id");

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
    // console.log(document.querySelectorAll(elements[selectedKey])[0], selectedKey == key)
  }

  // console.log(document.querySelectorAll(elements[selectedKey])[0], document.querySelectorAll(elements[selectedKey])[0].hidden)
  // Sending element if explicit it returns true
  return document.querySelectorAll(elements[selectedKey])[0].hidden === false;
}

function onlyOneSizeChoicesCanShow() {
  var currentSize = getSelectedValueByID("pa_olculer");

  var inputClassesLamination = {
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

  var inputClassesDoubleSide = {
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

// feature.js start

document
  .querySelectorAll("select#pa_malzeme-turu")[0]
  .addEventListener("click", () => {
    onlyTwoTypeOfProductsCanNotBeLamination();
    onlyOneSizeChoicesCanShow();
  });
document
  .querySelectorAll("select#pa_malzeme-turu")[0]
  .addEventListener("change", () => {
    cleanAllSelects();
    theseProductsAreNotDoubleSide();
  });

document
  .querySelectorAll("select#pa_olculer")[0]
  .addEventListener("click", () => {
    onlyTwoTypeOfProductsCanNotBeLamination();
    onlyOneSizeChoicesCanShow();
  });

  document.querySelectorAll("select#pa_malzeme-turu")[0].setAttribute( "onchange", "setData(this.value)" );
  document.querySelectorAll("select#pa_olculer")[0].setAttribute( "onchange", "setData(this.value)" );

window.onload = function () {
  onlyOneSizeChoicesCanShow();

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

function setData(value) {
  e = document.querySelectorAll("select#pa_malzeme-turu")[0];
  document.querySelectorAll("input[value=\'25x35\']")[0].checked = false;
  document.querySelectorAll("input[value=\'35x50\']")[0].checked = false;
  document.querySelectorAll("input[value=\'50x70\']")[0].checked = false;
  document.querySelectorAll("input[value=\'70x100\']")[0].checked = false;
  var selectedOption = e.options[e.selectedIndex].value;

  // case 1
  if ((selectedOption == "fotolumen") | (selectedOption == "reflektorlu")) {
    document.querySelectorAll(
      "div.wc-pao-addon-pvc-uzerine-uygulama"
    )[0].hidden = false;
    document.querySelectorAll("div.wc-pao-addon-etiket")[0].hidden = false;

    if (value == "8x12") {
      document.querySelectorAll(
        "div.wc-pao-addon-sac-uzerine-uygulama"
      )[0].hidden = true;
      return;
    }
    if (value == "12x17") {
      document.querySelectorAll(
        "div.wc-pao-addon-sac-uzerine-uygulama"
      )[0].hidden = true;
      return;
    }
    if (value == "17x25") {
      document.querySelectorAll(
        "div.wc-pao-addon-sac-uzerine-uygulama"
      )[0].hidden = true;
      return;
    }
    document.querySelectorAll(
      "div.wc-pao-addon-sac-uzerine-uygulama"
    )[0].hidden = false;
    var classes = {
      "25x35": "p.wc-pao-addon-" + dataID + "-sac-uzerine-uygulama-3-0",
      "35x50": "p.wc-pao-addon-" + dataID + "-sac-uzerine-uygulama-3-1",
      "50x70": "p.wc-pao-addon-" + dataID + "-sac-uzerine-uygulama-3-2",
      "70x100": "p.wc-pao-addon-" + dataID + "-sac-uzerine-uygulama-3-3",
    };

    var elements = ["25x35", "35x50", "50x70", "70x100"];

    if (value == selectedOption) {
      document.querySelectorAll(classes[elements[0]])[0].hidden = false;
      document.querySelectorAll(classes[elements[1]])[0].hidden = true;
      document.querySelectorAll(classes[elements[2]])[0].hidden = true;
      document.querySelectorAll(classes[elements[3]])[0].hidden = true;
    }

    elements = elements.remove(value);
    value != selectedOption
      ? (document.querySelectorAll(classes[value])[0].hidden = false)
      : {};
    value != selectedOption
      ? (document.querySelectorAll(classes[elements[0]])[0].hidden = true)
      : {};
    value != selectedOption
      ? (document.querySelectorAll(classes[elements[1]])[0].hidden = true)
      : {};
    value != selectedOption
      ? (document.querySelectorAll(classes[elements[2]])[0].hidden = true)
      : {};
  } else {
    document.querySelectorAll(
      "div.wc-pao-addon-sac-uzerine-uygulama"
    )[0].hidden = true;
    document.querySelectorAll(
      "div.wc-pao-addon-pvc-uzerine-uygulama"
    )[0].hidden = true;
    document.querySelectorAll("div.wc-pao-addon-etiket")[0].hidden = true;
  }
}

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