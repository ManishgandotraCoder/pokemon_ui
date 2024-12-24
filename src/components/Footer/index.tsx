import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Column 1: About */}
          <div>
            <h3 className="font-semibold text-lg mb-2">About</h3>
            <p className="text-sm">
              This application allows you to search and filter Pokémon based on
              type and name. Explore and learn more about your favorite Pokémon!
            </p>
          </div>

          {/* Column 2: Links */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Contact</h3>
            <p className="text-sm">Have questions? Feel free to reach out!</p>
            <p className="text-sm mt-2">
              Email:{" "}
              <a href="manishgandotra@icloud.com" className="underline">
                manishgandotra@icloud.com
              </a>
            </p>
            <p className="text-sm">
              Phone:{" "}
              <a href="tel:+1234567890" className="underline">
                +91 8800463103
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 border-t border-gray-600 pt-4 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Pokémon Explorer. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
