import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, FileText, Star, User, File, LogOut, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const sidebarLinks = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Applications", href: "/dashboard/applications", icon: FileText },
  { label: "Recommendations", href: "/dashboard/recommendations", icon: Star },
  { label: "Profile", href: "/dashboard/profile", icon: User },
  { label: "Resume", href: "/dashboard/resume", icon: File },
];

const DashboardLayout = () => (
  <div className="min-h-screen bg-background flex">
    {/* Sidebar */}
    <aside className="w-64 border-r border-border bg-card/50 flex flex-col fixed top-0 left-0 bottom-0 z-40">
      <div className="p-4 border-b border-border">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-bg-primary flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold font-display gradient-text">JobVerse</span>
        </Link>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {sidebarLinks.map((link) => (
          <NavLink
            key={link.href}
            to={link.href}
            end={link.href === "/dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? "gradient-bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`
            }
          >
            <link.icon className="w-4 h-4" />
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-3 border-t border-border">
        <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
          <LogOut className="w-4 h-4" /> Sign Out
        </Link>
      </div>
    </aside>

    {/* Main */}
    <main className="flex-1 ml-64 p-8">
      <Outlet />
    </main>
  </div>
);

export default DashboardLayout;
