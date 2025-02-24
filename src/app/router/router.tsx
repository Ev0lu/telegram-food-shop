import { sessionLoader } from "@/features/auth/sessionLoader";
import Loader from "@/shared/loader";
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
    path: "/",
    loader: sessionLoader,
    element: <Suspense fallback={<Loader />}>
      <MainCatalog />
    </Suspense>,
  },
  {
    path: "/buyer",
    loader: sessionLoader,
    element: <Suspense fallback={<Loader />}>
      <MainCatalog />
    </Suspense>
  },
  {
    path: "/qrscan_buyer",
    loader: sessionLoader,
    element: <Suspense fallback={<Loader />}>
      <QRScanner />
    </Suspense>
  },
  {
    path: "/subcatalog_buyer/:catalog_id",
    loader: sessionLoader,
    element: <Suspense fallback={<Loader />}>
      <Subcatalog />
    </Suspense>
  },
  {
    path: "/subcatalog_buyer/:catalog_id/details/:details",
    loader: sessionLoader,
    element: <Suspense fallback={<Loader />}>
      <SubcatalogDetails />
    </Suspense>
  },
  {
    path: "/buyer/user/:user_id",
    loader: sessionLoader,
    element: <Suspense fallback={<Loader />}>
      <UserProfile />
    </Suspense>
  },

  {
    path: "/buyer/cart",
    loader: sessionLoader,
    element: <Suspense fallback={<Loader />}><Cart />
    </Suspense>
  },
])
