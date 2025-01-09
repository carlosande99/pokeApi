import { useEffect } from "react";
import backgroundImage from '../assets/images/container_bg.png';

export function useBackground() {
    useEffect(() => {
        document.documentElement.style.setProperty('--fondo-url', `url(${backgroundImage})`);
    }, []);
}