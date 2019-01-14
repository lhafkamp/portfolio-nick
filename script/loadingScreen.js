const allImages = document.querySelectorAll('img')
const loading = document.querySelector('.loading')

const loadingScreen = (function() {
  let imageCounter = 0

  function fadeOut(loading) {
    loading.style.opacity = 0
    setTimeout(function() {
      loading.style.display = 'none'
    }, 1000);
    document.body.style.overflow = 'auto'
  }

  function countImages(images, loading) {
    imageCounter++
    if (imageCounter === images.length) {
      fadeOut(loading)
    }
  }

  function fallback(loading, seconds) {
    setTimeout(function() {
      fadeOut(loading)
    }, seconds);
  }
  
  return {
    load: function(images, loading, seconds) {
      countImages(images, loading)
      fallback(loading, seconds)
    }
  }
})()

allImages.forEach(img => {
  let source = img.src
  img.src = ''
  img.addEventListener('load', () => loadingScreen.load(allImages, loading, 3000))
  img.src = source
})
