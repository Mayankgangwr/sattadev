import React, { useState } from "react";
import cssStyles from './UpdateGame.module.scss';
import {
    Button,
    Dialog,
    DialogBody,
    DialogContent,
    DialogSurface,
    DialogTitle,
    Field,
    Input,
    Text,
} from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';
import { TimePicker } from "@fluentui/react-timepicker-compat";
import { DatePicker } from "@fluentui/react-datepicker-compat";
const UpdateGame = ({ gamedata, documentID = null, isOpen, ToggleDilog }) => {
    const [gameData, setGameData] = useState(gamedata);
    return (
        <Dialog open={isOpen}>
            <DialogSurface
                className={cssStyles.DialogSurface}>
                <DialogBody className={cssStyles.DialogBody}>
                    <DialogTitle
                        className={cssStyles.DialogTitle}
                    >
                        <Text>
                            {`${documentID ? "Update existing" : "Add new"} game form`}
                        </Text>
                        <DismissRegular onClick={() => ToggleDilog(false)} style={{ cursor: 'pointer' }} />
                    </DialogTitle>
                    <DialogContent className={cssStyles.DialogContent}>
                        <Field label="Game Title *" className={cssStyles.FormField}>
                            <Input
                                className={cssStyles.Input}
                                value={gameData?.name}
                                fluid
                                onChange={(e, data) => {
                                    setGameData(prevData => ({ ...prevData, name: data ? data.value : "" }));
                                }}
                                placeholder={`Enter game title`}
                            />
                        </Field>
                        <Field label="Game Time*" className={cssStyles.FormField}>
                            <TimePicker
                                className={cssStyles.Input}
                                value={"10:00 AM"}
                                placeholder="Select game time..."
                                onTimeChange={(event, data) => {
                                    setGameData(prevData => ({ ...prevData, time: data.selectedTimeText }));
                                }}
                            />
                        </Field>
                        <Field label="Result *" className={cssStyles.FormField}>
                            <Input
                                type="number"
                                className={cssStyles.Input}
                                value={gameData?.newresult}
                                fluid
                                onChange={(e, data) => {
                                    setGameData(prevData => ({ ...prevData, newresult: data ? data.value : "" }));
                                }}
                                placeholder={`Enter game result`}
                            />
                        </Field>
                        <Field label="Waiting *" className={cssStyles.FormField}>
                            
                            <DatePicker
                                className={cssStyles.Input}
                                value={gameData?.waiting > 0 && new Date(gameData?.waiting)}
                                placeholder="Select start date..."
                                onSelectDate={(data) => {
                                    setGameData(prevData => ({ ...prevData, waiting: new Date(data).getTime() }));
                                }} />
                        </Field>


                        <div className={cssStyles.FormButton}>
                            <Button
                                appearance="danger"
                                onClick={() => ToggleDilog(false)}
                                type="button"
                            >Cancel</Button>
                            <Button
                                appearance="primary"
                                onClick={() => {
                                    handleSubmit(documentID, gameData);
                                }}
                                type="submit"
                            >Done</Button>
                        </div>
                    </DialogContent>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
};

export default UpdateGame;
