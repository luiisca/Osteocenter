// const ua = detect.parse(navigator.userAgent);
// const buttonWha = document.querySelector(".test");
// console.log(buttonWha);
// console.log(navigator.userAgentData.mobile)

// TODO: possible a hook
if (navigator.userAgentData.mobile) {
  buttonWha.setAttribute(
    "href",
    `https://api.whatsapp.com/send?phone=51969780055&text=${encodeURIComponent(
      "Hola. Me gustaría que me contactaran para poder resolver unas dudas."
    )}`
  );
}
