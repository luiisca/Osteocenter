import NextLink from "next/link";
import BaseHeading from "@/components/Elements/Heading";
import { BaseContainer } from "@/components/BaseStyle";
import tw, { styled } from "twin.macro";

const Heading = tw(BaseHeading)`font-sans text-xl`;
const Text = styled.p(() => [
  tw`text-[#525252] text-[.95rem] leading-[1.575rem] mb-5 tracking-[0.02px] font-normal max-w-[75ch]`,
  tw`md:text-lg md:leading-[1.875rem] md:mb-7`,
]);
const Bold = (props: { children: React.ReactNode }) => (
  <Text as="span" tw="text-accent-333">
    {props.children}
  </Text>
);
const Link = (props: { children: string }) => (
  <Text
    as="span"
    tw="text-primary-shade-2 underline hover:text-primary blog-lg:no-underline"
  >
    <NextLink href={props.children}>{props.children}</NextLink>
  </Text>
);
const Clause = (props: {
  title: string;
  content: string | React.ReactNode;
}) => (
  <div>
    <Heading secondary as="h2">
      {props.title}
    </Heading>
    <div>{props.content}</div>
  </div>
);

const TOS = () => (
  <BaseContainer as="article" tw="mt-12 md:mt-20">
    <div>
      <Heading primary tw="text-3xl mb-4">
        Términos de servicio
      </Heading>
      <Text tw="text-sm text-[rgb(195, 195, 194)]">
        Última actualización 07 de agosto de 2022
      </Text>
    </div>
    <Clause
      title={"1. ACUERDO DE TÉRMINOS"}
      content={
        <>
          <Text>
            Estos Términos de uso constituyen un acuerdo legalmente vinculante
            realizado entre usted, ya sea personalmente o en nombre de una
            entidad (&quot;usted&quot;) y OSTEOCENTER (<Bold>&quot;Compañía&quot;</Bold>,{" "}
            <Bold>&quot;nosotros&quot;</Bold>, <Bold>&quot;nos&quot;</Bold> o <Bold>&quot;nuestro&quot;</Bold>
            ), con respecto a su acceso y el uso del sitio web
            <Link>https://osteocenter.vercel.app</Link>, así como cualquier otra
            forma de medios, canal de medios, sitio web móvil o aplicación móvil
            relacionada, vinculada o conectada de otro modo al mismo
            (colectivamente, el &quot;Sitio&quot;). Estamos registrados en Perú y tenemos
            nuestro oficina en Clínica SantaMaría, Elías Aguirre #761- interior
            1er piso, 2do Pabellón, Chimbote, Perú, Chimbote, Santa 02711. Usted
            acepta que al acceder al Sitio, ha leído, entendido y acordó estar
            sujeto a todos estos Términos de uso. SI NO ESTÁ DE ACUERDO CON
            TODOS ESTOS TÉRMINOS DE USO, ENTONCES SE LE PROHÍBE EXPRESAMENTE
            UTILIZAR EL SITIO Y DEBE DEJAR DE UTILIZARLO INMEDIATAMENTE.
          </Text>
          <Text>
            Los términos y condiciones complementarios o los documentos que
            pueden publicarse en el Sitio de vez en cuando se incorporan
            expresamente aquí como referencia. Nos reservamos el derecho, a
            nuestro exclusivo criterio, de realizar cambios o modificaciones a
            estos Términos de uso en cualquier momento y por cualquier motivo.
            Le avisaremos sobre cualquier cambio actualizando la fecha de
            &quot;Última actualización&quot; de estos Términos de uso, y usted renuncia a
            cualquier derecho a recibir un aviso específico de cada cambio.
            Asegúrese de verificar los Términos aplicables cada vez que use
            nuestro Sitio para que comprenda qué Términos se aplican. Usted
            estará sujeto a, y se considerará que ha sido informado y aceptado,
            los cambios en los Términos de uso revisados por su uso continuado
            del Sitio después de la fecha de publicación de dichos Términos de
            uso revisados.
          </Text>
          <Text>
            La información provista en el Sitio no está destinada a ser
            distribuida o utilizada por ninguna persona o entidad en ninguna
            jurisdicción o país donde dicha distribución o uso sería contrario a
            la ley o regulación o que nos sometería a cualquier requisito de
            registro dentro de dicha jurisdicción o país. . En consecuencia,
            aquellas personas que elijan acceder al Sitio desde otros lugares lo
            hacen por su propia iniciativa y son los únicos responsables de
            cumplir con las leyes locales, en la medida en que las leyes locales
            sean aplicables.
          </Text>
          <Text>
            El Sitio está destinado a usuarios mayores de 18 años. Las personas
            menores de 18 años no pueden usar o registrarse en el Sitio.
          </Text>
        </>
      }
    />
    <Clause
      title={"2. DERECHOS DE PROPIEDAD INTELECTUAL"}
      content={
        <>
          <Text>
            A menos que se indique lo contrario, el Sitio es propiedad de
            nuestra propiedad y todo el código fuente, las bases de datos, la
            funcionalidad, el software, los diseños de sitios web, el audio, el
            video, el texto, las fotografías y los gráficos del Sitio
            (colectivamente, el &quot;Contenido&quot;) y las marcas registradas, el
            servicio las marcas y los logotipos que contiene (las &quot;Marcas&quot;) son
            de nuestra propiedad o están controlados por nosotros o están
            autorizados por nosotros, y están protegidos por las leyes de
            derechos de autor y marcas registradas y varios otros derechos de
            propiedad intelectual y leyes de competencia desleal del Perú, las
            leyes internacionales de derechos de autor, y convenciones
            internacionales. El Contenido y las Marcas se proporcionan en el
            Sitio &quot;TAL CUAL&quot; solo para su información y uso personal. Salvo que
            se indique expresamente en estos Términos de uso, ninguna parte del
            Sitio y ningún Contenido o Marcas pueden copiarse, reproducirse,
            agregarse, volver a publicarse, cargarse, publicarse, exhibirse
            públicamente, codificarse, traducirse, transmitirse, distribuirse,
            venderse, licenciarse o explotados de otro modo para cualquier
            propósito comercial, sin nuestro permiso previo por escrito.
          </Text>
          <Text>
            Siempre que sea elegible para usar el Sitio, se le otorga una
            licencia limitada para acceder y usar el Sitio y para descargar o
            imprimir una copia de cualquier parte del Contenido al que haya
            obtenido acceso únicamente para su uso personal y no comercial.
            usar. Nos reservamos todos los derechos no otorgados expresamente a
            usted en y para el Sitio, el Contenido y las Marcas.
          </Text>
        </>
      }
    />
    <Clause
      title={"3. REPRESENTACIONES DEL USUARIO"}
      content={
        <>
          <Text>
            Al utilizar el Sitio, declara y garantiza que: (1) toda la
            información de registro que envíe será verdadera, precisa, actual y
            completa; (2) mantendrá la precisión de dicha información y
            actualizará de inmediato dicha información de registro según sea
            necesario; (3) tiene la capacidad legal y acepta cumplir con estos
            Términos de uso; (4) no es menor de edad en la jurisdicción en la
            que reside; (5) no accederá al Sitio a través de medios
            automatizados o no humanos, ya sea a través de un bot, script u
            otro; (6) no utilizará el Sitio para ningún propósito ilegal o no
            autorizado; y (7) su uso del Sitio no violará ninguna ley o
            regulación aplicable.
          </Text>
          <Text>
            Si proporciona información falsa, inexacta, desactualizada o
            incompleta, tenemos el derecho de suspender o cancelar su cuenta y
            rechazar cualquier uso actual o futuro del Sitio (o cualquier parte
            del mismo).
          </Text>
        </>
      }
    />
    <Clause
      title={"4. REGISTRO DE USUARIO"}
      content={
        <>
          <Text>
            Es posible que deba registrarse en el Sitio. Usted acepta mantener
            la confidencialidad de su contraseña y será responsable de todo uso
            de su cuenta y contraseña. Nos reservamos el derecho de eliminar,
            reclamar o cambiar un nombre de usuario que seleccione si
            determinamos, a nuestro exclusivo criterio, que dicho nombre de
            usuario es inapropiado, obsceno o de otra manera objetable.
          </Text>
        </>
      }
    />
    <Clause
      title={"5. ACTIVIDADES PROHIBIDAS"}
      content={
        <>
          <Text>
            No puede acceder ni utilizar el Sitio para ningún otro propósito que
            no sea el que ponemos a disposición del Sitio. El Sitio no se puede
            utilizar en relación con ningún esfuerzo comercial, excepto aquellos
            que estén respaldados o aprobados específicamente por nosotros.
          </Text>
          <Text>Como usuario del Sitio, usted acepta no:</Text>
          <ul>
            <Text as="li">
              Recuperar sistemáticamente datos u otro contenido del Sitio para
              crear o compilar, directa o indirectamente, una colección,
              compilación, base de datos o directorio sin nuestro permiso por
              escrito.
            </Text>
            <Text as="li">
              Engañarnos, defraudarnos o engañarnos a nosotros y a otros
              usuarios, especialmente en cualquier intento de obtener
              información confidencial de la cuenta, como las contraseñas de los
              usuarios.
            </Text>
            <Text as="li">
              Eludir, deshabilitar o interferir de otro modo con las funciones
              relacionadas con la seguridad del Sitio, incluidas las funciones
              que impiden o restringen el uso o la copia de cualquier Contenido
              o imponen limitaciones en el uso del Sitio y/o el Contenido que
              contiene.
            </Text>
            <Text as="li">
              Menospreciar, empañar o dañar de otro modo, en nuestra opinión, a
              nosotros y/o al Sitio.
            </Text>
            <Text as="li">
              Usar cualquier información obtenida del Sitio para acosar, abusar
              o dañar a otra persona.
            </Text>
            <Text as="li">
              Hacer un uso indebido de nuestros servicios de soporte o enviar
              informes falsos de abuso o mala conducta.
            </Text>
            <Text as="li">
              Usar el Sitio de manera incompatible con las leyes o reglamentos
              aplicables.
            </Text>
            <Text as="li">
              Participar en marcos o enlaces no autorizados al Sitio.
            </Text>
            <Text as="li">
              Cargar o transmitir (o intentar cargar o transmitir) virus,
              caballos de Troya u otro material, incluido el uso excesivo de
              letras mayúsculas y spam (publicación continua de texto
              repetitivo), que interfiere con el uso y disfrute ininterrumpido
              de cualquiera de las partes. el Sitio o modifica, deteriora,
              interrumpe, altera o interfiere con el uso, características,
              funciones, operación o mantenimiento del Sitio.
            </Text>
            <Text as="li">
              Participar en cualquier uso automatizado del sistema, como el uso
              de secuencias de comandos para enviar comentarios o mensajes, o el
              uso de cualquier extracción de datos, robots o herramientas
              similares de recopilación y extracción de datos.
            </Text>
            <Text as="li">
              Eliminar el aviso de derechos de autor u otros derechos de
              propiedad de cualquier Contenido.
            </Text>
            <Text as="li">
              Intentar hacerse pasar por otro usuario o persona o usar el nombre
              de usuario de otro usuario.
            </Text>
            <Text as="li">
              Cargar o transmitir (o intentar cargar o transmitir) cualquier
              material que actúe como un mecanismo de transmisión o recopilación
              de información pasiva o activa, incluidos, entre otros, formatos
              de intercambio de gráficos claros (&quot;gifs&quot;), 1 × 1 píxeles, web
              bugs , cookies u otros dispositivos similares (a veces denominados
              &quot;spyware&quot; o &quot;mecanismos de recopilación pasiva&quot; o &quot;pcms&quot;).
            </Text>
            <Text as="li">
              Interferir, interrumpir o crear una carga indebida en el Sitio o
              las redes o servicios conectados al Sitio.
            </Text>
            <Text as="li">
              Acosar, molestar, intimidar o amenazar a cualquiera de nuestros
              empleados o agentes que se dedican a proporcionarle cualquier
              parte del Sitio.
            </Text>
            <Text as="li">
              Intentar eludir cualquier medida del Sitio diseñada para prevenir
              o restringir el acceso al Sitio, o cualquier parte del Sitio.
            </Text>
            <Text as="li">
              Copiar o adaptar el software del Sitio, incluidos, entre otros,
              Flash, PHP, HTML, JavaScript u otro código.
            </Text>
            <Text as="li">
              Salvo que lo permita la ley aplicable, descifrar, descompilar,
              desensamblar o realizar ingeniería inversa del software que
              comprende o de alguna manera forma parte del Sitio.
            </Text>
            <Text as="li">
              Salvo que pueda ser el resultado del uso de un motor de búsqueda
              estándar o un navegador de Internet, usar, iniciar, desarrollar o
              distribuir cualquier sistema automatizado, incluidos, entre otros,
              cualquier araña, robot, utilidad de trampa, raspador o lector
              fuera de línea que acceda al Sitio, o usar o ejecutar cualquier
              script u otro software no autorizado.
            </Text>
            <Text as="li">
              Utilizar un agente de compras para realizar compras en el Sitio.
            </Text>
            <Text as="li">
              Hacer cualquier uso no autorizado del Sitio, incluida la
              recopilación de nombres de usuario y/o direcciones de correo
              electrónico de los usuarios por medios electrónicos o de otro tipo
              con el fin de enviar correos electrónicos no solicitados o crear
              cuentas de usuario por medios automatizados o bajo pretextos
              falsos.
            </Text>
            <Text as="li">
              Usar el Sitio como parte de cualquier esfuerzo para competir con
              nosotros o usar el Sitio y/o el Contenido para cualquier esfuerzo
              de generación de ingresos o empresa comercial.
            </Text>
          </ul>
        </>
      }
    />
    <Clause
      title={"6. CONTRIBUCIONES GENERADAS POR USUARIOS"}
      content={
        <>
          <Text>
            El Sitio puede invitarlo a chatear, contribuir o participar en
            blogs, tableros de mensajes, foros en línea y otras funciones, y
            puede brindarle la oportunidad de crear, enviar, publicar, mostrar,
            transmitir, realizar, publicar, distribuir, o transmitir contenido y
            materiales a nosotros o en el Sitio, incluidos, entre otros, texto,
            escritos, video, audio, fotografías, gráficos, comentarios,
            sugerencias o información personal u otro material (colectivamente,
            &quot;Contribuciones&quot;). Las contribuciones pueden ser visibles para otros
            usuarios del Sitio y a través de sitios web de terceros. Como tal,
            cualquier Contribución que transmita puede ser tratada como no
            confidencial y no propietaria. Cuando crea o pone a disposición
            cualquier Contribución, declara y garantiza que:
          </Text>
          <ul>
            <Text as="li">
              La creación, distribución, transmisión, exhibición pública o
              ejecución, y el acceso, la descarga o la copia de sus
              Contribuciones no infringen ni infringirán los derechos de
              propiedad, incluidos, entre otros, los derechos de autor,
              patentes, marcas registradas, secretos comerciales o derechos
              morales de cualquier tercero.
            </Text>
            <Text as="li">
              Usted es el creador y propietario de o tiene las licencias, los
              derechos, los consentimientos, las liberaciones y los permisos
              necesarios para usar y autorizarnos a nosotros, al Sitio y a otros
              usuarios del Sitio a usar sus Contribuciones de cualquier manera
              contemplada por el Sitio y estos Términos de Uso.
            </Text>
            <Text as="li">
              Tiene el consentimiento, liberación y/o permiso por escrito de
              todas y cada una de las personas individuales identificables en
              sus Contribuciones para usar el nombre o la imagen de todas y cada
              una de esas personas individuales identificables para permitir la
              inclusión y el uso de sus Contribuciones de cualquier manera
              contemplada por el Sitio y estos Términos de uso.
            </Text>
            <Text as="li">
              Sus Contribuciones no son falsas, inexactas o engañosas.
            </Text>
            <Text as="li">
              Sus Contribuciones no son publicidad no solicitada o no
              autorizada, materiales promocionales, esquemas piramidales, cartas
              en cadena, spam, correos masivos u otras formas de solicitación.
            </Text>
            <Text as="li">
              Sus Contribuciones no son obscenas, lascivas, lascivas, sucias,
              violentas, acosadoras, difamatorias, calumniosas ni objetables
              (según lo determinemos nosotros).
            </Text>
            <Text as="li">
              Sus Contribuciones no ridiculizan, burlan, menosprecian, intimidan
              ni abusan de nadie.
            </Text>
            <Text as="li">
              Sus Contribuciones no se utilizan para acosar o amenazar (en el
              sentido legal de esos términos) a ninguna otra persona ni para
              promover la violencia contra una persona o clase de personas
              específicas.
            </Text>
            <Text as="li">
              Sus Contribuciones no violan ninguna ley, regulación o regla
              aplicable.
            </Text>
            <Text as="li">
              Sus Contribuciones no violan los derechos de privacidad o
              publicidad de ningún tercero.
            </Text>
            <Text as="li">
              Sus Contribuciones no violan ninguna ley aplicable con respecto a
              la pornografía infantil, ni tienen la intención de proteger la
              salud o el bienestar de los menores.
            </Text>
            <Text as="li">
              Sus Contribuciones no incluyen ningún comentario ofensivo
              relacionado con la raza, el origen nacional, el género, la
              preferencia sexual o la discapacidad física.
            </Text>
            <Text as="li">
              Sus Contribuciones no violan de otra manera, ni se vinculan a
              material que viola, ninguna disposición de estos Términos de uso,
              o cualquier ley o regulación aplicable.
            </Text>
          </ul>
          <Text>
            Cualquier uso del Sitio que infrinja lo anterior viola estos
            Términos de uso y puede resultar, entre otras cosas, en la rescisión
            o suspensión de sus derechos de uso del Sitio.
          </Text>
        </>
      }
    />
    <Clause
      title={"7. LICENCIA DE CONTRIBUCIÓN"}
      content={
        <>
          <Text>
            Al publicar sus Contribuciones en cualquier parte del Sitio,
            automáticamente otorga, declara y garantiza que tiene derecho a
            otorgarnos un derecho sin restricciones, ilimitado, irrevocable,
            perpetuo, no exclusivo, transferible, libre de regalías, totalmente
            derecho mundial pagado y licencia para hospedar, usar, copiar,
            reproducir, divulgar, vender, revender, publicar, transmitir,
            cambiar el título, archivar, almacenar, almacenar en caché, ejecutar
            públicamente, exhibir públicamente, reformatear, traducir,
            transmitir, extraer (en en su totalidad o en parte), y distribuir
            dichas Contribuciones (incluidas, entre otras, su imagen y voz) para
            cualquier propósito, comercial, publicitario o de otro tipo, y para
            preparar trabajos derivados de, o incorporar en otros trabajos,
            dichas Contribuciones, y otorgar y autorizar sublicencias de las
            anteriores. El uso y la distribución pueden ocurrir en cualquier
            formato de medios y a través de cualquier canal de medios.
          </Text>
          <Text>
            Esta licencia se aplicará a cualquier forma, medio o tecnología
            ahora conocida o desarrollada en el futuro, e incluye nuestro uso de
            su nombre, el nombre de la empresa y el nombre de la franquicia,
            según corresponda, y cualquiera de las marcas registradas, marcas de
            servicio, nombres comerciales, logotipos, e imágenes personales y
            comerciales que proporcione. Usted renuncia a todos los derechos
            morales sobre sus Contribuciones y garantiza que no se han afirmado
            de otro modo los derechos morales sobre sus Contribuciones.
          </Text>
          <Text>
            No afirmamos ninguna propiedad sobre sus Contribuciones. Usted
            conserva la propiedad total de todas sus Contribuciones y cualquier
            derecho de propiedad intelectual u otros derechos de propiedad
            asociados con sus Contribuciones. No somos responsables de ninguna
            declaración o representación en sus Contribuciones proporcionadas
            por usted en cualquier área del Sitio. Usted es el único responsable
            de sus Contribuciones al Sitio y acepta expresamente eximirnos de
            toda responsabilidad y abstenerse de cualquier acción legal contra
            nosotros con respecto a sus Contribuciones.
          </Text>
          <Text>
            Tenemos el derecho, a nuestro exclusivo y absoluto criterio, (1) de
            editar, redactar o cambiar cualquier Contribución; (2) para
            recategorizar las Contribuciones para ubicarlas en ubicaciones más
            apropiadas en el Sitio; y (3) preseleccionar o eliminar cualquier
            Contribución en cualquier momento y por cualquier motivo, sin previo
            aviso. No tenemos obligación de monitorear sus Contribuciones.
          </Text>
        </>
      }
    />

    <Clause
      title={"8. PRESENTACIONES"}
      content={
        <>
          <Text>
            Usted reconoce y acepta que cualquier pregunta, comentario,
            sugerencia, idea, retroalimentación u otra información relacionada
            con el Sitio (&quot;Envíos&quot;) que nos proporcione no son confidenciales y
            se convertirán en nuestra propiedad exclusiva. Seremos propietarios
            de los derechos exclusivos, incluidos todos los derechos de
            propiedad intelectual, y tendremos derecho al uso y la difusión sin
            restricciones de estos Envíos para cualquier fin lícito, comercial o
            de otro tipo, sin reconocimiento ni compensación para usted. Por la
            presente, renuncia a todos los derechos morales sobre dichos Envíos,
            y por la presente garantiza que dichos Envíos son originales suyos o
            que tiene derecho a enviar dichos Envíos. Usted acepta que no habrá
            recurso contra nosotros por cualquier infracción o apropiación
            indebida supuesta o real de cualquier derecho de propiedad en sus
            Envíos.
          </Text>
        </>
      }
    />
    <Clause
      title={"9. SITIO WEB Y CONTENIDO DE TERCEROS"}
      content={
        <>
          <Text>
            El Sitio puede contener (o se le puede enviar a través del Sitio)
            enlaces a otros sitios web (&quot;Sitios web de terceros&quot;), así como
            artículos, fotografías, texto, gráficos, imágenes, diseños, música,
            sonido, video, información, aplicaciones , software y otro contenido
            o elementos que pertenezcan a terceros o se originen en ellos
            (&quot;Contenido de terceros&quot;). Dichos sitios web de terceros y contenido
            de terceros no son investigados, monitoreados o verificados por
            nuestra precisión, idoneidad o integridad, y no somos responsables
            de ningún sitio web de terceros al que se acceda a través del sitio
            o cualquier contenido de terceros publicado. en, disponible a través
            de, o instalado desde el Sitio, incluido el contenido, la precisión,
            lo ofensivo, las opiniones, la confiabilidad, las prácticas de
            privacidad u otras políticas de o contenidas en los Sitios web de
            terceros o el Contenido de terceros. La inclusión, el enlace o el
            permiso para el uso o la instalación de sitios web de terceros o
            cualquier contenido de terceros no implica su aprobación o respaldo
            por nuestra parte. Si decide abandonar el Sitio y acceder a los
            Sitios web de terceros o usar o instalar cualquier Contenido de
            terceros, lo hace bajo su propio riesgo y debe tener en cuenta que
            estos Términos de uso ya no rigen. Debe revisar los términos y
            políticas aplicables, incluidas las prácticas de privacidad y
            recopilación de datos, de cualquier sitio web al que navegue desde
            el Sitio o en relación con cualquier aplicación que use o instale
            desde el Sitio. Todas las compras que realice a través de sitios web
            de terceros se realizarán a través de otros sitios web y de otras
            empresas, y no asumimos ninguna responsabilidad en relación con
            dichas compras, que son exclusivamente entre usted y el tercero
            correspondiente. Usted acepta y reconoce que no respaldamos los
            productos o servicios ofrecidos en los sitios web de terceros y nos
            eximirá de cualquier daño causado por la compra de dichos productos
            o servicios. Además, nos eximirá de cualquier pérdida sufrida por
            usted o daño causado a usted en relación con o que resulte de alguna
            manera de cualquier Contenido de terceros o cualquier contacto con
            sitios web de terceros.
          </Text>
        </>
      }
    />
    <Clause
      title={"10. GESTIÓN DEL SITIO"}
      content={
        <>
          <Text>
            Nos reservamos el derecho, pero no la obligación, de: (1) monitorear
            el Sitio en busca de violaciones de estos Términos de uso; (2)
            emprender las acciones legales correspondientes contra cualquier
            persona que, a nuestro exclusivo criterio, infrinja la ley o estos
            Términos de uso, lo que incluye, entre otros, denunciar a dicho
            usuario ante las autoridades encargadas de hacer cumplir la ley; (3)
            a nuestro exclusivo criterio y sin limitación, rechazar, restringir
            el acceso, limitar la disponibilidad o deshabilitar (en la medida en
            que sea tecnológicamente posible) cualquiera de sus Contribuciones o
            cualquier parte de las mismas; (4) a nuestro exclusivo criterio y
            sin limitación, aviso o responsabilidad, para eliminar del Sitio o
            deshabilitar todos los archivos y contenido que sean de tamaño
            excesivo o que de alguna manera sean una carga para nuestros
            sistemas; y (5) administrar el Sitio de una manera diseñada para
            proteger nuestros derechos y propiedad y para facilitar el
            funcionamiento adecuado del Sitio.
          </Text>
        </>
      }
    />
    <Clause
      title={"11. POLÍTICA DE PRIVACIDAD"}
      content={
        <>
          <Text>
            Nos preocupamos por la privacidad y la seguridad de los datos. Al
            usar el Sitio, usted acepta estar sujeto a nuestra Política de
            privacidad publicada en el Sitio, que se incorpora a estos Términos
            de uso. Tenga en cuenta que el Sitio está alojado en los Estados
            Unidos. Si accede al Sitio desde cualquier otra región del mundo con
            leyes u otros requisitos que rigen la recopilación, el uso o la
            divulgación de datos personales que difieren de las leyes aplicables
            en los Estados Unidos, a través de su uso continuado del Sitio, está
            transfiriendo sus datos a los Estados Unidos, y usted acepta que sus
            datos sean transferidos y procesados en los Estados Unidos.
          </Text>
        </>
      }
    />
    <Clause
      title={"12. PLAZO Y TERMINACIÓN"}
      content={
        <>
          <Text>
            Estos Términos de uso permanecerán en pleno vigor y efecto mientras
            utilice el Sitio. SIN LIMITAR NINGUNA OTRA DISPOSICIÓN DE ESTOS
            TÉRMINOS DE USO, NOS RESERVAMOS EL DERECHO DE, A NUESTRA ÚNICA
            DISCRECIÓN Y SIN AVISO NI RESPONSABILIDAD, NEGAR EL ACCESO Y EL USO
            DEL SITIO (INCLUYENDO EL BLOQUEO DE CIERTAS DIRECCIONES IP), A
            CUALQUIER PERSONA POR CUALQUIER MOTIVO O POR NINGÚN MOTIVO,
            INCLUYENDO SIN LIMITACIÓN EL INCUMPLIMIENTO DE CUALQUIER
            DECLARACIÓN, GARANTÍA O CONVENIO CONTENIDO EN ESTOS TÉRMINOS DE USO
            O DE CUALQUIER LEY O REGULACIÓN APLICABLE. PODEMOS TERMINAR SU USO O
            PARTICIPACIÓN EN EL SITIO O ELIMINAR SU CUENTA Y CUALQUIER CONTENIDO
            O INFORMACIÓN QUE PUBLIQUE EN CUALQUIER MOMENTO, SIN AVISO, A
            NUESTRA ÚNICA DISCRECIÓN.
          </Text>
          <Text>
            Si cancelamos o suspendemos su cuenta por cualquier motivo, tiene
            prohibido registrarse y crear una nueva cuenta con su nombre, un
            nombre falso o prestado, o el nombre de un tercero, incluso si puede
            estar actuando en nombre del tercero. fiesta. Además de rescindir o
            suspender su cuenta, nos reservamos el derecho de emprender las
            acciones legales correspondientes, incluidas, entre otras, las
            acciones de reparación civil, penal y cautelar.
          </Text>
        </>
      }
    />
    <Clause
      title={"13. MODIFICACIONES E INTERRUPCIONES"}
      content={
        <>
          <Text>
            Nos reservamos el derecho de cambiar, modificar o eliminar el
            contenido del Sitio en cualquier momento o por cualquier motivo a
            nuestro exclusivo criterio y sin previo aviso. Sin embargo, no
            tenemos la obligación de actualizar ninguna información en nuestro
            Sitio. También nos reservamos el derecho de modificar o descontinuar
            todo o parte del Sitio sin previo aviso en cualquier momento. No
            seremos responsables ante usted o cualquier tercero por cualquier
            modificación, cambio de precio, suspensión o interrupción del Sitio.
          </Text>
          <Text>
            No podemos garantizar que el Sitio estará disponible en todo
            momento. Es posible que experimentemos problemas de hardware,
            software u otros, o que necesitemos realizar tareas de mantenimiento
            relacionadas con el Sitio, lo que provocará interrupciones, demoras
            o errores. Nos reservamos el derecho de cambiar, revisar,
            actualizar, suspender, descontinuar o modificar el Sitio en
            cualquier momento o por cualquier motivo sin previo aviso. Usted
            acepta que no tenemos responsabilidad alguna por cualquier pérdida,
            daño o inconveniente causado por su incapacidad para acceder o
            utilizar el Sitio durante cualquier tiempo de inactividad o
            interrupción del Sitio. Nada en estos Términos de uso se
            interpretará como una obligación para mantener y respaldar el Sitio
            o para proporcionar correcciones, actualizaciones o lanzamientos en
            relación con el mismo.
          </Text>
        </>
      }
    />
    <Clause
      title={"14. LEY APLICABLE"}
      content={
        <>
          <Text>
            Estos Términos se regirán y definirán de conformidad con las leyes
            de Perú. OSTEOCENTER y usted aceptan irrevocablemente que los
            tribunales de Perú tendrán jurisdicción exclusiva para resolver
            cualquier disputa que pueda surgir en relación con estos términos.
          </Text>
        </>
      }
    />
    <Clause
      title={"15. RESOLUCIÓN DE DISPUTAS"}
      content={
        <>
          <Heading secondary as="h2">
            Negociaciones informales
          </Heading>
          <Text>
            Para acelerar la resolución y controlar el costo de cualquier
            disputa, controversia o reclamo relacionado con estos Términos de
            uso (cada &quot;Disputa&quot; y colectivamente, las &quot;Disputas&quot;) presentada por
            usted o por nosotros (individualmente, una &quot;Parte&quot; y colectivamente,
            las &quot;Partes&quot;), las Partes acuerdan intentar primero negociar
            cualquier Disputa (excepto las Disputas que se indican expresamente
            a continuación) de manera informal durante al menos treinta (30)
            días antes de iniciar el arbitraje. Tales negociaciones informales
            comienzan con la notificación por escrito de una Parte a la otra
            Parte.
          </Text>
          <Heading secondary as="h2">
            Arbitraje obligatorio
          </Heading>
          <Text>
            Cualquier disputa que surja de o en relación con este contrato,
            incluida cualquier cuestión relativa a su existencia, validez o
            rescisión, será remitida y resuelta definitivamente por el Tribunal
            de Arbitraje Comercial Internacional dependiente de la Cámara de
            Arbitraje Europea (Bélgica, Bruselas, Avenue Louise, 146) de acuerdo
            con las Reglas de este ICAC, que, como resultado de referirse a él,
            se considera como parte de esta cláusula. El número de árbitros será
            de tres (3). La sede o lugar legal del arbitraje será Lima, Perú. El
            idioma de procedimiento será el español. La ley rectora del contrato
            será la ley sustantiva del Perú.
          </Text>
          <Heading secondary as="h2">
            Restricciones
          </Heading>
          <Text>
            Las Partes acuerdan que cualquier arbitraje se limitará a la Disputa
            entre las Partes individualmente. En la máxima medida permitida por
            la ley, (a) ningún arbitraje se unirá a ningún otro procedimiento;
            (b) no existe ningún derecho o autoridad para que una Disputa sea
            arbitrada sobre la base de una demanda colectiva o para utilizar
            procedimientos de demanda colectiva; y (c) no existe ningún derecho
            o autoridad para presentar una Disputa en una supuesta capacidad
            representativa en nombre del público en general o de cualquier otra
            persona.
          </Text>
          <Heading secondary as="h2">
            Excepciones a negociaciones informales y arbitraje
          </Heading>
          <Text>
            Las Partes acuerdan que las siguientes Disputas no están sujetas a
            las disposiciones anteriores sobre negociaciones informales y
            arbitraje vinculante: (a) cualquier Disputa que busque hacer cumplir
            o proteger, o que se refiera a la validez de cualquiera de los
            derechos de propiedad intelectual de una Parte; (b) cualquier
            Disputa relacionada o que surja de alegaciones de robo, piratería,
            invasión de la privacidad o uso no autorizado; y (c) cualquier
            reclamo de medida cautelar. Si se determina que esta disposición es
            ilegal o inaplicable, ninguna de las Partes elegirá arbitrar ninguna
            Disputa que se encuentre dentro de la parte de esta disposición que
            se determine que es ilegal o inaplicable y dicha Disputa será
            resuelta por un tribunal de jurisdicción competente dentro de los
            tribunales enumerados para jurisdicción anterior, y las Partes
            acuerdan someterse a la jurisdicción personal de ese tribunal.
          </Text>
        </>
      }
    />
    <Clause
      title={"16. CORRECCIONES"}
      content={
        <>
          <Text>
            Puede haber información en el Sitio que contenga errores
            tipográficos, inexactitudes u omisiones, incluidas descripciones,
            precios, disponibilidad y otra información diversa. Nos reservamos
            el derecho de corregir cualquier error, inexactitud u omisión y de
            cambiar o actualizar la información en el Sitio en cualquier
            momento, sin previo aviso.
          </Text>
        </>
      }
    />
    <Clause
      title={"17. EXENCIÓN DE RESPONSABILIDAD"}
      content={
        <>
          <Text>
            EL SITIO SE PROPORCIONA TAL CUAL Y SEGÚN DISPONIBILIDAD. USTED
            ACEPTA QUE SU USO DEL SITIO Y NUESTROS SERVICIOS SERÁ BAJO SU PROPIO
            RIESGO. EN LA MEDIDA MÁXIMA PERMITIDA POR LA LEY, RENUNCIAMOS TODAS
            LAS GARANTÍAS, EXPRESAS O IMPLÍCITAS, EN RELACIÓN CON EL SITIO Y SU
            USO DEL MISMO, INCLUYENDO, SIN LIMITACIÓN, LAS GARANTÍAS IMPLÍCITAS
            DE COMERCIABILIDAD, IDONEIDAD PARA UN FIN DETERMINADO Y NO
            VIOLACIÓN. NO OFRECEMOS GARANTÍAS NI DECLARACIONES SOBRE LA
            EXACTITUD O LA INTEGRIDAD DEL CONTENIDO DEL SITIO O EL CONTENIDO DE
            CUALQUIER SITIO WEB VINCULADO AL SITIO Y NO ASUMIMOS NINGUNA
            RESPONSABILIDAD POR CUALQUIER (1) ERROR, ERROR O INEXACTITUD DEL
            CONTENIDO Y MATERIALES, (2) LESIONES PERSONALES O DAÑOS A LA
            PROPIEDAD, DE CUALQUIER NATURALEZA, RESULTANTES DE SU ACCESO Y USO
            DEL SITIO, (3) CUALQUIER ACCESO NO AUTORIZADO O USO DE NUESTROS
            SERVIDORES SEGUROS Y/O TODA LA INFORMACIÓN PERSONAL Y/ O LA
            INFORMACIÓN FINANCIERA ALMACENADA EN EL MISMO, (4) CUALQUIER
            INTERRUPCIÓN O CESE DE LA TRANSMISIÓN HACIA O DESDE EL SITIO, (5)
            CUALQUIER ERROR, VIRUS, TROYANO O SIMILARES QUE PUEDAN TRANSMITIRSE
            AL SITIO O A TRAVÉS DEL SITIO POR CUALQUIER TERCERO, Y /O (6)
            CUALQUIER ERROR U OMISIÓN EN CUALQUIER CONTENIDO Y MATERIALES O POR
            CUALQUIER PÉRDIDA O DAÑO DE CUALQUIER TIPO INCURRIDO COMO RESULTADO
            DEL USO DE CUALQUIER CONTENIDO PUBLICADO, TRANSMITIDO O DISPONIBLE
            DE OTRO MODO A TRAVÉS DEL SITIO. NO GARANTIZAMOS, RESPALDAMOS NI
            ASUMIMOS RESPONSABILIDAD POR CUALQUIER PRODUCTO O SERVICIO ANUNCIADO
            U OFRECIDO POR UN TERCERO A TRAVÉS DEL SITIO, CUALQUIER SITIO WEB
            CON HIPERVINCULOS, O CUALQUIER SITIO WEB O APLICACIÓN MÓVIL QUE SE
            PRESENTE EN CUALQUIER BANNER U OTRA PUBLICIDAD, Y NO SER PARTE O DE
            CUALQUIER MANERA SER RESPONSABLE DEL MONITOREO DE CUALQUIER
            TRANSACCIÓN ENTRE USTED Y CUALQUIER TERCERO PROVEEDOR DE PRODUCTOS O
            SERVICIOS. COMO CON LA COMPRA DE UN PRODUCTO O SERVICIO A TRAVÉS DE
            CUALQUIER MEDIO O EN CUALQUIER ENTORNO, USTED DEBE UTILIZAR SU MEJOR
            JUICIO Y EJERCER PRECAUCIÓN DONDE SEA APROPIADO.
          </Text>
        </>
      }
    />
    <Clause
      title={"18. LIMITACIONES DE RESPONSABILIDAD"}
      content={
        <>
          <Text>
            EN NINGÚN CASO NOSOTROS O NUESTROS DIRECTORES, EMPLEADOS O AGENTES
            SEREMOS RESPONSABLES ANTE USTED O CUALQUIER TERCERO POR CUALQUIER
            DAÑO DIRECTO, INDIRECTO, CONSECUENTE, EJEMPLAR, INCIDENTAL, ESPECIAL
            O PUNITIVO, INCLUYENDO LUCRO CESANTE, PÉRDIDA DE INGRESOS, PÉRDIDA
            DE DATOS, U OTROS DAÑOS QUE SURJAN DEL USO DEL SITIO, INCLUSO SI NOS
            HAYAN ADVERTIDO DE LA POSIBILIDAD DE DICHOS DAÑOS.
          </Text>
        </>
      }
    />
    <Clause
      title={"19. INDEMNIZACIÓN"}
      content={
        <>
          <Text>
            Usted acepta defendernos, indemnizarnos y eximirnos de
            responsabilidad, incluidas nuestras subsidiarias, afiliadas y todos
            nuestros respectivos funcionarios, agentes, socios y empleados, de y
            contra cualquier pérdida, daño, responsabilidad, reclamo o demanda,
            incluidos los razonables honorarios y gastos de los abogados, hechos por
            cualquier tercero debido a o que surjan de: (1) sus Contribuciones;
            (2) uso del Sitio; (3) incumplimiento de estos Términos de uso; (4)
            cualquier incumplimiento de sus representaciones y garantías
            establecidas en estos Términos de uso; (5) su violación de los
            derechos de un tercero, incluidos, entre otros, los derechos de
            propiedad intelectual; o (6) cualquier acto dañino manifiesto hacia
            cualquier otro usuario del Sitio con el que se haya conectado a
            través del Sitio. Sin perjuicio de lo anterior, nos reservamos el
            derecho, a su cargo, de asumir la defensa y el control exclusivos de
            cualquier asunto por el cual deba indemnizarnos, y usted acepta
            cooperar, a su cargo, con nuestra defensa de dichas reclamaciones.
            Haremos todos los esfuerzos razonables para notificarle cualquier
            reclamo, acción o procedimiento que esté sujeto a esta indemnización
            al tomar conocimiento de ello.
          </Text>
        </>
      }
    />
    <Clause
      title={"20. DATOS DEL USUARIO"}
      content={
        <>
          <Text>
            Mantendremos ciertos datos que usted transmita al Sitio con el fin
            de administrar el rendimiento del Sitio, así como los datos
            relacionados con su uso del Sitio. Aunque realizamos copias de
            seguridad periódicas de rutina de los datos, usted es el único
            responsable de todos los datos que transmite o que se relacionan con
            cualquier actividad que haya realizado utilizando el Sitio. Usted
            acepta que no seremos responsables ante usted por cualquier pérdida
            o corrupción de dichos datos, y por la presente renuncia a cualquier
            derecho de acción contra nosotros que surja de dicha pérdida o
            corrupción de dichos datos.
          </Text>
        </>
      }
    />
    <Clause
      title={"21. COMUNICACIONES, TRANSACCIONES Y FIRMAS ELECTRÓNICAS"}
      content={
        <>
          <Text>
            Visitar el Sitio, enviarnos correos electrónicos y completar
            formularios en línea constituyen comunicaciones electrónicas. Usted
            acepta recibir comunicaciones electrónicas y acepta que todos los
            acuerdos, avisos, divulgaciones y otras comunicaciones que le
            proporcionamos electrónicamente, por correo electrónico y en el
            Sitio, satisfacen cualquier requisito legal de que dicha
            comunicación sea por escrito. USTED ACEPTA EL USO DE FIRMAS,
            CONTRATOS, PEDIDOS Y OTROS REGISTROS ELECTRÓNICOS, YA LA ENTREGA
            ELECTRÓNICA DE AVISOS, POLÍTICAS Y REGISTROS DE TRANSACCIONES
            INICIADAS O COMPLETADAS POR NOSOTROS O A TRAVÉS DEL SITIO. Por la
            presente renuncia a cualquier derecho o requisito bajo cualquier
            estatuto, reglamento, regla, ordenanza u otra ley en cualquier
            jurisdicción que requiera una firma original o la entrega o
            retención de registros no electrónicos, o pagos o la concesión de
            créditos por cualquier medio que no sea que los medios electrónicos.
          </Text>
        </>
      }
    />
    <Clause
      title={"22. VARIOS"}
      content={
        <>
          <Text>
            Estos Términos de uso y cualquier política o regla operativa
            publicada por nosotros en el Sitio o con respecto al Sitio
            constituyen el acuerdo completo y el entendimiento entre usted y
            nosotros. Nuestra incapacidad para ejercer o hacer cumplir cualquier
            derecho o disposición de estos Términos de uso no operará como una
            renuncia a tal derecho o disposición. Estos Términos de uso operan
            en la mayor medida permitida por la ley. Podemos ceder cualquiera o
            todos nuestros derechos y obligaciones a otros en cualquier momento.
            No seremos responsables de ninguna pérdida, daño, demora o falta de
            acción causada por cualquier causa fuera de nuestro control
            razonable. Si se determina que alguna disposición o parte de una
            disposición de estos Términos de uso es ilegal, nula o inaplicable,
            esa disposición o parte de la disposición se considera separable de
            estos Términos de uso y no afecta la validez y aplicabilidad de
            cualquier disposición restante. provisiones. No existe una relación
            de empresa conjunta, sociedad, empleo o agencia creada entre usted y
            nosotros como resultado de estos Términos de uso o el uso del Sitio.
            Usted acepta que estos Términos de uso no se interpretarán en
            nuestra contra en virtud de haberlos redactado. Por la presente,
            renuncia a todas y cada una de las defensas que pueda tener en base
            a la forma electrónica de estos Términos de uso y la falta de firma
            por parte de las partes para ejecutar estos Términos de uso.
          </Text>
        </>
      }
    />
    <Clause
      title={"23. CONTÁCTENOS"}
      content={
        <>
          <Text>
            Para resolver una queja sobre el Sitio o para recibir más
            información sobre el uso del Sitio, contáctenos en:
          </Text>
          <Text>
            <Bold>
              OSTEOCENTER <br />
              Clínica Santa María, Elías Aguirre #761- interior 1er piso, 2do
              Pabellón <br />
              Chimbote, Santa 02711 <br />
              Perú <br />
              Teléfono: +51 992 569 407 <br />
              osteocenter.admi@gmail.com
            </Bold>
          </Text>
        </>
      }
    />
  </BaseContainer>
);

export default TOS;
