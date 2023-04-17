import React from 'react';

function NavBar() {
    return (
        <nav className="bg-gray-800">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <a href="/" className="text-white font-bold text-lg">
                            My Logo
                        </a>
                    </div>
                    <div className="hidden md:block">
                        <div className="flex items-center">
                            <a href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                Home
                            </a>
                            <a href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                About
                            </a>
                            <a href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                Contact
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
