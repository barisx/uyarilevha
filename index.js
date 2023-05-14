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
        activateTriggerUpdateOptions();

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
        activateTriggerUpdateOptions();

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
        "reflektordoubleside": false,
        "fotolumendoubleside": false,
    },
    fotolumen: {
        "etiket": true,
        "sac": validSacSize(),
        "pvc": true,
        "laminasyon": true,
        "doubleside": false,
        "reflektordoubleside": false,
        "fotolumendoubleside": true,
    },
    reflektorlu: {
        "etiket": true,
        "sac": validSacSize(),
        "pvc": true,
        "laminasyon": true,
        "doubleside": false,
        "reflektordoubleside": true,
        "fotolumendoubleside": false,
    },
    dekota: {
        "etiket": false,
        "sac": false,
        "pvc": false,
        "laminasyon": true,
        "doubleside": true,
        "reflektordoubleside": false,
        "fotolumendoubleside": false,
    },
    sac: {
        "etiket": false,
        "sac": false,
        "pvc": false,
        "laminasyon": false,
        "doubleside": true,
        "reflektordoubleside": false,
        "fotolumendoubleside": false,
    },
    etiket: {
        "etiket": false,
        "sac": false,
        "pvc": false,
        "laminasyon": false,
        "doubleside": false,
        "reflektordoubleside": false,
        "fotolumendoubleside": false,
    },
    magnet: {
        "etiket": false,
        "sac": false,
        "pvc": false,
        "laminasyon": true,
        "doubleside": false,
        "reflektordoubleside": false,
        "fotolumendoubleside": false,
    },
}

function updateChooses() {
    Object.entries(chooseClassObject[choosenDataType]).forEach(dict => {
        const [ key, value ] = dict;
        document.querySelector(applyClassList[key]).hidden = !value;
    })
}

function closeAllApplyableMaterials() {
    Object.values(applyClassList).forEach(element => document.querySelector(element).hidden = true)
}

function openAllApplyableMaterials() {
    Object.values(applyClassList).forEach(element => document.querySelector(element).hidden = false)
}

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
var applyClassList = {
    "sac": "div.wc-pao-addon-sac-uzerine-uygulama",
    "etiket": "div.wc-pao-addon-sadece-etiket",
    "pvc": "div.wc-pao-addon-pvc-uzerine-uygulama",
    "laminasyon": "div.wc-pao-addon-laminasyon-koruyucu-yuzey-kaplama",
    "doubleside": "div.wc-pao-addon-cift-yon-baski-secenegi",
    "reflektordoubleside": "div.wc-pao-addon-reflektor-cift-yon",
    "fotolumendoubleside": "div.wc-pao-addon-fotolumen-cift-yon"
}

