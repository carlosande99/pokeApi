export function eliminarDuplicados(array1, array2) {
    const conjunto = new Set(array1);
    const resultado1 = array1.filter(item => !conjunto.has(item) || !array2.includes(item));
    const resultado2 = array2.filter(item => !conjunto.has(item) || !array1.includes(item));
    
    return [resultado1, resultado2];
}