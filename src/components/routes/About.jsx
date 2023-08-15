import React from 'react';

function About() {
  // const currentYear = new Date().getFullYear();
    return (
        <div className="max-w-3xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 text-gray-700">
            <h1 className="text-3xl font-bold mb-6">About us</h1>

            <p className="mb-4">
                Welcome to Mini Parfum Queen, where we celebrate the timeless art of fragrance. For decades, we have been offering an exquisite range of perfumes, encompassing both contemporary sensations and vintage classics.
            </p>

            <p className="mb-4">
                Our journey began in 2018, in the heart of Netherlands. What started as a small boutique quickly transformed into a global platform, connecting scent enthusiasts from all corners of the world.
            </p>

            <p className="mb-4">
                We believe that every fragrance tells a story, capturing emotions, memories, and moments in time. From miniature treasures to the elegance of vintage aromas, Mini Parfum Queen is dedicated to providing an unmatched selection that caters to all tastes and preferences.
            </p>

            <p>
                Whether you are seeking your signature scent or a unique gift for a loved one, our curated collection promises authenticity, quality, and sophistication. Dive into the world of scents with Mini Parfum Queen and let us be a part of your fragrant journey.
            </p>
            {/* <div className="text-m text-black pt-4 text-center">
              &copy; {currentYear} Mini Parfum Queen. All rights reserved.
            </div> */}
        </div>
    );
}

export default About;
