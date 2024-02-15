import React from 'react'

function Banner() {
  const slides = [
    {
      URL: Img1,
      title: "dummy",
    },
    {
      URL: Img2,
      title: "dummy",
    },
    {
      URL: Img3,
      title: "dummy",
    },
    {
      URL: Img4,
      title: "dummy",
    },
    {
      URL: Img5,
      title: "dummy",
    },
  ];
  const [curIdx, setCurIdx] = useState(2);
  const SliderPrevious = () => {
    const isFirstSlide = curIdx === 0;
    const newIdx = isFirstSlide ? slides.length - 1 : curIdx - 1;
    setCurIdx(newIdx);
  };
  const SliderNext = () => {
    const isLastSlide = curIdx === slides.length - 1;
    const newIdx = isLastSlide ? 0 : curIdx + 1;
    setCurIdx(newIdx);
  };
  const goToSlides = (index) => {
    setCurIdx(index);
  };
  return (
    <section className="slider-wrapper">
      <div className="slider-previous" onClick={SliderPrevious}>
        <ChevronLeft size={45} />
      </div>
      <div className="slider-container">
        <img src={slides[curIdx].URL} alt={"Slide"} />
      </div>
      <div className="slider-next" onClick={SliderNext}>
        <ChevronRight size={45} />
      </div>
    </section>
  );
}

export default Banner