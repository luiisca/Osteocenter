import {Button as BaseBttn} from '../Elements';
import {FaRoute} from 'react-icons/fa';

import {MAP_DIRECTIONS} from '../../static/ts/constants';
import {getUserLocation} from './helpers';
import {useLocationContext} from '../../context/LocationProvider';

const Button = ({mobile}: {mobile: boolean}):JSX.Element => {
  const {location, dispatchLocation} = useLocationContext()

  const getLocation = async (): Promise<void> => {
    const pos = await getUserLocation();
    dispatchLocation({type: 'USER_LOCATION', user: pos});
  }

  const toggleRoute = (): void => {
    dispatchLocation({type: 'ROUTE_VISIBILITY'});
  }

  if (mobile && location.user) {
    return (
      <BaseBttn
        elType='text'
        cta
        target='_blank'
        href={MAP_DIRECTIONS(location.user)}
        >
        Instrucciones
      </BaseBttn>
    )
  }
  return (
    <BaseBttn
      elType='icon'
      onClick={location.user ? toggleRoute : getLocation}
      tw='mt-3 mx-auto'
      >
      <FaRoute />
    </BaseBttn>
  )
}

export default Button
