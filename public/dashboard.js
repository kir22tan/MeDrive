document.addEventListener("DOMContentLoaded", () => {
  const dropArea = document.getElementById("drop-area");
  const fileInput = document.getElementById("fileElem");
  const uploadBtn = document.getElementById("uploadBtn");
  const fileSelectBtn = document.getElementById("fileSelectBtn");
  const uploadedFiles = document.getElementById("uploadedFiles");

  let selectedFiles = [];

  const fetchUploads = async () => {
    const res = await fetch("/upload/uploads");
    const files = await res.json();

    uploadedFiles.innerHTML = "";
    files.forEach(file => {
      const div = document.createElement("div");
      div.className = "file-item";
      div.innerHTML = `
        <span class="file-name">
          <a href="${file.cloudinaryURL || file.firebaseURL}" target="_blank" style="color: #fefefe; text-decoration: none;">
            ${file.filename}
          </a>
        </span>
        <span class="file-format">${file.extension}</span>`;
      uploadedFiles.appendChild(div);
    });
  };

  fileSelectBtn.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", () => {
    selectedFiles = [...fileInput.files];
    uploadBtn.disabled = selectedFiles.length === 0;
  });

  dropArea.addEventListener("dragover", e => {
    e.preventDefault();
    dropArea.classList.add("dragover");
  });

  dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("dragover");
  });

  dropArea.addEventListener("drop", e => {
    e.preventDefault();
    dropArea.classList.remove("dragover");
    selectedFiles = [...e.dataTransfer.files];
    uploadBtn.disabled = selectedFiles.length === 0;
  });

  uploadBtn.addEventListener("click", async () => {
    if (!selectedFiles.length) return;

    dropArea.classList.add("uploading");

    for (const file of selectedFiles) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/upload/upload", {
          method: "POST",
          body: formData,
          credentials: "include"
        });

        if (!res.ok) throw new Error("Upload failed");
      } catch (err) {
        alert("Error uploading file: " + file.name);
        console.error(err);
      }
    }

    dropArea.classList.remove("uploading");
    dropArea.classList.add("success");

    setTimeout(() => {
      dropArea.classList.remove("success");
    }, 2500);

    selectedFiles = [];
    fileInput.value = "";
    uploadBtn.disabled = true;
    fetchUploads();
  });

  fetchUploads();
});
