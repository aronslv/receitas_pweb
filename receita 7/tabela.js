export const criarTabela = (dados, columns, properties) => {
    if (!dados || dados.length === 0) {
        return "<p class='text-danger'>Nenhum dado disponível.</p>";
    }

    let tabelaHtml = `
        <table class="table table-striped table-bordered">
            <thead class="table-dark">
                <tr>
                    ${columns.map(columnName => `<th class="text-center">${columnName}</th>`).join('')}
                </tr>
            </thead>
            <tbody>
                ${dados.map(item => `
                    <tr>
                        ${properties.map(prop => `<td class="text-center">${item[prop] || ""}</td>`).join('')}                              
                    </tr>`).join("\n")}
            </tbody>
        </table>
    `;

    return tabelaHtml;
};