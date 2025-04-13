import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
export const loadMoreBtn = document.querySelector('.load-more');

let galleryLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="item"><a href="${largeImageURL}" class="photo-card"><img class="image" src="${webformatURL}" alt="${tags
          .split(',')
          .slice(
            0,
            3
          )}" /><div class="stats"><div class="wrapper"><p class="stats-title">Likes</p><p class="stats-item">${likes}</p></div><div class="wrapper"><p class="stats-title">Views</p><p class="stats-item">${views}</p></div><div class="wrapper"><p class="stats-title">Comments</p><p class="stats-item">${comments}</p></div><div class="wrapper"><p class="stats-title">Downloads</p><p class="stats-item">${downloads}</p></div></div></a></li>`;
      }
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);

  galleryLightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('is-hidden');
}

export function hideLoader() {
  loader.classList.add('is-hidden');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.replace('is-hidden', 'is-show');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.replace('is-show', 'is-hidden');
}
