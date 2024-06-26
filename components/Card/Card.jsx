import styles from "./Card.module.css";

const Card = (props) => {
  return (
    <div {...props} className={`${styles.card} ${props.className}`}>
      {props.children}
    </div>
  );
};

export default Card;
