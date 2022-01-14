import ShowInstallPromotionContext from "@contexts/installPromotion"
import useInstallPrompt from "@hooks/useInstallPrompt";
import { Button, Snackbar, SnackbarContent } from "@mui/material";
import { useContext, useEffect, useState } from "react"

const InstallPromotion = () => {
    const {showInstallPromotion, setShowInstallPromotion, deferredPrompt, setDeferredPrompt} = useInstallPrompt()
    return (
        <>
            {showInstallPromotion && (
                <Snackbar anchorOrigin={{vertical: "bottom", horizontal: "left"}} open={showInstallPromotion}>
                    <SnackbarContent message="Instale o app!" action={<Button color="info" onClick={installPromotionHandler()}>
                Instalar
            </Button>} />
                </Snackbar>
            )}
        </>
    )

    function installPromotionHandler() {
        return async () => {
            // Hide the app provided install promotion
            // setShowInstallPromotion(false)
            // Show the install prompt
            deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            const { outcome } = await deferredPrompt.userChoice;
            // Optionally, send analytics event with outcome of user choice
            console.log(`User response to the install prompt: ${outcome}`);
            // We've used the prompt, and can't use it again, throw it away
            setDeferredPrompt(undefined);
        };
    }
}

export default InstallPromotion
