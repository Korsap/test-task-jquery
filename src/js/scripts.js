(function(){
  let currentSlide = 0;
  let filteredSlides;
  let slideRotator;

  function rotateSlides(allSlides) {
    currentSlide = (currentSlide + 1) % allSlides.length;
    renderSlide(allSlides[currentSlide]);
    dotSelector(currentSlide)
  }

  function httpGet(url) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);

      xhr.onload = function() {
        if (this.status == 200) {
          resolve(this.response);
        } else {
          var error = new Error(this.statusText);
          error.code = this.status;
          reject(error);
      }
    };

    xhr.onerror = function() {
      reject(new Error("Network Error"));
    };

    xhr.send();
  });
}

  function renderSlide(item) {
    let slide = document.querySelector(".b-slide");
    let renderedSlide = document.createElement("div");
    renderedSlide.classList.add("container", "b-slide", "fade");

    let renderedImage = document.createElement("div");
    renderedImage.className = "b-slide__image";

    renderedSlide.innerHTML = `<div class="row">
             <div class="col-xs-7">
                 <h2 class="b-slide__title">${item.title}</h2>
                 <h3 class="b-slide__text">${item.text}</h3>
             </div>
        </div>
        <div class="row">
              <div class="col-xs-4">
                  <button class="b-slide__button b-button b-button--primary">Заказать доставку</button>
              </div>
        </div>`;

    renderedImage.style.backgroundImage = `url(${item.image})`;

    if (item.image === "../images/slide-2.png") {
      renderedImage.style.left = "615px";
    } else {
      renderedImage.style.left = "560px";
    }

    renderedSlide.append(renderedImage);
    slide.replaceWith(renderedSlide);
}

  function renderDots() {
    let dots = document.querySelector(".b-slider__dots");
    let renderedDots = document.createElement("div");
    renderedDots.className = "b-slider__dots";

    for (let i = 0; i < filteredSlides.length; i++) {
      let dot = document.createElement("div");
      i === 0 ? dot.classList.add("b-slider__dot", "b-slider__dot--selected") : dot.className = "b-slider__dot";
      dot.addEventListener("click", handler);
      renderedDots.appendChild(dot);
    }
    dots.replaceWith(renderedDots);
  }

  function handler() {
    if (!this.classList.contains("b-slider__dot")) return;
    let dots = document.querySelectorAll(".b-slider__dot")
    dots.forEach((item) => { item.classList.remove("b-slider__dot--selected")})
    this.classList.add("b-slider__dot--selected");
    let current = currentSlide
    for(let i = 0; i < dots.length; i++){
  	  if (dots[i].classList.contains("b-slider__dot--selected")) current = i
	}
    //console.log(current);
    renderSlide(filteredSlides[current])
    currentSlide = current
    clearTimeout(slideRotator)
    slideRotator = setInterval(rotateSlides, 5000, filteredSlides)
  }

  function dotSelector(number) {
	  let dots = document.querySelectorAll(".b-slider__dot")
	  dots.forEach((item) => { item.classList.remove("b-slider__dot--selected") })
	  dots[number].classList.add("b-slider__dot--selected")
  }

  httpGet("get-slides")  //данные со статического сервера localhost. https://frontend.camp.dev.unit6.ru/get-slides
  // не доступен
      .then(response => {
        return JSON.parse(response);
      })
      .then(slides => {
        let now = new Date();
        let nowSeconds = Math.round(now.getTime() / 1000);
        filteredSlides = slides.filter(item => {
          return (
          /*item.startDate <= nowSeconds && item.endDate >= nowSeconds && */item.active //в условие фильтра по
              // времени не укладывается ни один баннер, поэтому закомментировал.
          );
        });
      filteredSlides.sort((a, b) => a.order - b.order);
      renderSlide(filteredSlides[currentSlide]);
      renderDots(filteredSlides);
      slideRotator = setInterval(rotateSlides, 5000, filteredSlides)

      /*slideRotator = setTimeout(
        function rotateSlides(allSlides) {
          currentSlide = (currentSlide + 1) % allSlides.length;
          renderSlide(allSlides[currentSlide]);
          dotSelector(currentSlide)
          //console.log(currentSlide)
          slideRotator = setTimeout(rotateSlides, 5000, filteredSlides);
        },
        5000,
        filteredSlides
      );*/
  });
}());
