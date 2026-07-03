function Card({ children, className = '' }) {
  return (
    <div className={`bg-slate-800 border border-slate-700 rounded-lg p-4 shadow-md ${className}`}>
      {children}
    </div>
  );
}

export default Card;
