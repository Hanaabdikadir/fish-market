const fish = [
  { name: "Malay", coast: "Muqdisho", price: 2.8, unit: "Kg", seller: "Cabdiraxmaan Nuur", phone: "+252 61 778 3340", image: "assets/faraq.jpg" },
  { name: "Carbuush", coast: "Muqdisho", price: 1.6, unit: "Kg", seller: "Aamina Yusuf", phone: "+252 61 220 4410", image: "assets/m1.jpg" },
  { name: "Shuuto", coast: "Muqdisho", price: 3.4, unit: "Kg", seller: "Cumar Faarax", phone: "+252 61 909 1182", image: "assets/m3.jpg" },
  { name: "Kalluun gaduud", coast: "Kismaayo", price: 3.6, unit: "Kg", seller: "Hodan Warsame", phone: "+252 61 552 2088", image: "assets/m2.jpg" },
  { name: "Faraq", coast: "Kismaayo", price: 3.2, unit: "Kg", seller: "Sahra Maxamed", phone: "+252 61 441 7703", image: "assets/m3.jpg" },
  { name: "Yuumbi", coast: "Kismaayo", price: 3.8, unit: "Kg", seller: "Bashiir Cali", phone: "+252 61 330 6621", image: "assets/faraq.jpg" },
  { name: "Tuuna", coast: "Berbera", price: 4.5, unit: "Kg", seller: "Maxamed Cabdi", phone: "+252 63 400 1101", image: "assets/tuna.jpg" },
  { name: "Garab", coast: "Berbera", price: 4.2, unit: "Kg", seller: "Idil Cumar", phone: "+252 63 215 0094", image: "assets/m2.jpg" },
  { name: "Koofiyad", coast: "Berbera", price: 2.4, unit: "Kg", seller: "Yuusuf Cali", phone: "+252 63 118 5560", image: "assets/m1.jpg" }
];

const grid = document.getElementById("grid");
const search = document.getElementById("search");
const talk = document.getElementById("talk");
let coast = "dhammaan";

function money(n) {
  return "$" + n.toFixed(2);
}

function draw() {
  const q = search.value.trim().toLowerCase();
  const list = fish.filter((item) => {
    const coastOk = coast === "dhammaan" || item.coast === coast;
    const text = (item.name + " " + item.coast).toLowerCase();
    return coastOk && text.includes(q);
  });

  grid.innerHTML = list.map((item) => `
    <article class="card">
      <img src="${item.image}" alt="${item.name}">
      <div>
        <p class="meta">${item.coast}</p>
        <h3>${item.name}</h3>
        <p class="meta">${item.seller}</p>
        <p class="price">${money(item.price)} / ${item.unit}</p>
        <button type="button" class="btn" data-phone="${item.phone}" data-name="${item.seller}">Wada hadal</button>
      </div>
    </article>
  `).join("") || "<p>Wax lama helin.</p>";
}

document.querySelectorAll(".chip").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach((chip) => chip.classList.remove("on"));
    button.classList.add("on");
    coast = button.dataset.coast;
    draw();
  });
});

search.addEventListener("input", draw);

grid.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  document.getElementById("talk-title").textContent = button.dataset.name;
  document.getElementById("talk-phone").textContent = button.dataset.phone;
  talk.showModal();
});

draw();
