document
.querySelector("select#pa_olculer")
.addEventListener("change", (event) => {
  document.querySelector("div.wc-pao-addons-container").querySelectorAll("input[type=checkbox]").forEach(e => e.checked = false)
  choosenSize = choosenMaterialSize()
  chooseClassObject[choosenDataType]["sac"] = choosenDataType === "reflektorlu" || choosenDataType == "fotolumen"
    ? validSacSize()
    : chooseClassObject[choosenDataType]["sac"]
  updateSizes();
  updateChooses();
});



document
.querySelector("select#pa_malzeme-turu")
.addEventListener("change", (event) => {
  document.querySelector("div.wc-pao-addons-container").querySelectorAll("input[type=checkbox]").forEach(e => e.checked = false)
  choosenSize = choosenMaterialSize()
  choosenDataType = choosenMaterialType()
  chooseClassObject[choosenDataType]["sac"] = choosenDataType === "reflektorlu" || choosenDataType == "fotolumen"
    ? validSacSize()
    : chooseClassObject[choosenDataType]["sac"]
  updateSizes();
  updateChooses();
  resetLanguage();
  resetDirection();
  if(choosenDataType === "reflektorlu" || choosenDataType === "fotolumen"){
    addListenerForApplyableMaterials()
  } else {
    removeListenerForApplyableMaterials()
  }
});



window
.addEventListener("load", () => {
  updateSizes();
  updateChooses();
  document.querySelector("a.reset_variations").addEventListener("click", () => {
    resetLanguage();
    resetDirection();
    specifications()
    closeAllApplyableMaterials()
  })
});

function resetLanguageWithClassName(){
  var element = document.querySelector("div.wc-pao-addon-ilave-dil-secenekleri").querySelectorAll("a")
  element[0].classList.add("selected")
  for(var i = 1; i < element.length; i++){
    element[i].classList.remove("selected")
  }
}

function resetLanguage(){
  document.querySelector("select#addon-"+dataID+"-ilave-dil-secenekleri-0").selectedIndex = 0
}

function resetDirectionWithClassName(){
  var element = document.querySelector("div.wc-pao-addon-levha-sekli-istege-bagli").querySelectorAll("a")
  element[0].classList.add("selected")
  for(var i = 1; i < element.length; i++){
    element[i].classList.remove("selected")
  }
}

