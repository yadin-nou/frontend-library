import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

import home_b1 from "../../assets/images/home_b1.jpg";
import home_b2 from "../../assets/images/home_b2.jpg";
import home_b3 from "../../assets/images/home_b3.jpg";

const CustomCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <div>
      <Carousel activeIndex={index} onSelect={handleSelect} className="mt-5">
        <Carousel.Item>
          <img
            src={home_b1}
            alit="First slide"
            className="d-block w-100 rounded"
          />
          <Carousel.Caption>
            <h3>Find your next read</h3>
            <p>Search thousands of books and reserve them online in seconds.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={home_b2} alit="Second slide" />
          <Carousel.Caption>
            <h3>Discover something new</h3>
            <p>Explore our full collection of books...</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={home_b3} alit="Third slide" />
          <Carousel.Caption>
            <h3>Borrow, renew, repeat</h3>
            <p>Create an account online for borrowing anytime.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default CustomCarousel;
