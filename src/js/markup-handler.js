export function createMurkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        likes,
        tags,
        views,
        downloads,
        comments,
      }) => {
        return `
    <div class="photo-card">
      <a href="${largeImageURL}">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
        <div class="info">
          <p class="info-item">
            <b>Likes ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads ${downloads}</b>
          </p>
        </div>
    </div>
`;
      }).join('')
}

