import React, { useState } from "react";
import cssStyle from "./AdsCard.module.scss";
import { Button } from "@fluentui/react-northstar";
const DarkAdsCard = ({ authStatus, adsData, position }) => {
    const currDate = new Date().getTime();
    const [isOpen, setIsOpen] = useState(false);
    const ToggleDilog = (isopen) => {
        setIsOpen(isopen);
    };
    
    const {cardData , id} = adsData;
    return (
        <>
            {adsData!==undefined || cardData.expire>currDate ? (
                <div className={`${cssStyle.DarkAdsCard} ${authStatus && cssStyle.HoveredDarkAdsCard} card px-4 py-3 bg-dark mt-1`}>
                    <div className={cssStyle.HoveredButton}>
                        <Button onClick={() => ToggleDilog(true)} content='Edit Ads Card' primary />
                    </div>
                    <p className={`${cssStyle.adscontent} card-title text-warning`}>{cardData.message}</p>
                    <p className={`${cssStyle.adsowner} card-title text-light`}>{cardData.owner}</p>
                    <div className={`${cssStyle.adsbtn} d-flex justify-content-between align-items-center mx-3`}>
                        {cardData.mobileno !== "" && <a href={`tel:${cardData.mobileno}`} className={`${cssStyle.call} btn btn-success px-3`}><i className="fas fa-solid fa-phone me-2"></i>Call Now</a>}
                        {cardData.whatsapp !== "" && <a href={`tel:${cardData.mobileno}`} className={`${cssStyle.whatsapp} btn btn-danger px-3`}><i className="fas fa-solid fa-phone me-2"></i>WhatsApp</a>}
                        {cardData.whatsapp === "" && <a href={cardData.telegram} className={`${cssStyle.telegram} btn btn-info px-3`}><i className="fas fa-brands fa-telegram me-2"></i>Telegram</a>}
                    </div>
                </div>
            ) : (
                <div className={`${cssStyle.DarkAdsCard} ${authStatus && cssStyle.HoveredDarkAdsCard} card px-4 py-3 mt-1`}>
                    <div className={cssStyle.HoveredButton}>
                        <Button onClick={() => ToggleDilog(true)} content='Edit Ads Card' primary />
                    </div>
                    <p className={`${cssStyle.adsPersonalcontent} card-title text-success`}>{`पोजीशन नंबर ${position} पे कोई भी Dark Card Ads नही है अभी के लिए ये जगह खाली है अगर आपको अपना Dark Card Ads दलबना तो Call या WathsApp बात करे.`}</p>
                    <p className={`${cssStyle.adsPersonalowner} card-title text-dark`}>{`Prince Kurmi`}</p>
                    <div className={`${cssStyle.adsbtn} d-flex justify-content-between align-items-center mx-3`}>
                        <a href={`tel:+918755507582`} className={`${cssStyle.call} btn btn-success px-3`}><i className="fas fa-solid fa-phone me-2"></i>Call Now</a>
                        <a href={`https://web.whatsapp.com/`} className={`${cssStyle.whatsapp} btn btn-danger px-3`}><i className="fas fa-solid fa-phone me-2"></i>WhatsApp</a>
                        {/* {cardData.telegram !== "" && <a href={cardData.telegram} className={`${cssStyle.whatsapp} btn btn-info px-3`}><i className="fas fa-brands fa-telegram me-2"></i>Telegram</a>} */}
                    </div>
                </div>
            )}
            {/* {authStatus && cardData && <UpdateAds cardData={cardData} isOpen={isOpen} ToggleDilog={(isopen) => ToggleDilog(isopen)} />} */}
        </>

    );
}

export default DarkAdsCard;
