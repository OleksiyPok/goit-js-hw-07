import { galleryItems } from './gallery-items.js';

changeGalleryConteiner();

const galleryContainer = document.querySelector('.gallery');
createGallery(galleryItems);

function changeGalleryConteiner() {
  const divEl = document.createElement('div');
  divEl.classList.add('gallery');
  document.querySelector('ul.gallery').after(divEl);
  document.querySelector('ul.gallery').remove();
}

function createGallery(items) {
  const previewGallery = items
    .map(({ preview, original, description }) => {
      return `
        <a class="gallery__item" href="${original}">
            <img 
                class="gallery__image"
                src="${preview}" 
                alt="${description}" 
            />
        </a>        
        `;
    })
    .join('');
  galleryContainer.insertAdjacentHTML('beforeend', previewGallery);
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  overlayOpacity: 1,
});
