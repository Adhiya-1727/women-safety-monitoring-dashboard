let totalAlerts = 0;
let warningCount = 0;
let emergencyCount = 0;

let history = [];


/* ================= STATUS ================= */

function setStatus(status) {

    const statusElement = document.getElementById("status");
    const alertElement = document.getElementById("alert");
    const safetyCard = document.getElementById("safetyCard");

    const heartRate = document.getElementById("heartRate");
    const motion = document.getElementById("motion");
    const voice = document.getElementById("voice");

    const heartStatus = document.getElementById("heartStatus");
    const motionStatus = document.getElementById("motionStatus");
    const voiceStatus = document.getElementById("voiceStatus");

    const heartDetail = document.getElementById("heartDetail");
    const motionDetail = document.getElementById("motionDetail");
    const voiceDetail = document.getElementById("voiceDetail");

    const heartPill = document.getElementById("heartPill");
    const motionPill = document.getElementById("motionPill");
    const voicePill = document.getElementById("voicePill");

    const riskScore = document.getElementById("riskScore");
    const circleScore = document.getElementById("circleScore");
    const circleText = document.getElementById("circleText");
    const riskStatus = document.getElementById("riskStatus");

    const riskCircle = document.getElementById("riskCircle");

    const pageHeart = document.getElementById("pageHeart");
    const pageMotion = document.getElementById("pageMotion");
    const pageVoice = document.getElementById("pageVoice");

    const bannerText = document.getElementById("bannerText");


    let score;
    let heart;
    let motionValue;
    let voiceValue;
    let message;
    let level;


    /* SAFE */

    if (status === "SAFE") {

        score = 18;
        heart = "78 BPM";
        motionValue = "Normal";
        voiceValue = "Normal";

        message = "No threat detected";
        level = "Low Risk";

        safetyCard.className = "card safety-card";

        bannerText.textContent =
            "System is monitoring your safety.";

    }


    /* WARNING */

    else if (status === "WARNING") {

        score = 62;
        heart = "105 BPM";
        motionValue = "Sudden";
        voiceValue = "Normal";

        message =
            "Warning! Unusual activity detected";

        level = "Medium Risk";

        safetyCard.className =
            "card safety-card warning-state";

        bannerText.textContent =
            "Warning detected! Please stay alert.";

        warningCount++;
        totalAlerts++;

        addHistory(
            "WARNING",
            "Unusual activity detected"
        );

    }


    /* EMERGENCY */

    else if (status === "EMERGENCY") {

        score = 92;
        heart = "130 BPM";
        motionValue = "Sudden";
        voiceValue = "Help Detected";

        message =
            "Emergency Detected! Immediate Response Required";

        level = "High Risk";

        safetyCard.className =
            "card safety-card emergency-state";

        bannerText.textContent =
            "Emergency detected! Immediate response required.";

        emergencyCount++;
        totalAlerts++;

        addHistory(
            "EMERGENCY",
            "Immediate response required"
        );

    }


    /* MAIN VALUES */

    statusElement.textContent = status;

    alertElement.textContent = message;

    heartRate.textContent = heart;
    motion.textContent = motionValue;
    voice.textContent = voiceValue;

    heartDetail.textContent = heart;
    motionDetail.textContent = motionValue;
    voiceDetail.textContent = voiceValue;

    heartStatus.textContent =
        status === "SAFE" ? "Normal" : "Elevated";

    motionStatus.textContent =
        motionValue === "Normal"
            ? "No unusual activity"
            : "Unusual movement detected";

    voiceStatus.textContent =
        voiceValue === "Normal"
            ? "No distress detected"
            : "Help detected";


    heartPill.textContent =
        status === "SAFE" ? "Normal" : "Attention";

    motionPill.textContent =
        motionValue === "Normal" ? "Normal" : "Sudden";

    voicePill.textContent =
        voiceValue === "Normal" ? "Normal" : "Help Detected";


    /* RISK */

    riskScore.textContent = score;

    circleScore.textContent = score;

    circleText.textContent = level;

    riskStatus.textContent = level;


    riskCircle.style.background =
        `conic-gradient(
            ${getRiskColor(status)} ${score}%,
            #e9e7ef ${score}%
        )`;


    /* OTHER PAGE */

    pageHeart.textContent = heart;
    pageMotion.textContent = motionValue;
    pageVoice.textContent = voiceValue;


    updateStatistics();

}


/* ================= RISK COLOR ================= */

function getRiskColor(status) {

    if (status === "SAFE") {
        return "#19ae82";
    }

    if (status === "WARNING") {
        return "#efa815";
    }

    return "#e44b4f";
}


/* ================= HISTORY ================= */

function addHistory(type, message) {

    const time =
        new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });


    history.unshift({
        type: type,
        message: message,
        time: time
    });


    updateHistory();

}


/* ================= UPDATE HISTORY ================= */

function updateHistory() {

    const historyList =
        document.getElementById("historyList");

    const fullHistory =
        document.getElementById("fullHistory");


    if (history.length === 0) {
        return;
    }


    let smallHTML = "";

    let fullHTML = "";


    history.forEach(item => {

        let icon;
        let className;

        if (item.type === "WARNING") {
            icon = "🟡";
            className = "warning-history";
        }

        else {
            icon = "🔴";
            className = "emergency-history";
        }


        smallHTML += `

            <div class="history-item ${className}">

                <span>${icon}</span>

                <div>
                    <strong>${item.type}</strong>
                    <small>${item.message}</small>
                </div>

                <time>${item.time}</time>

            </div>

        `;


        fullHTML += `

            <div class="history-item ${className}">

                <span>${icon}</span>

                <div>
                    <strong>${item.type}</strong>
                    <small>${item.message}</small>
                </div>

                <time>${item.time}</time>

            </div>

        `;

    });


    historyList.innerHTML = smallHTML;

    fullHistory.innerHTML = fullHTML;

}


/* ================= STATISTICS ================= */

function updateStatistics() {

    document.getElementById("totalAlerts").textContent =
        totalAlerts;

    document.getElementById("warningCount").textContent =
        warningCount;

    document.getElementById("emergencyCount").textContent =
        emergencyCount;


    document.getElementById("statTotal").textContent =
        totalAlerts;

    document.getElementById("statWarning").textContent =
        warningCount;

    document.getElementById("statEmergency").textContent =
        emergencyCount;

}


/* ================= NAVIGATION ================= */

function showPage(pageId, button) {

    const pages =
        document.querySelectorAll(".page");

    pages.forEach(page => {
        page.classList.remove("active-page");
    });


    const selectedPage =
        document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.classList.add("active-page");
    }


    const buttons =
        document.querySelectorAll(".nav-btn");

    buttons.forEach(btn => {
        btn.classList.remove("active");
    });


    if (button) {
        button.classList.add("active");
    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* ================= START ================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        setStatus("SAFE");

    }
);