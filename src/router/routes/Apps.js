// ** React Imports
import { lazy } from "react";
import { Navigate } from "react-router-dom";

const Chat = lazy(() => import("../../views/apps/chat"));
const Todo = lazy(() => import("../../views/apps/todo"));
const Email = lazy(() => import("../../views/apps/email"));
const Kanban = lazy(() => import("../../views/apps/kanban"));
const Calendar = lazy(() => import("../../views/apps/calendar"));

const InvoiceAdd = lazy(() => import("../../views/apps/invoice/add"));
const InvoiceList = lazy(() => import("../../views/apps/invoice/list"));
const InvoiceEdit = lazy(() => import("../../views/apps/invoice/edit"));
const InvoicePrint = lazy(() => import("../../views/apps/invoice/print"));
const InvoicePreview = lazy(() => import("../../views/apps/invoice/preview"));

const EcommerceShop = lazy(() => import("../../views/apps/ecommerce/shop"));
const EcommerceDetail = lazy(() => import("../../views/apps/ecommerce/detail"));
const EcommerceWishlist = lazy(() =>
  import("../../views/apps/ecommerce/wishlist")
);
const EcommerceCheckout = lazy(() =>
  import("../../views/apps/ecommerce/checkout")
);

const UserList = lazy(() => import("../../views/apps/user/list"));
const UserView = lazy(() => import("../../views/apps/user/view"));
const SalesList = lazy(() => import("../../views/apps/sales/InvoiceList"));
const SalesCreate = lazy(() => import("../../views/apps/sales/createInvoice"));
const CreditNotesList = lazy(() =>
  import("../../views/apps/sales/creditNotesList")
);
const CreditNotes = lazy(() =>
  import("../../views/apps/sales/createSalesReturn")
);

const PurchaseList = lazy(() =>
  import("../../views/apps/purchase/purchaseList")
);
const PurchaseOrderList = lazy(() =>
  import("../../views/apps/purchase/purchaseOrderList")
);
const PurchaseCreate = lazy(() =>
  import("../../views/apps/purchase/createPurchase")
);
const PurchaseOrderCreate = lazy(() =>
  import("../../views/apps/purchase/createPurchaseOrder")
);

const QuotationsList = lazy(() =>
  import("../../views/apps/quotations/quotationList")
);
const DeliveryChallanList = lazy(() =>
  import("../../views/apps/quotations/deliveryChallan")
);
const PreFormaInvoicesList = lazy(() =>
  import("../../views/apps/quotations/preFormaInvoices")
);
const CreateQuotation = lazy(() =>
  import("../../views/apps/quotations/createQuotation")
);
const CreatePreForma = lazy(() =>
  import("../../views/apps/quotations/createPreForma")
);
const CreateDeliveryChallan = lazy(() =>
  import("../../views/apps/quotations/createDeliveryChallan")
);

const Expenses = lazy(() => import("../../views/apps/expenses/expenses"));

const Roles = lazy(() => import("../../views/apps/roles-permissions/roles"));
const Permissions = lazy(() =>
  import("../../views/apps/roles-permissions/permissions")
);