var sizeClassComponents = {
    "8x12": ["p.wc-pao-addon-" + dataID + "-cift-yon-baski-secenegi-7-0", "p.wc-pao-addon-" + dataID + "-laminasyon-koruyucu-yuzey-kaplama-3-0", "p.wc-pao-addon-" + dataID + "-sadece-etiket-6-0", "p.wc-pao-addon-" + dataID + "-fotolumen-cift-yon-8-0", "p.wc-pao-addon-" + dataID + "-reflektor-cift-yon-9-0"],
    "12x17": ["p.wc-pao-addon-" + dataID + "-cift-yon-baski-secenegi-7-1", "p.wc-pao-addon-" + dataID + "-laminasyon-koruyucu-yuzey-kaplama-3-1", "p.wc-pao-addon-" + dataID + "-sadece-etiket-6-1", "p.wc-pao-addon-" + dataID + "-fotolumen-cift-yon-8-1", "p.wc-pao-addon-" + dataID + "-reflektor-cift-yon-9-1"],
    "17x25": ["p.wc-pao-addon-" + dataID + "-cift-yon-baski-secenegi-7-2", "p.wc-pao-addon-" + dataID + "-laminasyon-koruyucu-yuzey-kaplama-3-2", "p.wc-pao-addon-" + dataID + "-sadece-etiket-6-2", "p.wc-pao-addon-" + dataID + "-fotolumen-cift-yon-8-2", "p.wc-pao-addon-" + dataID + "-reflektor-cift-yon-9-2"],
    "25x35": ["p.wc-pao-addon-" + dataID + "-cift-yon-baski-secenegi-7-3", "p.wc-pao-addon-" + dataID + "-laminasyon-koruyucu-yuzey-kaplama-3-3", "p.wc-pao-addon-" + dataID + "-sac-uzerine-uygulama-4-0", "p.wc-pao-addon-" + dataID + "-sadece-etiket-6-3", "p.wc-pao-addon-" + dataID + "-fotolumen-cift-yon-8-3", "p.wc-pao-addon-" + dataID + "-reflektor-cift-yon-9-3"],
    "35x50": ["p.wc-pao-addon-" + dataID + "-cift-yon-baski-secenegi-7-4", "p.wc-pao-addon-" + dataID + "-laminasyon-koruyucu-yuzey-kaplama-3-4", "p.wc-pao-addon-" + dataID + "-sac-uzerine-uygulama-4-1", "p.wc-pao-addon-" + dataID + "-sadece-etiket-6-4", "p.wc-pao-addon-" + dataID + "-fotolumen-cift-yon-8-4", "p.wc-pao-addon-" + dataID + "-reflektor-cift-yon-9-4"],
    "50x70": ["p.wc-pao-addon-" + dataID + "-cift-yon-baski-secenegi-7-5", "p.wc-pao-addon-" + dataID + "-laminasyon-koruyucu-yuzey-kaplama-3-5", "p.wc-pao-addon-" + dataID + "-sac-uzerine-uygulama-4-2", "p.wc-pao-addon-" + dataID + "-sadece-etiket-6-5", "p.wc-pao-addon-" + dataID + "-fotolumen-cift-yon-8-5", "p.wc-pao-addon-" + dataID + "-reflektor-cift-yon-9-5"],
    "70x100": ["p.wc-pao-addon-" + dataID + "-cift-yon-baski-secenegi-7-6", "p.wc-pao-addon-" + dataID + "-laminasyon-koruyucu-yuzey-kaplama-3-6", "p.wc-pao-addon-" + dataID + "-sac-uzerine-uygulama-4-3", "p.wc-pao-addon-" + dataID + "-sadece-etiket-6-6", "p.wc-pao-addon-" + dataID + "-fotolumen-cift-yon-8-6", "p.wc-pao-addon-" + dataID + "-reflektor-cift-yon-9-6"],
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
    document.querySelector("input[name=\'addon-" + dataID + "-sac-uzerine-uygulama-4[]\']").checked = false
    document.querySelector("input[name=\'addon-" + dataID + "-pvc-uzerine-uygulama-5[]\']").checked = false
    document.querySelector("input[name=\'addon-" + dataID + "-sadece-etiket-6[]\']").checked = false
    document.querySelector("input[name=\"" + selectedMaterial + "\"]").checked = true
}

function change(iconID) {
    if (document.getElementById(iconID).className == "icon-angle-up") {
        document.getElementById(iconID).className = "icon-angle-down";
    } else {
        document.getElementById(iconID).className = "icon-angle-up";
    }
}

var applyInputList = {
    "sac": `addon-${dataID}-sac-uzerine-uygulama-4[]`,
    "etiket": `addon-${dataID}-sadece-etiket-6[]`,
    "pvc": `addon-${dataID}-pvc-uzerine-uygulama-5[]`,
    "laminasyon": `addon-${dataID}-laminasyon-koruyucu-yuzey-kaplama-3[]`,
    "cift": `addon-${dataID}-cift-yon-baski-secenegi-7[]`,
};

var chooseInputObject = {
    pvc: {
        "etiket": false,
        "sac": false,
        "laminasyon": true,
        "cift": true,
    },
    sac: {
        "etiket": false,
        "pvc": false,
        "laminasyon": false,
        "cift": true,
    },
    etiket: {
        "sac": false,
        "pvc": false,
        "laminasyon": false,
        "cift": false,
    },
    laminasyon: {
        "etiket": false,
        "sac": false,
        "pvc": true,
        "cift": true,
    },
    cift: {
        "etiket": false,
        "sac": true,
        "pvc": true,
        "laminasyon": true,
    },
};

function activateTriggerUpdateOptions() {
    document
        .querySelectorAll("input[name^=\'addon-" + dataID + "-\']")
        .forEach(input => input.addEventListener("click", triggerUpdateOptions));
}

function triggerUpdateOptions(event) {
    const clickedElement = event.target;
    const elementName = clickedElement.name;

    const choosenDataType = Object.keys(chooseInputObject).find(key =>
        elementName.includes(key)
    );
    console.log({ choosenDataType })
    updateOptions(choosenDataType);
}

function updateOptions(choosenDataType) {
    Object.entries(chooseInputObject[choosenDataType]).forEach(entry => {
        const [key, value] = entry;
        console.log({ key }, { value })
        const inputName = applyInputList[key];
        const inputElements = document.querySelectorAll(`input[name=\'${inputName}\']`);
        console.log({ inputName }, { inputElements })
        if (!value) {
            inputElements.forEach(e => e.checked = false)
        }
    });
}