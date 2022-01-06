// const ua = detect.parse(navigator.userAgent);
// const buttonWha = document.querySelector(".test");
// console.log(buttonWha);
// console.log(navigator.userAgentData.mobile)
if (navigator.userAgentData.mobile) {
  buttonWha.setAttribute(
    "href",
    `https://api.whatsapp.com/send?phone=51969780055&text=${encodeURIComponent(
      "Hola. Me gustaría que me contactaran para poder resolver unas dudas."
    )}`
  );
}
// console.log(ua.device.type);
// ua.browser.family // "Mobile Safari"
// ua.browser.name // "Mobile Safari 4.0.5"
// ua.browser.version // "4.0.5"
// ua.browser.major // 4
// ua.browser.minor // 0
// ua.browser.patch // 5

// ua.device.family // "iPhone"
// ua.device.name // "iPhone"
// ua.device.version // ""
// ua.device.major // null
// ua.device.minor // null
// ua.device.patch // null
// ua.device.type // "Mobile"
// ua.device.manufacturer // "Apple"

// ua.os.family // "iOS"
// ua.os.name // "iOS 4"
// ua.os.version // "4"
// ua.os.major // 4
// ua.os.minor // 0
// ua.os.patch // null
