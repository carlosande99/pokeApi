export const BuscarPokemon = (event) => {
    event.preventDefault()
    const {buscar} = Object.fromEntries(new window.FormData(event.target))
    console.log({buscar})
    return buscar
}
