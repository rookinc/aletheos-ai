(function () {
  const canvas = document.getElementById("g900-canvas");
  const tabs = Array.from(document.querySelectorAll(".tab"));
  const title = document.getElementById("card-title");
  const body = document.getElementById("card-body");
  const caption = document.getElementById("stage-caption");
  const toggle = document.getElementById("instructions-toggle");
  const symbol = document.getElementById("instructions-symbol");
  const instructions = document.getElementById("instructions-body");

  function renderView(viewName) {
    const view = window.G900_DATA.views[viewName] || window.G900_DATA.views.kernel;

    tabs.forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.view === viewName);
    });

    title.textContent = view.title;
    caption.textContent = view.caption;

    body.innerHTML = "";

    view.paragraphs.forEach((text) => {
      const p = document.createElement("p");
      p.textContent = text;
      body.appendChild(p);
    });

    const list = document.createElement("div");
    list.className = "receipt-list";

    view.receipts.forEach((item) => {
      const row = document.createElement("div");
      row.className = "receipt";

      const strong = document.createElement("strong");
      strong.textContent = item[0];

      const span = document.createElement("span");
      span.textContent = item[1];

      row.appendChild(strong);
      row.appendChild(span);
      list.appendChild(row);
    });

    body.appendChild(list);

    window.G900_RENDERER.drawG900(canvas, viewName);
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => renderView(tab.dataset.view));
  });

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    instructions.hidden = open;
    symbol.textContent = open ? "+" : "-";
  });

  renderView("kernel");
})();
