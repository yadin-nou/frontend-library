import style from "./sectionTitle.module.css";

const SectionTitles = ({ title }) => {
  return (
    <div className={style.titleContainer}>
      <h2>{title}</h2>
      <div className={style.line}></div>
    </div>
  );
};

export default SectionTitles;
