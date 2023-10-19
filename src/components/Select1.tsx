import { useEffect, useState } from "react";
import styles from "./select1.module.css";

export type Select1Option = {
  label: string;
  value: number;
};

type Select1Props = {
  selectOptions: Select1Option[];
  value?: Select1Option;
  onChange: (option: Select1Option | undefined) => void;
};

export function Select1({ selectOptions, value, onChange }: Select1Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [highlightedIndex, sethighlightedIndex] = useState<number>(0);

  function onSelectClick() {
    setIsOpen((prev) => !prev);
  }

  function onSelectBlur() {
    setIsOpen(false);
  }

  function select1Option(option: Select1Option) {
    if (option !== value) onChange(option);
  }

  function clearOption() {
    onChange(undefined);
  }

  function isOptionSelected(option: Select1Option) {
    return option === value;
  }

  useEffect(() => {
    if (isOpen) sethighlightedIndex(0);
  }, [isOpen]);

  return (
    <>
      <div
        tabIndex={0}
        onClick={onSelectClick}
        onBlur={onSelectBlur}
        className={styles.container}
      >
        <span className={styles.value}>{value?.label}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            clearOption();
          }}
          className={styles["clear-btn"]}
        >
          &times;
        </button>
        <div className={styles.divider}></div>
        <div className={styles.caret}></div>
        <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
          {selectOptions.map((option, index) => (
            <li
              onClick={(e) => {
                e.stopPropagation();
                select1Option(option);
                setIsOpen(false);
              }}
              onMouseEnter={() => sethighlightedIndex(index)}
              className={`${styles.option} ${
                isOptionSelected(option) ? styles.selected : ""
              }
              ${index === highlightedIndex ? styles.highlighted : ""}`}
              key={option.value}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
