import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Home.scss";
import "../../styles/main.scss";

// import "../../components/home/Hero/Hero.jsx";
import Hero from "../../components/home/Hero/Hero.jsx";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  {
    id: 1,
    eyebrow: "UI SYSTEM",
    title: "디자인과 인터랙션이 같이 읽히는 첫 화면",
    desc: "왼쪽 텍스트는 자연스럽게 문서처럼 읽히고, 오른쪽 카드는 화면에 고정된 채 내부 비주얼만 위로 쓸려 올라갑니다.",
    tag: "01",
    theme: "#1b1826",
  },
  {
    id: 2,
    eyebrow: "MOTION",
    title: "스크롤 진행도에 맞춘 카드 내부 슬라이드",
    desc: "카드 자체는 고정되어 있지만, 내부 이미지 트랙이 스크롤 progress에 따라 움직여서 정보가 단계적으로 드러나는 구조입니다.",
    tag: "02",
    theme: "#13272b",
  },
  {
    id: 3,
    eyebrow: "SHOWCASE",
    title: "UI 작업물과 비주얼을 살아있는 화면으로 전시",
    desc: "PDF보다 웹 포트폴리오가 더 설득력 있는 이유는, 실제 화면과 모션을 바로 보여줄 수 있기 때문입니다.",
    tag: "03",
    theme: "#2a1620",
  },
  {
    id: 4,
    eyebrow: "DETAIL",
    title: "스크롤이 끝나면 sticky가 자연스럽게 풀리는 마감",
    desc: "섹션 전체 구간이 끝나면 고정이 해제되고, 다음 콘텐츠가 일반적인 문서 흐름으로 이어집니다.",
    tag: "04",
    theme: "#2a2414",
  },
];

function Home() {
  const homeRef = useRef(null);
  const sectionRef = useRef(null);
  const visualRef = useRef(null);
  const trackRef = useRef(null);
  const copyRefs = useRef([]);

  useLayoutEffect(() => {
    const sectionEl = sectionRef.current;
    const visualEl = visualRef.current;
    const trackEl = trackRef.current;

    if (!sectionEl || !visualEl || !trackEl) return;

    const ctx = gsap.context(() => {
      const updateAnimation = () => {
        const maxY = trackEl.scrollHeight - visualEl.clientHeight;

        gsap.killTweensOf(trackEl);

        gsap.set(trackEl, { y: 0 });

        gsap.to(trackEl, {
          y: -Math.max(0, maxY),
          ease: "none",
          scrollTrigger: {
            trigger: sectionEl,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(".visual-panel__image", {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: sectionEl,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
          },
        });
      };

      updateAnimation();
      ScrollTrigger.addEventListener("refreshInit", updateAnimation);

      /* 카드별 배경 색 전환 */

      copyRefs.current.forEach((copyEl, index) => {
        if (!copyEl) return;

        ScrollTrigger.create({
          trigger: copyEl,
          start: "top 60%",
          end: "bottom 40%",

          onEnter: () => {
            gsap.to(homeRef.current, {
              backgroundColor: ITEMS[index].theme,
              duration: 0.8,
              ease: "power2.out",
            });
          },

          onEnterBack: () => {
            gsap.to(homeRef.current, {
              backgroundColor: ITEMS[index].theme,
              duration: 0.8,
              ease: "power2.out",
            });
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="home" ref={homeRef}>
      <Hero />
      <section className="hero-intro">
        <div className="hero-intro__inner">
          <p className="hero-intro__eyebrow">JUHAN / UI DESIGN & DEVELOPMENT</p>

          <h1 className="hero-intro__title">
            살아있는 UI와
            <br />
            스크롤 인터랙션을 만드는 포트폴리오
          </h1>

          <p className="hero-intro__desc">
            메인 핵심 인터랙션 예제. 왼쪽은 일반 스크롤, 오른쪽은 sticky 카드
            내부 슬라이드.
          </p>
        </div>
      </section>

      <section className="sticky-showcase" ref={sectionRef}>
        <div className="sticky-showcase__inner">
          <div className="sticky-showcase__content">
            {ITEMS.map((item, index) => (
              <article
                className="showcase-copy"
                key={item.id}
                ref={(el) => (copyRefs.current[index] = el)}
              >
                <span className="showcase-copy__tag">{item.tag}</span>

                <p className="showcase-copy__eyebrow">{item.eyebrow}</p>

                <h2 className="showcase-copy__title">{item.title}</h2>

                <p className="showcase-copy__desc">{item.desc}</p>
              </article>
            ))}
          </div>

          <div className="sticky-showcase__visual">
            <div className="visual-card" ref={visualRef}>
              <div className="visual-card__track" ref={trackRef}>
                {ITEMS.map((item) => (
                  <div className="visual-panel" key={item.id}>
                    <div
                      className={`visual-panel__image visual-panel__image--${item.id}`}
                    >
                      <div className="visual-panel__overlay">
                        <p className="visual-panel__label">{item.eyebrow}</p>

                        <strong className="visual-panel__headline">
                          {item.title}
                        </strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-outro">
        <div className="home-outro__inner">
          <h2>다음 섹션</h2>

          <p>sticky가 해제된 뒤 자연스럽게 이어지는 일반 콘텐츠 영역</p>
        </div>
      </section>
    </main>
  );
}

export default Home;
