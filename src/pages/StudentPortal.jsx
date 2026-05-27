import SEO from '../components/common/SEO';
import ComingSoon from '../components/common/ComingSoon';

export default function StudentPortal() {
  return (
    <>
      <SEO title="Student Portal" description="Student and parent portal for Mater Dei Erudite School is coming soon." />
      {/* <!-- REPLACE WITH REAL PORTAL LOGIN WHEN READY --> */}
      <ComingSoon
        title="Student Portal Coming Soon"
        message="We're building a secure portal for students and parents to access results, assignments, and announcements. Check back soon or contact the school office for current information."
      />
    </>
  );
}
