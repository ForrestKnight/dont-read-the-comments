// attempt to remove the comment widget (it may load late, so retry a few times)
function removeCommentsWidget() {
  // Target the comment card using the test-id attribute (most reliable)
  const commentCard = document.querySelector('ytcd-card[test-id="channel-dashboard-comment-card"]');
  if (commentCard) {
    commentCard.remove();
    console.log('Comments widget removed using test-id');
    return true;
  }

  // Fallback: look for cards with "Comments" header
  const cards = document.querySelectorAll('ytcd-card.card.style-scope.ytcd-card-column');
  for (const card of cards) {
    // Look for the comment header specifically
    const commentHeader = card.querySelector('ytcd-card-header-item h2.item-title');
    if (commentHeader && commentHeader.textContent.trim() === 'Comments') {
      card.remove();
      console.log('Comments widget removed using header text');
      return true;
    }
  }

  // Additional fallback: look for ytcd-comments-snapshot-item (specific to comments)
  const commentsSnapshot = document.querySelector('ytcd-comments-snapshot-item');
  if (commentsSnapshot) {
    const parentCard = commentsSnapshot.closest('ytcd-card');
    if (parentCard) {
      parentCard.remove();
      console.log('Comments widget removed using snapshot element');
      return true;
    }
  }

  return false;
}

// run once on load then retry until successful or max attempts reached
if (!removeCommentsWidget()) {
  let attempts = 0;
  const maxAttempts = 10; // increased attempts for slower loading
  const interval = setInterval(() => {
    attempts++;
    const removed = removeCommentsWidget();
    
    if (removed || attempts >= maxAttempts) {
      clearInterval(interval);
      if (!removed) {
        console.log('Failed to remove comments widget after', maxAttempts, 'attempts');
      }
    }
  }, 1000);
}
