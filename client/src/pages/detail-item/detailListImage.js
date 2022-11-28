import React from "react";
import "./detailItem.css";

const listImage = ({ images, id }) => {
  const isActive = (index) => {
    if (index === 0) return "active";
  };

  return (
    <div
      id={`image${id}`}
      style={{margin: '5%', borderRadius: "4px", border: "1px solid #ddd", width: '90%', boxShadow: '3px 3px 3px gray' }}
      className="carousel slide"
      data-ride="carousel"
    >
      <ol className="carousel-indicators">
        {images.map((img, index) => (
          <li
            key={index}
            data-target={`#image${id}`}
            data-slide-to={index}
            className={isActive(index)}
          />
        ))}
      </ol>

      <div className="carousel-inner">
        {images.map((img, index) => (
          <div key={index} className={`carousel-item ${isActive(index)}`}>
            {img.url.match(/video/i) ? (
              <video controls src={img.url} alt={img.url} />
            ) : (
              <img src={img.url} alt={img.url} />
            )}
          </div>
        ))}
      </div>

      <a
        className="carousel-control-prev"
        href={`#image${id}`}
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href={`#image${id}`}
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default listImage;
