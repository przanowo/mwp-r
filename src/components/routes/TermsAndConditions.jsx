import React from 'react';

const TermsAndConditions = () => {
    return (
        <div className="max-w-3xl mx-auto my-10 p-6 shadow-md bg-white rounded-lg">
            <h1 className="text-3xl font-bold mb-6 border-b pb-2">Terms & Conditions</h1>

            <p className="mb-4">Last updated: [Date]</p>

            <h2 className="text-xl font-semibold mt-4 mb-2">1. Introduction</h2>
            <p className="mb-4">By using our website and services, you agree to these terms and conditions.</p>

            <h2 className="text-xl font-semibold mt-4 mb-2">2. Products & Services</h2>
            <p className="mb-4">Descriptions of our products and services are accurate to the best of our knowledge. Prices and availability are subject to change without notice.</p>

            <h2 className="text-xl font-semibold mt-4 mb-2">3. Payments</h2>
            <p className="mb-4">Payments for products and services are facilitated through Stripe. Ensure that your payment details are correct before finalizing any transaction.</p>

            <h2 className="text-xl font-semibold mt-4 mb-2">4. User Conduct</h2>
            <p className="mb-4">Users are expected to use our website and services responsibly and legally. Any misuse will lead to termination of access.</p>

            <h2 className="text-xl font-semibold mt-4 mb-2">5. Limitation of Liability</h2>
            <p className="mb-4">Mini Parfum Queen will not be liable for any indirect, special, consequential, or punitive damages related to the use of our website or products.</p>

            <h2 className="text-xl font-semibold mt-4 mb-2">6. Privacy</h2>
            <p className="mb-4">User data and privacy are protected as outlined in our Privacy Policy.</p>

            <h2 className="text-xl font-semibold mt-4 mb-2">7. Changes to Terms</h2>
            <p className="mb-4">We reserve the right to change these terms and conditions at any time. Users will be notified of significant changes.</p>

            <h2 className="text-xl font-semibold mt-4 mb-2">8. Governing Law</h2>
            <p className="mb-4">These terms and conditions are governed by the laws of Netherlands. Any disputes will be addressed in the competent courts of Netherlands.</p>

            {/* <h2 className="text-xl font-semibold mt-4 mb-2">9. Contact</h2>
            <p>If you have any questions regarding these terms, you can contact us at:</p>
            <ul className="list-disc pl-6 mb-4">
                <li>Email: [Your Email]</li>
                <li>Phone: [Your Phone Number]</li>
                <li>Address: [Your Address]</li>
            </ul> */}
        </div>
    );
}

export default TermsAndConditions;
