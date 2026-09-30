export function Container({ children, className = '' }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-4 sm:px-8 ${className}`}>{children}</div>
}