function resetDirection(){
  document.querySelector("select#addon-"+dataID+"-levha-sekli-istege-bagli-1").selectedIndex = 0
}

  var dataID = document.querySelectorAll("a[data-title=\"Add to wishlist\"")[0].getAttribute("data-original-product-id");
  function choosenMaterialType() {
    var element = document.querySelector("select#pa_malzeme-turu")
    return element.options[element.selectedIndex].value
  }
  function choosenMaterialSize() {
    var element = document.querySelector("select#pa_olculer")
    return element.options[element.selectedIndex].value
  }
  var choosenSize = choosenMaterialSize()
	var choosenDataType = choosenMaterialType();
  function validSacSize(){
    return ["25x35", "35x50", "50x70", "70x100"].includes(choosenSize)
  }
    var chooseClassObject = {
      pvc: {
        "etiket": false,
        "sac": false,
        "pvc": false,
        "laminasyon": true,
        "doubleside": true,
      },
      fotolumen: {
        "etiket": true,
        "sac": validSacSize(),
        "pvc": true,
        "laminasyon": true,
        "doubleside": true,
      },
      reflektorlu: {
        "etiket": true,
        "sac": validSacSize(),
        "pvc": true,
        "laminasyon": true,
        "doubleside": true,
      },
      dekota: {
        "etiket": false,
        "sac": false,
        "pvc": false,
        "laminasyon": true,
        "doubleside": true,
      },
      sac: {
        "etiket": false,
        "sac": false,
        "pvc": false,
        "laminasyon": false,
        "doubleside": true,
      },
      etiket: {
        "etiket": false,
        "sac": false,
        "pvc": false,
        "laminasyon": false,
        "doubleside": false,
      },
      magnet: {
        "etiket": false,
        "sac": false,
        "pvc": false,
        "laminasyon": true,
        "doubleside": false,
      },
    }

    function updateChooses() {
      Object.entries(chooseClassObject[choosenDataType]).forEach(dict => document.querySelector(applyClassList[dict[0]]).hidden = !dict[1])
    }
    function closeAllApplyableMaterials(){
      Object.values(applyClassList).forEach(element => document.querySelector(element).hidden = true)
    }
    function openAllApplyableMaterials(){
      Object.values(applyClassList).forEach(element => document.querySelector(element).hidden = false)
    }
    function updateSizes() {
      if(!choosenSize){
        closeAllApplyableMaterials()
      } else {
        openAllApplyableMaterials()
      }
      Object.values(sizeClassComponents).forEach(e => {
        for( var i = 0; i < e.length; i++){ 
          document.querySelector(e[i]).hidden = true
        }
    })
      Object.values(sizeClassComponents[choosenMaterialSize()]).forEach((element) => document.querySelector(element).hidden = false)
    }
    var applyClassList = {
      "sac": "div.wc-pao-addon-sac-uzerine-uygulama",
      "etiket": "div.wc-pao-addon-etiket",
      "pvc": "div.wc-pao-addon-pvc-uzerine-uygulama",
      "laminasyon": "div.wc-pao-addon-laminasyon-koruyucu-yuzey-kaplama",
      "doubleside": "div.wc-pao-addon-cift-yon-baski-secenegi"
    }

var sizeClassComponents = {
  "8x12": ["p.wc-pao-addon-" + dataID + "-cift-yon-baski-secenegi-7-0", "p.wc-pao-addon-" + dataID + "-laminasyon-koruyucu-yuzey-kaplama-3-0"] ,
  "12x17": ["p.wc-pao-addon-" + dataID + "-cift-yon-baski-secenegi-7-1", "p.wc-pao-addon-" + dataID + "-laminasyon-koruyucu-yuzey-kaplama-3-1"],
  "17x25": ["p.wc-pao-addon-" + dataID + "-cift-yon-baski-secenegi-7-2","p.wc-pao-addon-" + dataID + "-laminasyon-koruyucu-yuzey-kaplama-3-2"],
  "25x35": ["p.wc-pao-addon-" + dataID + "-cift-yon-baski-secenegi-7-3", "p.wc-pao-addon-" + dataID + "-laminasyon-koruyucu-yuzey-kaplama-3-3", "p.wc-pao-addon-" + dataID + "-sac-uzerine-uygulama-4-0"],
  "35x50": ["p.wc-pao-addon-" + dataID + "-cift-yon-baski-secenegi-7-4", "p.wc-pao-addon-" + dataID + "-laminasyon-koruyucu-yuzey-kaplama-3-4", "p.wc-pao-addon-" + dataID + "-sac-uzerine-uygulama-4-1"],
  "50x70": ["p.wc-pao-addon-" + dataID + "-cift-yon-baski-secenegi-7-5", "p.wc-pao-addon-" + dataID + "-laminasyon-koruyucu-yuzey-kaplama-3-5", "p.wc-pao-addon-" + dataID + "-sac-uzerine-uygulama-4-2"],
  "70x100": ["p.wc-pao-addon-" + dataID + "-cift-yon-baski-secenegi-7-6", "p.wc-pao-addon-" + dataID + "-laminasyon-koruyucu-yuzey-kaplama-3-6", "p.wc-pao-addon-" + dataID + "-sac-uzerine-uygulama-4-3"],
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
}


