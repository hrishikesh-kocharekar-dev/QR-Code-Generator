const form = document.getElementById("generateForm");
const qr = document.getElementById("qrcode");

const onSubmit = (e) => {
  e.preventDefault();

  clearImg();

  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;

  if (url === "") {
    alert("Please enter URL");
  } else {
    runSpinner();

    setTimeout(() => {
      stopSpinner();
      generateQRCode(url, size);

      setTimeout(() => {
        const saveUrl = qr.querySelector("img").src;
        createSaveBtn(saveUrl);
      }, 50);
    }, 1000);
  }
};

const generateQRCode = (url, size) => {
  const qrcode = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
  });
};

const runSpinner = () => {
  document.getElementById("spinner").style.display = "block";
};

const stopSpinner = () => {
  document.getElementById("spinner").style.display = "none";
};

const clearImg = () => {
  qr.innerHTML = "";
  const saveLink = document.getElementById("save-link");
  if (saveLink) saveLink.remove();
};

const createSaveBtn = (saveUrl) => {
  const link = document.createElement("a");
  link.id = "save-link";
  link.classList =
    "bg-violet-400 hover:bg-violet-500 text-white font-bold py-2 rounded w-1/2 m-auto my-5";
  link.href = saveUrl;
  link.download = "qrcode";
  link.innerHTML = "Save Image";
  document.getElementById("generated").appendChild(link);
};

stopSpinner();
form.addEventListener("submit", onSubmit);
