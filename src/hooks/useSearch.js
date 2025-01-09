import { useState, useEffect, useRef } from "react";

function useSearch () {
    const [search, setSearch] = useState("")
    const [error, setError] = useState(null)
    const isFirsInput = useRef(true)

    useEffect(() => {
        if(isFirsInput.current){
            isFirsInput.current = search === ''
            return
        }
        if(search === ""){
            setError("No se puede hacer una búsqueda vacía")
            return
        }

        setError(null)
    }, [search])

    return {search, setSearch, error}
}
export default useSearch