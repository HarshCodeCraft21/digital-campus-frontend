import { Target, Heart, Users, Award } from 'lucide-react';

export default function Mission() {
  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-orange-400 py-16 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Mission</h1>
        <p className="text-xl max-w-2xl mx-auto">Empowering learners worldwide with accessible, high-quality education</p>
      </div>

      {/* Vision & Mission Section */}
      <section className="container mx-auto px-4 py-16 bg-base-200">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
          {/* Our Vision Card */}
          <div className="relative card bg-white shadow-xl hover:shadow-2xl transition-all rounded-2xl overflow-hidden">
            {/* Left gradient border */}
            <div className="absolute top-0 left-0 h-full w-[6px] bg-gradient-to-b from-blue-500 to-orange-500 rounded-l-2xl"></div>

            <div className="card-body pl-6">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto md:mx-0">
                <Target className="h-7 w-7 text-primary" />
              </div>
              <h2 className="card-title text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-base-content/70 leading-relaxed">
                To create a world where anyone, anywhere can transform their life through learning.
                We envision a future where quality education is a right, not a privilege—accessible to
                all, regardless of geography or background.
              </p>
            </div>
          </div>

          {/* Our Mission Card */}
          <div className="relative card bg-white shadow-xl hover:shadow-2xl transition-all rounded-2xl overflow-hidden">
            {/* Left gradient border */}
            <div className="absolute top-0 left-0 h-full w-[6px] bg-gradient-to-b from-blue-500 to-orange-500 rounded-l-2xl"></div>

            <div className="card-body pl-6">
              <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mb-4 mx-auto md:mx-0">
                <Heart className="h-7 w-7 text-secondary" />
              </div>
              <h2 className="card-title text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-base-content/70 leading-relaxed">
                To democratize education by connecting learners with expert instructors around the
                world. We strive to provide affordable, flexible, and engaging learning experiences
                that empower personal and professional growth.
              </p>
            </div>
          </div>
        </div>


        {/* Core Values */}
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Our Core Values</h2>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Accessibility Card */}
            <div className="relative card bg-white shadow-md hover:shadow-lg transition-all p-6 rounded-2xl overflow-hidden">
              {/* Top gradient border */}
              <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-blue-500 to-orange-500"></div>

              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
                <p className="text-base-content/70">
                  Making quality education accessible to everyone, everywhere, at any time.
                </p>
              </div>
            </div>

            {/* Excellence Card */}
            <div className="relative card bg-white shadow-md hover:shadow-lg transition-all p-6 rounded-2xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-blue-500 to-orange-500"></div>

              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                <p className="text-base-content/70">
                  Maintaining the highest standards in course quality and learning outcomes.
                </p>
              </div>
            </div>

            {/* Community Card */}
            <div className="relative card bg-white shadow-md hover:shadow-lg transition-all p-6 rounded-2xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-blue-500 to-orange-500"></div>

              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-base-content/70">
                  Building a supportive learning community where everyone can thrive.
                </p>
              </div>
            </div>
          </div>
        </div>


        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-500 to-orange-400 rounded-2xl p-12 mt-20 max-w-5xl mx-auto text-white shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-extrabold mb-1">10K+</div>
              <div className="text-sm opacity-90">Students</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold mb-1">500+</div>
              <div className="text-sm opacity-90">Courses</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold mb-1">200+</div>
              <div className="text-sm opacity-90">Instructors</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold mb-1">50+</div>
              <div className="text-sm opacity-90">Countries</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
