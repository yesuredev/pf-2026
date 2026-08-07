import React from "react";
import styles from "./HorizontalScroll.module.scss";

const PROCESS_STEPS = [
  {
    id: 1,
    icon: "https://emojicdn.elk.sh/✍️",
    title: "Send brief",
    link: "#",
    description:
      "Send us a complete brief along with documents & requirements to estimate the project & ",
    highlightText: "get started.",
  },
  {
    id: 2,
    icon: "https://emojicdn.elk.sh/💬",
    title: "Stay in touch",
    description:
      "Review preliminary results and leave your feedback for us to continue or make corrections.",
  },
  {
    id: 3,
    icon: "https://emojicdn.elk.sh/✅",
    title: "Approve",
    description:
      "Approve the draft version of the services you like and want us to deliver.",
  },
  {
    id: 4,
    icon: "https://emojicdn.elk.sh/🚀",
    title: "Get results",
    description:
      "Receive the perfect quality of your services on time & leave us a review if you like.",
  },
  {
    id: 5,
    icon: "https://emojicdn.elk.sh/🚀",
    title: "Get results",
    description:
      "Receive the perfect quality of your services on time & leave us a review if you like.",
  },
];

export default function HorizontalScrollSection() {
  return (
    <section className={styles.process} id="pro">
      <div className={styles.processSticky}>
        <div className={styles.processHead}>
          <h3>How it works</h3>
        </div>

        <div className={styles.processGrid}>
          {PROCESS_STEPS.map((step) => (
            <div key={step.id} className={styles.processCol}>
              <img
                src={step.icon}
                alt={step.title}
                width="80"
                height="80"
                loading="lazy"
              />
              {step.link ? (
                <a href={step.link}>
                  <h5>{step.title}</h5>
                </a>
              ) : (
                <h5>{step.title}</h5>
              )}
              <p>
                {step.description}
                {step.highlightText && <span>{step.highlightText}</span>}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
