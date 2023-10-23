import React, { Component, ReactElement } from "react";
import Link from "next/link";
import styles from "./ButtonComponent.module.scss";
import classNames from 'classnames';
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
  preIcon?: JSX.Element;
  sufIcon?: React.ReactNode;
  className?: String;
}) :JSX.Element => {
  let Comp:any = 'button';
  let props: any = { onClick, ...prop };
  if (href) {
    Comp = Link;
    props.href = href;
  }
  if (target) {
    props.target = target;
  }

  return (
    <Comp 
      className={classNames(styles.wrapper, {
        [`${className}`]: className,
      })}
      {...props}
    >
      {preIcon && <span className = {classNames(styles.preIcon)}>{preIcon}</span> }
      {children}
      {sufIcon && <span className={classNames(styles.sufIcon)}>{sufIcon}</span>  }
    </Comp>
  );
};

export default ButtonComponent;
