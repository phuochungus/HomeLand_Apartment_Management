import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef<any, any>(
  ({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </a>
  )
);

const CustomMenu = React.forwardRef<any, any>(
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    const [value, setValue] = useState("");
    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <Form.Control
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child: any) =>
              !value || child.props.children.toLowerCase().startsWith(value)
          )}
        </ul>
      </div>
    );
  }
);

export default function SearchDropdown({
  className,
  style,
  onChange,
  title,
  selections,
}: {
  className?: string;
  style?: React.CSSProperties;
  onChange?: (params: number) => void;
  title: string;
  selections: any[];
}) {
  const [dropdownValue, setDropdownValue] = useState(title);
  async function onChangeItem(value:string , index:number) {
    await (onChange && onChange(index));
    setDropdownValue(value);
  }
  return (
    <Dropdown className={className} style={style}>
      <Dropdown.Toggle
        style={{
          width: "100%",
          display: "flex",
          backgroundColor: "white",
          color: "black",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        id="dropdown-custom-components"
      >
        {dropdownValue}
      </Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu}>
        {selections.map((value, index) => (
          <Dropdown.Item
            key={index}
            eventKey={index.toString()}
            onClick={() => onChangeItem(value,index)}
          >
            {value}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
