import ShowInstallPromotionContext from "@contexts/installPromotion"
import useInstallPrompt from "@hooks/useInstallPrompt";
import { Button, NoSsr, Snackbar, SnackbarContent } from "@mui/material";
import loadable from '@loadable/component'
import IosShareIcon from '@mui/icons-material/IosShare';
import AddBoxIcon from '@mui/icons-material/AddBox';
const PWAPrompt = loadable(() => import("react-ios-pwa-prompt"))

const InstallPromotion = () => {
    const {showInstallPromotion, showInstallPromotionIOS, deferredPrompt, setDeferredPrompt} = useInstallPrompt()
    return (
        <NoSsr>
            {showInstallPromotion ? (
                <Snackbar anchorOrigin={{vertical: "bottom", horizontal: "left"}} open={showInstallPromotion}>
                    <SnackbarContent message="Instale o app!" action={<Button color="info" onClick={installPromotionHandler()}>
                Instalar
            </Button>} />
                </Snackbar>
            ): (showInstallPromotionIOS ? (
                <PWAPrompt 
                copyTitle={"Adicione o app na tela de início"}
                copyBody={`
                Instale o app e melhore a sua experiência.
                `}
                copyShareButtonLabel={`
                1) Toque em "Compartilhar"
                `}
                copyAddHomeButtonLabel={`
                2) Deslize para a esquerda, e toque em "Adicionar à tela de início"
                `}
                copyClosePrompt={"Fechar, não vamos mais mostrar essa mensagem"}
                permanentlyHideOnDismiss={false}
                timesToShow={3}
                 />
            ): null)}
        </NoSsr>
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
