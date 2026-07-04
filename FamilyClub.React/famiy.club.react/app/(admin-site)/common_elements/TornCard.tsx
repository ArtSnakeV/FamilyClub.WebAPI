export default function TornCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
      <div className={`relative ${className}`}>
        {/* фон з рваними краями */}
         {/* Background image */}
         <img
          src="/images/admin_manager/desktop/cut_edge_rectangle.png"
          alt=""
          className="absolute inset-0 max-w-[440px] h-full object-fill pointer-events-none"
          aria-hidden="true"
        />
        {/* контент поверх */}
        <div className="relative z-10">{children}</div>
      </div>
    );
  }