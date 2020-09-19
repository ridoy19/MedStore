import React from 'react'

const Card = ({ columns, data, propertyAsKey }) => {
    return (
        <div>
            <table className="table table-hover table-bordered">
                <thead className="thead-dark">
                    <tr>{columns.map(col => <th key={`header-${col.heading}`}>{col.heading}</th>)}</tr>
                </thead>
                <tbody>
                    { data.length > 0 && data.map(item =>
                        <tr key={`${item[propertyAsKey]}-row`}>
                            {columns.map(col => <td key={`${item[propertyAsKey]}-${col.property}`}>{item[col.property]}</td>)}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Card
