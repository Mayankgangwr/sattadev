import React, { useState } from "react";
import cssStyles from './UpdateAds.module.scss';
import {
    Button,
    Dialog,
    DialogBody,
    DialogContent,
    DialogSurface,
    DialogTitle,
    DialogTrigger,
    Field,
    Textarea,
    Input,
    Text,
} from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';
import { DatePicker } from "@fluentui/react-datepicker-compat";

const UpdateAds = ({ cardData, documentID, isOpen, ToggleDilog, handleSubmit }) => {
    const [adsData, setAdsData] = useState(cardData);

    return (
        <Dialog open={isOpen}>
            <DialogSurface
                className={cssStyles.AutomationDailog}>
                <DialogBody className={cssStyles.DialogBody}>
                    <DialogTitle
                        className={cssStyles.DialogTitle}
                    >
                        <Text>
                            {`Position No.${cardData.position} Ads Card Update Form`}
                        </Text>
                        <DismissRegular onClick={() => ToggleDilog(false)} style={{ cursor: 'pointer' }} />
                    </DialogTitle>
                    <DialogContent className={cssStyles.DialogContent}>
                        <Field label="Owner *" className={cssStyles.FormField}>
                            <Input
                                className={cssStyles.Input}
                                value={adsData?.owner}
                                fluid
                                onChange={(e, data) => {
                                    setAdsData(prevData => ({ ...prevData, owner: data ? data.value : "" }));
                                }}
                                placeholder={`Enter Ads Owner Name`}
                            />
                        </Field>
                        {adsData?.branch &&
                            <Field label="branch *" className={cssStyles.FormField}>
                                <Input
                                    className={cssStyles.Input}
                                    value={adsData?.branch}
                                    fluid
                                    onChange={(e, data) => {
                                        setAdsData(prevData => ({ ...prevData, branch: data ? data.value : "" }));
                                    }}
                                    placeholder={`Enter Ads branch`}
                                />
                            </Field>
                        }
                        <Field label="Message *" className={cssStyles.FormField}>
                            <Textarea
                                className={cssStyles.Textarea}
                                value={adsData?.message}
                                fluid
                                onChange={(e, data) => {
                                    setAdsData(prevData => ({ ...prevData, message: data ? data.value : "" }));
                                }}
                                placeholder="Type your message here..."
                                resize="both"
                            />
                        </Field>
                        <Field label="Owner Phone*" className={cssStyles.FormField}>
                            <Input
                                className={cssStyles.Input}
                                value={adsData?.mobileno}
                                fluid
                                onChange={(e, data) => {
                                    setAdsData(prevData => ({ ...prevData, mobileno: data ? data.value : "" }));
                                }}
                                placeholder={`Enter Ads Owner Mobile No.`}
                            />
                        </Field>
                        <Field label="Owner Whatsapp*" className={cssStyles.FormField}>
                            <Input
                                className={cssStyles.Input}
                                value={adsData?.whatsapp}
                                fluid
                                onChange={(e, data) => {
                                    setAdsData(prevData => ({ ...prevData, whatsapp: data ? data.value : "" }));
                                }}
                                placeholder={`Enter Ads Owner Whatsapp No.`}
                            />
                        </Field>
                        <Field label="Owner Telegram*" className={cssStyles.FormField}>
                            <Input
                                className={cssStyles.Input}
                                value={adsData?.telegram}
                                fluid
                                onChange={(e, data) => {
                                    setAdsData(prevData => ({ ...prevData, telegram: data ? data.value : "" }));
                                }}
                                placeholder={`Enter Ads Owner Telegram Id.`}
                            />
                        </Field>
                        <div className={cssStyles.DatePickerContainer}>
                            <Field className={cssStyles.DatePicker} label="Ads Started From *" required>
                                <DatePicker
                                    className={cssStyles.Input}
                                    value={adsData && new Date(adsData.create)}
                                    placeholder="Select start date..."
                                    onSelectDate={(data) => {
                                        setAdsData(prevData => ({ ...prevData, create: new Date(data).getTime() }));
                                    }} />
                            </Field>
                            <Field className={`${cssStyles.DatePicker} align-items-end `} label="Ads End Up *" required>
                                <DatePicker
                                    className={`${cssStyles.Input} w-100`}
                                    value={adsData && new Date(adsData.expire)}
                                    placeholder="Select end date..."
                                    onSelectDate={(data) => {
                                        setAdsData(prevData => ({ ...prevData, expire: new Date(data).getTime() }));
                                    }} />
                            </Field>

                        </div>
                        <div className={cssStyles.FormButton}>
                            <Button
                                appearance="danger"
                                onClick={() => ToggleDilog(false)}
                                type="button"
                            >Cancel</Button>
                            <Button
                                appearance="primary"
                                onClick={() => {
                                    handleSubmit(documentID, adsData);
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

export default UpdateAds;
