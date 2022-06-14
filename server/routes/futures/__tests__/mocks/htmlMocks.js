
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

export const futuresListTemplate = `
  <div>
    <table class="table-condensed">
      <tbody>
          <tr>
              <td><a href="http://">EDM22 (edm22)</a></td>
              <td>EXCBT</td>
              <td>UK</td>
          </tr>
          <tr>
              <td><a href="http://">EDM23 (edm23)</a></td>
              <td>EXCBT</td>
              <td>UK</td>
          </tr>
          <tr>
              <td><a href="http://">edm24 (edm24)</a></td>
              <td>EXCBT</td>
              <td>UK</td>
          </tr>
          <tr>
              <td><a href="http://">edm25 (edm25)</a></td>
              <td>EXCBT</td>
              <td>UK</td>
          </tr>
          <tr>
              <td><a href="http://">edm26 (edm26)</a></td>
              <td>EXCBT</td>
              <td>UK</td>
          </tr>
      </tbody>
    </table>
    <ul class="pagination">
      <li><a>1</a></li>
      <li><a>2-3</a></li>
      <li><a>4-5</a></li>
    </ul>
 </div>
`

export const emptyTemplate = `<div></div>`
