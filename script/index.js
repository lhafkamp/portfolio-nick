const slideShow = document.querySelector('.slide')
const slideItems = document.querySelectorAll('.slide .item')
const icons = document.querySelectorAll('.info svg path')

const paraItems = {
  saloon: document.querySelector('.saloon'),
  cactus: document.querySelector('.cactus')
}

const ctrlButtons = {
  prev: document.querySelector('.prev'),
  next: document.querySelector('.next')
}

const firstSlideItems = {
  info: document.querySelector('.info'),
  contact: document.querySelector('.contact'),
  scooter: document.querySelector('.scooter'),
  snap: document.querySelector('.snap'),
  body: document.querySelector('body'),
  scrollMore: document.querySelector('.scroll-more')
}

const para = (function() {
  let i = 0
  let animationQueued = false

  window.onbeforeunload = function() {
    window.scrollTo(0, 0)
  }

  function optimizeAnimation(paraItems) {
    if (animationQueued) {
      return
    }

    animationQueued = true

    window.requestAnimationFrame(() => {
      moveImages(paraItems)
      animationQueued = false
    })
  }

  function moveImages(paraItems) {
    paraItems.saloon.style.transform = `translate(${(window.scrollY * 30) / 100}px)`
    paraItems.cactus.style.transform = `translate(-${(window.scrollY * 20) / 100}px)`
  }

  function fadeInNew(slide, items) {
    items.scrollMore.classList.add('fade-away')

    if (window.scrollY > 800) {
      items.body.classList.add('hide-scroll')
      slide.classList.remove('hide')
      slide.classList.add('new-slide')
      items.info.classList.add('info-repo')
      items.contact.classList.add('contact-repo')

      if (items.scooter.classList.contains('animation')) {
        setTimeout(function() {
          items.scooter.classList.add('drive')
          setTimeout(function() {
            items.snap.classList.remove('hide')
            items.scooter.classList.remove('animation')
            items.scooter.classList.remove('drive')
          }, 2000)
        }, 800)
      }
    }
  }

  function controls(items, direction, btn) {
    if (direction === 'next') {
      i++
    } else {
      i--
    }

    if (i === items.length - 1) {
      btn.next.classList.add('hide')
    } else if (i === 0) {
      btn.prev.classList.add('hide')
    } else {
      if (
        btn.prev.classList.contains('hide') ||
        btn.next.classList.contains('hide')
      ) {
        btn.prev.classList.remove('hide')
        btn.next.classList.remove('hide')
      }
    }
  }

  function changeIconColors(items, icons) {
    if (items[i].classList.contains('dark-icons')) {
      icons.forEach(svg => svg.classList.remove('icon-fill'))
    } else {
      icons.forEach(svg => svg.classList.add('icon-fill'))
    }
  }

  function handleClick(items, direction, icons, ctrlButtons) {
    controls(items, direction, ctrlButtons)
    changeIconColors(items, icons)

    items.forEach(item => {
      item.classList.remove('active')
      item.classList.add('hide')
    })

    items[i].classList.remove('hide')
    items[i].classList.add('active')
  }

  return {
    start: function(paraItems, slideShow, firstSlideItems) {
      optimizeAnimation(paraItems)
      fadeInNew(slideShow, firstSlideItems)
    },
    slideShow: function(items, direction, icons, ctrlButtons) {
      handleClick(items, direction, icons, ctrlButtons)
    },
  }
})()

document.addEventListener('scroll', () => para.start(paraItems, slideShow, firstSlideItems))

ctrlButtons.prev.addEventListener('click', () => para.slideShow(slideItems, 'prev', icons, ctrlButtons))
ctrlButtons.next.addEventListener('click', () => para.slideShow(slideItems, 'next', icons, ctrlButtons))
