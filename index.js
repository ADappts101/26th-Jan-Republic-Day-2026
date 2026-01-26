const timeB = document.getElementById("timeBtn");
const backB = document.getElementById("backB");
const TOTAL_FACTS = 10;

/*********************************
 * SCROLL TO FACT
 *********************************/
function scrollToFact(hash) {
  const el = document.querySelector(hash);
  if (!el) return;

  const rect = el.getBoundingClientRect();
  const offset =
    rect.top + window.scrollY - window.innerHeight / 2 + rect.height / 2;

  window.scrollTo({
    top: offset,
    behavior: "smooth",
  });
}

/*********************************
 * TIMELINE BUTTON
 *********************************/
timeB.onclick = () => {
  location.hash = "#fact1";
  scrollToFact("#fact1");
};

/*********************************
 * BACK BUTTON
 *********************************/
backB.onclick = () => {
  history.pushState(null, "", location.pathname);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

/*********************************
 * HASH CHANGE HANDLER
 *********************************/
window.addEventListener("hashchange", () => {
  scrollToFact(location.hash);
});

/*********************************
 * FACT CLICK → NEXT
 *********************************/
for (let i = 1; i <= TOTAL_FACTS; i++) {
  const el = document.getElementById("fact" + i);
  if (!el) continue;

  el.onclick = (e) => {
    e.preventDefault();
    const next = Math.min(i + 1, TOTAL_FACTS);
    location.hash = "#fact" + next;
    scrollToFact("#fact" + next);
  };
}

/*********************************
 * INITIAL LOAD
 *********************************/
window.addEventListener("load", () => {
  if (location.hash) scrollToFact(location.hash);
});

// Canvas image loader
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const netajiImg = new Image();
netajiImg.src = "Netaji_ArtworkByAYANSHHdeb.png"; // relative path on GH
netajiImg.crossOrigin = "anonymous"; // just in case

netajiImg.onload = () => {
  // draw image to canvas (fit canvas size)
  ctx.drawImage(netajiImg, 0, 0, canvas.width, canvas.height);

  // optional: add a subtle watermark
  ctx.font = "80px Google Sans";
  ctx.fillStyle = "rgba(255, 0 , 0, 0.5)";
  ctx.fillText("© Ayanshh Deb", 100, canvas.height - 50);
};

// prevent drag / right click on canvas
canvas.oncontextmenu = () => false;
canvas.ondragstart = () => false;
