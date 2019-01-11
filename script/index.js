const prevBtn = document.querySelector('.prev')
const nextBtn = document.querySelector('.next')
const saloon = document.querySelector('.saloon')
const cactus = document.querySelector('.cactus')
const slideShow = document.querySelector('.slide')
const slideItems = document.querySelectorAll('.slide .item')
const icons = document.querySelectorAll('.info svg path')
const allImages = document.querySelectorAll('img')

const para = (function() {
	let i = 0
	let animationQueued = false

	function optimizeAnimation(first, second) {
    if (animationQueued) {
      return
    }

    animationQueued = true

    window.requestAnimationFrame(() => {
      moveImages(first, second)
      animationQueued = false
    })
  }

	function moveImages(first, second) {
		first.style.transform = `translate(${window.scrollY * 30 / 100}px)`
		second.style.transform = `translate(-${window.scrollY * 20 / 100}px)`
	}

	function fadeInNew(slide) {
		const scollMoreBtn = document.querySelector('.scroll-more').classList.add('fade-away')

		if (window.scrollY > 800) {
			const info = document.querySelector('.info')
			const contact = document.querySelector('.contact')
			const scooter = document.querySelector('.scooter')
			const snap = document.querySelector('.snap')
			slide.classList.remove('hide')
			slide.classList.add('new-slide')
			info.classList.add('info-repo')
			contact.classList.add('contact-repo')

			if (scooter.classList.contains('animation')) {
				setTimeout(function() {
					scooter.classList.add('drive')
					snapShot()
				}, 800)

				function snapShot() {
					setTimeout(function() {
						snap.classList.remove('hide')
						scooter.classList.remove('animation')
						scooter.classList.remove('drive')
					}, 2000)
				}
			}
		}
	}

	function showCorrectControls(bool) {
		if (bool) {
			nextBtn.classList.add('hide')
		} else {
			prevBtn.classList.add('hide')
		}
	}

	function controls(items, direction) {
		if (direction === 'next') {
			i++
		} else {
			i--
		}

		if (i === items.length -1) {
			nextBtn.classList.add('hide')
		} else if (i === 0) {
			prevBtn.classList.add('hide')
		} else {
			if (prevBtn.classList.contains('hide') || nextBtn.classList.contains('hide')) {
				prevBtn.classList.remove('hide')
				nextBtn.classList.remove('hide')
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

	function handleClick(items, direction, icons) {
		controls(items, direction)
		changeIconColors(items, icons)

		items.forEach(item => {
			item.classList.remove('active')
			item.classList.add('hide')
		})

		items[i].classList.remove('hide')
		items[i].classList.add('active')

	}

	return {
		start: function(first, second, slideShow) {
			optimizeAnimation(first, second)
			fadeInNew(slideShow)
		},
		slideShow: function(items, direction, icons) {
			handleClick(items ,direction, icons)
		}
	}
})()

allImages.forEach((img, i) => img.addEventListener('load', function() {
	if (i === 1) {
		document.querySelector('.loading').style.opacity = 0
		setTimeout(function() {
		document.querySelector('.loading').style.display = 'none'
		}, 1000);
	}
}))

document.addEventListener('scroll', () => para.start(saloon, cactus, slideShow))
nextBtn.addEventListener('click', () => para.slideShow(slideItems, 'next', icons))
prevBtn.addEventListener('click', () => para.slideShow(slideItems, 'prev', icons))