function reflectorAndPhotolumenOnlyPVCOrSACOrEtiket(selectedMaterial) {
    document.querySelector("input[name=\'addon-"+ dataID +"-sac-uzerine-uygulama-4[]\']").checked = false
    document.querySelector("input[name=\'addon-"+ dataID +"-pvc-uzerine-uygulama-5[]\']").checked = false
    document.querySelector("input[name=\'addon-"+ dataID +"-etiket-6[]\']").checked = false
    document.querySelector("input[name=\""+selectedMaterial+"\"]").checked = true
}

function addListenerForApplyableMaterials(){
  document
  .querySelector("input[name=\'addon-"+ dataID +"-etiket-6[]\']")
  .addEventListener("click", (e) => {
    reflectorAndPhotolumenOnlyPVCOrSACOrEtiket(e.srcElement.name)
  }, {passive: false})

  document
  .querySelector("input[name=\'addon-"+ dataID +"-sac-uzerine-uygulama-4[]\']")
  .addEventListener("click", (e) => {
    reflectorAndPhotolumenOnlyPVCOrSACOrEtiket(e.srcElement.name)
  }, {passive: false})

  document
  .querySelector("input[name=\'addon-"+ dataID +"-pvc-uzerine-uygulama-5[]\']")
  .addEventListener("click", (e) => {
    reflectorAndPhotolumenOnlyPVCOrSACOrEtiket(e.srcElement.name)
  }, {passive: false})
}

function removeListenerForApplyableMaterials(){
  document
  .querySelector("input[name=\'addon-"+ dataID +"-etiket-6[]\']")
  .addEventListener("click", (e) => {
    reflectorAndPhotolumenOnlyPVCOrSACOrEtiket(e.srcElement.name)
  }, {passive: true});

  document
  .querySelector("input[name=\'addon-"+ dataID +"-sac-uzerine-uygulama-4[]\']")
  .addEventListener("click", (e) => {
    reflectorAndPhotolumenOnlyPVCOrSACOrEtiket(e.srcElement.name)
  }, {passive: true});

  document
  .querySelector("input[name=\'addon-"+ dataID +"-pvc-uzerine-uygulama-5[]\']")
  .addEventListener("click", (e) => {
    reflectorAndPhotolumenOnlyPVCOrSACOrEtiket(e.srcElement.name)
  }, {passive: true});
}

function change(iconID) {
  if (document.getElementById(iconID).className == "icon-angle-up") {
    document.getElementById(iconID).className = "icon-angle-down";
  } else {
    document.getElementById(iconID).className = "icon-angle-up";
  }
}



// // dekota, pvc, sac cift yonlu ve sadece secili boyut
// function getSelectedValueByID(id) {
//   e = document.querySelectorAll("select#" + id)[0];
//   return e.options[e.selectedIndex].value;
// }



//   // console.log(document.querySelectorAll(elements[selectedKey])[0], document.querySelectorAll(elements[selectedKey])[0].hidden)
//   // Sending element if explicit it returns true
//   return document.querySelectorAll(elements[selectedKey])[0].hidden === false;
// }

// // function unhideMainIfFitCurrentSize(size, elements) {
// //   var main = document.querySelector(elements["main"])
// //   if(elements.includes(size)){
// //     // Current size is fits with component
// //     if(main.hidden){
// //       // Unhide the parent div if it is hiding 
// //       main.hidden = false;
// //     }
// //   } else {
// //     // Current size is not fitting with selected material
// //     // Please hide parent div with all sizes
// //     main.hidden = main.hidden
// //       ? false // its already hidden do not require hiding again -but i did sorry-
// //       : true  // its not hiding so we need to hide it
// //   }
// // }



// function cleanAllSelects() {
//   clearSelect();
//   clearInput();
// }

// function clearSelect() {
//   // image highlight clear section
//   document
//     .getElementsByClassName("wc-pao-addon-ilave-dil-secenekleri")[0]
//     .querySelectorAll(".wc-pao-addon-image-swatch")
//     .forEach((el) => {
//       el.classList.remove("selected");
//     });

