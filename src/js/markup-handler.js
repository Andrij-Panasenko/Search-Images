export function createMurkup(arr) {
  return arr.map(({ webformatURL, largeImageURL, likes, tags, views, downloads, comments }) => {
    return `
   <div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" data-source="${largeImageURL}" loading="lazy" />
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
};
