// attempt to remove the comment widget (it may load late, so retry a few times)
function removeCommentsWidget() {
  const cards = document.querySelectorAll('ytcd-card.card.style-scope.ytcd-card-column');

  for (const card of cards) {
    const firstDiv = card.querySelector('div');
    if (firstDiv && firstDiv.textContent.includes('Latest comments')) {
      card.remove();
      return;
    }
  }
}

// run once on load then a few retries
removeCommentsWidget();
let attempts = 0;
const interval = setInterval(() => {
  removeCommentsWidget();
  attempts++;
  if (attempts > 5) clearInterval(interval);
}, 1000);
