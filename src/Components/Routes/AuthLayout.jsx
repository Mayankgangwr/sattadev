import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../Firestore/";

export default function AuthLayout({ children, authentication = true }) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    useEffect(async () => {
        const authStatus = await authService.getCurrentUser();
        if (authentication && authStatus !== authentication) {
            navigate("/login");
        } else if (!authentication && authStatus !== authentication) {
            navigate("/");
        }
        setLoader(false);
    }, [navigate, authentication]);

    return loader ? <h1 className="">Loading....</h1> : <>{children}</>;
}