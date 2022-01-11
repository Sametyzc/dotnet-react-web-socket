export const Fetch = (url, requestOptions) => (fetch(url, requestOptions)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    return false;
  })
  .then(json => json)
  .catch(() => false)
);
