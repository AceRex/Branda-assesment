"use client";
import { useState } from "react";
/** Let customers choose which preview to see without leaving the service page. */
export default function Gallery({
  image,
  name,
  color,
}: {
  image: string;
  name: string;
  color: string;
}) {
  const [selected, setSelected] = useState(0);
  // The demo uses different crops of one photograph. Local illustrations keep the same source for all views.
  const images = [
    image,
    image.replace("fit=crop", "fit=crop&crop=left"),
    image.replace("fit=crop", "fit=crop&crop=right"),
  ];
  return (
    <div className="gallery">
      <div className="gallery-main" style={{ background: color }}>
        <img
          src={images[selected]}
          alt={`${name}, view ${selected + 1}`}
          style={{ objectPosition: ["center", "left", "right"][selected] }}
        />
      </div>
      <div className="gallery-thumbs">
        {images.map((src, i) => (
          <button
            key={i}
            aria-label={`View image ${i + 1}`}
            aria-pressed={selected === i}
            onClick={() => setSelected(i)}
          >
            <img
              src={src}
              alt=""
              style={{ objectPosition: ["center", "left", "right"][i] }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
