const createTableHeader = (headers) => {
  let headerRow = document.getElementById("table-head");
  headerRow.innerHTML = ""; 
  headers.forEach((headerText) => {
    let th = document.createElement("th");
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
};

const populateTableBody = (elements) => {
  const body = document.querySelector("#body");
  body.innerHTML = ""; 
  elements.forEach(({ name, ibu, type }) => {
    const row = document.createElement("tr");

    [name, ibu, type].forEach((data) => {
      let td = document.createElement("td");
      td.textContent = data;
      row.appendChild(td);
    });

    body.appendChild(row);
  });
};

const toggleTable = () => {
  const table = document.querySelector("table");
  if (table.style.display === "none" || !table.style.display) {
    table.style.display = "table";
  } else {
    table.style.display = "none";
  }
};

const loadTable = (elements) => {
  createTableHeader(["Nome da Bebida", "IBU", "Tipo"]);
  populateTableBody(elements);
};

const carregarBebidas = () => {
  const drinks = [
    { name: "Heineken", ibu: 23, type: "Cerveja" },
    { name: "Jack Daniel's", ibu: "-", type: "Whisky" },
    { name: "Grey Goose", ibu: "-", type: "Vodka" },
    { name: "Guinness", ibu: 45, type: "Cerveja" },
  ];

  loadTable(drinks);
  toggleTable();
};

document.getElementById("botaoCarregar").addEventListener("click", carregarBebidas);