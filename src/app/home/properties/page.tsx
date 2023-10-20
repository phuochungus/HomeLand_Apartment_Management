import styles from "./properties.module.css";
export default function Apartments() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.itemContainer} style={{height: "100%", width: "40%"}}>
          
        </div>
        <div className={styles.itemContainer} style={{height: "100%", width: "20%" }}>

        </div>
        <div className={styles.itemContainer} style={{height: "100%", width: "20%"}}>

        </div>
        <div className={styles.itemContainer} style={{height: "100%", width: "20%", borderStyle: "hidden"}}>

        </div>
      </div>
    </main>
  );
}
