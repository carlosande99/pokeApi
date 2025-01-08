import { useEffect } from "react";

export function useBackground (){
    useEffect(() => {
        document.documentElement.style.setProperty('--fondo-url', `url(/container_bg.png)`);
    })
}