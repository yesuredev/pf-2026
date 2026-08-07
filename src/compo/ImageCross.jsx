import React from "react";
import "./ImageCross.scss";

export default function ImageCross() {
  return (
    <>
      <div class="scroll-wrapper">
        <div class="sticky-viewport">
          <div class="team-grid">
            {/* <!-- Left Card (이미지: 상단 -> 하단 이동) --> */}
            <div class="card card-down">
              <div class="text-slot text-top">Sr. Full-Stack Developer</div>
              <div class="text-slot text-bottom">
                Nazanin
                <br />
                Esmaeillian
              </div>
              <div class="image-box">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"
                  alt="Nazanin Esmaeillian"
                />
              </div>
            </div>

            {/* <!-- Center Card (이미지: 하단 -> 상단 이동) --> */}
            <div class="card card-up">
              <div class="text-slot text-top">
                Amir
                <br />
                Mohseni
              </div>
              <div class="text-slot text-bottom">Creative Director</div>
              <div class="image-box">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
                  alt="Amir Mohseni"
                />
              </div>
            </div>

            {/* <!-- Right Card (이미지: 상단 -> 하단 이동) --> */}
            <div class="card card-down">
              <div class="text-slot text-top">Sr. Full-Stack Developer</div>
              <div class="text-slot text-bottom">
                Ilia
                <br />
                Mohseni
              </div>
              <div class="image-box">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop"
                  alt="Ilia Mohseni"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
