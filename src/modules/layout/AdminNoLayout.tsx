import type { LayoutWrapper } from "@modules/content/types";

import useAdminAuth from "./useAdminAuth";

const AdminNoLayoutWrapper: LayoutWrapper = ({ page }) => {
  useAdminAuth();

  return <div>{page}</div>;
};

export default AdminNoLayoutWrapper;
