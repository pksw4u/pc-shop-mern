export default function AboutPage() {
  return (
    <main className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-12">About Computer Shop</h1>

        <div className="prose prose-lg mx-auto">
          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Founded in 2020, Computer Shop has been at the forefront of providing high-quality computer hardware
              and accessories to tech enthusiasts, gamers, and professionals alike. What started as a small online
              store has grown into a trusted destination for all your computing needs.
            </p>
            <p className="text-gray-700 mb-4">
              We believe that technology should be accessible to everyone, which is why we offer competitive pricing,
              expert advice, and exceptional customer service. Our team of tech experts is passionate about helping
              you find the perfect components for your build or the ideal pre-configured system for your needs.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">Custom PC Builds</h3>
                <p className="text-gray-700">
                  Our Build Your Own PC wizard helps you create the perfect system tailored to your specific needs
                  and budget. Whether you're gaming, content creation, or professional work, we've got you covered.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Pre-built Systems</h3>
                <p className="text-gray-700">
                  Choose from our selection of expertly configured systems that are ready to use right out of the box.
                  Each system is thoroughly tested and comes with our satisfaction guarantee.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Components & Accessories</h3>
                <p className="text-gray-700">
                  From processors and graphics cards to keyboards and mice, we carry a comprehensive selection of
                  computer components and peripherals from top brands.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Expert Support</h3>
                <p className="text-gray-700">
                  Our knowledgeable team is here to help with product recommendations, compatibility questions,
                  and technical support. We're committed to your satisfaction.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Quality First</h3>
                <p className="text-gray-700 text-sm">
                  We only carry products from reputable manufacturers and ensure every item meets our high standards.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Customer Focused</h3>
                <p className="text-gray-700 text-sm">
                  Your satisfaction is our top priority. We're here to help you find the perfect solution for your needs.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Innovation</h3>
                <p className="text-gray-700 text-sm">
                  We stay up-to-date with the latest technology trends to bring you the best products available.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-semibold mb-6">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              Have questions about our products or services? We'd love to hear from you!
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Customer Support</h4>
                  <p className="text-gray-700">support@computershop.com</p>
                  <p className="text-gray-700">1-800-COMPUTER</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Business Hours</h4>
                  <p className="text-gray-700">Mon-Fri: 9AM - 6PM EST</p>
                  <p className="text-gray-700">Sat-Sun: 10AM - 4PM EST</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}