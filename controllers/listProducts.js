import '../public/assets/styles/main.scss'
import { listingItems } from '../service/productsService.js'
import { getItemBtn, ShowCart } from './shoppingCart.js'
import { loadImages } from './itemGallery.js'
const productsSection = document.querySelector('.products')

//create every product items, they gallery and infos
const createNewLine = (product) => {
    const newProduct = document.createElement('article')
    newProduct.classList.add('products__item', `product-${product.id}`)

    const contentIMG = gallerySection(product.images)
    const contentInfos = InfosSection(product)    
    newProduct.append(contentIMG, contentInfos)
     
    return newProduct
}

//build the gallery side on the products items
const gallerySection = (images) => {
    const newGallery = document.createElement('div')
    newGallery.classList.add('gallery')

    const galleryContent = `<div class="product-img-slide">
        <div class="swiper swiper-for" data-swiper-for>
            <div class="swiper-wrapper" data-swiper-for-content>
                ${images.map((image) => {
                    return '<div class="swiper-slide"><img src="' + image +'" /></div>'
                }).join("")}
            </div>
        </div>
        <div thumbsSlider="" class="swiper swiper-nav" data-swiper-nav>
            <div class="swiper-wrapper" data-swiper-content>
            ${images.map((image) => {
                return '<div class="swiper-slide"><img src="' + image +'" /></div>'
            }).join("")}
            </div>
        </div>
    </div>
    `
    newGallery.innerHTML = galleryContent    
    return newGallery
}

//build the informations side on the products items
const InfosSection = (product) => {    
    const newInfos = document.createElement('div')
    newInfos.classList.add('productInfo')
    const contentInfos = `
        <h1 class="productInfo__nameItem">${product.name}</h1>
        <div class="productInfo__installments">
            <p class="productInfo__valueAmount"><span class="amount">${product.price.installments}</span>X R$ <span class="value">${product.price.installmentValue.toLocaleString('pt-BR', { style: 'decimal', 
            currency: 'BRL', minimumFractionDigits: 2})}</span></p>
            <button type="button" class="productInfo__buttonAddCart" data-id="${product.id}">Adicionar ao carrinho</button>
        </div>
        <p class="productInfo__inCash">ou <span class="contrast">${product.price.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span> à vista</p>
    `
    newInfos.innerHTML = contentInfos
    return newInfos
}

//set the items on the screen, calling all actions that are needed 
const render = async () => {
    try{
        const allItems = await listingItems()
        allItems.forEach((item) => {
            productsSection.appendChild(createNewLine(item.product))
        })

        const galleries = document.querySelectorAll('.gallery')
        if (galleries) {
            galleries.forEach(gallery => {
                const productGallery = gallery.querySelector('[data-swiper-for]')
                const galleryNav = gallery.querySelector('[data-swiper-nav]')

                loadImages(productGallery, galleryNav)
            })
        }

        getItemBtn() //call function that listen the click on the btn 'adicionar ao carrinho'
        ShowCart() //call function that shows the items on the cart menu
    }
    catch(erro){
        console.log(erro)
    }    
}
render()