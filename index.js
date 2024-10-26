const defaultMaterialValue = document.querySelector(
  "select#pa_malzeme-turu"
).value;
var productId = "-1";
getProductId();

function getProductId() {
  // Select the link element
  const linkElement = document.querySelector(
    'link[rel="alternate"][type="application/json"]'
  );

  // Check if the link element exists and get the href attribute
  if (linkElement) {
    const href = linkElement.getAttribute("href");
    // Use a regular expression to extract the product ID from the URL
    const productIdMatch = href.match(/\/product\/(\d+)/);
    if (productIdMatch) {
      productId = productIdMatch[1];
      console.log("Extracted Product ID:", productId);
    } else {
      console.error("Product ID not found in the URL.");
    }
  } else {
    console.error("Link element not found.");
  }
}

const defaultSizeValue = document.querySelector("select#pa_olculer").value;

function setMaterialTypeDefault() {
  const selectElement = document.querySelector("#pa_malzeme-turu");
  const optionToSelect = selectElement.querySelector(
    `option[value=\"${defaultMaterialValue}\"]`
  );
  optionToSelect.selected = true;
  selectElement.dispatchEvent(new Event("change", { bubbles: true }));
  console.log("Material type set to default:", defaultMaterialValue);
}

function setMaterialSizeDefault() {
  const selectElement = document.querySelector("select#pa_olculer");
  const optionToSelect = selectElement.querySelector(
    `option[value=\"${defaultSizeValue}\"]`
  );
  optionToSelect.selected = true;
  optionToSelect.dispatchEvent(new Event("click", { bubbles: true }));
  console.log("Material size set to default:", defaultSizeValue);
}

document
  .querySelector("select#pa_olculer")
  .addEventListener("change", (event) => {
    console.log("Size changed:", event.target.value);
    document
      .querySelector("div.wc-pao-addons-container")
      .querySelectorAll("input[type=checkbox]")
      .forEach((e) => (e.checked = false));
    choosenSize = choosenMaterialSize();
    chooseClassObject[choosenDataType]["sac"] =
      choosenDataType === "reflektorlu" || choosenDataType == "fotolumen"
        ? validSacSize()
        : chooseClassObject[choosenDataType]["sac"];
    updateSizes();
    updateChooses();
    activateTriggerUpdateOptions();
  });

document
  .querySelector("select#pa_malzeme-turu")
  .addEventListener("change", (event) => {
    console.log("Material type changed:", event.target.value);
    document
      .querySelector("div.wc-pao-addons-container")
      .querySelectorAll("input[type=checkbox]")
      .forEach((e) => (e.checked = false));
    choosenSize = choosenMaterialSize();
    choosenDataType = choosenMaterialType();
    chooseClassObject[choosenDataType]["sac"] =
      choosenDataType === "reflektorlu" || choosenDataType == "fotolumen"
        ? validSacSize()
        : chooseClassObject[choosenDataType]["sac"];
    updateSizes();
    updateChooses();
    resetLanguage();
    resetDirection();
    activateTriggerUpdateOptions();
  });

function resetAll() {
  console.log("Resetting all settings...");
  resetLanguage();
  resetDirection();
  specifications();
  closeAllApplyableMaterials();
  setTimeout(setMaterialTypeDefault, 500);
  setTimeout(setMaterialSizeDefault, 500);
  setTimeout(() => {
    document
      .querySelector("select#pa_malzeme-turu")
      .dispatchEvent(new Event("change"));
    console.log("Material type change event dispatched");
  }, 1000);
  setTimeout(() => {
    document
      .querySelector("select#pa_olculer")
      .dispatchEvent(new Event("change"));
    console.log("Material size change event dispatched");
  }, 1000);
  setTimeout(setMaterialTypeDefault, 2000);
  setTimeout(setMaterialSizeDefault, 2000);
}

window.addEventListener("load", () => {
  console.log("Window loaded");
  updateSizes();
  updateChooses();
  getProductId();
  console.log("Product ID:", productId);

  document.querySelector("a.reset_variations").addEventListener("click", () => {
    resetAll();
  });
});

function resetLanguageWithClassName() {
  var element = document
    .querySelector("div.wc-pao-addon-ilave-dil-secenekleri")
    .querySelectorAll("a");
  element[0].classList.add("selected");
  for (var i = 1; i < element.length; i++) {
    element[i].classList.remove("selected");
  }
}

