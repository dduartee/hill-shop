import { useState, useEffect } from "react";

const UseInstallPrompt = () => {
    const [showInstallPromotion, setShowInstallPromotion] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState<any>(undefined)
    useEffect(() => {
        window.addEventListener("beforeinstallprompt", (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(e);
            // Update UI notify the user they can install the PWA
            setShowInstallPromotion(true)
            // Optionally, send analytics event that PWA install promo was shown.
            console.log(`'beforeinstallprompt' event was fired.`);
        });
        console.log(`'beforeinstallprompt' event listener was registered.`);
    }, [setShowInstallPromotion])
    useEffect( () => {
        if(showInstallPromotion === true && deferredPrompt !== undefined){
            window.addEventListener('appinstalled', () => {
                // Hide the app-provided install promotion
                setShowInstallPromotion(false)
                // Clear the deferredPrompt so it can be garbage collected
                setDeferredPrompt(undefined);
                // Optionally, send analytics event to indicate successful install
                console.log('PWA was installed');
            });
            console.log(`'appinstalled' event listener was registered.`);
        }
    }, [setShowInstallPromotion, showInstallPromotion, deferredPrompt]);
    return {
        showInstallPromotion, 
        setShowInstallPromotion,
        deferredPrompt,
        setDeferredPrompt
    }
}

export default UseInstallPrompt