const AppRoutes = [
  {
    element: <Email />,
    path: "/apps/email",
    meta: {
      appLayout: true,
      className: "email-application",
    },
  },
  {
    element: <Email />,
    path: "/apps/email/:folder",
    meta: {
      appLayout: true,
      className: "email-application",
    },
  },
  {
    element: <Email />,
    path: "/apps/email/label/:label",
    meta: {
      appLayout: true,
      className: "email-application",
    },
  },
  {
    element: <Email />,
    path: "/apps/email/:filter",
  },
  {
    path: "/apps/chat",
    element: <Chat />,
    meta: {
      appLayout: true,
      className: "chat-application",
    },
  },
  {
    element: <Todo />,
    path: "/apps/todo",
    meta: {
      appLayout: true,
      className: "todo-application",
    },
  },
  {
    element: <Todo />,
    path: "/apps/todo/:filter",
    meta: {
      appLayout: true,
      className: "todo-application",
    },
  },
  {
    element: <Todo />,
    path: "/apps/todo/tag/:tag",
    meta: {
      appLayout: true,
      className: "todo-application",
    },
  },
  {
    element: <Calendar />,
    path: "/apps/calendar",
  },
  {
    element: <Kanban />,
    path: "/apps/kanban",
    meta: {
      appLayout: true,
      className: "kanban-application",
    },
  },
  {
    element: <InvoiceList />,
    path: "/apps/invoice/list",
  },
  {
    element: <InvoicePreview />,
    path: "/apps/invoice/preview/:id",
  },
  {
    path: "/apps/invoice/preview",
    element: <Navigate to="/apps/invoice/preview/4987" />,
    
  },
  {
    element: <InvoiceEdit />,
    path: "/apps/invoice/edit/:id",
  },
  {
    path: "/apps/invoice/edit",
    element: <Navigate to="/apps/invoice/edit/4987" />,
  },
  {
    element: <InvoiceAdd />,
    path: "/apps/invoice/add",
  },
  {
    path: "/apps/invoice/print",
    element: <InvoicePrint />,
    meta: {
      layout: "blank",
    },
  },
  {
    element: <EcommerceShop />,
    path: "/apps/ecommerce/shop",
    meta: {
      className: "ecommerce-application",
    },
  },
  {
    element: <EcommerceWishlist />,
    path: "/apps/ecommerce/wishlist",
    meta: {
      className: "ecommerce-application",
    },
  },
  {
    path: "/apps/ecommerce/product-detail",
    element: (
      <Navigate to="/apps/ecommerce/product-detail/apple-i-phone-11-64-gb-black-26" />
    ),
    meta: {
      className: "ecommerce-application",
    },
  },
  {
    path: "/apps/ecommerce/product-detail/:product",
    element: <EcommerceDetail />,
    meta: {
      className: "ecommerce-application",
    },
  },
  {
    path: "/apps/ecommerce/checkout",
    element: <EcommerceCheckout />,
    meta: {
      className: "ecommerce-application",
    },
  },
  {
    element: <UserList />,
    path: "/apps/user/list",
  },
  {
    path: "/apps/user/view",
    element: <Navigate to="/apps/user/view/1" />,
  },
  {
    element: <UserView />,
    path: "/apps/user/view/:id",
  },
  {
    element: <Roles />,
    path: "/apps/roles",
  },
  {
    element: <Permissions />,
    path: "/apps/permissions",
  },
  {
    element: <SalesList />,
    path: "/apps/sales/list",
  },
  {
    element: <CreditNotesList />,
    path: "/apps/sales/credit-note/list",
  },
  {
    element: <SalesCreate />,
    path: "/apps/sales/invoice/create",
  },

  {
    element: <CreditNotes />,
    path: "/apps/sales/credit-note/create",
  },

  {
    element: <PurchaseList />,
    path: "/apps/purchases/list",
  },
  {
    element: <PurchaseOrderList />,
    path: "/apps/purchases-order/list",
  },
  {
    element: <PurchaseCreate />,
    path: "/apps/purchases/create",
  },
  {
    element: <PurchaseOrderCreate />,
    path: "/apps/purchases-order/create",
  },
  {
    element: <QuotationsList />,
    path: "/apps/quotations/list",
  },

  {
    element: <DeliveryChallanList />,
    path: "/apps/quotations/delivery-challan/list",
  },
  {
    element: <PreFormaInvoicesList />,
    path: "/apps/quotations/preforma-invoices/list",
  },
  {
    element: <CreateQuotation />,
    path: "/apps/quotations/create",
  },
  {
    element: <CreatePreForma />,
    path: "/apps/quotations/preforma-invoices/create",
  },
  {
    element: <CreateDeliveryChallan />,
    path: "/apps/quotations/delivery-challan/create",
  },

  {
    element: <Expenses />,
    path: "/apps/expenses",
  },
];

export default AppRoutes;
