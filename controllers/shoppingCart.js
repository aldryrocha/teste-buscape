import { listingItems } from '../service/productsService.js'
const cart = document.querySelector('.list-produts')
const localStoreItems = localStorage.getItem('arrayItems')
let arrayItems = localStoreItems ? JSON.parse(localStoreItems) : []

//check if a item was click and send to the cart
const getItemBtn = () => {
    const buttons = document.querySelectorAll('.productInfo__buttonAddCart')
    buttons.forEach(btn => {
        btn.addEventListener('click', (event) => {
            if(arrayItems == ''){
                addCart(event.target.getAttribute('data-id'))
            }
            else{
                checkExistInCart(event.target.getAttribute('data-id'))
            }
        })        
    })
}

//check if one item was clicked to be removed from the cart
const deleteItemCart = async() => {
    const btnsRemove = document.querySelectorAll('.item__remove')    
    btnsRemove.forEach(btn => {
        btn.addEventListener('click', (event) => {
            removeItemCart(event.target.getAttribute('data-id'))
        })        
    })
}

//check if the item it´s already on the cart 
const checkExistInCart = (id) => {
    const idBuscar = parseInt(id)
    let searchItemExist = arrayItems.find(function(value, index, arr) {
        return arr[index].product.id == idBuscar
    })
    if(searchItemExist == undefined){
        addCart(id)
    } else{
        alert('Produto já adicionado ao carrinho')
    }    
}

//add item product to the cart
const addCart = async (id) => {
    while (cart.firstChild) {
        cart.removeChild(cart.firstChild)
    }
    try{
        const allItems = await listingItems()
        
        allItems.forEach((item) => {
            if(item.product.id == id){
                arrayItems.push(item)
                updateLocalStorage()
                ShowCart()
            }
        })
    }
    catch(erro){
        console.log(erro)
    }    
}

//if changes are made in the cart, the array it´s setted
const updateLocalStorage = () => {
    localStorage.setItem('arrayItems', JSON.stringify(arrayItems))
    showSubtotal()
    iconQtProductsOnCart()
}

//if a item is add or delete on the cart, this function it´s call
const ShowCart = () => {
    arrayItems.forEach(item => {
        const newItemCart = document.createElement('li')
        newItemCart.classList.add('list-produts__item')
        newItemCart.setAttribute("id", `itemProduct-${item.product.id}`)

        const content = `
        <div class="list-produts__img">
            <img width="44" height="44" src="${item.product.images[0]}" alt="${item.product.name}">
        </div>
        <div class="list-produts__infos">
            <h1 class="item__name">${item.product.name}</h1>
            <p class="item__installments"><span>${item.product.price.installments}</span>X <span>${item.product.price.installmentValue.toLocaleString('pt-BR', { style: 'decimal', 
            currency: 'BRL', minimumFractionDigits: 2})}</span></p>
            <p class="item__price">${item.product.price.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} à vista</p>
            <button type="button" data-id="${item.product.id}" class="item__remove">X</span>
        </div>` 

        newItemCart.innerHTML = content
        cart.appendChild(newItemCart)
        deleteItemCart()
        showSubtotal()
        iconQtProductsOnCart()
    })
}

//show the subtotal to the cart
const showSubtotal = () => {
    const totalInstallments = document.querySelector('.total-payment__installments span')
    const totalPrice = document.querySelector('.total-payment__totalValue span')
    let calctotalInstallment = 0
    let calcTotalPrice = 0    

    arrayItems.forEach(item => {
        calctotalInstallment += item.product.price.installmentValue
        calcTotalPrice += item.product.price.value
    })

    totalInstallments.innerHTML = calctotalInstallment.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    totalPrice.innerHTML = calcTotalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

//delete the item clicked on the cart
const removeItemCart = (id) => {
    arrayItems.forEach(item => {
        if(item.product.id == id){
            const index = arrayItems.indexOf(item)
            if(index !== -1){
                arrayItems.splice(index, 1)
            }
            let itemRemove = document.getElementById(`itemProduct-${item.product.id}`)
            itemRemove.remove()
            arrayItems.filter(t=> t!= item)
        }
        updateLocalStorage()
    })
}

//show the nunber of items on the menu cart
const iconQtProductsOnCart = () => {
    const showQtProductsCart = document.querySelector('.qtProductsCart')
    showQtProductsCart.classList.add('show')
    showQtProductsCart.innerHTML = arrayItems.length
}

export { getItemBtn, ShowCart }