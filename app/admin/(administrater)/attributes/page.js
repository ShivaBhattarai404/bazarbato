import Attribute from "@/models/Attribute";
import AttributesClientPage from "./component";
import dbConnect from "@/helpers/dbConnect";

async function fetchAttributes() {
  try {
    await dbConnect();
    const attributes = await Attribute.find();

<<<<<<< HEAD
import styles from "./page.module.css";
import formStyles from "@/public/styles/form.module.css";
import Card from "@/components/Card/Card";
import CheckBox from "@/components/CheckBox/CheckBox";
import Modal from "@/components/Modal/Modal";
import Spinner from "@/components/Spinner/Spinner";

export default function ProductsPage() {
  const [attributes, setAttributes] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useState(() => {
    fetch("http://localhost:3000/api/attributes")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setAttributes(data);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const attributeSelectHandler = (e) => {
    const { attributeId } = e.target;
    if (selectedAttributes.includes(attributeId)) {
      setSelectedAttributes((prev) =>
        prev.filter((item) => item !== attributeId)
      );
    } else {
      setSelectedAttributes((prev) => [...prev, attributeId]);
    }
  };

  const attributeDeleteHandler = () => {
    // console.log(selectedAttributes);
  };

  const word = selectedAttributes.length > 1 ? "attributes" : "attribute";
  const grammar = selectedAttributes.length > 1 ? "these" : "this";

  if (loading) return <Spinner />;
  return (
    <div className={styles.container}>
      {modal && (
        <Modal
          btn1Text="Delete"
          btn2Text="Cancel"
          bgColor2="#d72c0d"
          onOk={attributeDeleteHandler}
          onCancel={() => setModal(false)}
          title={`Delete ${selectedAttributes.length} ${word}`}
          paragraph={`Are you sure you want to delete ${grammar} ${word}?`}
        />
      )}

      <div className={styles.title}>
        <h1>Attribute</h1>
        <Link className={styles.newCategoryLink} href="/admin/new-attribute">
          New Attribute
        </Link>
      </div>
      <Card className={styles.card}>
        <input
          type="text"
          placeholder="Search"
          className={`${formStyles.input} ${styles.search}`}
        />
        <select className={`${formStyles.select}`}>
          <option value="all">All</option>
          <option value="enabled">Enabled</option>
          <option value="disabled">Disabled</option>
        </select>
        <select className={`${formStyles.select} ${styles.sort}`}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="nameAsc">Name: A to Z</option>
          <option value="nameDesc">Name: Z to A</option>
          <option value="productsAsc">No. of products: Low to High</option>
          <option value="productsDesc">No. of products: High to Low</option>
        </select>

        {selectedAttributes.length > 0 && (
          <div className={styles.controls}>
            <div className={styles.no_of_selected_items}>
              {selectedAttributes.length} selected
            </div>
            <div className={styles.delete_btn} onClick={() => setModal(true)}>
              Delete
            </div>
          </div>
        )}

        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.checkbox}></th>
              <th className={styles.name}>Attribute Name</th>
              <th className={styles.type}>type</th>
              <th className={styles.code}>Code</th>
            </tr>
          </thead>
          <tbody>
            {attributes.map((attribute, i) => (
              <tr key={attribute.name}>
                <td className={styles.checkbox}>
                  <CheckBox
                    id={`attributes-${i}`}
                    value={attribute._id}
                    onClick={attributeSelectHandler}
                  />
                </td>
                <td className={styles.name}>
                  <Link
                    href={`/admin/new-attribute?attribute=${attribute.code}`}
                  >
                    {attribute.name}
                  </Link>
                </td>
                <td className={styles.type}>{attribute.type}</td>
                <td className={styles.code}>{attribute.code}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
=======
    const formattedAttributes = attributes.map((attribute) => {
      const modifiedAttribute = {
        _id: attribute._id.toString(),
        name: attribute.name,
        code: attribute.code,
        type: attribute.type,
      };
      if (attribute.type.toLowerCase() === "select") {
        modifiedAttribute.options = attribute.options;
      }
      return modifiedAttribute;
    });
    return formattedAttributes;
  } catch (error) {
    return [];
  }
}

export default async function ProductsPage() {
  const attributes = await fetchAttributes();
  return <AttributesClientPage attributes={attributes} />;
>>>>>>> productPage
}
