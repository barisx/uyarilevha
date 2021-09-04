document.querySelectorAll("select#pa_malzeme-turu")[0].setAttribute( "onchange", "setData(this.value)" );
document.querySelectorAll("select#pa_olculer")[0].setAttribute( "onchange", "setData(this.value)" );


window.onload = function() {
    for (var i = 0; i < document.querySelectorAll("input.wc-pao-addon-checkbox").length ; i++){
      document.querySelectorAll("input.wc-pao-addon-checkbox")[i].setAttribute( "onchange", "singleChoice(this.value)" );
    }
    document.querySelectorAll("div.wc-pao-addon-sac-uzerine-uygulama")[0].hidden = true;
    document.querySelectorAll("div.wc-pao-addon-pvc-uzerine-uygulama-uzerine-uygulama")[0].hidden = true;
    document.querySelectorAll("div.wc-pao-addon-etiket")[0].hidden = true;
};

function setData(value){
    e = document.querySelectorAll("select#pa_malzeme-turu")[0];
    document.querySelectorAll("input[value='25x35']")[0].checked = false;
    document.querySelectorAll("input[value='35x50']")[0].checked = false;
    document.querySelectorAll("input[value='50x70']")[0].checked = false;
    document.querySelectorAll("input[value='70x100']")[0].checked = false;
    var selectedOption = e.options[e.selectedIndex].value
    if (selectedOption == "fotolumen" | selectedOption == "reflektorlu" ) {
        
        document.querySelectorAll("div.wc-pao-addon-pvc-uzerine-uygulama-uzerine-uygulama")[0].hidden = false
        document.querySelectorAll("div.wc-pao-addon-etiket")[0].hidden = false

        if (value=="8x12") { document.querySelectorAll("div.wc-pao-addon-sac-uzerine-uygulama")[0].hidden = true; return}
        if (value=="12x17") { document.querySelectorAll("div.wc-pao-addon-sac-uzerine-uygulama")[0].hidden = true; return }
        if (value=="17x25") { document.querySelectorAll("div.wc-pao-addon-sac-uzerine-uygulama")[0].hidden = true; return }
        document.querySelectorAll("div.wc-pao-addon-sac-uzerine-uygulama")[0].hidden = false
        var classes = {
            "25x35": "p.wc-pao-addon-302-sac-2-0",
            "35x50": "p.wc-pao-addon-302-sac-2-1",
            "50x70": "p.wc-pao-addon-302-sac-2-2",
            "70x100": "p.wc-pao-addon-302-sac-2-3",
        }

        var elements = [ 
            "25x35",
            "35x50",
            "50x70",
            "70x100"
        ]

        if (value==selectedOption){
            document.querySelectorAll(classes[elements[0]])[0].hidden = false
            document.querySelectorAll(classes[elements[1]])[0].hidden = true
            document.querySelectorAll(classes[elements[2]])[0].hidden = true
            document.querySelectorAll(classes[elements[3]])[0].hidden = true
        }

        elements = elements.remove(value)
        value!=selectedOption ? document.querySelectorAll(classes[value])[0].hidden = false : {};
        value!=selectedOption ? document.querySelectorAll(classes[elements[0]])[0].hidden = true : {};
        value!=selectedOption ? document.querySelectorAll(classes[elements[1]])[0].hidden = true : {};
        value!=selectedOption ? document.querySelectorAll(classes[elements[2]])[0].hidden = true : {};



    }else{
        document.querySelectorAll("div.wc-pao-addon-sac-uzerine-uygulama")[0].hidden = true
        document.querySelectorAll("div.wc-pao-addon-pvc-uzerine-uygulama-uzerine-uygulama")[0].hidden = true
        document.querySelectorAll("div.wc-pao-addon-etiket")[0].hidden = true
    }
}

function singleChoice(except) {
    console.log(except)
  inputs = document.querySelectorAll("input.wc-pao-addon-checkbox")
  for (var i = 0; i < inputs.length ; i++){
    if (inputs[i].value == except) { continue; }
    inputs[i].checked = false
  }
}

Array.prototype.remove = function(from, to){
  orj = from
  this.splice(from, (to=[0,from||1,++to-from][arguments.length])<0?this.length+to:to);
  return this.filter(orj => to.indexOf(orj) === -1);
};
