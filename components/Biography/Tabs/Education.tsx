import tw, {css, styled} from 'twin.macro';
import Card from '../Card';
import {Container} from '../style';

const Education = () => {
  return (
    <Container>
      <Card image='hospital' period='1997 - 2003' name='Licenciatura en Medicina y Cirugía' />
      <Card image='hospital' period='2002 - 2003' name='Foreign Student Exchange Year' />
      <Card image='hospital' period='2005 - 2007' name='Cursos de Doctorado' />
    </Container>
  )
}

export default Education
