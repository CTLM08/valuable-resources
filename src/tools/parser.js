const parser = new DOMParser();

const parseHTML = (html) => {
  const doc = parser.parseFromString(html, 'text/html');
  const ogImage = doc.querySelector("meta[property='og:image'],meta[name='og:image']");
  if (ogImage) {
    return ogImage.content;
  }
  return null;
};

export default async (url) => {
  try {
    const img = await fetch(`https://${url.split('://')[1] ?? url}`)
      .then((e) => {
        if (e.status === 400) {
          throw new Error('hmm');
        }
        return e.text();
      })
      .then(parseHTML);
    return img;
  } catch {
    const img = await fetch(`https://cors-anywhere.thecodeblog.net/${url.split('://')[1] ?? url}`)
      .then((e) => e.text())
      .then(parseHTML);
    return img;
  }
};
