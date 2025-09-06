
import React from 'react';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-6 border-b pb-4">Terms of Service</h1>
      <div className="prose max-w-none text-slate-700">
        <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
        <p>
          By accessing or using ShoppinGo, you agree to be bound by these terms of service. These terms apply to all visitors, users, and others who wish to access or use the Service.
        </p>

        <h2 className="text-2xl font-semibold mt-6">Accounts</h2>
        <p>
          When you create an account with us, you guarantee that you are above the age of 18, and that the information you provide us is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on the Service.
        </p>

        <h2 className="text-2xl font-semibold mt-6">Purchases</h2>
        <p>
          If you wish to purchase any product or service made available through the Service ("Purchase"), you may be asked to supply certain information relevant to your Purchase including, without limitation, your credit card number, the expiration date of your credit card, your billing address, and your shipping information.
        </p>

        <h2 className="text-2xl font-semibold mt-6">Termination</h2>
        <p>
          We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not to a breach of the Terms.
        </p>
        <p className="mt-4 italic">
          This is a dummy terms of service for demonstration purposes. In a real application, this would contain comprehensive legal information.
        </p>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
