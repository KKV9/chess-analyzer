// validator.js

document.addEventListener("DOMContentLoaded", () => {
    const runBtn = document.getElementById("runBtn");
    const output = document.getElementById("output");
    const uploadForm = document.getElementById("uploadForm");
    const csvFileInput = document.getElementById("csvFile");
    const uploadBtn = document.getElementById("uploadBtn");
    const fileNameSpan = document.getElementById("fileName");
    const uploadStatus = document.getElementById("uploadStatus");
    const fileLabel = document.querySelector(".file-label");

    // File selection handling
    csvFileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (2MB = 2 * 1024 * 1024 bytes)
            if (file.size > 2 * 1024 * 1024) {
                fileNameSpan.textContent = "File too large (max 2MB)";
                fileNameSpan.style.color = "var(--error-color)";
                uploadBtn.disabled = true;
                return;
            }
            
            // Check file type
            if (!file.name.endsWith('.csv')) {
                fileNameSpan.textContent = "Please select a CSV file";
                fileNameSpan.style.color = "var(--error-color)";
                uploadBtn.disabled = true;
                return;
            }
            
            fileNameSpan.textContent = file.name;
            fileNameSpan.style.color = "var(--text-primary)";
            uploadBtn.disabled = false;
            uploadStatus.textContent = "";
        }
    });

    // Drag and drop handling
    fileLabel.addEventListener("dragover", (e) => {
        e.preventDefault();
        fileLabel.style.borderColor = "var(--primary-color)";
        fileLabel.style.backgroundColor = "rgba(99, 102, 241, 0.05)";
    });

    fileLabel.addEventListener("dragleave", () => {
        fileLabel.style.borderColor = "var(--border-color)";
        fileLabel.style.backgroundColor = "transparent";
    });

    fileLabel.addEventListener("drop", (e) => {
        e.preventDefault();
        fileLabel.style.borderColor = "var(--border-color)";
        fileLabel.style.backgroundColor = "transparent";
        
        const file = e.dataTransfer.files[0];
        if (file) {
            csvFileInput.files = e.dataTransfer.files;
            csvFileInput.dispatchEvent(new Event('change'));
        }
    });

    // Form submission handling
    uploadForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const file = csvFileInput.files[0];
        if (!file) {
            uploadStatus.innerHTML = '<span style="color: var(--error-color);">❌ Please select a file</span>';
            return;
        }

        const formData = new FormData();
        formData.append('csvFile', file);

        uploadBtn.disabled = true;
        uploadBtn.classList.add('loading');
        uploadStatus.innerHTML = '<span style="color: var(--text-muted);">⏳ Uploading...</span>';

        try {
            const response = await fetch('/upload-csv', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                uploadStatus.innerHTML = `<span style="color: var(--success-color);">✅ ${result.message} (${(result.size / 1024).toFixed(2)} KB)</span>`;
                // Automatically run validation after successful upload
                setTimeout(() => {
                    runBtn.click();
                }, 500);
            } else {
                uploadStatus.innerHTML = `<span style="color: var(--error-color);">❌ ${result.error}</span>`;
                uploadBtn.disabled = false;
            }
        } catch (err) {
            uploadStatus.innerHTML = '<span style="color: var(--error-color);">❌ Upload failed</span>';
            console.error(err);
            uploadBtn.disabled = false;
        } finally {
            uploadBtn.classList.remove('loading');
        }
    });

    // Validation button handling
    runBtn.addEventListener("click", async () => {
        output.innerHTML = '<span class="status-indicator processing"></span>Running validation...';
        try {
            const response = await fetch("/run-validation");
            const text = await response.text();
            output.innerHTML = text;
        } catch (err) {
            output.innerHTML = '<span class="status-indicator error"></span>Error running validation.';
            console.error(err);
        }
    });
});