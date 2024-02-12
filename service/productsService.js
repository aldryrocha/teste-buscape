async function listingItems() {
    try {
        let response = await fetch('http://localhost:3000/items')
        let items = await response.json()
        return items
    } catch (erro) {
        console.error(erro)
    }
}

export { listingItems }