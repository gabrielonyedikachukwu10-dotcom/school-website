import SEO from '../components/common/SEO';
import ComingSoon from '../components/common/ComingSoon';
import { siteInfo } from '../data/siteInfo';

export default function PayFees() {
  return (
    <>
      <SEO title="Pay Fees" description="Online fee payment for Mater Dei Erudite School is coming soon. Contact the school office for payment guidance." />
      {/* <!-- REPLACE WITH REAL PORTAL LOGIN WHEN READY --> */}
      <ComingSoon title="Online Fee Payment Coming Soon" message="Online fee payment is coming soon. For now, please contact the school office to make payments.">
        <div className="mx-auto mt-8 max-w-md rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <h2 className="font-heading text-lg font-bold text-slate-950 dark:text-white">Bank Details Placeholder</h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Bank: {siteInfo.bankDetails.bankName}</p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Account Name: {siteInfo.bankDetails.accountName}</p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Account Number: {siteInfo.bankDetails.accountNumber}</p>
          {/* TODO: Add real school bank details here. */}
        </div>
      </ComingSoon>
    </>
  );
}
