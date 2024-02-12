// import Swiper JS
import Swiper from 'swiper'
import { Thumbs } from 'swiper/modules'
// import Swiper styles
import 'swiper/css'
import 'swiper/css/thumbs'

//loads the gallery to the items products
export const loadImages = (productGallery, galleryNav) => {
    const swiperNav = new Swiper(galleryNav, {
        spaceBetween: 50,
        slidesPerView: 4,
        height: 450,
        freeMode: true,
        watchSlidesProgress: true,
        direction: 'vertical'
    })
    
    const swiperFor = new Swiper(productGallery, {
        spaceBetween: 50,
        thumbs: {
            swiper: swiperNav,
          },
        modules: [Thumbs]
    })

    swiperFor.update()
}