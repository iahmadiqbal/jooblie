import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, FileText, Star, User, File, LogOut, Briefcase, X, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const sidebarLinks = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Applications", href: "/dashboard/applications", icon: FileText },
  { label: "Recommendations", href: "/dashboard/recommendations", icon: Star },
  { label: "Profile", href: "/dashboard/profile", icon: User },
  { label: "Resume", href: "/dashboard/resume", icon: File },
];

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile pe default closed

  return (
    <div className="min-h-screen bg-background flex relative overflow-hidden">
      {/* Sidebar - Mobile: Overlay, Desktop: Fixed */}
      {sidebarOpen && (
        <>
          {/* Mobile Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          
          <aside className="w-64 border-r border-border bg-card flex flex-col fixed top-0 left-0 bottom-0 z-40 md:z-auto">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Jooblie</span>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 p-3 space-y-1 overflow-y-auto mt-4">
              {sidebarLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  end={link.href === "/dashboard"}
                  onClick={() => setSidebarOpen(false)} // Close on mobile after click
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`
                  }
                >
                  <link.icon className="w-4 h-4 flex-shrink-0" />
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </nav>

            <div className="p-3 border-t border-border">
              <Link 
                to="/" 
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </Link>
            </div>
          </aside>
        </>
      )}

      {/* Menu Button */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 left-4 z-50 p-2.5 rounded-lg bg-card border border-border text-foreground hover:bg-muted transition-colors shadow-lg"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}

      {/* Main Content */}
      <main className={`flex-1 min-h-screen ${sidebarOpen ? 'md:ml-64' : 'ml-0'} transition-all duration-300`}>
        <div className={`p-4 sm:p-6 md:p-8 min-h-screen ${!sidebarOpen ? 'pt-20 md:pt-8' : 'pt-4 md:pt-8'}`}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
