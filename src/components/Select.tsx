import React, { useEffect, useState } from "react";
import styles from "./select.module.css";

export type SelectOption = {
  label: string;
  value: number;
};

export type SingleSelect = {
  multi?: false;
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

export type MultiSelect = {
  multi: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

export type SelectProps = {
  selectOptions: SelectOption[];
} & (SingleSelect | MultiSelect);

export function Select({ multi, selectOptions, value, onChange }: SelectProps) {
  //logica
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hightlightedIndex, setHightlightedIndex] = useState<number>(0);

  function onSelectClick() {
    setIsOpen((prev) => !prev);
  }

  function onSelectBlur() {
    setIsOpen(false);
  }

  function onClickClear(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    if (multi) {
      onChange([]);
    } else {
      onChange(undefined);
    }
  }

  function selectOption(option: SelectOption) {
    if (multi) {
      if (value.includes(option)) {
        onChange(value.filter((object) => object !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (option !== value) onChange(option);
    }
  }

  function isOptionSelected(option: SelectOption) {
    if (multi) return value.includes(option);
    return option === value;
  }

  useEffect(() => {
    if (isOpen) setHightlightedIndex(0);
  }, [isOpen]);

  //retornar elemento
  return (
    <>
      <div
        onClick={onSelectClick}
        onBlur={onSelectBlur}
        tabIndex={0}
        className={styles.container}
      >
        <span className={styles.value}>
          {multi
            ? value.map((item) => (
                <button
                  key={item.value}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectOption(item);
                  }}
                  className={styles["option-badge"]}
                >
                  {item.label}
                  <span className={styles["remove-btn"]}>&times;</span>
                </button>
              ))
            : value?.label}
        </span>
        <button onClick={onClickClear} className={styles["clear-btn"]}>
          &times;
        </button>
        <div className={styles.divider}></div>
        <div className={styles.caret}></div>

        <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
          {selectOptions.map((option, index) => (
            <li
              onClick={(e) => {
                e.stopPropagation();
                selectOption(option);
                setIsOpen(false);
              }}
              onMouseEnter={() => setHightlightedIndex(index)}
              key={option.label}
              className={`${styles.option} ${
                isOptionSelected(option) ? styles.selected : ""
              } ${index === hightlightedIndex ? styles.highlighted : ""}`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
