import Image from "next/image";
import Link from "next/link";

import styles from "./Testimonials.module.css";

import { FaQuoteLeft, FaShippingFast, FaPlaneDeparture } from "react-icons/fa";
import { BsFillCameraReelsFill } from "react-icons/bs";
import { IoCallSharp } from "react-icons/io5";
import { PiFilmReelFill } from "react-icons/pi";

import testimonial from "@/public/images/testimonial-1.jpg";
import cta_banner from "@/public/images/cta-banner.jpg";

export default function Testimonials() {
  return (
    <section className={styles.testimonials}>
      {/* TESTIMONIAL OF CEO */}
      <div className={styles.testimonial}>
        <h1 className={styles.title}>Testimonial</h1>
        <div className={styles.testimonial_container}>
          <Image
            className={styles.profile_pic}
            src={testimonial}
            alt="testimonial"
            width={80}
            height={80}
          />
          <h2 className={styles.name}>Prawesh Gautam</h2>
          <p className={styles.position}>CEO & Founder</p>
          <FaQuoteLeft className={styles.quotes} />
          <p className={styles.message}>
            Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor dolor sit
            amet.
          </p>
        </div>
      </div>

      {/* CTA - BANNER WITH SHOP NOW BUTTON */}
      <div className={styles.cta_container}>
        <Image src={cta_banner} alt="cta_banner" width={500} height={500} />
        <Link className={styles.cta_content} href="#">
          <button>25% discount</button>
          <h1>Summer collection</h1>
          <p>Starting @ Rs100</p>
          <b>Shop Now</b>
        </Link>
      </div>

      {/* SERVICES */}
      <div className={styles.service}>
        <h1 className={styles.title}>Our services</h1>

        <div className={styles.testimonial_container}>
          <ul>
            <li className={styles.service_container}>
              <Link href="#">
                <BsFillCameraReelsFill className={styles.icon} />
                <div className={styles.service_content}>
                  <h2>Video Shoot</h2>
                  <p>Get your product delivered</p>
                </div>
              </Link>
            </li>
            <li className={styles.service_container}>
              <Link href="#">
                <FaPlaneDeparture className={styles.icon} />
                <div className={styles.service_content}>
                  <h2>EDV lottery</h2>
                  <p>Get your product delivered</p>
                </div>
              </Link>
            </li>

            <li className={styles.service_container}>
              <Link href="#">
                <PiFilmReelFill className={styles.icon} />
                <div className={styles.service_content}>
                  <h2>Photo and Video Editing</h2>
                  <p>Get your product delivered</p>
                </div>
              </Link>
            </li>
            <li className={styles.service_container}>
              <Link href="#">
                <FaShippingFast className={styles.icon} />
                <div className={styles.service_content}>
                  <h2>Fast delivery</h2>
                  <p>Get your product delivered</p>
                </div>
              </Link>
            </li>
            <li className={styles.service_container}>
              <Link href="#">
                <IoCallSharp className={styles.icon} />
                <div className={styles.service_content}>
                  <h2>Customer Support</h2>
                  <p>Get your product delivered</p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
