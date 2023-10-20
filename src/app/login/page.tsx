"use client";
import { Images } from "../../../public/images";
import Image from "next/image";
import styles from "./page.module.css";
import { futuna } from "../../../public/fonts/futura";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
export default function Login() {
  const router = useRouter();
  return (
    <main className={styles.container}>
      <div className={styles.headerSmall}>
        <Image
          src={Images.Logo}
          alt="logo"
          width={70}
          height={70}
          style={{ marginRight: "0.5rem" }}
        />
        <p
          style={{
            textAlign: "center",
            margin: "auto 0",
            height: "fit-content",
          }}
        >
          {" "}
          HomeLand
        </p>
      </div>
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <div className={styles.header}>
            <Image
              src={Images.Logo}
              alt="logo"
              width={70}
              height={70}
              style={{ marginRight: "0.5rem" }}
            />
            <p
              style={{
                textAlign: "center",
                margin: "auto 0",
                height: "fit-content",
              }}
            >
              {" "}
              HomeLand
            </p>
          </div>
          <div
            className={futuna.className}
            style={{ fontWeight: "bold", fontSize: "24px" }}
          >
            {`Modern Apartment Living: "Discover the essence of modern apartment living`}
          </div>
          <div style={{ width: " 100%", height: " 30px" }} />
          <div>Welcome Back, Please login to your account</div>
          <label form="email" style={{ marginTop: "10px" }}>
            Email
          </label>
          <input
            type="email"
            id="email"
            aria-label="email"
            placeholder="xxxx@gmail.com"
            className={styles.input}
          />
          <label form="password" style={{ marginTop: "20px" }}>
            Password
          </label>
          <input
            id="password"
            aria-label="password"
            type="password"
            className={styles.input}
          />
          <div
            style={{
              display: "flex",
              marginTop: "10px",
              justifyContent: "space-between",
            }}
          >
            <div>
              <input
                type="checkbox"
                style={{ verticalAlign: "center", marginRight: "5px" }}
              ></input>
              <label>{"Remember me"}</label>
            </div>
            <div>
              <a onClick={() => router.push("/forgotPassword")}>
                <u style={{ cursor: "pointer" }}>Forgot password?</u>
              </a>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <Button className={`${styles.button} ${styles.current}`}>
              {" "}
              Login
            </Button>
            <Button className={styles.button}> Sign up</Button>
          </div>
        </form>
        <div className={styles.bannerContainer}>
          <Image src={Images.LoginBanner} alt="banner"></Image>
        </div>
      </div>
    </main>
  );
}
