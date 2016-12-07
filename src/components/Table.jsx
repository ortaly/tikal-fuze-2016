import React from 'react'
// NOTE: The proper way to implement the component is without 
// "dangerouslySetInnerHTML", due to time constraints I used this property
const Table = props => {
  const { headers = [], rows =[], marker } = props
  function markText(text, marker) {
    const index = text.indexOf(marker)
    if (index < 0) return `${text}`
    return text.replace(marker, `<mark>${marker}</mark>`)
  }
  return (
    <table>
        <thead>
          <tr>
            {headers.map(header => <th key={header.id} data-field={header.id}>{header.title}</th>)}
          </tr>
        </thead>
        <tbody>
          {
            rows.map((row, i) => 
            <tr key={i}>
            {
              row.map((cell, i) => 
              <td key={i} dangerouslySetInnerHTML={{__html:markText(cell, marker)}}></td>)
            }
            </tr>)
          }
        </tbody>
    </table>
  )
}

export default Table;