import { galleryItems } from './gallery-items.js';

const galleryContainer = document.querySelector('.gallery');
galleryContainer.addEventListener('click', onPreviewPhotoClick);

createPreviewGallery(galleryItems);

function createPreviewGallery(items) {
  const previewGallery = items
    .map(({ preview, original, description }) => {
      return `
        <div class="gallery__item">
            <a class="gallery__link" href="${original}">
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"                
                alt="${description}"
            />
            </a>
        </div>
        `;
    })
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', previewGallery);
}

function onPreviewPhotoClick(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') return;
  showOriginalPhoto(e.target.dataset.source);
}

function showOriginalPhoto(link) {
  const instance = basicLightbox.create(`<img width="1280" height="855" src="${link}">`);
  instance.show();

  galleryContainer.addEventListener('keydown', onKeydown);

  function onKeydown(e) {
    if (e.code == 'Escape') {
      instance.close();
      galleryContainer.removeEventListener('keydown', onKeydown);
    }
  }
}