//   // image highlight clear section
//   document
//     .getElementsByClassName("wc-pao-addon-levha-sekli-istege-bagli")[0]
//     .querySelectorAll(".wc-pao-addon-image-swatch")
//     .forEach((el) => {
//       el.classList.remove("selected");
//     });

//   // select clear section
//   document
//     .getElementsByClassName("wc-pao-addon-ilave-dil-secenekleri")[0]
//     .querySelectorAll("option")
//     .forEach((el) => {
//       el.selected = false;
//     });
//   // select clear section
//   document
//     .getElementsByClassName("wc-pao-addon-levha-sekli-istege-bagli")[0]
//     .querySelectorAll("option")
//     .forEach((el) => {
//       el.selected = false;
//     });
// }

// function clearInput() {
//   document
//     .getElementsByClassName("wc-pao-addons-container")[0]
//     .querySelectorAll("input")
//     .forEach((el) => {
//       el.checked = false;
//       el.value = "";
//     });
// }

// function onlyTwoTypeOfProductsCanNotBeLamination() {
//   var selectedOption = getSelectedValueByID("pa_malzeme-turu");
//   console.log(selectedOption);
//   var onlyThreeTypeOfProducts = ["sac", "etiket"];

//   if (onlyThreeTypeOfProducts.includes(selectedOption)) {
//     // wc-pao-addon wc-pao-addon-laminasyon-koruyucu-yuzey-kaplama
//     // hide this class
//     console.log("hide");
//     document.querySelectorAll(
//       "div.wc-pao-addon-laminasyon-koruyucu-yuzey-kaplama"
//     )[0].hidden = true;
//   } else {
//     console.log("not hide");
//     document.querySelectorAll(
//       "div.wc-pao-addon-laminasyon-koruyucu-yuzey-kaplama"
//     )[0].hidden = false;
//   }
// }

// function theseProductsAreNotDoubleSide() {
//   var selectedOption = getSelectedValueByID("pa_malzeme-turu");
//   console.log(selectedOption);
//   var products = ["etiket", "magnet"];

//   if (products.includes(selectedOption)) {
//     // wc-pao-addon-cift-yon-baski-secenegi
//     // hide this class
//     console.log("hide");
//     document.querySelectorAll(
//       "div.wc-pao-addon-cift-yon-baski-secenegi"
//     )[0].hidden = true;
//   } else {
//     console.log("not hide");
//     document.querySelectorAll(
//       "div.wc-pao-addon-cift-yon-baski-secenegi"
//     )[0].hidden = false;
//   }
// }

// function reflectorAndPhotolumenCanApplyPlate() {
//   var selectedOption = getSelectedValueByID("pa_malzeme-turu");
//   var products = ["fotolumen", "reflektorlu"];

//   if (products.includes(selectedOption)) {
//     // wc-pao-addon-sac-uzerine-uygulama
//     // hide this class
//     document.querySelectorAll(
//       "div.wc-pao-addon-sac-uzerine-uygulama"
//     )[0].hidden = false;
//   } else {
//     // expose this class
//     document.querySelectorAll(
//       "div.wc-pao-addon-sac-uzerine-uygulama"
//     )[0].hidden = true;
//   }
// }

// function showPlateIfOnlySizeFits() {
//   var selectedOption = getSelectedValueByID("pa_malzeme-turu");
//   var currentSize = getSelectedValueByID("pa_olculer");

//   var products = ["fotolumen", "reflektorlu"];
//   var sizes = ["25x35", "35x50", "50x70", "70x100"];

//   if (products.includes(selectedOption) && sizes.includes(currentSize)) {
//     // wc-pao-addon-sac-uzerine-uygulama
//     // hide this class
//     document.querySelectorAll(
//       "div.wc-pao-addon-sac-uzerine-uygulama"
//     )[0].hidden = false;
//   } else {
//     // expose this class
//     document.querySelectorAll(
//       "div.wc-pao-addon-sac-uzerine-uygulama"
//     )[0].hidden = true;
//   }
// }

