import React, { useState } from "react";
import cssStyles from './UpdateAds.module.scss';
import { Button, Dialog, Flex, Form, Input, Text, TextArea } from '@fluentui/react-components';
import { ChevronLeftRegular, DismissRegular, InfoRegular } from '@fluentui/react-icons';
import { lightAdsCardController } from "../../Firestore"

const UpdateAds = ({ cardData, id, isOpen, ToggleDilog }) => {
    const [adsData, setAdsData] = useState(cardData);

    const handleSubmit = () => {
        lightAdsCardController.updateCard(id, adsData)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
        ToggleDilog(false);
    }

    return (
        <Dialog
            className={cssStyles.AutomationDailog}
            open={isOpen}
            content={
                <React.Fragment>
                    <Form className={`${cssStyles.AutomationDailogFrom}`} onSubmit={handleSubmit}>
                        <div className={cssStyles.DialogFormBox}>
                            <div className={cssStyles.ModelFormHeader}>
                                <Text className={cssStyles.ModelTextHeader}>
                                    {`Position No.${cardData.position} Ads Card Update Form`}
                                </Text>
                                <DismissRegular onClick={() => ToggleDilog(false)} style={{ cursor: 'pointer' }} />
                            </div>
                            <Input
                                className={cssStyles.FormDetailsInput}
                                label={`Owner *`}
                                value={adsData?.owner}
                                fluid
                                onChange={(e, data) => {
                                    setAdsData(prevData => ({ ...prevData, owner: data ? data.value : "" }));
                                }}
                                placeholder={`Enter Ads Owner Name`}
                            />
                            <label dir="auto" className="ui-input__label gz hf hg hh">Message *</label>
                            <TextArea fluid value={adsData?.message} placeholder="Type your message here..." />
                            <Input
                                className={cssStyles.FormDetailsInput}
                                label={`Owner Phone*`}
                                value={adsData?.mobileno}
                                fluid
                                onChange={(e, data) => {
                                    setAdsData(prevData => ({ ...prevData, mobileno: data ? data.value : "" }));
                                }}
                                placeholder={`Enter Ads Owner Mobile No.`}
                            />
                            <Input
                                className={cssStyles.FormDetailsInput}
                                label={`Owner Whatsapp*`}
                                value={adsData?.whatsapp}
                                fluid
                                onChange={(e, data) => {
                                    setAdsData(prevData => ({ ...prevData, whatsapp: data ? data.value : "" }));
                                }}
                                placeholder={`Enter Ads Owner Whatsapp No.`}
                            />
                            <Input
                                className={cssStyles.FormDetailsInput}
                                label={`Owner Telegram*`}
                                value={adsData?.telegram}
                                fluid
                                onChange={(e, data) => {
                                    setAdsData(prevData => ({ ...prevData, telegram: data ? data.value : "" }));
                                }}
                                placeholder={`Enter Ads Owner Telegram Id.`}
                            />
                            {/* <div style={{ display: "flex", justifyContent: "space-between", marginTop: '5px' }}>
                                <div style={{ display: "flex", flexDirection: 'column', gap: '5px', width: '48%' }}>
                                    <label dir="auto" className="ui-input__label gz hf hg hh">Ads Started From *</label>
                                    <Datepicker
                                        className={cssStyles.DatePickerContainer}
                                        defaultSelectedDate={new Date(adsData.create)}
                                        onDateChange={(event, data) => {
                                            setAdsData(prevData => ({ ...prevData, create: data ? data.value : "" }));
                                        }}
                                    />
                                </div>
                                <div style={{ display: "flex", flexDirection: 'column', gap: '5px', width: '48%' }}>
                                    <label dir="auto" className="ui-input__label gz hf hg hh">Ads End Up *</label>
                                    <Datepicker
                                        className={cssStyles.DatePickerContainer}
                                        defaultSelectedDate={new Date(adsData.expire)}
                                        onDateChange={(event, data) => {
                                            setAdsData(prevData => ({ ...prevData, expire: data ? data.value : "" }));
                                        }}
                                    />
                                </div>
                            </div> */}
                        </div>
                        <Flex className={cssStyles.FormButton}>
                            <Button
                                onClick={() => ToggleDilog(false)}
                                content='Cancel'
                            />
                            <Button
                                primary
                                onClick={() => {
                                    handleSubmit();
                                }}
                                type="submit"
                                content='Done'
                            />
                        </Flex>
                    </Form>
                </React.Fragment>
            }
            styles={{
                main: { top: '10%', left: '50%', transform: 'translate(-90%, -50%)' },
                overlay: { background: 'rgba(0, 0, 0, 0.5)' }
            }}
        />
    );
};

export default UpdateAds;
