import { sessionLoader } from "@/features/auth/sessionLoader";
import OrderStatusPage from "@/pages/checkout";
import EditOrderPage from "@/pages/staff/order-edit/order-edit";
import ScanPage from "@/pages/staff/qr-scanner/qr-scanner";
import StaffHistory from "@/pages/staff/staff-history/staff-history";
import ErrorPage from "@/shared/error";
import Loader from "@/shared/ui/loader";
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const MainCatalog = lazy(() => import('../../pages/buyer/main-catalog/main-catalog'));
const QRScanner = lazy(() => import('../../pages/buyer/qr-scanner/qr-scanner'));
const Cart = lazy(() => import('../../pages/buyer/cart/cart'));
const SubcatalogDetails = lazy(() => import('../../pages/buyer/subcatalog-details/subcatalog-details'));
const Subcatalog = lazy(() => import('../../pages/buyer/subcatalog/subcatalog'));
const UserProfile = lazy(() => import('../../pages/buyer/user-profile/user-profile'));

export const router = createBrowserRouter([  
  {
    path: "/staff/scanner/scan",
    loader: sessionLoader,
    element: <Suspense fallback={<Loader />}>
      <ScanPage />
    </Suspense>,
    errorElement: <ErrorPage />
  },
  {
    path: "/staff/scanner",
    loader: sessionLoader,
    element: <Suspense fallback={<Loader />}>
      <StaffHistory />
    </Suspense>,
    errorElement: <ErrorPage />
  },
  {
    path: "/staff/scanner/edit",
    loader: sessionLoader,
    element: <Suspense fallback={<Loader />}>
      <EditOrderPage />
    </Suspense>,
    errorElement: <ErrorPage />
  },
  {
    path: "/",
    loader: sessionLoader,
    element: <Suspense fallback={<Loader />}>
      <MainCatalog />
    </Suspense>,
    errorElement: <ErrorPage />
  },
  {
    path: "/checkout",
    element: <Suspense fallback={<Loader />}>
      <OrderStatusPage />
    </Suspense>,
    errorElement: <ErrorPage />
  },
  {
    path: "/buyer",
    loader: sessionLoader,
    element: <Suspense fallback={<Loader />}>
      <MainCatalog />
    </Suspense>,
    errorElement: <ErrorPage />
  },
  {
    path: "/buyer/qrscan",
    loader: sessionLoader,
    element: <Suspense fallback={<Loader />}>
      <QRScanner />
    </Suspense>,
    errorElement: <ErrorPage />
  },
  {
    path: "/subcatalog_buyer/:catalog_id",
    loader: sessionLoader,
    element: <Suspense fallback={<Loader />}>
      <Subcatalog />
    </Suspense>,
    errorElement: <ErrorPage />
  },
  {
    path: "/subcatalog_buyer/:catalog_id/details/:details",
    loader: sessionLoader,
    element: <Suspense fallback={<Loader />}>
      <SubcatalogDetails />
    </Suspense>,
    errorElement: <ErrorPage />
  },
  {
    path: "/buyer/user/:user_id",
    loader: sessionLoader,
    element: <Suspense fallback={<Loader />}>
      <UserProfile />
    </Suspense>,
    errorElement: <ErrorPage />
  },

  {
    path: "/buyer/cart",
    loader: sessionLoader,
    element: <Suspense fallback={<Loader />}><Cart />
    </Suspense>,
    errorElement: <ErrorPage />
  },
])
