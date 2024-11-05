const API_KEY = "fnKaDvJfw5ig2tE61eZLoChOtCET565u3rt2B_ZeqLg";

const inyectContent = document.querySelector("#content");

const photos = await getPhotos();
renderPhotos(photos);

navigation.addEventListener("navigate", (event) => {
  // Pillamos la URL que el usuario quiere navegar
  const originUrl = new URL(window.location.href);
  const destinationUrl = new URL(event.destination.url);

  // Si la URL es externa, no interceptamos la petición
  if (shouldIntercept(destinationUrl)) {
    event.intercept({
      async handler() {
        console.log("Intercepted");
        const respose = await fetch(destinationUrl);
        const html = await respose.text();
        const content = getPageContent(html);
        const isSamePath = originUrl.pathname === destinationUrl.pathname;

        if (!isSamePath) {
          inyectContent.innerHTML = content;
        }
      }
    });
  }
});

function renderPhotos(photos) {
  inyectContent.innerHTML = photos
    .map(
      (photo) => `<img class="image" src="${photo.urls.regular}" alt="${photo.description}">`
    )
    .join("");
}

async function getPhotos() {
  const resp = await fetch(
    `https://api.unsplash.com/photos?client_id=${API_KEY}&per_page=10`
  );
  const json = await resp.json();
  return json;
}

function getPageContent(html) {
  return /<body[^>]*>([\w\W]*)<\/body>/.exec(html)[1];
}

function shouldIntercept(url) {
  // Si es el mismo dominio incerpetamos la petición
  // Si no es el mismo dominio, no incerpetamos la petición
  const isSameOrigin = url.origin === window.location.origin;
  return isSameOrigin;
}