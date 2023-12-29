import React from "react";
import ReactPlayer from "react-player";

export const About = () => {
  return (
    <div class="container fluid">
      <div class="row gy-3">
        <h2
          class="mb-2 display-2"
          style={{ fontWeight: "bold", marginLeft: "2%" }}
        >
          О компании
        </h2>
        <div class="col-12 col-lg-6" style={{ marginTop: "3%" }}>
          <img
            class="img-fluid rounded"
            loading="lazy"
            src="https://septic78.ru/assets/cache_image/assets/santehnikazag_0x0_0fe.jpg"
            alt=""
          />
        </div>
        <div class="col-12 col-lg-6">
          <div class="row justify-content-xl-center">
            <div class="col-12 col-xl-10">
              <p class="lead fs-5 mb-3 mb-xl-5">
                Santehplast- это современная динамично развивающаяся
                торгово-производственная компания, занявшая прочную позицию на
                рынке Казахстана в области бытового и инженерного оборудования
                для систем водоснабжения, отопления и водоотведения. Начав свою
                деятельность в 2005 году Мы уверенно продвигаемся вперёд, ставя
                перед собой все новые и новые задачи. На сегодняшний день
                компания представлена сетью магазинов инженерной сантехники в
                таких городах, как Нур-Султан, Шымкент, Туркестан, Караганда,
                Жезказган, Темиртау и Сатпаев.
              </p>
            </div>
          </div>
        </div>
        <div class="ratio ratio-4x3 col-md-6" style={{ marginTop: "3%" }}>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/ml03O301A7A?si=4Yx7lRXl4PU1tIC-"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};
