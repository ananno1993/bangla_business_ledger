import React from 'react';

const StoreLogo = ({ size = 40, className = "", showText = true, variant = "default" }) => {
  const logoSize = typeof size === 'number' ? size : 40;
  const textSize = logoSize > 32 ? 'text-lg' : 'text-sm';
  const subtextSize = logoSize > 32 ? 'text-xs' : 'text-[10px]';

  const logoVariants = {
    default: "bg-gradient-to-br from-emerald-600 to-emerald-700",
    light: "bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200",
    dark: "bg-gradient-to-br from-emerald-800 to-emerald-900",
    outline: "bg-transparent border-2 border-emerald-600"
  };

  const textVariants = {
    default: "text-white",
    light: "text-emerald-700",
    dark: "text-white",
    outline: "text-emerald-600"
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Icon */}
      <div 
        className={`flex items-center justify-center rounded-xl shadow-lg ${logoVariants?.[variant]}`}
        style={{ width: logoSize, height: logoSize }}
      >
        <div className="relative">
          {/* Shop/Store Icon Background */}
          <svg 
            width={logoSize * 0.6} 
            height={logoSize * 0.6} 
            viewBox="0 0 24 24" 
            fill="none" 
            className={`${textVariants?.[variant]} opacity-20 absolute`}
          >
            <path 
              d="M3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7M3 7L5 3H19L21 7M3 7H21M8 11V15M12 11V15M16 11V15" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          
          {/* AGS Text */}
          <div className={`flex flex-col items-center justify-center ${textVariants?.[variant]} font-bold relative z-10`}>
            <div 
              className="leading-none tracking-wide"
              style={{ fontSize: logoSize * 0.25 }}
            >
              AGS
            </div>
            <div 
              className="leading-none opacity-75"
              style={{ fontSize: logoSize * 0.12 }}
            >
              STORE
            </div>
          </div>
        </div>
      </div>
      {/* Text Content */}
      {showText && (
        <div className="flex flex-col">
          <h1 className={`${textSize} font-semibold text-foreground bangla-text leading-tight`}>
            আনোয়ার জেনারেল স্টোর
          </h1>
          <span className={`${subtextSize} text-muted-foreground leading-tight`}>
            Anowar General Store
          </span>
        </div>
      )}
    </div>
  );
};

export default StoreLogo;