function resetLanguage() {
  document.querySelector(
    "select#addon-" + productId + "-ilave-dil-secenekleri-0"
  ).selectedIndex = 0;
}

function resetDirectionWithClassName() {
  var element = document
    .querySelector("div.wc-pao-addon-levha-sekli-istege-bagli")
    .querySelectorAll("a");
  element[0].classList.add("selected");
  for (var i = 1; i < element.length; i++) {
    element[i].classList.remove("selected");
  }
}

function resetDirection() {
  document.querySelector(
    "select#addon-" + productId + "-levha-sekli-istege-bagli-1"
  ).selectedIndex = 0;
}

function choosenMaterialType() {
  var element = document.querySelector("select#pa_malzeme-turu");
  return element.options[element.selectedIndex].value;
}

function choosenMaterialSize() {
  var element = document.querySelector("select#pa_olculer");
  return element.options[element.selectedIndex].value;
}
var choosenSize = choosenMaterialSize();
var choosenDataType = choosenMaterialType();

function validSacSize() {
  return ["25x35", "35x50", "50x70", "70x100"].includes(choosenSize);
}
var chooseClassObject = {
  /*
    
    "sac": "",
        "pvc": "",
        "laminasyon": "",
        "cift-yon-baski": "",
        "fotolumen-cift": "",
        "fotolumen-etiket": "",
        "reflektor-etiket": "",
        "reflektor-cift": "",*/
  pvc: {
    sac: false,
    pvc: false,
    laminasyon: true,
    "cift-yon-baski": true,
    "fotolumen-etiket": false,
    "reflektor-etiket": false,
    "reflektor-cift": false,
    "fotolumen-cift": false,
    "kalin-dekota": false,
  },
  fotolumen: {
    sac: validSacSize(),
    pvc: true,
    laminasyon: true,
    "cift-yon-baski": false,
    "fotolumen-etiket": true,
    "reflektor-etiket": false,
    "reflektor-cift": false,
    "fotolumen-cift": true,
    "kalin-dekota": true,
  },
  reflektorlu: {
    sac: validSacSize(),
    pvc: true,
    laminasyon: true,
    "cift-yon-baski": false,
    "fotolumen-etiket": false,
    "reflektor-etiket": true,
    "reflektor-cift": true,
    "fotolumen-cift": false,
    "kalin-dekota": true,
  },
  dekota: {
    sac: false,
    pvc: false,
    laminasyon: true,
    "cift-yon-baski": true,
    "fotolumen-etiket": false,
    "reflektor-etiket": false,
    "reflektor-cift": false,
    "fotolumen-cift": false,
  },
  sac: {
    sac: false,
    pvc: false,
    laminasyon: false,
    "cift-yon-baski": true,
    "fotolumen-etiket": false,
    "reflektor-etiket": false,
    "reflektor-cift": false,
    "fotolumen-cift": false,
    "kalin-dekota": true,
  },
  etiket: {
    sac: false,
    pvc: false,
    laminasyon: false,
    "cift-yon-baski": false,
    "fotolumen-etiket": false,
    "reflektor-etiket": false,
    "reflektor-cift": false,
    "fotolumen-cift": false,
    "kalin-dekota": false,
  },
  magnet: {
    sac: false,
    pvc: false,
    laminasyon: true,
    "cift-yon-baski": false,
    "fotolumen-etiket": false,
    "reflektor-etiket": false,
    "reflektor-cift": false,
    "fotolumen-cift": false,
    "kalin-dekota": false,
  },
};

function updateChooses() {
  console.log("[243] Updating chooses for:", choosenDataType);
  Object.entries(chooseClassObject[choosenDataType]).forEach((dict) => {
    const [key, value] = dict;
    console.log("[244] Start Option:", key, "Value:", value);
    document.querySelector(applyClassList[key]).hidden = !value;
    console.log("[246] End Option:", key, "Value:", value);
  });
}

function closeAllApplyableMaterials() {
  Object.values(applyClassList).forEach(
    (element) => (document.querySelector(element).hidden = true)
  );
}

function openAllApplyableMaterials() {
  Object.values(applyClassList).forEach(
    (element) => (document.querySelector(element).hidden = false)
  );
}

