import { FaSearch } from "react-icons/fa";
import styles from "./searchBar.module.css";
import { futuna } from "../../../public/fonts/futura";
import { ReactNode } from "react";
export default function SearchBar({
  className,
  style,
  onChange,
}: {
  className?: string;
  style?: React.CSSProperties;
  onChange?: (params: string) => void;
}): ReactNode {
  return (
    <div className={className} style={style}>
      <form
        className={futuna.className}
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "0 1rem",
        }}
      >
        <input
          type="search"
          id="search"
          style={{
            height: "100%",
            borderStyle: "none",
            flexGrow: "1",
            padding: "0 10px",
          }}
          onChange={(e) => {
            e.preventDefault();
            if (onChange) onChange(e.currentTarget.value);
          }}
        ></input>
        <button style={{ width: "fit-content" }}>
          <FaSearch></FaSearch>
        </button>
      </form>
    </div>
  );
}
