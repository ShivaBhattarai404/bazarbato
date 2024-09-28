"use client";
// core modules
import { Fragment, useEffect, useReducer, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notFound, useRouter } from "next/navigation";

// redux toolkit actions
import { addOrder } from "@/app/reducers/order";

// page related components and functions
import CartProgressBar from "@/components/_customer/CartProgressBar/CartProgressBar";
import { inputReducer, initialState } from "./reducer";
import {
  DELIVERY_CHARGES,
  initialCountry,
  initialProvince,
  initialDistrict,
  initialCity,
} from "./data";

// page styles - CSS file
import styles from "./page.module.css";
import formStyles from "@/public/styles/form.module.css";

// react-icons
import { AiOutlineCheck } from "react-icons/ai";
import { IoLocationOutline, IoPersonOutline } from "react-icons/io5";
import { GiModernCity } from "react-icons/gi";
import { TbChartTreemap, TbNumbers } from "react-icons/tb";
import { MdOutlineWifiCalling3 } from "react-icons/md";
import { FaGlobeAmericas } from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";
import InputError from "@/components/InputError/InputError";

// MAIN COMPONENT
export default function ShippingComponent({ createOrder }) {
  const router = useRouter();
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [inputFields, dispatch] = useReducer(inputReducer, initialState);
  const [selectedCountry, setSelectedCountry] = useState(initialCountry);
  const [selectedProvince, setSelectedProvince] = useState(initialProvince);
  const [selectedDistrict, setSelectedDistrict] = useState(initialDistrict);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const order = useSelector((state) => state.order.order);
  const reduxDispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [responseError, setResponseError] = useState();

  useEffect(() => {
    setDeliveryCharge(
      DELIVERY_CHARGES[selectedCountry].charges +
        DELIVERY_CHARGES[selectedCountry].provinces[selectedProvince].charges +
        DELIVERY_CHARGES[selectedCountry].provinces[selectedProvince].districts[
          selectedDistrict
        ].charges +
        DELIVERY_CHARGES[selectedCountry].provinces[selectedProvince].districts[
          selectedDistrict
        ].cities[selectedCity].charges
    );
  }, [selectedCountry, selectedProvince, selectedDistrict, selectedCity]);

  const continueHandler = async () => {
    if (loading) return;
    // checking if the form is valid and all the fields are filled correctly
    const { note: customerNote, ...rest } = inputFields;
    const isFormValid = Object.values(rest).every(
      ({ message: errorMessage, touched }) => touched && !errorMessage
    );
    if (isFormValid) {
      const shippingData = {
        name: inputFields.fullname.value,
        country: selectedCountry,
        province: selectedProvince,
        district: selectedDistrict,
        city: selectedCity,
        address: inputFields.address.value,
        postalCode: inputFields.postalCode.value,
        phone: inputFields.phone.value,
        alternativePhone: inputFields.alternativePhone.value,
        customerNote,
        deliveryCharge: deliveryCharge,
      };
      const updatedOrder = { ...order, shipping: shippingData };
      try {
        setLoading(true);
        const { error, order: validatedOrder } = await createOrder(
          updatedOrder
        );
        if (error) {
          setResponseError(error);
          return;
        } else {
          reduxDispatch(addOrder(validatedOrder));
          router.replace("/order-review");
        }
      } catch (error) {
        setLoading(false);
        setResponseError("Something went wrong");
      }
    } else {
      // rest means all the fields except the note field
      // declared in line 58
      for (const key in rest) {
        rest[key].touched = true;
      }
      dispatch({ type: "SET", payload: rest });
    }
  };

  const countryChangeHandler = (e) => {
    const country = e.target.value;
    const province = Object.keys(DELIVERY_CHARGES[country].provinces)[0];
    const district = Object.keys(
      DELIVERY_CHARGES[country].provinces[province].districts
    )[0];
    const city = Object.keys(
      DELIVERY_CHARGES[country].provinces[province].districts[district].cities
    )[0];
    setSelectedCountry(country);
    setSelectedProvince(province);
    setSelectedDistrict(district);
    setSelectedCity(city);
  };

  const provinceChangeHandler = (e) => {
    const province = e.target.value;
    const district = Object.keys(
      DELIVERY_CHARGES[selectedCountry].provinces[province].districts
    )[0];
    const city = Object.keys(
      DELIVERY_CHARGES[selectedCountry].provinces[province].districts[district]
        .cities
    )[0];
    setSelectedProvince(province);
    setSelectedDistrict(district);
    setSelectedCity(city);
  };

  const districtChangeHandler = (e) => {
    const district = e.target.value;
    const city = Object.keys(
      DELIVERY_CHARGES[selectedCountry].provinces[selectedProvince].districts[
        district
      ].cities
    )[0];
    setSelectedDistrict(district);
    setSelectedCity(city);
  };

  const cityChangeHandler = (e) => {
    setSelectedCity(e.target.value);
  };

  if (!order) {
    return notFound();
  }

  return (
    <section className={styles.section}>
      <CartProgressBar
        active={2}
        labelPosition="bottom"
        className={styles.progressBar}
        steps={["Cart", "Shipping", "Review", "Payment"]}
      />
      <hr />

      <div className={styles.container}>
        <form className={styles.form} noValidate>
          <h1 className={styles.title}>Shipping summary</h1>
          {/* input box */}
          <Fragment key="fullname">
            <div className={styles.box}>
              <div className={styles.boxIcon}>
                <IoPersonOutline size={25} />
              </div>
              <div className={styles.boxText}>
                <div className="flex">
                  <h4>Full Name</h4>
                  <AiOutlineCheck size={20} />
                </div>
                <InputError errors={inputFields} name="fullname" />
                <input
                  type="text"
                  name="fullname"
                  onChange={(e) =>
                    dispatch({ type: "CHANGE_FULLNAME", value: e.target.value })
                  }
                />
              </div>
            </div>
          </Fragment>

          <Fragment key="select country">
            <div className={styles.box}>
              <div className={styles.boxIcon}>
                {/* <IoMdGlobe size={25} /> */}
                <FaGlobeAmericas size={25} />
              </div>
              <div className={styles.boxText}>
                <div className="flex">
                  <h4>Country</h4>
                  <AiOutlineCheck size={20} />
                </div>
                {/* <input type="text" name="city" /> */}
                <select
                  className={formStyles.select}
                  onChange={countryChangeHandler}
                >
                  {Object.keys(DELIVERY_CHARGES).map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Fragment>

          <Fragment key="select province">
            <div className={styles.box}>
              <div className={styles.boxIcon}>
                <GrMapLocation size={25} />
              </div>
              <div className={styles.boxText}>
                <div className="flex">
                  <h4>Province</h4>
                  <AiOutlineCheck size={20} />
                </div>
                <select
                  className={formStyles.select}
                  onChange={provinceChangeHandler}
                >
                  {Object.keys(DELIVERY_CHARGES[selectedCountry].provinces).map(
                    (province) => (
                      <option key={province} value={province}>
                        {province}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
          </Fragment>

          <Fragment key="select district">
            <div className={styles.box}>
              <div className={styles.boxIcon}>
                <TbChartTreemap size={25} />
              </div>
              <div className={styles.boxText}>
                <div className="flex">
                  <h4>District</h4>
                  <AiOutlineCheck size={20} />
                </div>
                <select
                  className={formStyles.select}
                  onChange={districtChangeHandler}
                >
                  {Object.keys(
                    DELIVERY_CHARGES[selectedCountry].provinces[
                      selectedProvince
                    ].districts
                  ).map((province) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Fragment>

          <Fragment key="select city">
            <div className={styles.box}>
              <div className={styles.boxIcon}>
                <GiModernCity size={25} />
              </div>
              <div className={styles.boxText}>
                <div className="flex">
                  <h4>City</h4>
                  <AiOutlineCheck size={20} />
                </div>
                <select
                  className={formStyles.select}
                  onChange={cityChangeHandler}
                >
                  {Object.keys(
                    DELIVERY_CHARGES[selectedCountry].provinces[
                      selectedProvince
                    ].districts[selectedDistrict].cities
                  ).map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Fragment>

          <Fragment key="address">
            <div className={styles.box}>
              <div className={styles.boxIcon}>
                <IoLocationOutline size={25} />
              </div>
              <div className={styles.boxText}>
                <div className="flex">
                  <h4>Address</h4>
                  <AiOutlineCheck size={20} />
                </div>
                <InputError errors={inputFields} name="address" />
                <input
                  type="text"
                  name="address"
                  onChange={(e) =>
                    dispatch({ type: "CHANGE_ADDRESS", value: e.target.value })
                  }
                />
              </div>
            </div>
          </Fragment>

          <Fragment key="postalCode">
            <div className={styles.box}>
              <div className={styles.boxIcon}>
                <TbNumbers size={25} />
              </div>
              <div className={styles.boxText}>
                <div className="flex">
                  <h4>Postal Code</h4>
                  <AiOutlineCheck size={20} />
                </div>
                <InputError errors={inputFields} name="postalCode" />
                <input
                  type="text"
                  name="postalCode"
                  onChange={(e) =>
                    dispatch({
                      type: "CHANGE_POSTAL_CODE",
                      value: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </Fragment>

          <Fragment key="phoneNo">
            <div className={styles.box}>
              <div className={styles.boxIcon}>
                <MdOutlineWifiCalling3 size={25} />
              </div>
              <div className={styles.boxText}>
                <div className="flex">
                  <h4>Phone Number</h4>
                  <AiOutlineCheck size={20} />
                </div>
                <InputError errors={inputFields} name="phone" />
                <input
                  type="text"
                  name="phoneNo"
                  onChange={(e) =>
                    dispatch({ type: "CHANGE_PHONE", value: e.target.value })
                  }
                />
              </div>
            </div>
          </Fragment>

          <Fragment key="alternative-phone">
            <div className={styles.box}>
              <div className={styles.boxIcon}>
                <MdOutlineWifiCalling3 size={25} />
              </div>
              <div className={styles.boxText}>
                <div className="flex">
                  <h4>Alternative Phone Number</h4>
                  <AiOutlineCheck size={20} />
                </div>
                <InputError errors={inputFields} name="alternativePhone" />
                <input
                  type="text"
                  name="alternative-phone"
                  onChange={(e) =>
                    dispatch({
                      type: "CHANGE_ALTERNATIVE_PHONE",
                      value: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </Fragment>
        </form>

        <div className={styles.summary}>
          <form
            style={{ marginBottom: "1rem" }}
            onSubmit={(e) => e.preventDefault()}
          >
            <h3 className={styles.title}>Order Note</h3>
            <div className={styles.box}>
              <div className={styles.boxIcon}>
                <IoPersonOutline size={25} />
              </div>
              <div className={styles.boxText}>
                <div className="flex">
                  <h4>Leave a note (optional)</h4>
                  <AiOutlineCheck size={20} />
                </div>
                <input
                  type="text"
                  name="customer-note"
                  onChange={(e) =>
                    dispatch({
                      type: "CHANGE_CUTOMER_NOTE",
                      value: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </form>
          <h3 className={styles.title}>Order Summary</h3>
          <ul className={styles.summaryList}>
            <li>
              <span>Subtotal</span>
              <span>Rs {order?.total || 0}</span>
            </li>
            {order.coupon && (
              <li className={styles.discountAmount}>
                <span>Coupon Discount</span>
                <span>- Rs {order?.discountAmount}</span>
              </li>
            )}
            <li>
              <span>Delivery charge</span>
              <span>Rs {deliveryCharge}</span>
            </li>
            <li>
              <span>Gross amount (including tax)</span>
              <span>
                Rs{" "}
                {order?.shipping?.deliveryCharge ||
                  order?.grossTotal + deliveryCharge}
              </span>
            </li>
          </ul>
          <button className={styles.continueBtn} onClick={continueHandler}>
            Continue
          </button>
        </div>
      </div>
    </section>
  );
}
