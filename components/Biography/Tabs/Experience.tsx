import Card from './Card';
import {Container} from '../style';

const Experience = (): JSX.Element => {
  return (
    <Container>
      <Card image='hospital' period='2010 - 2013' name='Hospital San Juan de Dios'>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </Card>
      <Card image='hospital' period='2010 - 2013' name='Clínica Zavaleta'>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </Card>
      <Card image='hospital' period='2010 - 2013' name='Clínica Zavaleta'>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </Card>
      <Card image='hospital' period='2010 - 2013' name='Hospital San Juan de Dios'>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </Card>
    </Container>
  )
}

export default Experience
