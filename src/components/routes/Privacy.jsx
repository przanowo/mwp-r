import React from 'react';

const Privacy = () => {
    return (
        <div className=" mt-8 max-w-3xl mx-auto my-10 p-6 shadow-md bg-white rounded-lg">
            <h1 className="text-3xl font-bold mb-6 border-b pb-2">Privacy Policy</h1>

            <p className="mb-4">Last updated: 2023</p>
            
            <p className="mb-4">Your privacy is of paramount importance to us. This policy describes the types of personal information we collect, how we use it, and the measures we take to ensure your data remains private and secure.</p>

            <h2 className="text-xl font-semibold mt-4 mb-2">1. Information We Collect</h2>
            <ul className="list-disc pl-6 mb-4">
                <li>Personal Information: Data you provide such as your name, email, address, and more.</li>
                <li>Transaction Information: Details of purchases, though credit card info is not stored by us.</li>
                <li>Usage Data: Interaction details with our site.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-4 mb-2">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 mb-4">
                <li>To process orders.</li>
                <li>For communication.</li>
                <li>To improve our services.</li>
                <li>To ensure site security.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-4 mb-2">3. Cookies</h2>
            <p className="mb-4">Cookies and similar technologies help us understand and personalize user experience.</p>

            <h2 className="text-xl font-semibold mt-4 mb-2">4. Third-Party Sharing</h2>
            <p className="mb-4">We don't sell or rent your data. We might share data with third-party services like Google Firebase for authentication and security, and Stripe for payment processing.</p>

            <h2 className="text-xl font-semibold mt-4 mb-2">5. Your Choices</h2>
            <p className="mb-4">You can opt out of our emails anytime via the unsubscribe link.</p>

            <h2 className="text-xl font-semibold mt-4 mb-2">6. Security</h2>
            <p className="mb-4">Your data's safety is ensured by Google Firebase's industry-standard security measures.</p>

            {/* <h2 className="text-xl font-semibold mt-4 mb-2">7. Children’s Privacy</h2>
            <p className="mb-4">Our website is for those 18+. We don’t knowingly collect data from minors.</p> */}

            <h2 className="text-xl font-semibold mt-4 mb-2">8. Updates</h2>
            <p className="mb-4">We may occasionally update this policy and will inform users accordingly.</p>
{/* 
            <h2 className="text-xl font-semibold mt-4 mb-2">9. Contact</h2>
            <p>If you have queries, contact us.</p>
            <ul className="list-disc pl-6 mb-4">
                <li>Email: [Your Email]</li>
                <li>Phone: [Your Phone Number]</li>
                <li>Address: [Your Address]</li>
            </ul> */}
        </div>
    );
}

export default Privacy;
