const Main = () => {
  return (
    <main>
      <section class="section-hero">
        <div class="hero">
          <div class="hero-text-box">
            <h1 className="text-sky-400 text-center heading-primary text-3xl font-bold underline"> Cirugía ortopédica y traumatología con las mejores garantías.</h1>
            <p class="hero-description">
              Médico traumatólogo con amplia experiencia en el manejo quirúrgico
              de fracturas, reconstrucciones óseas, Prótesis de caderas, tumores
              óseos y músculo esquelético.
            </p>
            <a href="" class="main-nav-link nav-cta">Pide una cita</a>
            <a href="#biography" class="btn btn--outline">Más sobre mí &darr;</a>
            <div class="delivered-meals">
              <div class="delivered-imgs">
                <img src="img/customers/customer-1.jpg" alt="Customer photo" />
                <img src="img/customers/customer-2.jpg" alt="Customer photo" />
                <img src="img/customers/customer-3.jpg" alt="Customer photo" />
                <img src="img/customers/customer-4.jpg" alt="Customer photo" />
                <img src="img/customers/customer-5.jpg" alt="Customer photo" />
                <img src="img/customers/customer-6.jpg" alt="Customer photo" />
              </div>
              <p class="delivered-text">
                <span>250+</span> pacientes satisfechos con nuestros servicios.
              </p>
            </div>
          </div>
          <div class="hero-img-box">
            <img src="img/hero.png" class="hero-img" alt="Doctor cirujano Ronal Cadillo" />
          </div>
        </div>
      </section>

      <section class="values section center-text">
        <h2 class="font-heading font-heading--lg margin-bottom--sm">
          Cirugía ortopédica y traumatología.
        </h2>
        <p class="values__description font-content font-content--lg">
          Con más de 5 años de experiencia y más de 500 cirugías realizadas, el
          Dr. Cadillo le ofrece: Confianza, humanidad, buenos resultados.
        </p>
        <div class="values-container">
          <div class="values-box">
            <div class="values-img-box shape-left margin-bottom--m">
              <img src="img/icons/intersect-thin.svg" class="values-img" alt="confianza logo" />
            </div>
            <h3 class="font-content font-content--xl values-box-title">
              <span>Confianza</span>
            </h3>
            <p class="font-content font-content--md values-box-description">
              lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>

          <div class="values-box">
            <div class="values-img-box shape-center margin-bottom--m">
              <img src="img/icons/medal-thin.svg" class="values-img" alt="confianza logo" />
            </div>
            <h3 class="font-content font-content--xl values-box-title">
              <span>Calidad</span>
            </h3>
            <p class="font-content font-content--md values-box-description">
              lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>

          <div class="values-box">
            <div class="values-img-box shape-right margin-bottom--m">
              <img src="img/icons/eye-closed-thin.svg" class="values-img" alt="confianza logo" />
            </div>
            <h3 class="font-content font-content--xl values-box-title">
              <span>Humanidad</span>
            </h3>
            <p class="font-content font-content--md values-box-description">
              lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
      </section>

      <section id="biography" class="biography">
        <div class="biography-container container">
          <img src="img/hero.png" class="biography__img" alt="Doctor cirujano Ronal Cadillo" />
          <div>
            <div>
              <h2 class="font-heading font-heading--lg margin-bottom--sm">
                Dr. Ronal Cadillo Medina.
              </h2>
              <p class="font-content font-content--lg margin-bottom--m">
                Cirujano Ortopédico y traumatólogo.
              </p>
            </div>

            <div class="tab">
              <div>
                <a class="tab__bttn font-content font-content--md">Estudios</a>
                <a class="tab__bttn tab__bttn--active font-content font-content--md">Experiencia</a>
              </div>

              <div class="tab__content grid grid--2-cols">
                <div class="tab__element">
                  <img class="tab__icon margin-bottom--sm" src="img/icons/hospital.svg" alt="hospital icon" />

                  <span class="subheading">2010 - 2013</span>
                  <p class="tab__content-title font-content font-content--md margin-bottom--xs">
                    Hospital San Juan de Dios
                  </p>
                  <p class="font-content font-content--sm">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
                <div class="tab__element">
                  <img class="tab__icon margin-bottom--sm" src="img/icons/hospital-room.svg" alt="hospital icon" />
                  <span class="subheading">2010 - 2013</span>
                  <p class="tab__content-title font-content font-content--md margin-bottom--xs">
                    Clínica Zavaleta
                  </p>
                  <p class="font-content font-content--sm">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
                <div class="tab__element">
                  <img class="tab__icon margin-bottom--sm" src="img/icons/hospital-room.svg" alt="hospital icon" />
                  <span class="subheading">2010 - 2013</span>
                  <p class="tab__content-title font-content font-content--md margin-bottom--xs">
                    Clínica Zavaleta
                  </p>
                  <p class="font-content font-content--sm">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
                <div class="tab__element">
                  <img class="tab__icon margin-bottom--sm" src="img/icons/hospital.svg" alt="hospital icon" />
                  <span class="subheading">2010 - 2013</span>
                  <p class="tab__content-title font-content font-content--md margin-bottom--xs">
                    Hospital San Juan de Dios
                  </p>
                  <p class="font-content font-content--sm">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
export default Main;
