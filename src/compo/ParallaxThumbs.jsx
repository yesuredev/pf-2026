import React from "react";
import "./ParallaxThumbs.scss";

export default function ParallaxThumbs() {
  return (
    <>
      <section class="project-section">
        {/* <!-- 상단 타이틀 --> */}
        <div class="title-wrap">
          <h2>
            Take a look at
            <br />
            some of our projects
          </h2>
        </div>

        {/* <!-- 2컬럼 패러랙스 그리드 --> */}
        <div class="grid-container">
          {/* <!-- 좌측 컬럼 (느린 스크롤) --> */}
          <div class="column">
            <article
              class="card-item"
              data-cursor-text="Content 01"
              data-cursor-color="teal"
            >
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
                alt="Project 1"
                data-cursor-text="SITE MAP"
                data-cursor-color="rgba(0, 0, 0, .5)"
              />
            </article>
            <article class="card-item">
              <img
                src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80"
                alt="Project 2"
              />
            </article>
            <article class="card-item">
              <img
                src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
                alt="Project 3"
              />
            </article>
            <article class="card-item">
              <img
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
                alt="Project 4"
              />
            </article>
          </div>

          {/* <!-- 우측 컬럼 (빠른 스크롤) --> */}
          <div class="column">
            <article class="card-item">
              <img
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
                alt="Project 5"
              />
            </article>
            <article class="card-item">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
                alt="Project 6"
              />
            </article>
            <article class="card-item">
              <img
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"
                alt="Project 7"
              />
            </article>
            <article class="card-item">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                alt="Project 8"
              />
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
