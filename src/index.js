import PixabayApiService from './js/api-handler';
import * as notify from './js/notification';
import { createMurkup } from './js/markup-handler';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('.search-form');
const contentContainer = document.querySelector('.gallery');
// const loadMoreBtn = document.querySelector('.load-more');
const target = document.querySelector('.js-guard');

searchForm.addEventListener('submit', searchHandler);
// loadMoreBtn.addEventListener('click', loadMoreClick);

const cardApiService = new PixabayApiService();

const options = {
  root: null,
  rootMargin: '400px',
};
const observer = new IntersectionObserver(scrollObserver, options);

const galleryItems = new SimpleLightbox('.gallery a');

async function searchHandler(evt) {
  evt.preventDefault();

  const queryData = evt.currentTarget.query.value;
  cardApiService.query = queryData.trim();

  clearContentContainer();

  if (cardApiService.query === '') {
    notify.warningNotificationHandler();
    clearContentContainer();
    return;
  }

  cardApiService.resetPage();

  try {
    const cards = await cardApiService.fetchItems();
    const totalCards = cards.data.totalHits;

    if (cards.data.totalHits === 0) {
      notify.warningNotificationHandler();
      return;
    }

    appendCardMarkup(cards);
    notify.successNotificationHandler();

    if (totalCards <= cardApiService.perPage) {
      return;
    }
    observer.observe(target);
  } catch (error) {
    notify.warningNotificationHandler();
  }
}

// function loadMoreClick() {
//   cardApiService.fetchItems().then(appendCardMarkup);
// }

async function scrollObserver(entries, observer) {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      try {
        if (entry.isIntersecting) {
          const cards = await cardApiService.fetchItems();
          const totalCards = cards.data.totalHits;
          const totalPages = Math.ceil(totalCards / cardApiService.perPage);
          const currentPage = cardApiService.page - 1;

          appendCardMarkup(cards);

          if (currentPage === totalPages) {
            observer.unobserve(target);
            notify.theEndOfListNotification()
          }
        }
      } catch (error) {
        notify.warningNotificationHandler();
      };
    };
  };
};

function appendCardMarkup(result) {
  contentContainer.insertAdjacentHTML(
    'beforeend',
    createMurkup(result.data.hits)
  );
  galleryItems.refresh();
}

function clearContentContainer() {
  contentContainer.innerHTML = '';
}

// 1 + Прибрати умову в класі апі хендлера ++++++++ done
//   + в коді than().catch - ні, використати async await ++++++ done
// 5 + затрімити запит ++++++++++++++ done
// не вішаю обзервер якщо кількість карток менше значення perPage +++++ done

// Треба сумарне значення карток, поділити на 40 - значення peg_page - його можна спробувати дістати з екземпляра класу this.perPage;
// 2 - пофіксити запити спираючись на тоталХітс
// 3 - не підключати обзервер якщо тоталХатс менше 40
// 4 - на ф - ції обзервера треба динамічно розуміти що таке остання сторінка
//   (тоталХітс / 40 - це наш per_page) за допомогою округлення в вищу (Math.ceil()) сторону розуміти яка остання сторінка і по ній порівнювати поточну
