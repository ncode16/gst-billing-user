// ** Vertical Menu Components
import VerticalNavMenuLink from "./VerticalNavMenuLink";
import VerticalNavMenuGroup from "./VerticalNavMenuGroup";
import VerticalNavMenuSectionHeader from "./VerticalNavMenuSectionHeader";

// ** Utils
import { resolveVerticalNavMenuItemComponent as resolveNavItemComponent } from "../../../utils";
import { CanViewMenuGroup } from "../../../utils";
import { CanViewMenuItem } from "../../../utils";

const VerticalMenuNavItems = (props) => {
  // ** Components Object
  const Components = {
    VerticalNavMenuLink,
    VerticalNavMenuGroup,
    VerticalNavMenuSectionHeader,
  };

  // ** Render Nav Menu Items
  const RenderNavItems = props.items.map((item, index) => {
    console.log(item, "item");

    const TagName = Components[resolveNavItemComponent(item)];
    if (item.children) {
      return (
        CanViewMenuGroup(item) && (
          <TagName
            activeItem={"purchase"}
            item={item}
            index={index}
            key={item.id}
            {...props}
          />
        )
      );
    }
    return (
      CanViewMenuItem(item) && (
        <TagName key={item.id || item.header} item={item} {...props} />
      )
    );
  });

  return RenderNavItems;
};

export default VerticalMenuNavItems;