function updateSizes() {
  console.log("[242] Updating sizes for:", choosenSize);
  if (!choosenSize) {
    closeAllApplyableMaterials();
  } else {
    openAllApplyableMaterials();
  }
  Object.values(sizeClassComponents).forEach((e) => {
    for (var i = 0; i < e.length; i++) {
      const element = document.querySelector(e[i]);
      if (element) element.hidden = true;
      console.log("[274] Size:", e[i], "Value:", element?.hidden);
    }
  });
  Object.values(sizeClassComponents[choosenMaterialSize()]).forEach(
    (element) => {
      const currentElement = document.querySelector(element);
      if (currentElement) currentElement.hidden = false;
      console.log("[281] Size:", element, "Value:", currentElement?.hidden);
    }
  );
}

var applyClassList = {
  sac: "div.wc-pao-addon-sac-uzerine-uygulama",
  pvc: "div.wc-pao-addon-pvc-uzerine-uygulama",
  laminasyon: "div.wc-pao-addon-laminasyon-koruyucu-yuzey-kaplama",
  "cift-yon-baski": "div.wc-pao-addon-cift-yon-baski-secenegi",
  "reflektor-cift": "div.wc-pao-addon-reflektor-cift-yon",
  "fotolumen-cift": "div.wc-pao-addon-fotolumen-cift-yon",
  "reflektor-etiket": "div.wc-pao-addon-sadece-reflektor-etiket",
  "fotolumen-etiket": "div.wc-pao-addon-sadece-fotolumen-etiket",
  "kalin-dekota": "div.wc-pao-addon-kalin-dekota-4-6mm",
};

function createSizeClassComponents(components) {
  var sizeClassComponents = {};

  sizeClassComponents["8x12"] = components.map(function (component) {
    return component + "0";
  });

  sizeClassComponents["12x17"] = components.map(function (component) {
    return component + "1";
  });

  sizeClassComponents["17x25"] = components.map(function (component) {
    return component + "2";
  });

  sizeClassComponents["25x35"] = components.map(function (component) {
    return component + "3";
  });

  sizeClassComponents["35x50"] = components.map(function (component) {
    return component + "4";
  });

  sizeClassComponents["50x70"] = components.map(function (component) {
    return component + "5";
  });

  sizeClassComponents["70x100"] = components.map(function (component) {
    return component + "6";
  });

  return sizeClassComponents;
}

// Usage example
var components = [
  "p.wc-pao-addon-" + productId + "-kalin-dekota-4-6mm-3-",
  "p.wc-pao-addon-" + productId + "-laminasyon-koruyucu-yuzey-kaplama-4-",
  "p.wc-pao-addon-" + productId + "-sac-uzerine-uygulama-5-",
  "p.wc-pao-addon-" + productId + "-pvc-uzerine-uygulama-6-",
  "p.wc-pao-addon-" + productId + "-sadece-fotolumen-etiket-7-",
  "p.wc-pao-addon-" + productId + "-sadece-reflektor-etiket-8-",
  "p.wc-pao-addon-" + productId + "-cift-yon-baski-secenegi-9-",
  "p.wc-pao-addon-" + productId + "-fotolumen-cift-yon-10-",
  "p.wc-pao-addon-" + productId + "-reflektor-cift-yon-11-",
];

var sizeClassComponents = createSizeClassComponents(components);

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
}

function reflectorAndPhotolumenOnlyPVCOrSACOrEtiket(selectedMaterial) {
  document.querySelector(
    "input[name='addon-" + productId + "-sac-uzerine-uygulama-4[]']"
  ).checked = false;
  document.querySelector(
    "input[name='addon-" + productId + "-pvc-uzerine-uygulama-5[]']"
  ).checked = false;
  document.querySelector(
    "input[name='addon-" + productId + "-sadece-fotolumen-etiket-6[]']"
  ).checked = false;
  document.querySelector(
    'input[name="' + selectedMaterial + '"]'
  ).checked = true;
}

function change(iconID) {
  if (document.getElementById(iconID).className == "icon-angle-up") {
    document.getElementById(iconID).className = "icon-angle-down";
  } else {
    document.getElementById(iconID).className = "icon-angle-up";
  }
}

