import React from "react";
import aboutUsImageUrl from "../../Assets/about-us.png";

export const About = () => {
  return (
    <div class="container fluid">
      <div class="row gy-3">
        <h6 className="page-title">О компании</h6>
        <div class="col-12 col-lg-6">
          <img
            class="img-fluid rounded"
            loading="lazy"
            src={aboutUsImageUrl}
            alt=""
          />
        </div>
        <div class="col-12 col-lg-6">
          <p class="ml-3">
            <b>Santehplast</b> - это современная динамично развивающаяся
            торгово-производственная компания, занявшая прочную позицию на рынке
            Казахстана в области бытового и инженерного оборудования для систем
            водоснабжения, отопления и водоотведения. Начав свою деятельность в
            2005 году Мы уверенно продвигаемся вперёд, ставя перед собой все
            новые и новые задачи. На сегодняшний день компания представлена
            сетью магазинов инженерной сантехники в таких городах, как Астана,
            Караганда, Алматы.
          </p>
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
