import PixabayApiService from './js/api-handler';
import {
  warningNotificationHandler,
  successNotificationHandler,
} from './js/notification';
import { createMurkup } from './js/markup-handler';

const searchForm = document.querySelector('.search-form');
const contentContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

searchForm.addEventListener('submit', searchHandler);
loadMoreBtn.addEventListener('click', loadMoreClick);

const cardApiService = new PixabayApiService();
// const observer = new IntersectionObserver();

function searchHandler(evt) {
  evt.preventDefault();

  cardApiService.query = evt.currentTarget.query.value;

  clearContentContainer();

  if (cardApiService.query === '') {
    warningNotificationHandler();
    console.log('error');
    contentContainer.innerHTML = '';
    return;
  }

  cardApiService.resetPage();
  cardApiService
    .fetchItems()
    .then(cards => {
      console.log(cards);
      if (cards.data.total === 0) {
        warningNotificationHandler();
        return
      } 
      appendCardMarkup(cards);
      successNotificationHandler();
    })
    .catch(warningNotificationHandler);
}

function loadMoreClick() {
  cardApiService.fetchItems().then(appendCardMarkup);
}

function appendCardMarkup(result) {
  contentContainer.insertAdjacentHTML(
    'beforeend',
    createMurkup(result.data.hits)
  );
}

function clearContentContainer() {
  contentContainer.innerHTML = '';
}
