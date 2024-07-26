import Image from "next/image";
import styles from "./WIP.module.css";
import banner from "@/public/images/workInProgress.png";

export default function WIP({name}) {
  return (
    <section className={styles.section}>
      <div className={styles.imgWrapper}>
        {name && <h1>{name}</h1>}
        <Image src={banner} alt="Dashboard" width={200} height={200} />
      </div>
    </section>
  );
}
