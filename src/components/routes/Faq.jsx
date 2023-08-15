import React from 'react';

function Faq() {
    return (
        <div className="max-w-3xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 text-gray-700">
            <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>

            {/* Existing Questions */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">What is the shelf life of the perfumes?</h2>
                <p>Our perfumes have a shelf life of 3-5 years. However, to ensure longevity, we recommend storing them in a cool, dry place away from direct sunlight.</p>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Do you offer samples?</h2>
                <p>Yes! We offer sample sizes for a majority of our fragrances. This way, you can try before you invest in a full-sized bottle.</p>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">How do I track my order?</h2>
                <p>Once your order has been shipped, you will receive a tracking number via email. You can use this number on our website or with the respective courier service to track your package.</p>
            </div>

            {/* Shipping & Delivery Information */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Shipping & Delivery Information</h2>
                <p>We offer worldwide shipping. Orders are processed within 1-2 business days and shipped out. Standard shipping usually takes 7-10 business days, while express shipping options are available for faster delivery. Shipping costs vary based on destination and selected shipping option.</p>
            </div>

            {/* Return & Exchange Policy */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Return & Exchange Policy</h2>
                <p>We accept returns and exchanges within 14 days of delivery. Products must be unopened and in their original packaging. If you received a damaged or defective item, please contact our customer service immediately for assistance. Refunds will be processed back to the original payment method. Note that shipping fees are non-refundable and the customer is responsible for return shipping costs.</p>
            </div>
        </div>
    );
}

export default Faq;