// function sameProductsNeedHide() {
//   var selectedOption = getSelectedValueByID("pa_malzeme-turu");
//   console.log(selectedOption, applyClassList[selectedOption], document.querySelectorAll(
//     applyClassList[selectedOption]
//   )[0])
//   for(var element of applyClassList) {  // Expose firstly all elements
//     document.querySelector(element).hidden = false;
//   }
//   // Now hide which one we need
//   // We need same elements
//   if (applyClassObject[selectedOption].length > 0) {  // If selected same with apply type
//     // same like: plate can not apply to plate
//     // Unhide if match
//     // console.log("Unhide if match")
//     document.querySelectorAll(
//       applyClassObject[selectedOption]
//     )[0].hidden = true;
//   } else {
//     // expose this class
//     document.querySelectorAll(
//       applyClassObject[selectedOption]
//     )[0].hidden = false;
//   }
// }


// /*
// // check it later new approach for next development
// function reflectorAndPhotolumenCanApplyPlate() {
//   var selectedOption = getSelectedValueByID("pa_malzeme-turu");
//   var products = ["fotolumen", "reflektorlu"];
//   var classList = [
//     "div.wc-pao-addon-sac-uzerine-uygulama",
//     "div.wc-pao-addon-etiket",
//     "div.wc-pao-addon-pvc-uzerine-uygulama",
//     "div.wc-pao-addon-laminasyon-koruyucu-yuzey-kaplama",
//     "div.wc-pao-addon-cift-yon-baski-secenegi"
//   ]
//   for(var element of classList) {
//     if (products.includes(selectedOption)) {
//       // wc-pao-addon-sac-uzerine-uygulama
//       // hide this class
//       document.querySelectorAll(element)[0].hidden = true;
//     } else {
//       // expose this class
//       document.querySelectorAll(element)[0].hidden = false;
//     }
//   }
// }
// */

// // feature.js start

// document
//   .querySelectorAll("select#pa_malzeme-turu")[0]
//   .addEventListener("click", () => {
//     onlyTwoTypeOfProductsCanNotBeLamination();
//     onlyOneSizeChoicesCanShow();
//   });
//   document
//     .querySelectorAll("select#pa_olculer")[0]
//     .addEventListener("click", () => {
//       onlyTwoTypeOfProductsCanNotBeLamination();
//       onlyOneSizeChoicesCanShow();
//     });
//   // When product select change
// document
//   .querySelectorAll("select#pa_malzeme-turu")[0]
//   .addEventListener("change", () => {
//     cleanAllSelects();
//     theseProductsAreNotDoubleSide();
//     reflectorAndPhotolumenCanApplyPlate();
//     sameProductsNeedHide()
//   });

//     // When product size select change
// document
// .querySelectorAll("select#pa_olculer")[0]
// .addEventListener("change", () => {
//   showPlateIfOnlySizeFits();
// });


//   // document.querySelectorAll("select#pa_malzeme-turu")[0].setAttribute( "onchange", "setData(this.value)" );
//   // document.querySelectorAll("select#pa_olculer")[0].setAttribute( "onchange", "setData(this.value)" );

// window.onload = function () {
//   onlyOneSizeChoicesCanShow();
//   reflectorAndPhotolumenCanApplyPlate();
//   theseProductsAreNotDoubleSide();
//   cleanAllSelects();
//   sameProductsNeedHide()
//   for (
//     var i = 0;
//     i < document.querySelectorAll("input.wc-pao-addon-checkbox").length;
//     i++
//   ) {
//     document
//       .querySelectorAll("input.wc-pao-addon-checkbox")
//       [i].setAttribute("onchange", "singleChoice(this.value)");
//   }
 
// };

