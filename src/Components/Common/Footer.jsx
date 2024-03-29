import React from "react";

export const Footer = () => {
  return (
    <>
      <div class="bg-body-tertiary text-center pb-5">
        <div class="row mt-1 gy-3">
          <div class="col-12 col-lg-4" style={{ textAlign: "center" }}>
            <p>Мы в соцсетях</p>
            <a
              data-mdb-ripple-init
              class="btn btn-outline btn-floating m-1"
              href="#!"
              role="button"
            >
              <i class="fa-brands fa-youtube fa-2x"></i>
            </a>
            <a
              data-mdb-ripple-init
              class="btn btn-outline btn-floating m-1"
              href="#!"
              role="button"
            >
              <i class="fab fa-twitter fa-2x"></i>
            </a>
            <a
              data-mdb-ripple-init
              class="btn btn-outline btn-floating m-1"
              href="#!"
              role="button"
            >
              <i class="fab fa-instagram fa-2x"></i>
            </a>
            <br />
            <a
              data-mdb-ripple-init
              class="btn btn-outline btn-floating m-1"
              href="#!"
              role="button"
            >
              <i class="fa-brands fa-telegram fa-2x"></i>
            </a>

            <a
              data-mdb-ripple-init
              class="btn btn-outline btn-floating m-1"
              href="#!"
              role="button"
            >
              <i class="fa-brands fa-vk fa-2x"></i>
            </a>
            <a
              data-mdb-ripple-init
              class="btn btn-outline btn-floating m-1"
              href="#!"
              role="button"
            >
              <i class="fa-brands fa-facebook fa-2x"></i>
            </a>
          </div>
          <div class="col-12 col-lg-4">
            <div class="d-flex justify-content-center align-items-center">
              <i class="fas fa-location-dot fa-2x"></i>
            </div>
            <div>
              <p style={{ textAlign: "center" }}>
                ТОО "SANTEHPLAST"
                <p>
                  Юридический адрес : город Караганды, ул Гоголя 64/3
                  <br />
                  <a href="tel:87057590099">+7(705)759-00-99</a><br />
                  <a href="tel:87010716140">+7(701)071-61-40</a>
                </p>
              </p>

              <div class="d-flex justify-content-center align-items-center">
                <i class="fas fa-clock fa-2x"></i>
              </div>
              <div style={{ marginTop: "5%" }}>
                <p style={{ textAlign: "center" }}>Время работы:</p>
                <p style={{ textAlign: "center" }}>Пн-Пт: 9:00 — 18:00</p>
                <p style={{ textAlign: "center" }}>Сб: 9:00 — 14:00</p>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-4">
            <div class="d-flex justify-content-center align-items-center">
              <i class="fa-solid fa-map-location-dot fa-2x"></i>
            </div>
            <div>
              <p style={{ textAlign: "center" }}>
                <p>
                  в г.Астана <br />
                  ул Бейсекбаева 18Б 1 этаж
                  <br />
                  <a href="tel:87052396303">+7(705)239-63-03</a><br />
                  <a href="tel:8(705)7592999">+7(705)759-29-99</a>
                </p>
              </p>
            </div>
          </div>
        </div>

        <div class="text-center p-3">
          <p>© 2024 TОО «Santehplast»</p>
        </div>
      </div>
    </>
  );
};
