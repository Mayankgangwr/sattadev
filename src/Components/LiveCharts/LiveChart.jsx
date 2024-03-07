import { Link } from 'react-router-dom';
import cssStyle from './LiveChart.module.scss';
import React, { useState } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { gameController } from "../../Firestore";
import { deleteGame } from "../../Store";

import {
    Dialog,
    DialogTrigger,
    DialogSurface,
    DialogTitle,
    DialogBody,
    DialogActions,
    DialogContent,
    Button,
} from "@fluentui/react-components";
import UpdateGame from "./UpdateGame";


const ConfirmDilog = ({ id, name }) => {
    const dispatch = useDispatch();
    const handleDelete = async (documentID) => {
        const isDelete = await gameController.deleteGame(documentID);
        if (isDelete) {
            dispatch(deleteGame(documentID));
        }
    }

    return (
        <Dialog >
            <DialogTrigger disableButtonEnhancement>
                <i className="fa-solid fa-trash fs-4"></i>
            </DialogTrigger>
            <DialogSurface className={cssStyle.ConfirmDilog}>
                <DialogBody className={cssStyle.DialogBody}>
                    <DialogTitle>{name}</DialogTitle>
                    <DialogContent>
                        Are you sure to delete {name} game ?
                    </DialogContent>
                    <DialogActions className={cssStyle.actionBtn}>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="secondary">Cancel</Button>
                        </DialogTrigger>
                        <Button appearance="primary" onClick={() => handleDelete(id)}>Confirm</Button>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
};



const LiveChart = ({ authStatus }) => {
    const liveChartData = useSelector((state) => state.games.gamesData);
    const [isOpen, setIsOpen] = useState({
        key: false,
        id: null,
        data: null
    });
    //const dispatch = useDispatch();
    const ToggleDilog = (key, id = null, data = null) => {
        debugger;
        setIsOpen({
            key: key,
            id: id,
            data: data
        });
    };

    const handleSubmit = async (documentID, gameData) => {
        darkAdsCardController.updateCard(documentID, gameData)
            .then(async (res) => {
                const game = await darkAdsCardController.getCard(documentID);
                dispatch(updateDarkCard({ id: game.id, newData: game.data() }))
            })
            .catch((err) => {
                console.log(err);
            });
        ToggleDilog({
            key: false,
            id: null,
            data: null
        });
    }

    return (
        <>
            <div className={cssStyle.LiveChart}>
                <h1 className={`${cssStyle.Heading} bg-info text-light`}>ONLINE SATTA LIVE RESULT</h1>
                <table className={`${cssStyle.Table} table table-striped`}>
                    <colgroup>
                        <col style={{ width: '50%' }} />
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '20%' }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th className={`bg-primary`} scope="col">Game</th>
                            <th className={`bg-primary`} scope="col">Yesterday</th>
                            <th className={`bg-primary`} scope="col">Today</th>
                            <th className={`bg-primary`} scope="col">Chart</th>
                            {authStatus && <th className={`bg-primary`} scope="col">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {liveChartData.length > 0 && liveChartData.map((data, index) => {
                            return (
                                <tr key={data.id}>
                                    <td className={cssStyle.Game}>
                                        <span className={cssStyle.GameName}>{data.value.name}</span>
                                        <span className={cssStyle.GameTime}>
                                            {data.value.time}
                                        </span>
                                    </td>
                                    <td className={`text-danger`}>
                                        {data.value.oldresult !== null ? data.value.oldresult : "--"}
                                    </td>
                                    <td className={`text-warning`}>
                                        {data.value.newresult !== null ? data.value.newresult : "--"}
                                    </td>
                                    <td>
                                        <Link className={`btn btn-danger fw-bold`} to={`/gamechart/${data.id}`}>Chart</Link>
                                    </td>
                                    {authStatus &&
                                        <td >
                                            <div className={`d-flex justify-content-center gap-3`}>
                                                <i onClick={() => ToggleDilog(true, data.id, data.value)} className="fa-solid fa-pen-to-square fs-4"></i>
                                                <ConfirmDilog id={data.id} name={data.value.name} />
                                            </div>
                                        </td>
                                    }
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {authStatus && isOpen.data && <UpdateGame gamedata={isOpen.data} documentID={isOpen.id} isOpen={isOpen.key} ToggleDilog={(isopen, index) => ToggleDilog(isopen, index)}  handleSubmit={(documentID, gameData) => handleSubmit(documentID, gameData)}/>}
        </>
    );
};

export default LiveChart;
