import { useContext } from 'react'
import { GlobalContext } from '../context'

export const useGlobalContext = () => {
    const context = useContext(GlobalContext)

    if (!context) {
        throw new Error("useGlobalContext debe usarse dentro de un proveedor AppProvider")
    }

    return context
}