import { MdStar, MdStarHalf, MdStarOutline } from "react-icons/md";

export const renderStars = (rating, size = "fs-5") => {
  const maxStars = 5;
  const stars = [];

  for (let i = 1; i <= maxStars; i++) {
    if (rating >= i) {
      stars.push(<MdStar key={i} className={`${size} text-warning`} />);
    } else if (rating >= i - 0.5) {
      stars.push(<MdStarHalf key={i} className={`${size} text-warning`} />);
    } else {
      stars.push(<MdStarOutline key={i} className={`${size} text-warning`} />);
    }
  }

  return stars;
};
