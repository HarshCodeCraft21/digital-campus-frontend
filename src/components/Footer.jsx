import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content pt-16 pb-8 border-t border-base-300">
            <div className="container mx-auto px-4">
                {/* Top Grid Section */}
                <div className="grid md:grid-cols-4 gap-10 mb-12">
                    {/* Logo & About */}
                    <div>
                        <div className="flex items-center gap-2 flex-1">
                            <GraduationCap size={48} className="text-primary" />
                            <h1 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-blue-500 to-orange-400 bg-clip-text text-transparent">
                                <span className="font-bold text-3xl md:text-4xl">D</span>igital{" "}
                                <span className="font-bold text-3xl md:text-4xl">C</span>ampus
                            </h1>
                        </div>
                        <p className="text-base-content/70 leading-relaxed mb-4">
                            Empowering learners and educators through accessible, innovative, and high-quality
                            digital education across the globe.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="link link-hover text-base-content/80 hover:text-primary" onClick={()=>window.scrollTo(0,0)}>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/courses" className="link link-hover text-base-content/80 hover:text-primary" onClick={()=>window.scrollTo(0,0)}>
                                    Courses
                                </Link>
                            </li>
                            <li>
                                <Link to="/teach" className="link link-hover text-base-content/80 hover:text-primary" onClick={()=>window.scrollTo(0,0)}>
                                   Teach With Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/mission" className="link link-hover text-base-content/80 hover:text-primary" onClick={()=>window.scrollTo(0,0)}>
                                    Our Mission
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/faq" className="link link-hover text-base-content/80 hover:text-primary">
                                    FAQs
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="link link-hover text-base-content/80 hover:text-primary">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="link link-hover text-base-content/80 hover:text-primary">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="link link-hover text-base-content/80 hover:text-primary">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <div className="space-y-3 text-base-content/80">
                            <p>123 Learning Ave, Innovation City</p>
                            <p className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-primary" /> support@digitalcampus.com
                            </p>
                            <p className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-primary" />
                                +91 999999999
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-base-300 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-base-content/70">
                    <p>© {new Date().getFullYear()} Digital Campus. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
