import { ChangeEvent, ReactNode, useRef, useState } from "react";
import styles from "./dragdrop.module.css";
import { Image } from "react-bootstrap";

export default function DragDropFileInput({
  children,
}: {
  children: ReactNode | undefined;
}): ReactNode {
  // drag drop file component
  // drag state
  const [dragActive, setDragActive] = useState(false);
  const [fileLists, setFileLists] = useState<FileList | undefined>(undefined);
  // ref
  const inputRef = useRef<HTMLInputElement>(null);
  // handle drag events
  const handleDrag = function (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer!.files && e.dataTransfer!.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // triggers when file is selected with click
  const handleChange = function (e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };
  function handleFiles(files: FileList) {
    setFileLists(files);
    document.getElementById("label-file-upload")!.className = document
      .getElementById("label-file-upload")!
      .className.split("missing")[0];
  }
  // triggers the input when the button is clicked
  const onButtonClick = () => {
    if (inputRef.current) inputRef.current.click();
  };
  function ImageGrid(): ReactNode {
    if (!fileLists || fileLists.length == 0) return children;

    const result: ReactNode[] = [];
    console.log(fileLists);
    for (let index = 0; index < fileLists.length; index++) {
      const element = fileLists.item(index);
      result.push(
        <Image
          src={URL.createObjectURL(element as Blob)}
          alt="image"
          style={{
            width: "auto-fit",
            borderStyle: "solid",
            borderColor: "grey",
            borderWidth: "1px",
          }}
        ></Image>
      );
    }
    return (
      <div className={styles.imageGrid} id={"imageBlobGrid"}>
        {result}
      </div>
    );
  }
  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        id="input-file-upload"
        multiple={true}
        onChange={handleChange}
        style={{ display: "none", visibility: "hidden" }}
      />
      <label
        id="label-file-upload"
        htmlFor="input-file-upload"
        className={dragActive ? "drag-active" : ""}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <p style={{ textAlign: "center" }}>Click to upload your file here</p>
          <button
            type="button"
            className={`upload-button ${styles.dragDrop}`}
            onClick={onButtonClick}
          >
            {ImageGrid()}
          </button>
        </div>
      </label>
      {dragActive && (
        <div
          id="drag-file-element"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
    </>
  );
}
