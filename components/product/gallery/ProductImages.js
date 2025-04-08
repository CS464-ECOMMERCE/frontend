"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Skeleton } from "@mui/material";
import "./embla.css";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./ProductImagesArrowButton";
import { DotButton, useDotButton } from "./ProductImagesDotButton";
import { LazyLoadImage } from "./ProductImagesLazyLoadImage";
import { imgPlaceholder } from "@/src/app/shop/[id]/page";

export default function ProductImages({ images = imgPlaceholder, loading }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const [slidesInView, setSlidesInView] = useState([]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const updateSlidesInView = useCallback((emblaApi) => {
    setSlidesInView((slidesInView) => {
      if (slidesInView.length === emblaApi.slideNodes().length) {
        emblaApi.off("slidesInView", updateSlidesInView);
      }
      const inView = emblaApi
        .slidesInView()
        .filter((index) => !slidesInView.includes(index));
      return slidesInView.concat(inView);
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    updateSlidesInView(emblaApi);
    emblaApi.on("slidesInView", updateSlidesInView);
    emblaApi.on("reInit", updateSlidesInView);
  }, [emblaApi, updateSlidesInView]);

  return (
    <div>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {loading ? (
            <Skeleton
              variant="rectangular"
              width={"100%"}
              height={"50vh"}
              style={{ margin: "0 10px" }}
            />
          ) : (
            images.map((img, index) => (
              <LazyLoadImage
                key={index}
                index={index}
                imgSrc={img}
                alt={`Image ${index}`}
                inView={slidesInView.indexOf(index) > -1}
              />
            ))
          )}
        </div>
      </div>
      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : "",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
