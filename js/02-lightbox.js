import { galleryItems } from './gallery-items.js';

changeGalleryConteiner();
createGallery();

function changeGalleryConteiner() {
  const divEl = document.createElement('div');
  divEl.classList.add('gallery');
  document.querySelector('ul.gallery').after(divEl);
  document.querySelector('ul.gallery').remove();
}

function createGallery() {
  const galleryContainer = document.querySelector('.gallery');
  const previewGallery = createPreviewGallery(galleryItems);
  galleryContainer.insertAdjacentHTML('beforeend', previewGallery);
}

function createPreviewGallery(items) {
  return items
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
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  overlayOpacity: 1,
});
