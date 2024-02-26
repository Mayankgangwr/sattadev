import moment from 'moment';
import cssStyle from './ResultChart.module.scss';

const ResultChart = ({ gamesData, month, tableData, year, forMonth }) => {
    const TableRow = () => {
        let startDate = new Date(`${year}-${month}-01`);
        let endDate = new Date(`${year}-${month + 1}-01`);
        if (month === 12) {
            endDate = new Date(`${year + 1}-01-01`);
        }
        const rows = [];
        while (startDate < endDate) {
            const currTimestamp = moment(startDate).format("DD-MM-YYYY");
            const rowdata = tableData[currTimestamp];
            rows.push(
                <tr key={startDate.getTime()}>
                    <td className={cssStyle.Game}>{moment(startDate).format("DD-MM-YYYY")}</td>
                    {gamesData.map((data) => {
                        return (
                            <td key={data.id} className={`text-dark`}>{rowdata && rowdata[data.id] !== undefined ? rowdata[data.id] : "00"}</td>
                        )
                    })}
                </tr>
            );

            startDate.setDate(startDate.getDate() + 1);
        }
        return rows;
    };

    return (
        <div className={cssStyle.ResultChart}>
            <h1 className={`${cssStyle.Heading} bg-info text-light`}>{(month && forMonth) ? "ONLINE SATTA  RESULT CHART" : moment(`${year}-${month}-01`).format("MMMM")}</h1>
            <table className={`${cssStyle.Table} table table-striped`}>
                <thead>
                    <tr key={`tb-header`}>
                        <th className={`bg-primary`} key={`header-date`} scope="col">Date</th>
                        {gamesData.map((data) =>
                            <th key={data.id} className={`bg-primary`} scope="col">{data.value.name}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {tableData && <TableRow />}
                </tbody>
            </table>
        </div>
    );
};

export default ResultChart;
