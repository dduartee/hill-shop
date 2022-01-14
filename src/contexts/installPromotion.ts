import { createContext} from "react"


const ShowInstallPromotionContext = createContext<{
    showInstallPromotion: boolean,
    setShowInstallPromotion: (showInstallPromotion: boolean) => void
}>(
    {
        showInstallPromotion: false,
        setShowInstallPromotion: () => { }
    }
)

export default ShowInstallPromotionContext

