const textInput = document.getElementById("textInput");
const sourceLanguage = document.getElementById("sourceLanguage");
const targetLanguage = document.getElementById("targetLanguage");
const translateButton = document.getElementById("translateButton");
const translatedText = document.getElementById("translatedText");

translateButton.addEventListener("click", translateText);

async function translateText() {

    const text = textInput.value.trim();

    // Check empty input
    if (text === "") {
        translatedText.textContent = "Please enter some text.";
        return;
    }

    const source = sourceLanguage.value;
    const target = targetLanguage.value;

    // Same language
    if (source === target) {
        translatedText.textContent = text;
        return;
    }

    // Loading message
    translatedText.textContent = "Translating...";
    translateButton.disabled = true;

    try {

        const url =
            "https://translate.googleapis.com/translate_a/single" +
            "?client=gtx" +
            "&sl=" + encodeURIComponent(source) +
            "&tl=" + encodeURIComponent(target) +
            "&dt=t" +
            "&q=" + encodeURIComponent(text);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Translation API error");
        }

        const data = await response.json();

        let result = "";

        // Google Translate response contains translated pieces
        if (data[0]) {

            for (let i = 0; i < data[0].length; i++) {

                if (data[0][i][0]) {
                    result += data[0][i][0];
                }

            }

        }

        if (result.trim() !== "") {
            translatedText.textContent = result;
        } else {
            translatedText.textContent =
                "Translation not available.";
        }

    } catch (error) {

        console.error(error);

        translatedText.textContent =
            "Translation failed. Please check your internet connection.";

    } finally {

        translateButton.disabled = false;

    }
}