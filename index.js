function findInputElement(dataID, regexPattern) {
    // Get all the input elements that match the regular expression pattern
    const regex = new RegExp(regexPattern);
    const inputElements = document.querySelectorAll("input[name^='addon-'][name$='[]']");

    // Find the first input element that matches the pattern and return it
    for (let i = 0; i < inputElements.length; i++) {
        const name = inputElements[i].getAttribute('name');
        if (regex.test(name) && name.includes(`addon-${dataID}-`)) {
            return inputElements[i];
        }
    }

    // If no input element was found, return null
    return null;
}

document
    .querySelector("select#pa_olculer")
    .addEventListener("change", (event) => {
        document.querySelector("div.wc-pao-addons-container").querySelectorAll("input[type=checkbox]").forEach(e => e.checked = false)
        choosenSize = choosenMaterialSize()
        chooseClassObject[choosenDataType]["sac"] = choosenDataType === "reflektorlu" || choosenDataType == "fotolumen" ?
            validSacSize() :
            chooseClassObject[choosenDataType]["sac"]
        updateSizes();
        updateChooses();
    });



document
    .querySelector("select#pa_malzeme-turu")
    .addEventListener("change", (event) => {
        document.querySelector("div.wc-pao-addons-container").querySelectorAll("input[type=checkbox]").forEach(e => e.checked = false)
        choosenSize = choosenMaterialSize()
        choosenDataType = choosenMaterialType()
        chooseClassObject[choosenDataType]["sac"] = choosenDataType === "reflektorlu" || choosenDataType == "fotolumen" ?
            validSacSize() :
            chooseClassObject[choosenDataType]["sac"]
        updateSizes();
        updateChooses();
        resetLanguage();
        resetDirection();
        if (choosenDataType === "reflektorlu" || choosenDataType === "fotolumen") {
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

function resetLanguageWithClassName() {
    var element = document.querySelector("div.wc-pao-addon-ilave-dil-secenekleri").querySelectorAll("a")
    element[0].classList.add("selected")
    for (var i = 1; i < element.length; i++) {
        element[i].classList.remove("selected")
    }
}

function resetLanguage() {
    document.querySelector("select#addon-" + dataID + "-ilave-dil-secenekleri-0").selectedIndex = 0
}

function resetDirectionWithClassName() {
    var element = document.querySelector("div.wc-pao-addon-levha-sekli-istege-bagli").querySelectorAll("a")
    element[0].classList.add("selected")
    for (var i = 1; i < element.length; i++) {
        element[i].classList.remove("selected")
    }
}

function resetDirection() {
    document.querySelector("select#addon-" + dataID + "-levha-sekli-istege-bagli-1").selectedIndex = 0
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

function validSacSize() {
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

function closeAllApplyableMaterials() {
    Object.values(applyClassList).forEach(element => document.querySelector(element).hidden = true)
}

function openAllApplyableMaterials() {
    Object.values(applyClassList).forEach(element => document.querySelector(element).hidden = false)
}


var applyClassList = {
    "sac": "div.wc-pao-addon-sac-uzerine-uygulama",
    "etiket": "div.wc-pao-addon-etiket",
    "pvc": "div.wc-pao-addon-pvc-uzerine-uygulama",
    "laminasyon": "div.wc-pao-addon-laminasyon-koruyucu-yuzey-kaplama",
    "doubleside": "div.wc-pao-addon-cift-yon-baski-secenegi"
}

// var sizeClassComponents = {
//     "8x12": [`p.wc-pao-addon-${dataID}-cift-yon-baski-secenegi-${findInputElement(dataID, "\\d+")}-0`, `p.wc-pao-addon-${dataID}-laminasyon-koruyucu-yuzey-kaplama-${findInputElement(dataID, "\\d+")}-0`],
//     "12x17": [`p.wc-pao-addon-${dataID}-cift-yon-baski-secenegi-${findInputElement(dataID, "\\d+")}-1`, `p.wc-pao-addon-${dataID}-laminasyon-koruyucu-yuzey-kaplama-${findInputElement(dataID, "\\d+")}-1`],
//     "17x25": [`p.wc-pao-addon-${dataID}-cift-yon-baski-secenegi-${findInputElement(dataID, "\\d+")}-2`, `p.wc-pao-addon-${dataID}-laminasyon-koruyucu-yuzey-kaplama-${findInputElement(dataID, "\\d+")}-2`],
//     "25x35": [`p.wc-pao-addon-${dataID}-cift-yon-baski-secenegi-${findInputElement(dataID, "\\d+")}-3`, `p.wc-pao-addon-${dataID}-laminasyon-koruyucu-yuzey-kaplama-${findInputElement(dataID, "\\d+")}-3`, `p.wc-pao-addon-${dataID}-sac-uzerine-uygulama-${findInputElement(dataID, "\\d+")}-0`],
//     "35x50": [`p.wc-pao-addon-${dataID}-cift-yon-baski-secenegi-${findInputElement(dataID, "\\d+")}-4`, `p.wc-pao-addon-${dataID}-laminasyon-koruyucu-yuzey-kaplama-${findInputElement(dataID, "\\d+")}-4`, `p.wc-pao-addon-${dataID}-sac-uzerine-uygulama-${findInputElement(dataID, "\\d+")}-1`],
//     "50x70": [`p.wc-pao-addon-${dataID}-cift-yon-baski-secenegi-${findInputElement(dataID, "\\d+")}-5`, `p.wc-pao-addon-${dataID}-laminasyon-koruyucu-yuzey-kaplama-${findInputElement(dataID, "\\d+")}-5`, `p.wc-pao-addon-${dataID}-sac-uzerine-uygulama-${findInputElement(dataID, "\\d+")}-2`],
//     "70x100": [`p.wc-pao-addon-${dataID}-cift-yon-baski-secenegi-${findInputElement(dataID, "\\d+")}-6`, `p.wc-pao-addon-${dataID}-laminasyon-koruyucu-yuzey-kaplama-${findInputElement(dataID, "\\d+")}-6`, `p.wc-pao-addon-${dataID}-sac-uzerine-uygulama-${findInputElement(dataID, "\\d+")}-3`],
// };

// function updateSizes() {
//     if (!choosenSize) {
//         closeAllApplyableMaterials()
//     } else {
//         openAllApplyableMaterials()
//     }
//     Object.values(sizeClassComponents).forEach(e => {
//         for (var i = 0; i < e.length; i++) {
//             const inputElement = findInputElement(dataID, "\\d+");
//             if (inputElement) {
//                 const componentNumber = inputElement.value;
//                 const selector = e[i].replace(/\d+/, componentNumber);
//                 document.querySelector(selector).hidden = true;
//             }
//         }
//     })
//     Object.values(sizeClassComponents[choosenMaterialSize()]).forEach((element) => {
//         const inputElement = findInputElement(dataID, "\\d+");
//         if (inputElement) {
//             const componentNumber = inputElement.value;
//             const selector = element.replace(/\d+/, componentNumber);
//             document.querySelector(selector).hidden = false;
//         }
//     });
// }




var sizeClassComponents = {
    "8x12": ["p.wc-pao-addon-" + dataID + "-cift-yon-baski-secenegi-7-0", "p.wc-pao-addon-" + dataID + "-laminasyon-koruyucu-yuzey-kaplama-3-0"],
    "12x17": ["p.wc-pao-addon-" + dataID + "-cift-yon-baski-secenegi-7-1", "p.wc-pao-addon-" + dataID + "-laminasyon-koruyucu-yuzey-kaplama-3-1"],
    "17x25": ["p.wc-pao-addon-" + dataID + "-cift-yon-baski-secenegi-7-2", "p.wc-pao-addon-" + dataID + "-laminasyon-koruyucu-yuzey-kaplama-3-2"],
    "25x35": ["p.wc-pao-addon-" + dataID + "-cift-yon-baski-secenegi-7-3", "p.wc-pao-addon-" + dataID + "-laminasyon-koruyucu-yuzey-kaplama-3-3", "p.wc-pao-addon-" + dataID + "-sac-uzerine-uygulama-4-0"],
    "35x50": ["p.wc-pao-addon-" + dataID + "-cift-yon-baski-secenegi-7-4", "p.wc-pao-addon-" + dataID + "-laminasyon-koruyucu-yuzey-kaplama-3-4", "p.wc-pao-addon-" + dataID + "-sac-uzerine-uygulama-4-1"],
    "50x70": ["p.wc-pao-addon-" + dataID + "-cift-yon-baski-secenegi-7-5", "p.wc-pao-addon-" + dataID + "-laminasyon-koruyucu-yuzey-kaplama-3-5", "p.wc-pao-addon-" + dataID + "-sac-uzerine-uygulama-4-2"],
    "70x100": ["p.wc-pao-addon-" + dataID + "-cift-yon-baski-secenegi-7-6", "p.wc-pao-addon-" + dataID + "-laminasyon-koruyucu-yuzey-kaplama-3-6", "p.wc-pao-addon-" + dataID + "-sac-uzerine-uygulama-4-3"],
};

function updateSizes() {
    if (!choosenSize) {
        closeAllApplyableMaterials()
    } else {
        openAllApplyableMaterials()
    }
    Object.values(sizeClassComponents).forEach(e => {
        for (var i = 0; i < e.length; i++) {
            document.querySelector(e[i]).hidden = true
        }
    })
    Object.values(sizeClassComponents[choosenMaterialSize()]).forEach((element) => document.querySelector(element).hidden = false)
}

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
    document.querySelector("input[name=\'addon-" + dataID + "-sac-uzerine-uygulama-4[]\']").checked = false
    document.querySelector("input[name=\'addon-" + dataID + "-pvc-uzerine-uygulama-5[]\']").checked = false
    document.querySelector("input[name=\'addon-" + dataID + "-etiket-6[]\']").checked = false
    document.querySelector("input[name=\"" + selectedMaterial + "\"]").checked = true
}

function disableLamination() {
    // addon-302-laminasyon-koruyucu-yuzey-kaplama-3[]
    document.querySelectorAll("input[name=\'addon-" + dataID + "-laminasyon-koruyucu-yuzey-kaplama-3[]\']")[3].checked = false
    document.querySelectorAll("input[name=\'addon-" + dataID + "-laminasyon-koruyucu-yuzey-kaplama-3[]\']")[3].disable = true
}

function activeLamination() {
    // addon-302-laminasyon-koruyucu-yuzey-kaplama-3[]
    document.querySelectorAll("input[name=\'addon-" + dataID + "-laminasyon-koruyucu-yuzey-kaplama-3[]\']")[3].checked = false
    document.querySelectorAll("input[name=\'addon-" + dataID + "-laminasyon-koruyucu-yuzey-kaplama-3[]\']")[3].disable = false
}


function disableSacAndEtiket() {
    document.querySelector("input[name=\'addon-" + dataID + "-sac-uzerine-uygulama-4[]\']").checked = false
    document.querySelector("input[name=\'addon-" + dataID + "-sac-uzerine-uygulama-4[]\']").disable = true
    document.querySelector("input[name=\'addon-" + dataID + "-etiket-6[]\']").checked = false
    document.querySelector("input[name=\'addon-" + dataID + "-etiket-6[]\']").disable = true
}

function activeSacAndEtiket() {
    document.querySelector("input[name=\'addon-" + dataID + "-sac-uzerine-uygulama-4[]\']").checked = false
    document.querySelector("input[name=\'addon-" + dataID + "-sac-uzerine-uygulama-4[]\']").disable = false
    document.querySelector("input[name=\'addon-" + dataID + "-etiket-6[]\']").checked = false
    document.querySelector("input[name=\'addon-" + dataID + "-etiket-6[]\']").disable = false
}

function checkLamination() {
    if (document.querySelectorAll("input[name=\'addon-" + dataID + "-laminasyon-koruyucu-yuzey-kaplama-3[]\']")[3].checked) {
        // true
        disableSacAndEtiket()
    } else {
        activeSacAndEtiket()
    }
}

function checkSac() {
    if (document.querySelector("input[name=\'addon-" + dataID + "-sac-uzerine-uygulama-4[]\']").checked) {
        disableLamination()
    } else {
        activeLamination()
    }
}

function disableDoubleSide() {
    // addon-302-cift-yon-baski-secenegi-7[]
    document.querySelectorAll("input[name=\'addon-" + dataID + "-cift-yon-baski-secenegi-7[]\']").forEach(e => { e.checked = false })
    document.querySelectorAll("input[name=\'addon-" + dataID + "-cift-yon-baski-secenegi-7[]\']").forEach(e => { e.disable = true })
}

function activeDoubleSide() {
    // addon-302-cift-yon-baski-secenegi-7[]
    document.querySelectorAll("input[name=\'addon-" + dataID + "-cift-yon-baski-secenegi-7[]\']").forEach(e => { e.disable = false })
}

function checkEtiket() {
    if (document.querySelector("input[name=\'addon-" + dataID + "-etiket-6[]\']").checked) {
        disableDoubleSide()
    } else {
        activeDoubleSide()
    }
}

function disableEtiket() {
    // addon-302-cift-yon-baski-secenegi-7[]
    document.querySelector("input[name=\'addon-" + dataID + "-etiket-6[]\']").checked = false
    document.querySelector("input[name=\'addon-" + dataID + "-etiket-6[]\']").disable = true
}

function activeEtiket() {
    // addon-302-cift-yon-baski-secenegi-7[]
    document.querySelector("input[name=\'addon-" + dataID + "-etiket-6[]\']").disable = false
}

function checkDoubleSide() {
    if (document.querySelector("input[name=\'addon-" + dataID + "-etiket-6[]\']").checked) {
        disableEtiket()
    } else {
        activeEtiket()
    }
}

function addListenerForApplyableMaterials() {
    document
        .querySelector("input[name=\'addon-" + dataID + "-etiket-6[]\']")
        .addEventListener("click", (e) => {
            reflectorAndPhotolumenOnlyPVCOrSACOrEtiket(e.srcElement.name)
            checkSac()
            checkEtiket()
            disableDoubleSide()
        }, {
            passive: false
        })

    document
        .querySelector("input[name=\'addon-" + dataID + "-sac-uzerine-uygulama-4[]\']")
        .addEventListener("click", (e) => {
            reflectorAndPhotolumenOnlyPVCOrSACOrEtiket(e.srcElement.name)
            checkSac()
        }, {
            passive: false
        })

    document
        .querySelector("input[name=\'addon-" + dataID + "-pvc-uzerine-uygulama-5[]\']")
        .addEventListener("click", (e) => {
            reflectorAndPhotolumenOnlyPVCOrSACOrEtiket(e.srcElement.name)
        }, {
            passive: false
        })

    document
        .querySelectorAll("input[name=\'addon-" + dataID + "-laminasyon-koruyucu-yuzey-kaplama-3[]\']")
        .forEach(e => e.addEventListener("click", (e) => {
            checkLamination()
        }, {
            passive: false
        }))

    document.querySelectorAll("input[name=\'addon-" + dataID + "-cift-yon-baski-secenegi-7[]\']")
        .forEach(e => e.addEventListener("click", (e) => {
            checkDoubleSide()
            disableEtiket()
        }, {
            passive: false
        }))
}

function removeListenerForApplyableMaterials() {
    document
        .querySelector("input[name=\'addon-" + dataID + "-etiket-6[]\']")
        .addEventListener("click", (e) => {
            reflectorAndPhotolumenOnlyPVCOrSACOrEtiket(e.srcElement.name)
        }, {
            passive: true
        });

    document
        .querySelector("input[name=\'addon-" + dataID + "-sac-uzerine-uygulama-4[]\']")
        .addEventListener("click", (e) => {
            reflectorAndPhotolumenOnlyPVCOrSACOrEtiket(e.srcElement.name)
        }, {
            passive: true
        });

    document
        .querySelector("input[name=\'addon-" + dataID + "-pvc-uzerine-uygulama-5[]\']")
        .addEventListener("click", (e) => {
            reflectorAndPhotolumenOnlyPVCOrSACOrEtiket(e.srcElement.name)
        }, {
            passive: true
        });
}

function change(iconID) {
    if (document.getElementById(iconID).className == "icon-angle-up") {
        document.getElementById(iconID).className = "icon-angle-down";
    } else {
        document.getElementById(iconID).className = "icon-angle-up";
    }
}
