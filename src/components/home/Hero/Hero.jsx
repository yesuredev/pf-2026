import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
// import './Hero.scss';

gsap.registerPlugin(ScrollTrigger);

const sectionData = [
  {
    id: 1,
    title: "Branding",
    desc: "We give your business/brand a face and identity by creating the most suitable logo...",
    bgColor: "#f8ece4",
    imgUrl:
      "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Design",
    desc: "The design makes its mark through first impressions. We establish long-lasting...",
    bgColor: "#f1e8fa",
    imgUrl:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Development",
    desc: "Your website is the face of your business. Together, our developers and designers...",
    bgColor: "#e8effc",
    imgUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
  },
];

const Hero = () => {
  const containerRef = useRef(null);
  const leftTrackRef = useRef(null);
  const rightTrackRef = useRef(null);
  const bgRefs = useRef([]); // 패럴랙스 효과를 줄 배경 이미지들

  useEffect(() => {
    const N = sectionData.length;

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${(N - 1) * 100}%`,
          scrub: 1.35, // 스크롤과 1:1 완벽 동기화
          pin: true,
        },
      });

      // 1. 왼쪽 텍스트 트랙 밀어 올리기
      tl.to(
        leftTrackRef.current,
        {
          yPercent: -((N - 1) / N) * 100,
          ease: "none",
          duration: N - 1,
        },
        0,
      );

      // 2. 오른쪽 이미지 마스크 트랙 밀어 올리기
      tl.to(
        rightTrackRef.current,
        {
          yPercent: -((N - 1) / N) * 100,
          ease: "none",
          duration: N - 1,
        },
        0,
      );

      // 3. ✨ 수정된 핵심: 각 카드의 시점에 맞춘 독립적 패럴랙스
      bgRefs.current.forEach((bg, i) => {
        // 각 카드가 화면(마스크)을 가로지르는 타임라인 상의 시간 계산
        const startTime = Math.max(0, i - 1); // 언제부터 움직일지 (0 이하는 없음)
        const endTime = Math.min(N - 1, i + 1); // 언제 멈출지
        const duration = endTime - startTime; // 움직이는 총 시간

        // 화면 정중앙에 올 때 딱 0%가 되도록 앞뒤로 -15% ~ 15% 움직임
        const startY = i === 0 ? 0 : -50; // 첫 카드는 이미 중앙이므로 0부터 시작
        const endY = i === N - 1 ? 0 : 50; // 마지막 카드는 중앙에 멈추므로 0에서 끝남

        tl.fromTo(
          bg,
          { yPercent: startY }, // 시작 위치
          {
            yPercent: endY, // 끝 위치
            ease: "none",
            duration: duration,
          },
          startTime, // 전체 타임라인에서 이 카드가 보일 때만 애니메이션 실행
        );
      });

      // 4. 배경색 전환
      sectionData.forEach((_, i) => {
        if (i === 0) return;
        tl.to(
          containerRef.current,
          {
            backgroundColor: sectionData[i].bgColor,
            ease: "none",
            duration: 1,
          },
          i - 1,
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="scroll-container"
      ref={containerRef}
      style={{ backgroundColor: sectionData[0].bgColor }}
    >
      {/* 왼쪽 텍스트 영역 */}
      <div className="text-section">
        <div className="text-track" ref={leftTrackRef}>
          {sectionData.map((item) => (
            <div key={`text-${item.id}`} className="text-item">
              <h1>{item.title}</h1>
              <p>{item.desc}</p>
              <button className="view-more">View more</button>
            </div>
          ))}
        </div>
      </div>

      {/* 오른쪽 이미지 마스크 영역 */}
      <div className="image-section">
        <div className="image-mask-frame">
          <div className="image-track" ref={rightTrackRef}>
            {sectionData.map((item, i) => (
              <div key={`img-${item.id}`} className="image-item">
                {/* 패럴랙스가 적용될 배경 레이어 */}
                <div
                  className="image-bg"
                  ref={(el) => (bgRefs.current[i] = el)}
                  style={{ backgroundImage: `url(${item.imgUrl})` }}
                />
                <span className="card-label">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
