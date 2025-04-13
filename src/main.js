import getImagesByQuery, { PER_PAGE } from './js/pixabay-api';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {
  clearGallery,
  createGallery,
  hideLoader,
  hideLoadMoreButton,
  loadMoreBtn,
  showLoader,
  showLoadMoreButton,
} from './js/render-functions';

export const form = document.querySelector('.form');
form.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', handleLoadMore);

let page = 1;
let query = '';
const MAX_PAGE = 34;

async function handleSubmit(e) {
  e.preventDefault();
  hideLoadMoreButton();
  if (e.target.elements.search_text.value.trim() !== query) {
    query = e.target.elements.search_text.value.trim();
    page = 1;
  }

  if (query === '') {
    return;
  }

  showLoader();
  clearGallery();

  //   getImagesByQuery(query, page)
  //     .then(({ hits, totalHits }) => {
  //       if (hits.length === 0) {
  //         hideLoadMoreButton();

  //         iziToast.error({
  //           message:
  //             'Sorry, there are no images matching your search query. Please try again!',
  //           position: 'topRight',
  //           messageColor: 'white',
  //           backgroundColor: 'red',
  //           transitionIn: 'fadeInUp',
  //         });
  //       } else {
  //         createGallery(hits);

  //         if (page * PER_PAGE < totalHits) {
  //           showLoadMoreButton();
  //         } else {
  //           hideLoadMoreButton();
  //           iziToast.info({
  //             message:
  //               "We're sorry, but you've reached the end of search results.",
  //             position: 'topRight',
  //             transitionIn: 'fadeInUp',
  //           });
  //         }
  //       }
  //     })
  //     .catch(error => console.log(error))
  //     .finally(() => hideLoader());

  try {
    const { hits, totalHits } = await getImagesByQuery(query, page);

    if (hits.length === 0) {
      hideLoadMoreButton();

      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        messageColor: 'white',
        backgroundColor: 'red',
        transitionIn: 'fadeInUp',
      });
    } else {
      createGallery(hits);

      if (page * PER_PAGE < totalHits) {
        showLoadMoreButton();
      } else {
        hideLoadMoreButton();
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
          transitionIn: 'fadeInUp',
        });
      }
    }
    hideLoader();
  } catch (error) {
    console.log(error.message);
  }

  e.target.reset();
}

async function handleLoadMore() {
  page++;
  hideLoadMoreButton();
  showLoader();

  try {
    const { hits, totalHits } = await getImagesByQuery(query, page);
    hideLoader();
    createGallery(hits);

    if (page * PER_PAGE < totalHits) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        transitionIn: 'fadeInUp',
      });
    }

    const item = document.querySelector('.item');
    const itemHeight = item.getBoundingClientRect().height;

    window.scrollBy({
      left: 0,
      top: itemHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    console.log(error.message);
  }
}
