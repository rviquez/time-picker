var TimePicker = function () {
    "use strict";

    var config;
    var TEXTFIELD;
    var INPUTID;
    var OVERLAY;
    var OK;
    var CANCEL;
    var HOURDISPLAY;
    var MINUTESDISPLAY;
    var AMPM;

    var HOURHAND;
    var TOPCIRCLE;
    var HOURS;
    var MILITARY;
    var MINUTES;
    
    function setConfiguration(configObject, event) {
        TEXTFIELD = document.querySelector("#"+event.target.id);
        config = configObject;
        OVERLAY = document.querySelector("#overlay");
        if (!OVERLAY) {
            addModalDialog();
        }
        runTheClock();
        displayClock();
    }

    function runTheClock() {
        OVERLAY = document.querySelector("#overlay");
        OK = document.querySelector("#ok");
        CANCEL = document.querySelector("#cancel");
        HOURDISPLAY = document.querySelector("#hour-display");
        MINUTESDISPLAY = document.querySelector("#minutes-display");
        AMPM = document.querySelector("#ampm");
        HOURHAND = document.querySelector("#hour");
        TOPCIRCLE = document.querySelector("#top-circle");
        HOURS = document.querySelector("#hours");
        MILITARY = document.querySelector("#military");
        MINUTES = document.querySelector("#minutes");
        activateEventListeners();
    }

    function activateEventListeners() {

        OK.addEventListener("click", okClicked);
        CANCEL.addEventListener("click", cancelClicked);
        HOURS.addEventListener("click", getHour);
        MILITARY.addEventListener("click", getHour);
        MINUTES.addEventListener("click", getMinute);
        AMPM.addEventListener("click", setMeridian);
        HOURDISPLAY.addEventListener("click", displayHours);
        MINUTESDISPLAY.addEventListener("click", displayMinutes);
    }

    function displayClock() {
        var hr = "";
        var min = "";
        var meridian = "";
        displayHours();

        hideOverlay();
        config.isMilitaryTime ? AMPM.classList.add("hidden") : AMPM.classList.remove("hidden");
        if (TEXTFIELD.value) {
            hr = TEXTFIELD.value.substring(0, 2);
            min = TEXTFIELD.value.substring(3, 5);
            meridian = TEXTFIELD.value.substring(6, 8);
        } else {
            var date = new Date();
            meridian = date.getHours() > 11 ? "pm" : "am";
            hr = convertTimeFormat(config.isMilitaryTime ? date.getHours() : (date.getHours() % 12 || 12));
            min = convertTimeFormat(date.getMinutes());
        }
        updateTimeSelected(hr, "hour");
        updateTimeSelected(min, "minute");
        updateClock(hr, "hour");
        AMPM.textContent = meridian;
    }

    function addModalDialog() {
        var div = document.createElement("div");
        div.id = "overlay";
        div.className = "overlay hidden";

        div.innerHTML = '<div class="container">\
            <div class="title">\
                <h1>\
                    <div id="time-display"> \
                        <span id="hour-display" class="selected"></span>:<span id="minutes-display"></span>\
                        <span id="ampm" class="hidden">am</span>\
                    </div>\
                </h1>\
            </div>\
            <div class="hour-clockbox">\
                <svg id="hour-clock" xmlns="http://www.w3.org/2000/svg" width="350" height="280" viewBox="0 0 600 600">\
                    <g id="face">\
                        <circle class="circle" cx="300" cy="300" r="253.9" />\
                        <circle class="mid-circle" cx="300" cy="300" r="6" />\
                    </g>\
                    <g id="hour" fill="#2196f3"> \
                        <path class="hour-arm" d="M300.5 298V98"/>\
                        <circle id="top-circle" cx="300" cy="74" r="25" />\
                        <circle class="sizing-box" cx="300" cy="300" r="253.9" />\
                    </g>\
                    <g id="hours" > \
                        <text id="one" class="meridian-time" x="408" y="110" fill="black">1</text>\
                        <text id="two" class="meridian-time" x="490" y="194" fill="black">2</text>\
                        <text id="three" class="meridian-time" x="520" y="306" fill="black">3</text>\
                        <text id="four" class="meridian-time" x="490" y="420" fill="black">4</text>\
                        <text id="five" class="meridian-time" x="408" y="504" fill="black">5</text>\
                        <text id="six" class="meridian-time" x="294" y="534" fill="black">6</text>\
                        <text id="seven" class="meridian-time" x="182" y="504" fill="black">7</text>\
                        <text id="eight" class="meridian-time" x="100" y="420" fill="black">8</text>\
                        <text id="nine" class="meridian-time" x="68" y="306" fill="black">9</text>\
                        <text id="ten" class="meridian-time" x="92" y="194" fill="black">10</text>\
                        <text id="eleven" class="meridian-time" x="176" y="110" fill="black">11</text>\
                        <text id="twelve" class="meridian-time" x="286" y="80" fill="black">12</text>\
                    </g>\
                    <g id="military" > \
                        <text id="zero" class="military-time" x="290" y="126" fill="black">00</text>\
                        <text id="thirteen" class="military-time" x="382" y="150" fill="black">13</text>\
                        <text id="fourteen" class="military-time" x="446" y="214" fill="black">14</text>\
                        <text id="fifteen" class="military-time" x="470" y="306" fill="black">15</text>\
                        <text id="sixteen" class="military-time" x="446" y="396" fill="black">16</text>\
                        <text id="seventeen" class="military-time" x="382" y="462" fill="black">17</text>\
                        <text id="eighteen" class="military-time" x="290" y="488" fill="black">18</text>\
                        <text id="nineteen" class="military-time" x="200" y="462" fill="black">19</text>\
                        <text id="twenty" class="military-time" x="134" y="396" fill="black">20</text>\
                        <text id="twentyone" class="military-time" x="110" y="306" fill="black">21</text>\
                        <text id="twentytwo" class="military-time" x="134" y="214" fill="black">22</text>\
                        <text id="twentythree" class="military-time" x="200" y="150" fill="black">23</text>\
                    </g>\
                    <g id="minutes" class="hidden" > \
                        <text id="00" class="meridian-time" x="288" y="80" fill="black">00</text>\
                        <circle id="01" cx="324" cy="75" r="18" fill="transparent" />\
                        <circle id="02" cx="347" cy="79" r="18" fill="transparent" />\
                        <circle id="03" cx="370" cy="85" r="18" fill="transparent" />\
                        <circle id="04" cx="393" cy="93" r="18" fill="transparent" />\
                        <text id="05" class="meridian-time" x="408" y="110" fill="black">05</text>\
                        <circle id="06" cx="433" cy="116" r="18" fill="transparent" />\
                        <circle id="07" cx="452" cy="132" r="18" fill="transparent" />\
                        <circle id="08" cx="468" cy="148" r="18" fill="transparent" />\
                        <circle id="09" cx="483" cy="167" r="18" fill="transparent" />\
                        <text id="10" class="meridian-time" x="490" y="194" fill="black">10</text>\
                        <circle id="11" cx="507" cy="207" r="18" fill="transparent" />\
                        <circle id="12" cx="515" cy="230" r="18" fill="transparent" />\
                        <circle id="13" cx="521" cy="253" r="18" fill="transparent" />\
                        <circle id="14" cx="525" cy="276" r="18" fill="transparent" />\
                        <text id="15" class="meridian-time" x="520" y="306" fill="black">15</text>\
                        <circle id="16" cx="525" cy="324" r="18" fill="transparent" />\
                        <circle id="17" cx="521" cy="347" r="18" fill="transparent" />\
                        <circle id="18" cx="515" cy="369" r="18" fill="transparent" />\
                        <circle id="19" cx="507" cy="392" r="18" fill="transparent" />\
                        <text id="20" class="meridian-time" x="490" y="420" fill="black">20</text>\
                        <circle id="21" cx="484" cy="432" r="18" fill="transparent" />\
                        <circle id="22" cx="468" cy="451" r="18" fill="transparent" />\
                        <circle id="23" cx="451" cy="468" r="18" fill="transparent" />\
                        <circle id="24" cx="433" cy="483" r="18" fill="transparent" />\
                        <text id="25" class="meridian-time" x="408" y="504" fill="black">25</text>\
                        <circle id="26" cx="392" cy="506" r="18" fill="transparent" />\
                        <circle id="27" cx="371" cy="515" r="18" fill="transparent" />\
                        <circle id="28" cx="347" cy="521" r="18" fill="transparent" />\
                        <circle id="29" cx="323" cy="525" r="18" fill="transparent" />\
                        <text id="30" class="meridian-time" x="294" y="534" fill="black">30</text>\
                        <circle id="31" cx="277" cy="525" r="18" fill="transparent" />\
                        <circle id="32" cx="253" cy="521" r="18" fill="transparent" />\
                        <circle id="33" cx="230" cy="515" r="18" fill="transparent" />\
                        <circle id="34" cx="208" cy="506" r="18" fill="transparent" />\
                        <text id="35" class="meridian-time" x="182" y="504" fill="black">35</text>\
                        <circle id="36" cx="168" cy="483" r="18" fill="transparent" />\
                        <circle id="37" cx="149" cy="467" r="18" fill="transparent" />\
                        <circle id="38" cx="132" cy="451" r="18" fill="transparent" />\
                        <circle id="39" cx="117" cy="432" r="18" fill="transparent" />\
                        <text id="40" class="meridian-time" x="100" y="420" fill="black">40</text>\
                        <circle id="41" cx="94" cy="392" r="18" fill="transparent" />\
                        <circle id="42" cx="85" cy="370" r="18" fill="transparent" />\
                        <circle id="43" cx="79" cy="347" r="18" fill="transparent" />\
                        <circle id="44" cx="75" cy="324" r="18" fill="transparent" />\
                        <text id="45" class="meridian-time" x="68" y="306" fill="black">45</text>\
                        <circle id="46" cx="75" cy="276" r="18" fill="transparent" />\
                        <circle id="47" cx="79" cy="253" r="18" fill="transparent" />\
                        <circle id="48" cx="85" cy="230" r="18" fill="transparent" />\
                        <circle id="49" cx="94" cy="208" r="18" fill="transparent" />\
                        <text id="50" class="meridian-time" x="92" y="194" fill="black">50</text>\
                        <circle id="51" cx="117" cy="167" r="18" fill="transparent" />\
                        <circle id="52" cx="132" cy="148" r="18" fill="transparent" />\
                        <circle id="53" cx="149" cy="131" r="18" fill="transparent" />\
                        <circle id="54" cx="167" cy="117" r="18" fill="transparent" />\
                        <text id="55" class="meridian-time" x="176" y="110" fill="black">55</text>\
                        <circle id="56" cx="208" cy="93" r="18" fill="transparent" />\
                        <circle id="57" cx="230" cy="85" r="18" fill="transparent" />\
                        <circle id="58" cx="253" cy="79" r="18" fill="transparent" />\
                        <circle id="59" cx="277" cy="75" r="18" fill="transparent" />\
                    </g>\
                </svg>\
            </div>\
            <div class="clock-footer">\
                <a id = "cancel" >Cancel</a>\
                <a id = "ok" >Ok</a>\
            </div>\
        </div>';

        document.body.appendChild(div);
        OVERLAY = document.querySelector("#overlay");
    }

    function okClicked(event) {
        console.log(event);
        
        console.log(TEXTFIELD);
        var time = HOURDISPLAY.textContent + ":" + MINUTESDISPLAY.textContent;
        !config.isMilitaryTime ? time += " " + AMPM.textContent : "";
        TEXTFIELD.value = time;
        hideOverlay();
    }

    function cancelClicked() {
        hideOverlay();
    }

    function getHour(event) {
        var type = "hour";
        var time = event.path[0].textContent * 1;
        updateTimeSelected(convertTimeFormat(time), type);
        displayMinutes();
        updateClock(MINUTESDISPLAY.textContent * 1, "minutes");

    }

    function getMinute(event) {
        var type = "minute";
        var time = 0;
        if (event.target.tagName === "circle") {
            time = event.path[0].id * 1;
        } else {
            time = event.path[0].textContent * 1;
        }
        updateTimeSelected(convertTimeFormat(time), type);
        updateClock(time, "minutes");
    }

    function setMeridian(event) {

        if (event.target.textContent === "am") {
            event.target.textContent = "pm";
        } else {
            event.target.textContent = "am";
        }
        AMPM.classList.contains("selected") ? "" : AMPM.classList.add("selected");
        HOURDISPLAY.classList.remove("selected");
        MINUTESDISPLAY.classList.remove("selected");
    }

    function updateTimeSelected(time, type) {
        if (type === "hour") {
            HOURDISPLAY.textContent = time;
        } else {
            MINUTESDISPLAY.textContent = time;
        }
    }

    function updateClock(time, type) {
        setHandSize(time, type);
        setHandPosition(time, type);
    }

    function convertTimeFormat(time) {
        var result;
        result = (time < 10 || time === 0) ? '0' + time : time;
        return result;
    }

    function setHandPosition(time, type) {
        var position = time * 360 / 12;
        if (type !== "hour") {
            position = time * 360 / 60;
        }
        HOURHAND.style.transform = "rotate(" + position + "deg)";
    }

    function setHandSize(time, type) {
        if (config.isMilitaryTime) {
            if (type === "hour") {
                if (time > 12 || time < 1) {
                    TOPCIRCLE.setAttribute("cy", 120);
                } else {
                    TOPCIRCLE.setAttribute("cy", 74);
                }
            } else {
                TOPCIRCLE.setAttribute("cy", 74);
            }
        }
    }

    function hideOverlay() {
        OVERLAY.classList.toggle("hidden");
    }

    function displayHours() {
        MINUTES.classList.add("hidden");
        HOURS.classList.remove("hidden");
        if (config.isMilitaryTime) {
            MILITARY.classList.remove("hidden");
        } else {
            MILITARY.classList.add("hidden");
        }
        HOURDISPLAY.classList.contains("selected") ? "" : HOURDISPLAY.classList.add("selected");
        AMPM.classList.remove("selected");
        MINUTESDISPLAY.classList.remove("selected");
    }

    function displayMinutes() {
        MINUTES.classList.remove("hidden");
        HOURS.classList.add("hidden");
        MILITARY.classList.add("hidden");

        MINUTESDISPLAY.classList.contains("selected") ? "" : MINUTESDISPLAY.classList.add("selected");
        AMPM.classList.remove("selected");
        HOURDISPLAY.classList.remove("selected");
        setHandSize();
    }
    return {
        setConfiguration: setConfiguration
    }
};