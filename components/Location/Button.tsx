import tw, {css, styled} from 'twin.macro';

import {Button as BaseBttn} from '../Elements';
import {FaRoute} from 'react-icons/fa';

import {MAP_DIRECTIONS} from '../../static/js/constants';
import {getUserLocation} from './helpers';
import {useLocationContext} from '../../context/LocationProvider';

const Button = ({mobile}) => {
  const {location, dispatchLocation} = useLocationContext()

  const getLocation = async () => {
    const pos = await getUserLocation();
    console.log('getUserLOcaation', pos);
    dispatchLocation({type: 'USER_LOCATION', user: pos});
    console.log('button />', location.user, location.routeActive)
  }
  const toggleRoute = () => {
    console.log('toggleRoute')
    dispatchLocation({type: 'ROUTE_VISIBILITY'});
    console.log('button />', location.user, location.routeActive)
  }

  if (mobile && location.user) {
    return (
      <BaseBttn
        type='text'
        cta
        target='_blank'
        href={MAP_DIRECTIONS(location.user)}>
        Instrucciones
      </BaseBttn>
    )
  }
  return (
    <BaseBttn
      type='icon'
      onClick={location.user ? toggleRoute : getLocation}
      tw='mt-3 mx-auto'>
      <FaRoute />
    </BaseBttn>
  )
}

export default Button
