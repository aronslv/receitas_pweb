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
    elements.forEach(({ name, founded }) => {
      const row = document.createElement("tr");
  
      [name, founded].forEach((data) => {
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
    createTableHeader(["Nome do Time", "Ano de Fundação"]);
    populateTableBody(elements);
  };
  
  const carregarTimes = () => {
    const teams = [
      { name: "Flamengo", founded: 1895 },
      { name: "Vasco", founded: 1898 },
      { name: "Corinthians", founded: 1910 },
      { name: "São Paulo", founded: 1930 },
    ];
  
    loadTable(teams);
    toggleTable();
  };
  
  document.getElementById("botaoCarregar").addEventListener("click", carregarTimes);