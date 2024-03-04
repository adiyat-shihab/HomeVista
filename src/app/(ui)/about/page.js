import React from "react";

const AboutUs = () => {
  return (
    <div data-theme="light" className="min-h-screen">
      <div
        className="hero min-h-[80vh]"
        style={{
          backgroundImage: "url('/about.jpg')",
        }}
      >
        <div className="hero-overlay bg-opacity-80"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-xl md:text-2xl font-bold text-white">About Us</h1>
            <p className="mb-5 text-white">
              Welcome to Home Vista – Your Gateway to Seamless Property
              Transactions!
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 mx-6 md:mt-20 md:mx-20 pb-20 space-y-4">
        <h2 className="text-xl md:text-2xl font-bold">Introduction</h2>
        <p>
          At Home Vista, we understand that buying or selling a property is more
          than just a transaction; it&sbquo;s a significant milestone in your
          life. That&sbquo;s why we&sbquo;ve crafted a platform that goes beyond
          the ordinary, ensuring a smooth and enjoyable experience for every
          user.
        </p>

        <h2 className="text-xl md:text-2xl  font-bold">Our Vision</h2>
        <p>
          Our vision is to revolutionize the way people buy and sell properties,
          making the process transparent, efficient, and rewarding. We aspire to
          be the go-to platform that brings together buyers, sellers, and
          agents, creating a vibrant community driven by trust and innovation.
        </p>

        <h2 className="text-xl md:text-2xl font-bold">What Sets Us Apart</h2>
        <h4 className="text-xl font-semibold">Commitment to Excellence</h4>

        <p>
          Home Vista is built on a foundation of excellence. We are committed to
          providing a user-friendly interface, robust security features, and a
          seamless journey from property discovery to transaction completion.
        </p>

        <h2 className="text-xl font-semibold">Empowering Users</h2>
        <p>
          We empower our users by offering a feature-rich platform that caters
          to their diverse needs. Whether you&sbquo;re a homeowner, a
          prospective buyer, or a real estate agent, Home Vista provides the
          tools and resources you need for success.
        </p>

        <h2 className="text-xl font-semibold">Transparency and Trust</h2>
        <p>
          Transparency and trust are the cornerstones of our platform. We
          believe in open communication, fair practices, and fostering a sense
          of trust among all our users. You can rely on Home Vista for
          transparent property listings, honest reviews, and a secure
          environment.
        </p>

        <h2 className="text-xl md:text-2xl font-bold">Meet the Team</h2>
        <p>
          Behind Home Vista is a passionate team of professionals dedicated to
          making your property journey exceptional. From experienced developers
          and designers to real estate experts, our team works collaboratively
          to bring you a platform that exceeds expectations.
        </p>

        <h2 className="text-xl md:text-2xl font-bold">Join the Home Vista Community</h2>
        <p>
          We invite you to join the Home Vista community and experience the
          future of property transactions. Whether you&rsquo;re searching for
          your dream home, selling your property, or exploring the real estate
          market, Home Vista is here to guide you every step of the way.
        </p>

        <p>
          Discover, transact, and thrive with Home Vista – Where Your Property
          Journey Begins!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
