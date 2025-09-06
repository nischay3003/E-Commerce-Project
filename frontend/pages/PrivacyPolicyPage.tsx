
import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-6 border-b pb-4">Privacy Policy</h1>
      <div className="prose max-w-none text-slate-700">
        <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
        <p>
          Welcome to ShoppinGo. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our application. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the application.
        </p>

        <h2 className="text-2xl font-semibold mt-6">Collection of Your Information</h2>
        <p>
          We may collect information about you in a variety of ways. The information we may collect via the Application depends on the content and materials you use, and includes:
        </p>
        <ul>
          <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, that you voluntarily give to us when you register with the Application or when you choose to participate in various activities related to the Application, such as online chat and message boards.</li>
          <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Application, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Application.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6">Use of Your Information</h2>
        <p>
          Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Application to:
        </p>
        <ul>
          <li>Create and manage your account.</li>
          <li>Email you regarding your account or order.</li>
          <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Application.</li>
          <li>Increase the efficiency and operation of the Application.</li>
        </ul>
        <p className="mt-4 italic">
          This is a dummy privacy policy for demonstration purposes. In a real application, this would contain comprehensive legal information.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
