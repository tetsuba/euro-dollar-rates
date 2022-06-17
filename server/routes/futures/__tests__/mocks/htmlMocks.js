
function addTableRow(index) {
  return `
    <tr>
        <td><a href="http://">EDM${index} (EDM${index})</a></td>
        <td>EXCBT</td>
        <td>UK</td>
    </tr>
  `
}

function addPagination(arr) {
  return arr.length > 0 && `
    <ul class="pagination">
        ${arr.map((num) => `<li><a>${num}</a></li>`)}
    </ul>
  `
}

function buildTable(rows) {
  return `
    <table class="table-condensed">
      <tbody>
        ${rows.map(addTableRow)}
      </tbody>
    </table>
  `
}

export function buildFuturesListTemplate(rows, pagination) {
  return `
      <div>
        <table class="table-condensed">
          <tbody>
            ${buildTable(rows)}
          </tbody>
        </table>
        ${addPagination(pagination)}
     </div>
  `
}

export function buildFutureTemplate(name, price) {
  return `
      <div>
        <div class="table-condensed">${name}</div>
        <div class="intraday__price">
            <div class="value">${price}</div>
        </div>
      </div>
  `
}


