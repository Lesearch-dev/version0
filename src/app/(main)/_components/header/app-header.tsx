"use client";

import { CustomSidebarTrigger } from "./custom-sidebar-trigger";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { NavActions } from "../sidebar/nav-actions";
import { usePathname } from "next/navigation";

const Header = function Header() {
  const pathname = usePathname();
  const isDocumentPage = pathname.startsWith("/documents") && pathname !== "/documents";
  return (
    <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2  px-2 z-50">
      <div className="flex flex-1 items-center gap-2">
        <CustomSidebarTrigger />
        {isDocumentPage &&<>
        <Separator orientation="vertical" className="mr-1 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="line-clamp-1">
                Documents
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        </>}
      </div>
      {isDocumentPage &&<div className="ml-auto px-3">
        <NavActions />
      </div>}
    </header>
  );
};

export default Header;
