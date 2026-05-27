import { Link } from 'react-router-dom';

const styles = {
  primary: 'bg-brand-blue text-white hover:bg-blue-700',
  accent: 'bg-brand-yellow text-slate-950 hover:bg-yellow-300',
  outline: 'border border-brand-blue text-brand-blue hover:bg-blue-50 dark:text-blue-200 dark:hover:bg-slate-800'
};

export default function Button({ children, to, href, variant = 'primary', className = '', ...props }) {
  const classes = `inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold shadow-sm ${styles[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
