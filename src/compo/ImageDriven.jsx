import React from "react";
import "./ImageDriven.scss";

export default function ImageDriven() {
  return (
    <>
      <section>
        <div class="scroll-wrapper">
          {/* <!-- 1. 고정된 위치에서 스크롤에 따라 텍스트만 바뀌는 타이틀 영역 --> */}
          <div class="sticky-text-wrapper">
            <div class="text-stack">
              <h1 class="title title-1">
                We launch digital products in
                <br />
                the best way possible 🤨
              </h1>
              <h1 class="title title-2">
                A creative agency with solid design &<br />
                web development expertise.
              </h1>
            </div>
          </div>

          {/* <!-- 2. 위로 스크롤되며 타이틀을 덮고 지나가는 이미지 섹션 --> */}
          <div class="image-overlay-section">
            <div class="image-box">
              <img
                src="https://picsum.photos/1200/800?random=1"
                alt="Hero Image"
              />
            </div>
          </div>
        </div>
        <div class="bottomEmpty"></div>
      </section>
    </>
  );
}
