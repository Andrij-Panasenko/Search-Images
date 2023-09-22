import Notiflix from 'notiflix';

export function warningNotificationHandler() {
  Notiflix.Notify.warning('Oops! Something went wrong! Try again!');
}

export function successNotificationHandler() {
  Notiflix.Notify.success('Hooray! We found lots images.');
}