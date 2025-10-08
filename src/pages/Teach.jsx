import { useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import { GetToken } from '../controllers/getToken.js';

export default function Teach() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        expertise: '',
        message: '',
    });
    
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Application submitted! We will contact you soon.');
        setFormData({ name: '', email: '', phone: '', expertise: '', message: '' });
    };

    return (
        <div className="min-h-screen bg-base-200">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-500 to-orange-400 py-16 text-center text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Teach With Us</h1>
                <p className="text-xl max-w-2xl mx-auto">
                    Share your knowledge and inspire thousands of students worldwide
                </p>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12 grid lg:grid-cols-2 gap-12 max-w-6xl">
                {/* Info Section */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-4">Why Teach on DigitalCampus?</h2>
                    <div className="relative card shadow-lg bg-base-100 p-6 rounded-2xl overflow-hidden">
                        <div className="absolute top-0 left-0 h-full w-[6px] bg-gradient-to-b from-blue-500 to-orange-500 rounded-l-2xl"></div>
                        <ul className="space-y-3 text-gray-700">
                            <li>
                                <strong>Reach Global Students:</strong> Connect with millions of students eager to learn from experts like you.
                            </li>
                            <li>
                                <strong>Earn Money:</strong> Set your own prices and earn revenue from every course enrollment.
                            </li>
                            <li>
                                <strong>Easy Course Creation:</strong> Our platform makes it simple to upload and manage your course content.
                            </li>
                            <li>
                                <strong>Marketing Support:</strong> We help promote your courses to reach the right audience.
                            </li>
                        </ul>
                    </div>


                    <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                    <div className="relative card shadow-lg bg-base-100 p-6 rounded-2xl overflow-hidden">
                        <div className="absolute top-0 left-0 h-full w-[6px] bg-gradient-to-b from-blue-500 to-orange-500 rounded-l-2xl"></div>
                        <p className="pl-4">
                            <strong>Email:</strong> teach@digitalcampus.com
                        </p>
                    </div>

                    <div className="relative card shadow-lg bg-base-100 p-6 rounded-2xl overflow-hidden">
                        <div className="absolute top-0 left-0 h-full w-[6px] bg-gradient-to-b from-blue-500 to-orange-500 rounded-l-2xl"></div>
                        <p><strong>Phone:</strong> +91 1800 123 4567</p>
                    </div>
                    <div className="relative card shadow-lg bg-base-100 p-6 rounded-2xl overflow-hidden">
                        <div className="absolute top-0 left-0 h-full w-[6px] bg-gradient-to-b from-blue-500 to-orange-500 rounded-l-2xl"></div>
                        <p><strong>Support Hours:</strong> Mon-Fri, 9AM-6PM IST</p>
                    </div>
                </div>

                {/* Application Form */}
                <div className="card shadow-xl bg-base-100 rounded-2xl overflow-hidden">
                    {/* Gradient top border */}
                    <div className="h-[6px] w-full bg-gradient-to-r from-blue-500 to-orange-500"></div>

                    <div className="p-6 space-y-6">
                        <h2 className="text-2xl font-bold text-center md:text-left">Apply to Teach</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Full Name */}
                            <div>
                                <label className="block mb-1 font-medium">Full Name *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="input input-bordered w-full"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block mb-1 font-medium">Email *</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    className="input input-bordered w-full"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block mb-1 font-medium">Phone *</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    required
                                    className="input input-bordered w-full"
                                />
                            </div>

                            {/* Expertise */}
                            <div>
                                <label className="block mb-1 font-medium">Area of Expertise *</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Web Development, Data Science"
                                    value={formData.expertise}
                                    onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                                    required
                                    className="input input-bordered w-full"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block mb-1 font-medium">Tell us about yourself *</label>
                                <textarea
                                    rows="5"
                                    placeholder="Share your teaching experience and what you'd like to teach..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    required
                                    className="textarea textarea-bordered w-full"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="btn w-full bg-blue-500 border-none text-white font-medium flex items-center justify-center gap-2 rounded-xl p-3 hover:scale-[1.02] transition-transform"
                            >
                                <Send className="w-4 h-4" />
                                Submit Application
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}
