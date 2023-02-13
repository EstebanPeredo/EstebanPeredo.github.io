const starfield = document.querySelector("#starfield");
const starCount = 500;

for (let i = 0; i < starCount; i++) {
  const star = document.createElement("div");
  star.classList.add("star");
  star.style.top = `${Math.floor(Math.random() * 100)}vh`;
  star.style.left = `${Math.floor(Math.random() * 100)}vw`;
  star.style.width = `${Math.random() * 3}px`;
  star.style.height = `${Math.random() * 3}px`;
  star.style.animationDuration = '${Math.random() * 5 + 1}s';
  star.style.animationDelay = '${Math.random() * 5}s';
  starfield.appendChild(star);
}
