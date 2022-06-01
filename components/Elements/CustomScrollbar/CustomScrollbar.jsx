import tw, {css, styled} from 'twin.macro';
import {Scrollbars} from 'react-custom-scrollbars';

const ThumbContainer = styled.div(() => [
  tw`flex justify-end`,
  tw`w-full h-full hover:cursor-pointer`,
])
const Thumb = styled.div(() => [
  tw`rounded-[9px] bg-primary-shade-1 hover:bg-primary-shade-2`,
])
const Track = styled.div(() => [
  tw`h-full`,
  tw`right-0`,
])

const renderView = ({style, ...props}, hideX) => {
  const viewStyle = {
    overflowX: hideX ? 'hidden' : 'scroll',
  }
  return <div {...props} style={{...style, ...viewStyle}} />
}
const renderTrackVertical = ({style, ...props}) => {
  const trackStyle = {
    width: '20px',
  }
  return <Track {...props} style={{...style, ...trackStyle}} />
}
const renderThumbVertical = ({style, ...props}) => {
  const thumbStyle = {
    width: '45%',
  }
  return (
    <ThumbContainer>
      <Thumb {...props} style={{...style, ...thumbStyle}} />
    </ThumbContainer>
  )
}

const CustomScrollbar = ({hideX, autoHide, children, style}) => {
  if (hideX) {
    return (
      <Scrollbars
        renderTrackHorizontal={() => <div></div>}
        renderTrackVertical={renderTrackVertical}
        renderThumbVertical={renderThumbVertical}
        autoHide={autoHide}
        autoHideDuration={1000}
        style={style}
        renderView={(props) => renderView(props, hideX)}>
        {children}
      </Scrollbars>
    )
  }
  return (
    <Scrollbars
      renderTrackVertical={renderTrackVertical}
      renderThumbVertical={renderThumbVertical}
      autoHide={autoHide}
        style={style}
      autoHideDuration={1000}
      renderView={renderView}>
      {children}
    </Scrollbars>
  )
}

export default CustomScrollbar
