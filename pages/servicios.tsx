import SEO from "@/components/SEO";
import { WEB_LINK } from "@/static/ts/constants";

const Services = () => {
  return (
    <SEO
      description={
        "Empresa dedicada a la prevención, atención y recuperación de patologías que afectan al sistema músculo esquelético. Contamos con especialistas altamente capacitados. Separa citas, recibe tratamiento, prescripciones y haz consultas a tu medico todo desde nuestra plataforma en linea."
      }
      image={`${WEB_LINK}/img/osteocenter-logo.png`}
      title="Servicios | Clínica Osteocenter"
      keywords={
        "consulta medica presencial, teleconsultas, atencion a domicilio, procedimientos, terapia con ondas de choque, protesis de cadera, cirugia artroscopica de rodilla, cirugia de tumores oseos y musculares, cirugia reconstructiva y estetica, tratamiento de secuelas y deformidades oseas, ortopedia infantil, emergencias, tratamiento de lesiones deportivas"
      }
    >
      <h2>Hi!</h2>
    </SEO>
  );
};

export default Services;