function convertToApplyInputList(components) {
  var applyInputList = {
    sac: "",
    etiket: "",
    pvc: "",
    laminasyon: "",
    "cift-yon-baski": "",
    "fotolumen-cift": "",
    "reflektor-cift": "",
    "fotolumen-etiket": "",
    "reflektor-etiket": "",
    "kalin-dekota": "",
  };

  components.forEach(function (component) {
    var componentName = component.split("pao-")[1]; // Extract the component name after splitting
    componentName = componentName.slice(0, -1); // Remove the last character

    Object.keys(applyInputList).forEach((e) => {
      if (componentName.includes(e)) applyInputList[e] = componentName + "[]";
    });
  });

  return applyInputList;
}

var applyInputList = convertToApplyInputList(components);

var chooseInputObject = {
  pvc: {
    etiket: false,
    sac: false,
    laminasyon: true,
    "cift-yon-baski": true,
    "fotolumen-cift": true,
    "reflektor-cift": true,
    "fotolumen-etiket": true,
    "reflektor-etiket": true,
    "kalin-dekota": false,
  },
  sac: {
    pvc: false,
    laminasyon: false,
    "cift-yon-baski": true,
    "fotolumen-cift": true,
    "reflektor-cift": true,
    "fotolumen-etiket": false,
    "reflektor-etiket": false,
    "kalin-dekota": false,
  },
  laminasyon: {
    etiket: false,
    sac: false,
    pvc: true,
    "cift-yon-baski": true,
    "fotolumen-cift": true,
    "reflektor-cift": true,
    "fotolumen-etiket": false,
    "reflektor-etiket": false,
    "kalin-dekota": true,
  },
  "cift-yon-baski": {
    etiket: false,
    sac: true,
    pvc: true,
    laminasyon: true,
    "fotolumen-cift": false,
    "reflektor-cift": false,
    "fotolumen-etiket": false,
    "reflektor-etiket": false,
  },
  "fotolumen-cift": {
    etiket: false,
    sac: true,
    pvc: true,
    laminasyon: true,
    "cift-yon-baski": false,
    "fotolumen-cift": true,
    "reflektor-cift": false,
    "fotolumen-etiket": false,
    "reflektor-etiket": false,
    "kalin-dekota": false,
  },
  "reflektor-cift": {
    etiket: false,
    sac: true,
    pvc: true,
    laminasyon: true,
    "cift-yon-baski": false,
    "fotolumen-cift": false,
    "reflektor-cift": true,
    "fotolumen-etiket": false,
    "reflektor-etiket": false,
    "kalin-dekota": false,
  },
  "fotolumen-etiket": {
    sac: false,
    pvc: true,
    laminasyon: false,
    "cift-yon-baski": false,
    "fotolumen-cift": false,
    "reflektor-cift": false,
    "fotolumen-etiket": true,
    "reflektor-etiket": false,
    "kalin-dekota": false,
  },
  "reflektor-etiket": {
    sac: false,
    pvc: true,
    laminasyon: false,
    "cift-yon-baski": false,
    "fotolumen-cift": false,
    "reflektor-cift": false,
    "fotolumen-etiket": false,
    "reflektor-etiket": true,
    "kalin-dekota": false,
  },
  "kalin-dekota": {
    etiket: false,
    sac: false,
    pvc: false,
    laminasyon: true,
    "cift-yon-baski": true,
    "fotolumen-cift": true,
    "reflektor-cift": true,
    "fotolumen-etiket": false,
    "reflektor-etiket": false,
  },
};

function activateTriggerUpdateOptions() {
  document
    .querySelectorAll("input[name^='addon-" + productId + "-']")
    .forEach((input) => input.addEventListener("click", triggerUpdateOptions));
}

function triggerUpdateOptions(event) {
  const clickedElement = event.target;
  const elementName = clickedElement.name;
  console.log("Option clicked:", elementName);

  const choosenDataType = Object.keys(chooseInputObject).find(
    (key) => elementName == applyInputList[key]
  );
  console.log("Chosen data type:", choosenDataType);
  updateOptions(choosenDataType);
}

function updateOptions(choosenDataType) {
  console.log("Updating options for:", choosenDataType);
  Object.entries(chooseInputObject[choosenDataType]).forEach((entry) => {
    const [key, value] = entry;
    console.log("Option:", key, "Value:", value);
    const inputName = applyInputList[key];
    const inputElements = document.querySelectorAll(
      `input[name=\'${inputName}\']`
    );
    console.log("Input name:", inputName, "Input elements:", inputElements);
    if (!value) {
      inputElements.forEach((e) => (e.checked = false));
    }
  });
}
