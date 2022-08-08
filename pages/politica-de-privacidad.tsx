import { v4 } from "uuid";
import tw from 'twin.macro'
import {
  Container,
  Heading,
  List,
  Text,
  Bold,
  Link,
  Clause,
} from "@/components/legal";
import { WEB_LINK } from "@/static/ts/constants";

const StyledDate = tw(Text)`text-sm text-[rgb(195, 195, 194)]`

const Privacy = () => (
  <Container as="article">
    <div>
      <Heading primary tw="text-3xl mb-4">
        AVISO DE PRIVACIDAD
      </Heading>
      <StyledDate>
        Última actualización 08 de agosto de 2022
      </StyledDate>
    </div>
    <Text>
      Este aviso de privacidad para OSTEOCENTER (&quot;Compañía&quot;, &quot;nosotros&quot; o
      &quot;nuestro&quot;) describe cómo y por qué podemos recopilar, almacenar, usar y/o
      compartir (&quot;procesar&quot;) su información cuando usa nuestros servicios
      (&quot;Servicios&quot;), como cuando usted:
    </Text>
    <List>
      <Text as="li">
        Visite nuestro sitio web en <Link>{WEB_LINK}</Link>, o cualquier sitio
        web nuestro que enlace a este aviso de privacidad
      </Text>
      <Text as="li">
        Interactuar con nosotros de otras formas relacionadas, incluidas las
        ventas, el marketing o los eventos.
      </Text>
    </List>
    <Text>
      <Bold>¿Preguntas o inquietudes?</Bold> Leer este aviso de privacidad lo
      ayudará a comprender sus derechos y opciones de privacidad. Si no está de
      acuerdo con nuestras políticas y prácticas, no utilice nuestros Servicios.
      Si aún tiene alguna pregunta o inquietud, contáctenos en
      osteocenter.admi@gmail.com.
    </Text>
    <Clause
      title={"RESUMEN DE PUNTOS CLAVE"}
      content={
        <>
          <Text>
            <Bold>¿Qué datos personales tratamos?</Bold> Cuando visita, usa o
            navega por nuestros Servicios, podemos procesar información personal
            según cómo interactúe con OSTEOCENTER y los Servicios, las
            elecciones que haga y los productos y funciones que use.
          </Text>
          <Text>
            <Bold>¿Procesamos alguna información personal sensible?</Bold>{" "}
            Podemos procesar información personal confidencial cuando sea
            necesario con su consentimiento o según lo permita la ley aplicable.
          </Text>
          <Text>
            <Bold>¿Recibimos información de terceros?</Bold>No recibimos ninguna
            información de terceros.
          </Text>
          <Text>
            <Bold>¿Cómo procesamos su información? </Bold>
            Procesamos su información para proporcionar, mejorar y administrar
            nuestros Servicios, comunicarnos con usted, para seguridad y
            prevención de fraude, y para cumplir con la ley. También podemos
            procesar su información para otros fines con su consentimiento.
            Procesamos su información solo cuando tenemos una razón legal válida
            para hacerlo.
          </Text>
          <Text>
            <Bold>
              ¿En qué situaciones y con qué partes compartimos información
              personal?
            </Bold>{" "}
            Podemos compartir información en situaciones específicas y con
            terceros específicos.
          </Text>
          <Text>
            <Bold>¿Cómo mantenemos su información segura? </Bold>Contamos con
            procesos y procedimientos organizativos y técnicos para proteger su
            información personal. Sin embargo, no se puede garantizar que
            ninguna transmisión electrónica a través de Internet o tecnología de
            almacenamiento de información sea 100% segura, por lo que no podemos
            prometer ni garantizar que los piratas informáticos, los
            ciberdelincuentes u otros terceros no autorizados no puedan vencer
            nuestra seguridad y recopilar, acceder de manera indebida. , robar o
            modificar su información.
          </Text>
          <Text>
            <Bold>¿Cuáles son tus derechos? </Bold>Dependiendo de dónde se
            encuentre geográficamente, la ley de privacidad aplicable puede
            significar que tiene ciertos derechos con respecto a su información
            personal.
          </Text>
          <Text>
            <Bold>¿Cómo ejerces tus derechos? </Bold>La forma más fácil de
            ejercer sus derechos es completando nuestro formulario de solicitud
            de información disponible aquí: https://osteocenter.vercel.app/, o
            contactándonos. Consideraremos y actuaremos sobre cualquier
            solicitud de acuerdo con las leyes de protección de datos
            aplicables.
          </Text>
        </>
      }
    />
    <Clause
      title={"1. ¿QUÉ INFORMACIÓN RECOPILAMOS?"}
      content={
        <>
          <Heading secondary as="h2">
            Información personal que nos revela
          </Heading>
          <Text>
            <Bold>En resumen:</Bold> recopilamos la información personal que nos
            proporciona.
          </Text>
          <Text>
            Recopilamos información personal que usted nos proporciona
            voluntariamente cuando se registra en los Servicios, expresa interés
            en obtener información sobre nosotros o nuestros productos y
            Servicios, cuando participa en actividades en los Servicios o cuando
            se comunica con nosotros.
          </Text>
          <Text>
            <Bold>Información personal proporcionada por usted.</Bold> La
            información personal que recopilamos depende del contexto de sus
            interacciones con nosotros y los Servicios, las elecciones que
            realiza y los productos y funciones que utiliza. La información
            personal que recopilamos puede incluir lo siguiente:
          </Text>
          <List>
            {[
              "Nombres",
              "Números de teléfono",
              "Correos electrónicos",
              "Nombres de usuario",
              "Contraseñas",
              "Preferencias de contacto",
              "Datos de contacto o autenticación",
              "Direcciones de facturación",
              "Números de tarjetas de crédito/débito",
            ].map((item) => (
              <Text as="li" key={v4()}>
                {item}
              </Text>
            ))}
          </List>
          <Text>
            <Bold>Información sensible.</Bold> Cuando sea necesario, con su
            consentimiento o según lo permita la ley aplicable, procesamos las
            siguientes categorías de información confidencial:
          </Text>
          <List>
            {[
              "Datos de salud",
              "Datos geneticos",
              "Información biométrica",
              "Números de seguro social u otros identificadores gubernamentales",
              "Datos financieros",
            ].map((item) => (
              <Text as="li" key={v4()}>
                {item}
              </Text>
            ))}
          </List>
          <Text>
            <Bold>Datos de pago.</Bold> Podemos recopilar los datos necesarios
            para procesar su pago si realiza compras, como el número de su
            instrumento de pago (como el número de una tarjeta de crédito) y el
            código de seguridad asociado con su instrumento de pago. Todos los
            datos de pago son almacenados por stripe. Puede encontrar sus
            enlaces de aviso de privacidad aquí:{" "}
            <Link>https://stripe.com/privacy.</Link>
          </Text>
          <Text>
            <Bold>Datos de inicio de sesión de redes sociales.</Bold> Es posible
            que le brindemos la opción de registrarse con nosotros utilizando
            los detalles de su cuenta de redes sociales existente, como su
            cuenta de Facebook, Twitter u otra cuenta de redes sociales. Si
            elige registrarse de esta manera, recopilaremos la información
            descrita en la sección llamada &quot;¿CÓMO MANEJAMOS SUS INGRESOS
            SOCIALES?&quot; abajo.
          </Text>
          <Text>
            Toda la información personal que nos proporcione debe ser verdadera,
            completa y precisa, y debe notificarnos cualquier cambio en dicha
            información personal.
          </Text>
        </>
      }
    />
    <Clause
      title={"2. ¿CÓMO PROCESAMOS SU INFORMACIÓN?"}
      content={
        <>
          <Text>
            <Bold>En resumen:</Bold> Procesamos su información para
            proporcionar, mejorar y administrar nuestros Servicios, comunicarnos
            con usted, para seguridad y prevención de fraude, y para cumplir con
            la ley. También podemos procesar su información para otros fines con
            su consentimiento.
          </Text>
          <Bold>
            Procesamos su información personal por una variedad de razones,
            dependiendo de cómo interactúe con nuestros Servicios, que incluyen:
          </Bold>
          <List>
            {[
              {
                title:
                  "Para facilitar la creación y autenticación de cuentas y administrar cuentas de usuario.",
                content:
                  " Podemos procesar su información para que pueda crear e iniciar sesión en su cuenta, así como mantener su cuenta en funcionamiento.",
              },
              {
                title:
                  "Para entregar y facilitar la entrega de servicios al usuario.",
                content:
                  " Podemos procesar su información para brindarle el servicio solicitado.",
              },
              {
                title:
                  "Para responder a las consultas de los usuarios/ofrecer soporte a los usuarios.",
                content:
                  " Podemos procesar su información para responder a sus consultas y resolver cualquier problema potencial que pueda tener con el servicio solicitado.",
              },
              {
                title: "Para enviarle información administrativa.",
                content:
                  " Podemos procesar su información para enviarle detalles sobre nuestros productos y servicios, cambios en nuestros términos y políticas, y otra información similar.",
              },
              {
                title: "Para publicar testimonios.",
                content:
                  " Publicamos testimonios sobre nuestros Servicios que pueden contener información personal.",
              },
              {
                title: "Administrar sorteos y concursos.",
                content:
                  " Podemos procesar su información para administrar sorteos y concursos.",
              },
              {
                title:
                  "Para evaluar y mejorar nuestros Servicios, productos, marketing y su experiencia.",
                content:
                  " Podemos procesar su información cuando lo creamos necesario para identificar tendencias de uso, determinar la eficacia de nuestras campañas promocionales y evaluar y mejorar nuestros Servicios, productos, marketing y su experiencia.",
              },
              {
                title: "Identificar tendencias de uso.",
                content:
                  " Podemos procesar información sobre cómo usa nuestros Servicios para comprender mejor cómo se usan y poder mejorarlos.",
              },
              {
                title:
                  "Para determinar la eficacia de nuestras campañas de marketing y promoción.",
                content:
                  " Podemos procesar su información para comprender mejor cómo proporcionar campañas de marketing y promocionales que sean más relevantes para usted.",
              },
            ].map((item) => (
              <Text as="li" key={v4()}>
                <Bold>{item.title}</Bold>
                {item.content}
              </Text>
            ))}
          </List>
        </>
      }
    />
    <Clause
      title={"3. ¿CUÁNDO Y CON QUIÉN COMPARTIMOS SU INFORMACIÓN PERSONAL?"}
      content={
        <>
          <Text>
            <Bold>En resumen:</Bold> podemos compartir información en
            situaciones específicas descritas en esta sección y/o con los
            siguientes terceros.
          </Text>
          <Text>
            Es posible que necesitemos compartir su información personal en las
            siguientes situaciones:
          </Text>
          <List>
            {[
              {
                title: "Transferencias Comerciales.",
                content:
                  " Podemos compartir o transferir su información en relación con, o durante las negociaciones de, cualquier fusión, venta de activos de la empresa, financiación o adquisición de la totalidad o una parte de nuestro negocio a otra empresa.",
              },
              {
                title: "Cuando usamos las API de Google Maps Platform.",
                content:
                  " Podemos compartir su información con ciertas API de Google Maps Platform (por ejemplo, API de Google Maps, API de lugares). Para obtener más información sobre la Política de privacidad de Google, consulte este enlace.",
              },
            ].map((item) => (
              <Text as="li" key={v4()}>
                <Bold>{item.title}</Bold>
                {item.content}
              </Text>
            ))}
          </List>
        </>
      }
    />
    <Clause
      title={"4. ¿UTILIZAMOS COOKIES Y OTRAS TECNOLOGÍAS DE SEGUIMIENTO?"}
      content={
        <>
          <Text>
            <Bold>En resumen:</Bold> podemos utilizar cookies y otras
            tecnologías de seguimiento para recopilar y almacenar su
            información.
          </Text>
          <Text>
            Podemos utilizar cookies y tecnologías de seguimiento similares
            (como balizas web y píxeles) para acceder o almacenar información.
            La información específica sobre cómo usamos dichas tecnologías y
            cómo puede rechazar ciertas cookies se establece en nuestro Aviso de
            cookies.
          </Text>
        </>
      }
    />
    <Clause
      title={"5. ¿CÓMO MANEJAMOS SUS INGRESOS SOCIALES?"}
      content={
        <>
          <Text>
            <Bold>En resumen:</Bold> si elige registrarse o iniciar sesión en
            nuestros servicios utilizando una cuenta de redes sociales, es
            posible que tengamos acceso a cierta información sobre usted.
          </Text>

          <Text>
            Nuestros Servicios le ofrecen la posibilidad de registrarse e
            iniciar sesión utilizando los detalles de su cuenta de redes
            sociales de terceros (como sus inicios de sesión de Facebook o
            Twitter). Cuando elija hacer esto, recibiremos cierta información de
            su perfil de su proveedor de redes sociales. La información de
            perfil que recibimos puede variar según el proveedor de redes
            sociales en cuestión, pero a menudo incluirá su nombre, dirección de
            correo electrónico, lista de amigos y foto de perfil, así como otra
            información que elija hacer pública en dicha plataforma de redes
            sociales.
          </Text>
          <Text>
            Usaremos la información que recibimos solo para los fines que se
            describen en este aviso de privacidad o que se le aclaren en los
            Servicios correspondientes. Tenga en cuenta que no controlamos y no
            somos responsables de otros usos de su información personal por
            parte de su proveedor de redes sociales externo. Le recomendamos que
            revise su aviso de privacidad para comprender cómo recopilan, usan y
            comparten su información personal, y cómo puede configurar sus
            preferencias de privacidad en sus sitios y aplicaciones.
          </Text>
        </>
      }
    />
    <Clause
      title={"6. ¿CUÁNTO TIEMPO CONSERVAMOS SU INFORMACIÓN?"}
      content={
        <>
          <Text>
            <Bold>En resumen:</Bold> conservamos su información durante el
            tiempo que sea necesario para cumplir con los fines descritos en
            este aviso de privacidad, a menos que la ley exija lo contrario.
          </Text>
          <Text>
            Solo conservaremos su información personal durante el tiempo que sea
            necesario para los fines establecidos en este aviso de privacidad, a
            menos que la ley exija o permita un período de retención más largo
            (como impuestos, contabilidad u otros requisitos legales). Ningún
            propósito en este aviso requerirá que mantengamos su información
            personal por más tiempo que el período de tiempo en el que los
            usuarios tienen una cuenta con nosotros.
          </Text>
          <Text>
            Cuando no tengamos una necesidad comercial legítima en curso para
            procesar su información personal, eliminaremos o anonimizaremos
            dicha información o, si esto no es posible (por ejemplo, porque su
            información personal se ha almacenado en archivos de respaldo),
            entonces lo haremos de manera segura. almacenar su información
            personal y aislarla de cualquier procesamiento posterior hasta que
            sea posible eliminarla.
          </Text>
        </>
      }
    />
    <Clause
      title={"7. ¿CÓMO MANTENEMOS SU INFORMACIÓN SEGURA?"}
      content={
        <>
          <Text>
            <Bold>En resumen:</Bold> nuestro objetivo es proteger su información
            personal a través de un sistema de medidas de seguridad
            organizativas y técnicas.
          </Text>
          <Text>
            Hemos implementado medidas de seguridad técnicas y organizativas
            apropiadas y razonables diseñadas para proteger la seguridad de
            cualquier información personal que procesemos. Sin embargo, a pesar
            de nuestras salvaguardas y esfuerzos para asegurar su información,
            no se puede garantizar que ninguna transmisión electrónica a través
            de Internet o tecnología de almacenamiento de información sea 100 %
            segura, por lo que no podemos prometer ni garantizar que los piratas
            informáticos, ciberdelincuentes u otros terceros no autorizados no
            serán capaz de vencer nuestra seguridad y recopilar, acceder, robar
            o modificar su información de manera inapropiada. Aunque haremos
            todo lo posible para proteger su información personal, la
            transmisión de información personal hacia y desde nuestros Servicios
            es bajo su propio riesgo. Solo debe acceder a los Servicios dentro
            de un entorno seguro.
          </Text>
        </>
      }
    />
    <Clause
      title={"8. ¿RECOPILAMOS INFORMACIÓN DE MENORES?"}
      content={
        <>
          <Text>
            <Bold>En resumen:</Bold> no recopilamos datos de niños menores de 18
            años ni los comercializamos a sabiendas.
          </Text>
          <Text>
            No solicitamos a sabiendas datos ni comercializamos a niños menores
            de 18 años. Al usar los Servicios, usted declara que tiene al menos
            18 años o que es el padre o tutor de dicho menor y da su
            consentimiento para el uso de los Servicios por parte de dicho menor
            dependiente. Si nos enteramos de que se ha recopilado información
            personal de usuarios menores de 18 años, desactivaremos la cuenta y
            tomaremos las medidas razonables para eliminar rápidamente dicha
            información de nuestros registros. Si tiene conocimiento de
            cualquier dato que podamos haber recopilado de niños menores de 18
            años, comuníquese con nosotros a osteocenter.admi@gmail.com.
          </Text>
        </>
      }
    />
    <Clause
      title={"9. ¿CUÁLES SON SUS DERECHOS DE PRIVACIDAD?"}
      content={
        <>
          <Text>
            <Bold>En resumen:</Bold> puede revisar, cambiar o cancelar su cuenta
            en cualquier momento.
          </Text>
          <Text>
            Si se encuentra en el EEE o el Reino Unido y cree que estamos
            procesando su información personal de manera ilegal, también tiene
            derecho a presentar una queja ante la autoridad supervisora ​​de
            protección de datos local. Puede encontrar sus datos de contacto
            aquí:
            <Link>
              https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm.
            </Link>
          </Text>
          <Text>
            Si se encuentra en Suiza, los datos de contacto de las autoridades
            de protección de datos están disponibles aquí:{" "}
            <Link>https://www.edoeb.admin.ch/edoeb/en/home.html.</Link>
          </Text>
          <Text>
            <Bold>Retirar su consentimiento:</Bold> si confiamos en su
            consentimiento para procesar su información personal, que puede ser
            expreso o implícito según la ley aplicable, tiene derecho a retirar
            su consentimiento en cualquier momento. Puede retirar su
            consentimiento en cualquier momento poniéndose en contacto con
            nosotros utilizando los datos de contacto proporcionados en la
            sección &quot;¿CÓMO PUEDE CONTACTARNOS SOBRE ESTE AVISO?&quot; abajo.
          </Text>
          <Text>
            Sin embargo, tenga en cuenta que esto no afectará la legalidad del
            procesamiento antes de su retiro ni, cuando la ley aplicable lo
            permita, afectará el procesamiento de su información personal
            realizado sobre la base de motivos de procesamiento legales
            distintos del consentimiento.
          </Text>
          <Heading secondary as="h2">
            Información de la cuenta
          </Heading>
          <Text>
            Si en algún momento desea revisar o cambiar la información en su
            cuenta o cancelar su cuenta, puede:
          </Text>
          <List>
            {[
              "Iniciar sesión en la configuración de su cuenta y actualizar su cuenta de usuario.",
            ].map((item) => (
              <Text as="li" key={v4()}>
                {item}
              </Text>
            ))}
          </List>
          <Text>
            Tras su solicitud para cancelar su cuenta, desactivaremos o
            eliminaremos su cuenta y la información de nuestras bases de datos
            activas. Sin embargo, podemos retener cierta información en nuestros
            archivos para evitar fraudes, solucionar problemas, ayudar con
            cualquier investigación, hacer cumplir nuestros términos legales y/o
            cumplir con los requisitos legales aplicables.
          </Text>
          <Text>
            <Bold>Cookies y tecnologías similares:</Bold> la mayoría de los
            navegadores web están configurados para aceptar cookies de manera
            predeterminada. Si lo prefiere, generalmente puede elegir configurar
            su navegador para eliminar cookies y rechazar cookies. Si elige
            eliminar las cookies o rechazarlas, esto podría afectar ciertas
            características o servicios de nuestros Servicios. Para cancelar la
            publicidad basada en intereses de los anunciantes en nuestros
            Servicios, visite <Link>http://www.aboutads.info/choices/.</Link>
          </Text>
          <Text>
            Si tiene preguntas o comentarios sobre sus derechos de privacidad,
            puede enviarnos un correo electrónico a osteocenter.admi@gmail.com.
          </Text>
        </>
      }
    />
    <Clause
      title={"10. CONTROLES PARA FUNCIONES DE NO SEGUIMIENTO"}
      content={
        <>
          <Text>
            La mayoría de los navegadores web y algunos sistemas operativos
            móviles y aplicaciones móviles incluyen una función o configuración
            de No rastrear (&quot;DNT&quot;) que puede activar para indicar su preferencia
            de privacidad para que no se supervisen ni recopilen datos sobre sus
            actividades de navegación en línea. En esta etapa no se ha
            finalizado ningún estándar de tecnología uniforme para reconocer e
            implementar señales DNT. Como tal, actualmente no respondemos a las
            señales del navegador DNT ni a ningún otro mecanismo que comunique
            automáticamente su elección de no ser rastreado en línea. Si se
            adopta un estándar para el seguimiento en línea que debemos seguir
            en el futuro, le informaremos sobre esa práctica en una versión
            revisada de este aviso de privacidad.
          </Text>
        </>
      }
    />
    <Clause
      title={
        "11. ¿LOS RESIDENTES DE CALIFORNIA TIENEN DERECHOS DE PRIVACIDAD ESPECÍFICOS?"
      }
      content={
        <>
          <Text>
            <Bold>En resumen:</Bold> Sí, si es residente de California, se le
            otorgan derechos específicos con respecto al acceso a su información
            personal.
          </Text>
          <Text>
            La Sección 1798.83 del Código Civil de California, también conocida
            como la ley &quot;Shine The Light&quot;, permite a nuestros usuarios que son
            residentes de California solicitar y obtener de nosotros, una vez al
            año y sin cargo, información sobre categorías de información
            personal (si corresponde) que divulgada a terceros con fines de
            marketing directo y los nombres y direcciones de todos los terceros
            con los que compartimos información personal en el año calendario
            inmediatamente anterior. Si es residente de California y desea
            realizar dicha solicitud, envíenos su solicitud por escrito
            utilizando la información de contacto que se proporciona a
            continuación.
          </Text>
          <Text>
            Si tiene menos de 18 años, reside en California y tiene una cuenta
            registrada en los Servicios, tiene derecho a solicitar la
            eliminación de los datos no deseados que publica públicamente en los
            Servicios. Para solicitar la eliminación de dichos datos,
            comuníquese con nosotros utilizando la información de contacto que
            se proporciona a continuación e incluya la dirección de correo
            electrónico asociada con su cuenta y una declaración de que reside
            en California. Nos aseguraremos de que los datos no se muestren
            públicamente en los Servicios, pero tenga en cuenta que es posible
            que los datos no se eliminen completa o completamente de todos
            nuestros sistemas (por ejemplo, copias de seguridad, etc.).
          </Text>
        </>
      }
    />
    <Clause
      title={"12. ¿HACEMOS ACTUALIZACIONES A ESTE AVISO?"}
      content={
        <>
          <Text>
            <Bold>En resumen:</Bold> Sí, actualizaremos este aviso según sea
            necesario para cumplir con las leyes pertinentes.
          </Text>
          <Text>
            Es posible que actualicemos este aviso de privacidad de vez en
            cuando. La versión actualizada se indicará con una fecha &quot;Revisada&quot;
            actualizada y la versión actualizada entrará en vigencia tan pronto
            como sea accesible. Si realizamos cambios sustanciales a este aviso
            de privacidad, podemos notificarle ya sea publicando de manera
            destacada un aviso de dichos cambios o enviándole directamente una
            notificación. Le recomendamos que revise este aviso de privacidad
            con frecuencia para estar informado de cómo protegemos su
            información.
          </Text>
        </>
      }
    />
    <Clause
      title={"13. ¿CÓMO PUEDE CONTACTARNOS SOBRE ESTE AVISO?"}
      content={
        <>
          <Text>
            Si tiene preguntas o comentarios sobre este aviso, puede enviarnos
            un correo electrónico a osteocenter.admi@gmail.com o por correo
            postal a:
          </Text>
          {[
            "OSTEOCENTER",
            "Clínica SantaMaría, Elías Aguirre #761- interior 1er piso, 2do Pabellón, Chimbote, Perú",
            "Chimbote, Santa 02711",
            "Perú",
          ].map((item) => (
            <Text key={v4()}>{item}</Text>
          ))}
        </>
      }
    />
    <Clause
      title={
        "14. ¿CÓMO PUEDE REVISAR, ACTUALIZAR O ELIMINAR LOS DATOS QUE RECOPILAMOS DE USTED?"
      }
      content={
        <>
          <Text>
            Según las leyes aplicables de su país, puede tener derecho a
            solicitar acceso a la información personal que recopilamos de usted,
            cambiar esa información o eliminarla. Para solicitar revisar,
            actualizar o eliminar su información personal, visite:
            <Link>https://osteocenter.vercel.app/.</Link>
          </Text>
        </>
      }
    />
  </Container>
);

export default Privacy;
