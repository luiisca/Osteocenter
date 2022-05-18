const Main = () => {
  return (
    <main>
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

            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
export default Main;
