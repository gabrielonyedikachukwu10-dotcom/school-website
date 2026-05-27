import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function AnimatedSection({ as: Tag = 'section', className = '', children }) {
  const ref = useScrollReveal();
  return (
    <Tag ref={ref} className={`reveal ${className}`}>
      {children}
    </Tag>
  );
}
