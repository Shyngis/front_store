import React from "react";

export const Contacts = () => {
  return (
    <div class="container fluid">
      <div class="row">
        <div class="col-md-12 mb-10">
          <h6 className="page-title">Контакты</h6>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-lg-4">
          <img
            class="img-fluid rounded"
            loading="lazy"
            src="https://media.istockphoto.com/id/537742287/photo/man-shopping-for-bathroom-equipment-in-shop.jpg?s=612x612&w=0&k=20&c=q_B29_L47wUdJHBA3bG4lpkED5thZh1fCZO1MiO6d7Q="
            alt=""
          />
        </div>
        <div class="col-12 col-lg-4"  style={{ marginTop: "5%" }}>
          <div class="row justify-content-xl-center">
            <div class="col-12 col-xl-10">
              <div class="d-flex justify-content-center align-items-center">
                <i class="fas fa-location-dot fa-4x"></i>
              </div>
              <div style={{ marginTop: "9%" }}>
                <p style={{ textAlign: "center" }}>
                  ТОО "SANTEHPLAST"
                  <p>Юридический адрес : город Караганды, ул Гоголя 64/3</p>
                  <p>Тел.: +7(705)759-00-99</p>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-4" style={{ marginTop: "5%" }}>
          <div class="row justify-content-xl-center">
            <div class="col-12 col-xl-10">
              <div class="d-flex justify-content-center align-items-center">
                <i class="fas fa-clock fa-4x"></i>
              </div>
              <div style={{ marginTop: "9%" }}>
                <p style={{ textAlign: "center" }}>Время работы:</p>
                <p style={{ textAlign: "center" }}>Пн-Пт: 11:00 — 23:00</p>
                <p style={{ textAlign: "center" }}>Сб-Вс: 11:00 — 22:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ratio ratio-16x9" style={{ marginTop: "5%" }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387.0197991818999!2d71.45819614978676!3d51.16972587506492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4245819bff52b20d%3A0xf0a2b9cc7e10d59a!2z0KHQsNC90YLQtdGF0L_Qu9Cw0YHRgg!5e0!3m2!1sru!2skz!4v1703958282255!5m2!1sru!2skz"
          width="600"
          height="450"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};
