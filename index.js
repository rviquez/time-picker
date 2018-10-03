var timePicker = new TimePicker();

document.querySelector("#text-field").addEventListener("click", function(event) {
    var configObject = {
        isMilitaryTime: false
    };
    timePicker.setConfiguration(configObject, event);
});

document.querySelector("#text-field1").addEventListener("click", function (event) {
    var configObject = {
        isMilitaryTime: true
    };
    timePicker.setConfiguration(configObject, event);
});

document.querySelector("#text-field2").addEventListener("click", function (event) {
    var configObject = {
        isMilitaryTime: false
    };
    timePicker.setConfiguration(configObject, event);
});
