import React, { Component } from "react";
import Link from "next/link";
import clsx from "clsx";
import styles from "./ButtonComponent.module.scss";
const ButtonComponent = ({
  href,
  target,
  children,
  preIcon,
  sufIcon,
  className,
  onClick,
  ...prop
}: {
  href?: String;
  onClick?: Function;
  target?: String;
  children: React.ReactNode;
  preIcon?: React.ReactNode;
  sufIcon?: React.ReactNode;
  className?: String;
}) :JSX.Element => {
  let Comp:any = 'button';
  let props: any = { onClick, ...prop };
  if (href) {
    Comp = Link;
  }
  if (target) {
    props.target = target;
  }

  return (
    <Comp
      className={clsx(styles.wrapper, {
        [`${className}`]: className,
      })}
    >
      {preIcon && { preIcon }}
      {children}
      {sufIcon && { sufIcon }}
    </Comp>
  );
};

export default ButtonComponent;
