import { useState } from "react";
import cssStyle from "./AdsCard.module.scss";

const LightAdsCard = ({ position, adsData, authStatus }) => {
    const currDate = new Date().getTime();
    const [isOpen, setIsOpen] = useState(false);
    const ToggleDilog = (isopen) => {
        setIsOpen(isopen);
    };

    const { cardData, id } = adsData;
    return (
        <>
            {adsData !== undefined || cardData.expire > currDate ? (
                <div className={`${cssStyle.LightAdsCard} ${authStatus && cssStyle.HoveredLightAdsCard} card p-0 m-0 border-dark mt-1`}>
                    <div className={cssStyle.HoveredButton}>
                        <button className="btn btn-primary" onClick={() => ToggleDilog(true)}>Edit Ads Card</button>

                    </div>
                    <p className={`${cssStyle.headerfooter} card-text text-light m-0 p-0`}>SATTA KING ONLINE RESULT</p>
                    <div className={cssStyle.contentarea}>
                        <h1 className={cssStyle.adsbody}>SATTA KING</h1>
                        <p className={`${cssStyle.adscontent} card-title text-primary`}>{cardData.message}</p>
                        <p className={`${cssStyle.director} card-title text-danger`}>{cardData.branch}</p>
                        <p className={`${cssStyle.adsowner} card-title`}>{cardData.owner}</p>
                        <div className={`${cssStyle.adsbtn} d-flex justify-content-between align-items-center mx-5`}>
                            {cardData.mobileno !== "" && <a href={`tel:${cardData.mobileno}`} className={`${cssStyle.call} btn btn-success px-3`}><i className="fas fa-solid fa-phone me-2"></i>Call Now</a>}
                            {cardData.whatsapp !== "" && <a href={`tel:${cardData.mobileno}`} className={`${cssStyle.whatsapp} btn btn-danger px-3`}><i className="fas fa-solid fa-phone me-2"></i>WhatsApp</a>}
                            {cardData.whatsapp === "" && <a href={cardData.telegram} className={`${cssStyle.whatsapp} btn btn-info px-3`}><i className="fas fa-brands fa-telegram me-2"></i>Telegram</a>}
                        </div>
                    </div>
                    <p className={`${cssStyle.headerfooter} card-text text-light`}>ONLINE ON WHATS APP</p>
                </div>
            ) : (
                <div className={`${cssStyle.DarkAdsCard} ${authStatus && cssStyle.HoveredDarkAdsCard} card px-4 py-3 bg-dark mt-1`}>
                    <div className={cssStyle.HoveredButton}>
                        <button className="btn btn-primary" onClick={() => ToggleDilog(true)}>Edit Ads Card</button>
                    </div>
                    <p className={`${cssStyle.adsPersonalcontent} card-title text-success`}>{`पोजीशन नंबर ${position} पे कोई भी Light Card Ads नही है अभी के लिए ये जगह खाली है अगर आपको अपना Light Card Ads दलबना तो Call या WathsApp बात करे.`}</p>
                    <p className={`${cssStyle.adsPersonalowner} card-title text-light`}>{`Prince Kurmi`}</p>
                    <div className={`${cssStyle.adsbtn} d-flex justify-content-between align-items-center mx-3`}>
                        <a href={`tel:+918755507582`} className={`${cssStyle.call} btn btn-success px-3`}><i className="fas fa-solid fa-phone me-2"></i>Call Now</a>
                        <a href={`https://web.whatsapp.com/`} className={`${cssStyle.whatsapp} btn btn-danger px-3`}><i className="fas fa-solid fa-phone me-2"></i>WhatsApp</a>
                    </div>
                </div>
            )}
            {/* {authStatus && cardData && <UpdateAds cardData={cardData} isOpen={isOpen} ToggleDilog={(isopen) => ToggleDilog(isopen)} />} */}
        </>
    );
};

export default LightAdsCard;
