// ** Icons Import
import {
  Mail,
  MessageSquare,
  CheckSquare,
  Calendar,
  FileText,
  Circle,
  ShoppingCart,
  User,
  Shield,
} from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBillWave,
  faCartShopping,
  faPencil,
  faTags,
} from "@fortawesome/free-solid-svg-icons";

const Apps = [
  // {
  //   header: 'Apps & Pages'
  // },
  // {
  //   id: 'email',
  //   title: 'Email',
  //   icon: <Mail size={20} />,
  //   navLink: '/apps/email'
  // },
  // {
  //   id: 'chat',
  //   title: 'Chat',
  //   icon: <MessageSquare size={20} />,
  //   navLink: '/apps/chat'
  // },
  // {
  //   id: 'todo',
  //   title: 'Todo',
  //   icon: <CheckSquare size={20} />,
  //   navLink: '/apps/todo'
  // },
  // {
  //   id: 'calendar',
  //   title: 'Calendar',
  //   icon: <Calendar size={20} />,
  //   navLink: '/apps/calendar'
  // },
  // {
  //   id: 'kanban',
  //   title: 'Kanban',
  //   icon: <CheckSquare size={20} />,
  //   navLink: '/apps/kanban'
  // },
  // {
  //   id: 'invoiceApp',
  //   title: 'Invoice',
  //   icon: <FileText size={20} />,
  //   children: [
  //     {
  //       id: 'invoiceList',
  //       title: 'List',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/invoice/list'
  //     },
  //     {
  //       id: 'invoicePreview',
  //       title: 'Preview',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/invoice/preview'
  //     },
  //     {
  //       id: 'invoiceEdit',
  //       title: 'Edit',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/invoice/edit'
  //     },
  //     {
  //       id: 'invoiceAdd',
  //       title: 'Add',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/invoice/add'
  //     }
  //   ]
  // },

  // {
  //   id: 'roles-permissions',
  //   title: 'Roles & Permissions',
  //   icon: <Shield size={20} />,
  //   children: [
  //     {
  //       id: 'roles',
  //       title: 'Roles',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/roles'
  //     },
  //     {
  //       id: 'permissions',
  //       title: 'Permissions',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/permissions'
  //     }
  //   ]
  // },
  // {
  //   id: 'eCommerce',
  //   title: 'eCommerce',
  //   icon: <ShoppingCart size={20} />,
  //   children: [
  //     {
  //       id: 'shop',
  //       title: 'Shop',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/ecommerce/shop'
  //     },
  //     {
  //       id: 'detail',
  //       title: 'Details',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/ecommerce/product-detail'
  //     },
  //     {
  //       id: 'wishList',
  //       title: 'Wish List',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/ecommerce/wishlist'
  //     },
  //     {
  //       id: 'checkout',
  //       title: 'Checkout',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/ecommerce/checkout'
  //     }
  //   ]
  // },
  // {
  //   id: 'users',
  //   title: 'User',
  //   icon: <User size={20} />,
  //   children: [
  //     {
  //       id: 'list',
  //       title: 'List',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/user/list'
  //     },
  //     {
  //       id: 'view',
  //       title: 'View',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/user/view'
  //     }
  //   ]
  // },
  {
    id: "sales",
    title: "Sales",
    icon: <FontAwesomeIcon icon={faMoneyBillWave} size={10} />,
    children: [
      {
        id: "invoices",
        title: "Invoices",
        icon: <Circle size={12} />,
        navLink: "/apps/sales/list",
      },
      {
        id: "creditNotes",
        title: "Credit Notes",
        icon: <Circle size={12} />,
        navLink: "/apps/sales/credit-note/list",
      },
    ],
  },
  {
    id: "purchases",
    title: "Purchases",
    icon: <FontAwesomeIcon icon={faCartShopping} size={10} />,
    
    children: [
      {
        id: "purchases",
        title: "Purchases",
        icon: <Circle size={12} />,
        navLink: "/apps/purchases/list",
      },
      {
        id: "purchasesOrder",
        title: "Purchases Orders",
        icon: <Circle size={12} />,
        navLink: "/apps/purchases-order/list",
      },
      // {
      //   id: 'view',
      //   title: 'View',
      //   icon: <Circle size={12} />,
      //   navLink: '/apps/user/view'
      // }
    ],
  },
  {
    id: "Quotations",
    title: "Quotations",
    icon: <FontAwesomeIcon icon={faPencil} size={10} />,
    children: [
      {
        id: "quotations",
        title: "Quotations",
        icon: <Circle size={12} />,
        navLink: "/apps/quotations/list",
      },
      {
        id: "proFormaInvoices",
        title: "Pro Forma Invoices",
        icon: <Circle size={12} />,
        navLink: "/apps/quotations/preforma-invoices/list",
      },
      {
        id: "deliveryChallans",
        title: "Delivery Challans",
        icon: <Circle size={12} />,
        navLink: "/apps/quotations/delivery-challan/list",
      },

      // {
      //   id: 'view',
      //   title: 'View',
      //   icon: <Circle size={12} />,
      //   navLink: '/apps/user/view'
      // }
    ],
  },
  {
    id: "expenses",
    title: "Expenses",
    icon: <FontAwesomeIcon icon={faTags} size={10} />,
    children: [
      {
        id: "expenses",
        title: "Expenses",
        icon: <Circle size={12} />,
        navLink: "/apps/expenses",
      },
      // {
      //   id: 'view',
      //   title: 'View',
      //   icon: <Circle size={12} />,
      //   navLink: '/apps/user/view'
      // }
    ],
  },
];

export default Apps;
