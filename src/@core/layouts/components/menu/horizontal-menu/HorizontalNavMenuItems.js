// ** Menu Components Imports
import HorizontalNavMenuLink from './HorizontalNavMenuLink'
import HorizontalNavMenuGroup from './HorizontalNavMenuGroup'
import {
  resolveHorizontalNavMenuItemComponent as resolveNavItemComponent
} from '../../../utils'
import {CanViewMenuGroup} from '../../../utils'
import{ CanViewMenuItem} from '../../../utils'

const HorizontalNavMenuItems = props => {
  // ** Components Object
  const Components = {
    HorizontalNavMenuGroup,
    HorizontalNavMenuLink
  }

  // ** Render Nav Items
  const RenderNavItems = props.items.map((item, index) => {
    const TagName = Components[resolveNavItemComponent(item)]
    if (item.children) {
      return CanViewMenuGroup(item) && <TagName item={item} index={index} key={item.id} {...props} />
    }
    return CanViewMenuItem(item) && <TagName item={item} index={index} key={item.id} {...props} />
  })

  return RenderNavItems
}

export default HorizontalNavMenuItems
