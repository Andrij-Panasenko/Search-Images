import PixabayApiService from './js/api-handler';
import * as notify from './js/notification'
import { createMurkup } from './js/markup-handler';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('.search-form');
const contentContainer = document.querySelector('.gallery');
// const loadMoreBtn = document.querySelector('.load-more');
const target = document.querySelector('.js-guard')

searchForm.addEventListener('submit', searchHandler);
// loadMoreBtn.addEventListener('click', loadMoreClick);

const cardApiService = new PixabayApiService();

const options = {
  root: null,
  rootMargin: '400px',
};
const observer = new IntersectionObserver(scrollObserver, options);

const galleryItems = new SimpleLightbox('.gallery a');


function searchHandler(evt) {
  evt.preventDefault();

  cardApiService.query = evt.currentTarget.query.value;

  clearContentContainer();

  if (cardApiService.query === '') {
    notify.warningNotificationHandler();
    contentContainer.innerHTML = '';
    return;
  }

  cardApiService.resetPage();
  if (cardApiService.page === 13) {
    return
  }

  cardApiService.fetchItems()
    .then(cards => {
      if (cards.data.total === 0) {
        notify.warningNotificationHandler();
        return;
      }

      appendCardMarkup(cards);
      observer.observe(target)
      notify.successNotificationHandler();
    })
    .catch(notify.warningNotificationHandler);
}

// function loadMoreClick() {
//   cardApiService.fetchItems().then(appendCardMarkup);
// }

function scrollObserver(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      cardApiService.fetchItems().then(appendCardMarkup)

      if (cardApiService.page === 13) {
        observer.unobserve(target)
        notify.theEndOfListNotification();
        }
      }
  })
}

function appendCardMarkup(result) {
  contentContainer.insertAdjacentHTML('beforeend', createMurkup(result.data.hits));
  galleryItems.refresh();
}

function clearContentContainer() {
  contentContainer.innerHTML = '';
}
