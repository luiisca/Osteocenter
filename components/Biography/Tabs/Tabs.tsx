import {useState} from 'react';
import tw, {css, styled} from 'twin.macro';

import Education from './Education';
import Experience from './Experience';

const Container = tw.div`flex gap-24`


const TabButton = styled.button(({active}: {active: boolean}) => [
  tw`block px-5 py-8 text-base`,
  css`
    ${tw`text-[#6c6c6c]`}
    border-left: #b4b2b2 solid 1.8px;
    cursor: pointer;
  `,
  active && css`
    ${tw`text-[#010d17]`}
    border-left: #172632 solid 1.9px;
  `
])

const Tabs = (): JSX.Element => {
  const [activeBttn, setActiveBttn] = useState<number>(1)
  const handleToggle = (bttn: number): void => setActiveBttn(bttn)

  return (
    <Container>
      <div>
        <TabButton onClick={() => handleToggle(1)} active={activeBttn === 1}>Estudios</TabButton>
        <TabButton onClick={() => handleToggle(2)} active={activeBttn === 2}>Experiencia</TabButton>
      </div>

      {activeBttn === 1 && <Education />}
      {activeBttn === 2 && <Experience />}
    </Container >
  )
}

export default Tabs
