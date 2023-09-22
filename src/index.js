import PixabayApiService from './js/api-handler';
import { notificationHandler } from './js/notification';
import { createMurkup } from './js/markup-handler';

const searchForm = document.querySelector('.search-form');
const contentContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

searchForm.addEventListener('submit', searchHandler);
loadMoreBtn.addEventListener('click', loadMoreClick);

const cardApiService = new PixabayApiService();

function searchHandler(evt) {
  evt.preventDefault();

  cardApiService.query = evt.currentTarget.query.value;

  clearContentContainer();

  if (cardApiService.query === '') {
    notificationHandler();
    console.log('error');
    contentContainer.innerHTML = '';
    return;
  }

  cardApiService.resetPage();
  cardApiService
    .fetchItems()
    .then(cards => {
      if (cards.data.total !== 0) {
        appendCardMarkup(cards);
        return
      } 
      notificationHandler();
    })
    .catch(
      notificationHandler
    );
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
