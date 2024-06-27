import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid, LineChartIcon, BoxesIcon
} from "lucide-react";
import {CartIcon} from "@nextui-org/shared-icons";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname === "/dashboard",
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Transaction",
      menus: [
        {
          href: "/dashboard/transactions",
          label: "Transactions",
          active: pathname.includes("/transactions"),
          icon: LineChartIcon,
          submenus: []
        },
      ]
    },
    {
      groupLabel: "Products",
      menus: [
        {
          href: "",
          label: "Products",
          active: pathname.includes("/dashboard/category") || pathname.includes('/dashboard/brand') || pathname.includes('/dashboard/product'),
          icon: BoxesIcon,
          submenus: [
            {
              href: "/dashboard/category",
              label: "Category",
              active: pathname === "/dashboard/category"
            },
            {
              href: "/dashboard/brand",
              label: "Brand",
              active: pathname === "/dashboard/brand"
            },
            {
              href: "/dashboard/product",
              label: "Product",
              active: pathname === "/dashboard/product"
            }
          ]
        },
      ]
    },
    {
      groupLabel: "Configuration",
      menus: [
        {
          href: "",
          label: "Configuration",
          active: pathname.includes("/digiflazz"),
          icon: Settings,
          submenus: [
            {
              href: "/dashboard/digiflazz",
              label: "Digiflazz",
              active: pathname === "/dashboard/digiflazz"
            },
          ]
        }
      ]
    }
  ];
}
