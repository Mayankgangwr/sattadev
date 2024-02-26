import React from 'react';
import moment from 'moment';


const GameChartTable = ({ months, year, results, gamename }) => {
    const columns = (date) => {
        const columnElements = [];
        let startMnt = months[0] === 'Jan' ? 0 : 6;
        for (let month = startMnt; month < startMnt + 6; month++) {
            const currDate = `${month + 1}-${date}-${year}`;
            const currTimestamp = moment(currDate).format("DD-MM-YYYY");
            columnElements.push(
                <td className={`text-dark`} key={month}>
                    {results[currTimestamp] ? results[currTimestamp][gamename] : ""}
                </td>
            );
        }
        return columnElements;
    }

    const rows = () => {
        const rowElements = [];
        for (let i = 0; i < 31; i++) {
            rowElements.push(
                <tr key={i}>
                    <td className={`text-dark`} key={`date-${i}`}>
                        {i + 1}
                    </td>
                    {columns(i + 1)}
                </tr>
            );
        }
        return rowElements;
    }

    return (
        <>
            <table className={`table table-striped`}>
                <thead>
                    <tr>
                        <th className={`bg-primary`} scope="col">Date</th>
                        {months.map((name, index) =>
                            <th className={`bg-primary`} scope="col" key={index}>{name}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {rows()}
                </tbody>
            </table>
        </>
    );
}

export default GameChartTable;
