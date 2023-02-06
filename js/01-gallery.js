import { galleryItems } from './gallery-items.js';
// Change code below this line

const cssIncludePlace = document.querySelector('head');
const cssIncludeLink = `<link href="https://cdn.jsdelivr.net/npm/basiclightbox@5.0.4/dist/basicLightbox.min.css" rel="stylesheet">`;
cssIncludePlace.insertAdjacentHTML('beforeend', cssIncludeLink);

// const jsIncludePlace = document.querySelector('body script');
// const jsIncludeLink = `<script defer src="https://cdn.jsdelivr.net/npm/basiclightbox@5.0.4/dist/basicLightbox.min.js"></script>`;
// jsIncludePlace.insertAdjacentHTML('afterend', jsIncludeLink);

const galleryContainer = document.querySelector('.gallery');
const previewGallery = createPreviewGallery(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', previewGallery);

galleryContainer.addEventListener('click', onPreviewPhotoClick);

function createPreviewGallery(galleryItems) {
  return galleryItems
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
}

function onPreviewPhotoClick(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') return;
  const originalPhotoLink = getOriginalPhotoLink(e);
  showOriginalPhoto(originalPhotoLink);
}

function getOriginalPhotoLink(e) {
  return e.target.dataset.source;
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
