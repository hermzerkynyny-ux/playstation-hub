function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  ...props
}) {
  const baseClasses = 'font-semibold rounded-lg transition duration-200 active:scale-95';

  const variantClasses = {
    primary: 'bg-orange-500 text-slate-950 hover:bg-orange-600 disabled:bg-slate-600',
    secondary: 'bg-slate-700 text-slate-100 hover:bg-slate-600 disabled:bg-slate-600',
    danger: 'bg-red-500 text-white hover:bg-red-600 disabled:bg-slate-600',
    ghost: 'text-slate-100 hover:bg-slate-700 disabled:text-slate-500',
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base min-h-44',
    lg: 'px-6 py-4 text-lg min-h-44',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
