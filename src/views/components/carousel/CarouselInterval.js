// ** Reactstrap Imports
import { UncontrolledCarousel } from 'reactstrap'

// ** Images
import sliderImage1 from '../../../assets/images/slider/06.jpg'
import sliderImage2 from '../../../assets/images/slider/04.jpg'
import sliderImage3 from '../../../assets/images/slider/05.jpg'

const images = [
  {
    src: sliderImage1,
    key: 1,
    caption: '',
    altText: 'Slide 1'
  },
  {
    src: sliderImage2,
    key: 2,
    caption: '',
    altText: 'Slide 2'
  },
  {
    src: sliderImage3,
    key: 3,
    caption: '',
    altText: 'Slide 3'
  }
]

const CarouselInterval = () => {
  return <UncontrolledCarousel items={images} interval='500' keyboard={false} />
}
export default CarouselInterval
