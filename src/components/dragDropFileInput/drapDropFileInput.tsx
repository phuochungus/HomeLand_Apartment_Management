import {
  ChangeEvent,
  MouseEventHandler,
  ReactNode,
  useRef,
  useState,
} from "react";
import styles from "./dragdrop.module.css";
import { Image, Stack } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

export default function DragDropFileInput({
  children,
  onChange,
  initFileList,
}: {
  children: ReactNode | undefined;
  onChange?: (files: (File | URL)[]) => void;
  initFileList?: (File | URL)[];
}): ReactNode {
  // drag drop file component
  // drag state
  const [dragActive, setDragActive] = useState(false);
  const [fileLists, setFileLists] = useState<(File | URL)[]>(
    initFileList ?? []
  );
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
    const tempList = [...Array.from(files)];
    const uniqueFile: (File | URL)[] = [];
    tempList.forEach((element) => {
      let index = 0;
      for (; index < fileLists.length; index++) {
        const element1 = fileLists[index];
        if (element1 instanceof URL) continue;
        if (element.name == element1.name) break;
      }
      if (index == fileLists.length) uniqueFile.push(element);
    });
    if(onChange) onChange([...fileLists, ...uniqueFile])
    setFileLists([...fileLists, ...uniqueFile])
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
    for (let index = 0; index < fileLists.length; index++) {
      const element = fileLists[index];
      result.push(
        <Stack style={{ position: "relative" }}>
          <Image
            src={
              element instanceof URL
                ? element.href
                : URL.createObjectURL(element as Blob)
            }
            alt="image"
            style={{
              width: "auto-fit",
              borderStyle: "solid",
              borderColor: "grey",
              borderWidth: "1px",
            }}
          ></Image>
          <button
            type="button"
            className={styles.deleteImageButton}
            onClick={() => {
              const temp = [...fileLists];
              temp.splice(index, 1);
              if(onChange) onChange(temp)
              setFileLists(temp);
            }}
          >
            <FaTrash></FaTrash>
          </button>
        </Stack>
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
      <div id="label-file-upload" className={dragActive ? "drag-active" : ""}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {fileLists.length > 0 ? (
            <>
              <p
                style={{
                  textAlign: "center",
                  cursor: "pointer",
                  marginTop: "5px",
                }}
                className={styles.activeText}
                onClick={onButtonClick}
              >
                Click to upload more file here
              </p>
              <div className={`${styles.dragDrop}`}>{ImageGrid()}</div>
            </>
          ) : (
            <>
              <p style={{ textAlign: "center" }}>Click to upload file here</p>
              <button
                type="button"
                className={`upload-button ${styles.dragDrop}`}
                onClick={onButtonClick}
              >
                {ImageGrid()}
              </button>
            </>
          )}
        </div>
      </div>
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
