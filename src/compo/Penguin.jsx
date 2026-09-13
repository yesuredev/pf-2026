import React from "react";
import styles from "./Penguin.module.scss";

import normalPenguin from "../assets/p-1.jpg";
import anatomyPenguin from "../assets/p-2.jpg";

export default function Penguin() {
  return (
    <>
      <div className={styles.scrollTrack}>
        <section className={styles.heroSection}>
          <div className={styles.titleWrap}>
            <div className={styles.titleCrown}>
              <p>I</p>
              <p>Im</p>
              <p>Imp</p>
              <p>Impo</p>
              <p>Impos</p>
              <p>Imposs</p>
              <p>Impossi</p>
              <p>Impossib</p>
              <p>Impossibl</p>
              {/* <p>IMPOSSIBLE</p> */}
            </div>
            <h1 className={`${styles.interactiveTitle} ${styles.animTarget}`}>
              <span>I</span>
              <span className={`${styles.apostropheWrap} ${styles.animTarget}`}>
                <span
                  className={`${styles.charApostrophe} ${styles.animTarget}`}
                >
                  '
                </span>
              </span>
              <span>m</span>
              <span className={`${styles.wordGap} ${styles.animTarget}`}></span>
              <span className={styles.wordPossible}>possible.</span>
            </h1>
          </div>

          <div className={styles.penguinWrapper}>
            <img
              src={anatomyPenguin}
              alt="Penguin Anatomy"
              className={`${styles.penguinImg} ${styles.imgAnatomy}`}
            />
            <img
              src={normalPenguin}
              alt="Penguin Normal"
              className={`${styles.penguinImg} ${styles.imgNormal} ${styles.animTarget}`}
            />
          </div>
        </section>
      </div>
    </>
  );
}
