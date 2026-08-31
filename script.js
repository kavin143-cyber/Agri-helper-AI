const imageInput = document.getElementById("imageInput");
const previewImage = document.getElementById("previewImage");
const loader = document.getElementById("loader");
const scanStatus = document.getElementById("scanStatus");

const resultBox = document.getElementById("resultBox");
const diseaseName = document.getElementById("diseaseName");
const confidenceValue = document.getElementById("confidenceValue");
const confidenceBar = document.getElementById("confidenceBar");

const problemText = document.getElementById("problemText");
const solutionText = document.getElementById("solutionText");
const preventionText = document.getElementById("preventionText");

let currentLanguage = "en";

/*
========================================
LANGUAGE SYSTEM
========================================
*/

const languageBtn = document.getElementById("languageBtn");

languageBtn.addEventListener("click", () => {

    currentLanguage = currentLanguage === "en" ? "ta" : "en";

    document.querySelectorAll("[data-en]").forEach(element => {

        element.textContent =
            currentLanguage === "en"
            ? element.dataset.en
            : element.dataset.ta;

    });

    languageBtn.textContent =
        currentLanguage === "en"
        ? "தமிழ்"
        : "English";

});


/*
========================================
IMAGE UPLOAD
========================================
*/

imageInput.addEventListener("change", function(event) {

    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {

        alert("Please upload an image.");

        return;
    }

    const reader = new FileReader();

    reader.onload = function(e) {

        previewImage.src = e.target.result;

        previewImage.style.display = "block";

        scanStatus.textContent =
            currentLanguage === "en"
            ? "Image uploaded. AI is analyzing..."
            : "படம் upload செய்யப்பட்டது. AI ஆய்வு செய்கிறது...";

        loader.style.display = "block";

        resultBox.style.display = "none";

        /*
        Give the UI a short scanning animation.
        */

        setTimeout(() => {

            analyzePlant();

        }, 1800);

    };

    reader.readAsDataURL(file);

});


/*
========================================
AI / MACHINE LEARNING ANALYSIS
========================================

IMPORTANT:

This function is prepared for a real
TensorFlow.js trained model.

Until the trained model is connected,
the demo prediction below is used.

========================================
*/

async function analyzePlant() {

    loader.style.display = "none";

    scanStatus.textContent =
        currentLanguage === "en"
        ? "AI analysis completed."
        : "AI ஆய்வு முடிந்தது.";

    /*
    ------------------------------------
    DEMO AI RESULT
    ------------------------------------

    This is only a demonstration.

    A real ML model should return the
    disease class and probability.
    */

    const diseases = [

        {
            name: "Healthy Leaf",
            ta: "ஆரோக்கியமான இலை",

            confidence: 96,

            problem:
                "No major visible disease pattern detected.",

            solution:
                "Continue proper irrigation, nutrition and crop monitoring.",

            prevention:
                "Keep the field clean and regularly inspect new leaves.",

            problemTA:
                "முக்கியமான நோய் அறிகுறி கண்டறியப்படவில்லை.",

            solutionTA:
                "சரியான நீர்ப்பாசனம் மற்றும் ஊட்டச்சத்தை தொடர்ந்து வழங்கவும்.",

            preventionTA:
                "வயலை சுத்தமாக வைத்திருந்து புதிய இலைகளை தொடர்ந்து கண்காணிக்கவும்."
        },

        {
            name: "Leaf Spot",
            ta: "இலைப்புள்ளி நோய்",

            confidence: 91,

            problem:
                "Dark or brown spots may indicate a leaf spot infection.",

            solution:
                "Remove severely affected leaves and improve air circulation. Consult a local agricultural expert before using any plant-protection product.",

            prevention:
                "Avoid excessive leaf wetness and maintain proper plant spacing.",

            problemTA:
                "கருப்பு அல்லது பழுப்பு நிற புள்ளிகள் இலைப்புள்ளி நோயைக் குறிக்கலாம்.",

            solutionTA:
                "மிகவும் பாதிக்கப்பட்ட இலைகளை அகற்றி காற்றோட்டத்தை மேம்படுத்தவும். தாவர பாதுகாப்பு மருந்துகளை பயன்படுத்துவதற்கு முன் வேளாண் நிபுணரை அணுகவும்.",

            preventionTA:
                "இலைகளில் அதிக நேரம் ஈரப்பதம் இருக்காமல் பார்த்துக்கொண்டு சரியான இடைவெளியில் பயிரிடவும்."
        },

        {
            name: "Possible Blight",
            ta: "கருகல் நோய் இருக்கலாம்",

            confidence: 87,

            problem:
                "The image shows patterns that may be associated with leaf blight.",

            solution:
                "Remove badly affected plant material and improve field sanitation. Seek local expert confirmation before treatment.",

            prevention:
                "Avoid overhead irrigation and monitor nearby plants for similar symptoms.",

            problemTA:
                "இலை கருகல் நோயுடன் தொடர்புடைய அறிகுறிகள் இருக்கலாம்.",

            solutionTA:
                "மிகவும் பாதிக்கப்பட்ட பகுதிகளை அகற்றி வயல் சுகாதாரத்தை மேம்படுத்தவும். சிகிச்சைக்கு முன் உள்ளூர் வேளாண் நிபுணரிடம் உறுதி செய்யவும்.",

            preventionTA:
                "மேலிருந்து நீர் பாய்ச்சுவதை குறைத்து அருகிலுள்ள செடிகளையும் கண்காணிக்கவும்."
        }

    ];


    /*
    Demo random prediction.
    Replace this part with TensorFlow.js
    model prediction later.
    */

    const prediction =
        diseases[Math.floor(Math.random() * diseases.length)];


    showResult(prediction);

}


/*
========================================
SHOW RESULT
========================================
*/

function showResult(data) {

    resultBox.style.display = "block";

    if (currentLanguage === "en") {

        diseaseName.textContent = data.name;

        problemText.textContent = data.problem;

        solutionText.textContent = data.solution;

        preventionText.textContent = data.prevention;

    } else {

        diseaseName.textContent = data.ta;

        problemText.textContent = data.problemTA;

        solutionText.textContent = data.solutionTA;

        preventionText.textContent = data.preventionTA;
    }

    confidenceValue.textContent =
        data.confidence + "%";

    confidenceBar.style.width =
        data.confidence + "%";

    resultBox.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


/*
========================================
DRAG & DROP
========================================
*/

const uploadArea =
    document.getElementById("uploadArea");

uploadArea.addEventListener("dragover", (event) => {

    event.preventDefault();

    uploadArea.style.borderColor = "#9de58f";

});

uploadArea.addEventListener("dragleave", () => {

    uploadArea.style.borderColor = "#6e9e72";

});

uploadArea.addEventListener("drop", (event) => {

    event.preventDefault();

    const file = event.dataTransfer.files[0];

    if (!file) return;

    imageInput.files = event.dataTransfer.files;

    imageInput.dispatchEvent(new Event("change"));

});
