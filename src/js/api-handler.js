import axios from 'axios';

export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchItems() {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '39582157-9a04a9ecff1d4e24afa36bf7b';

    if (this.page === 14) {
      return;
    }

    const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
    const result = await axios.get(url);

    this.incrementPage();

    return result;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
