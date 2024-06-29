import styles from "./Card.module.css";

const Card = (props) => {
  const { children, className, ...rest } = props;
  
  return (
    <div {...rest} className={`${styles.card} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
