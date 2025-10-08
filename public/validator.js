// validator.js

document.addEventListener("DOMContentLoaded", () => {
    const runBtn = document.getElementById("runBtn");
    const output = document.getElementById("output");

    runBtn.addEventListener("click", async () => {
        output.textContent = "Running validation...";
        try {
            const response = await fetch("/run-validation");
            const text = await response.text();
            output.innerHTML = text;
        } catch (err) {
            output.textContent = "Error running validation.";
            console.error(err);
        }
    });
});