// // function setData(value) {
// //   e = document.querySelectorAll("select#pa_malzeme-turu")[0];
// //   document.querySelectorAll("input[value=\'25x35\']")[0].checked = false;
// //   document.querySelectorAll("input[value=\'35x50\']")[0].checked = false;
// //   document.querySelectorAll("input[value=\'50x70\']")[0].checked = false;
// //   document.querySelectorAll("input[value=\'70x100\']")[0].checked = false;
// //   var selectedOption = e.options[e.selectedIndex].value;

// //   // case 1
// //   if ((selectedOption == "fotolumen") | (selectedOption == "reflektorlu")) {
// //     document.querySelectorAll(
// //       "div.wc-pao-addon-pvc-uzerine-uygulama"
// //     )[0].hidden = false;
// //     document.querySelectorAll("div.wc-pao-addon-etiket")[0].hidden = false;

// //     if (value == "8x12") {
// //       document.querySelectorAll(
// //         "div.wc-pao-addon-sac-uzerine-uygulama"
// //       )[0].hidden = true;
// //       return;
// //     }
// //     if (value == "12x17") {
// //       document.querySelectorAll(
// //         "div.wc-pao-addon-sac-uzerine-uygulama"
// //       )[0].hidden = true;
// //       return;
// //     }
// //     if (value == "17x25") {
// //       document.querySelectorAll(
// //         "div.wc-pao-addon-sac-uzerine-uygulama"
// //       )[0].hidden = true;
// //       return;
// //     }
// //     document.querySelectorAll(
// //       "div.wc-pao-addon-sac-uzerine-uygulama"
// //     )[0].hidden = false;
// //     var classes = {
// //       "25x35": "p.wc-pao-addon-" + dataID + "-sac-uzerine-uygulama-3-0",
// //       "35x50": "p.wc-pao-addon-" + dataID + "-sac-uzerine-uygulama-3-1",
// //       "50x70": "p.wc-pao-addon-" + dataID + "-sac-uzerine-uygulama-3-2",
// //       "70x100": "p.wc-pao-addon-" + dataID + "-sac-uzerine-uygulama-3-3",
// //     };

// //     var elements = ["25x35", "35x50", "50x70", "70x100"];

// //     if (value == selectedOption) {
// //       document.querySelectorAll(classes[elements[0]])[0].hidden = false;
// //       document.querySelectorAll(classes[elements[1]])[0].hidden = true;
// //       document.querySelectorAll(classes[elements[2]])[0].hidden = true;
// //       document.querySelectorAll(classes[elements[3]])[0].hidden = true;
// //     }

// //     elements = elements.remove(value);
// //     value != selectedOption
// //       ? (document.querySelectorAll(classes[value])[0].hidden = false)
// //       : {};
// //     value != selectedOption
// //       ? (document.querySelectorAll(classes[elements[0]])[0].hidden = true)
// //       : {};
// //     value != selectedOption
// //       ? (document.querySelectorAll(classes[elements[1]])[0].hidden = true)
// //       : {};
// //     value != selectedOption
// //       ? (document.querySelectorAll(classes[elements[2]])[0].hidden = true)
// //       : {};
// //   } else {
// //     document.querySelectorAll(
// //       "div.wc-pao-addon-sac-uzerine-uygulama"
// //     )[0].hidden = true;
// //     document.querySelectorAll(
// //       "div.wc-pao-addon-pvc-uzerine-uygulama"
// //     )[0].hidden = true;
// //     document.querySelectorAll("div.wc-pao-addon-etiket")[0].hidden = true;
// //   }
// // }

// function singleChoice(except) {
//   inputs = document.querySelectorAll("input.wc-pao-addon-checkbox");
//   for (var i = 0; i < inputs.length; i++) {
//     if (inputs[i].value == except) {
//       continue;
//     }
//     inputs[i].checked = false;
//   }
// }

// Array.prototype.remove = function (from, to) {
//   orj = from;
//   this.splice(
//     from,
//     (to = [0, from || 1, ++to - from][arguments.length]) < 0
//       ? this.length + to
//       : to
//   );
//   return this.filter((orj) => to.indexOf(orj) === -1);
// };

