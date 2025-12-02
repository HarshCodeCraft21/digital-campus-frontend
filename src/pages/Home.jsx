import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Card } from "../components/Card";
export default function Home() {
  const heroSlides = [
    {
      title: "Learn Without Limits",
      subtitle: "Access thousands of courses from expert instructors",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=600&fit=crop",
    },
    {
      title: "Unlock Your Potential",
      subtitle: "Build skills that matter with industry-leading courses",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=600&fit=crop",
    },
    {
      title: "Advance Your Career",
      subtitle: "Get certified and stand out from the crowd",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=600&fit=crop",
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <div className="relative h-[350px] sm:h-[400px] md:h-[500px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
          >
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-full md:max-w-2xl text-white space-y-4">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">{slide.title}</h1>
                  <p className="text-md sm:text-lg md:text-xl lg:text-2xl">{slide.subtitle}</p>
                  <Link
                    to="/courses"
                    className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-400 text-white font-semibold rounded-lg hover:bg-primary-focus transition text-sm sm:text-base"
                  >
                    Explore Courses <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full transition-all"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full transition-all"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? "bg-white w-8" : "bg-white/50"
                }`}
            />
          ))}
        </div>
      </div>

      {/* Latest Courses */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <h2 className="text-3xl font-bold">Latest Courses</h2>
          <Link
            to="/courses"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition text-sm sm:text-base"
            onClick={()=>window.scrollTo(0,0)}
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
         <Card />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-500 to-orange-400 py-16">
        <div className="container mx-auto px-4 text-center text-white space-y-4">
          <h2 className="text-4xl font-bold">Ready to Start Learning?</h2>
          <p className="text-xl max-w-2xl mx-auto">
            Join thousands of students already learning on EduLearn
          </p>
          <div className="flex gap-4 justify-center pt-4 flex-wrap">
            <Link
              to="/signup"
              className="px-6 py-3 bg-white text-orange-400 font-semibold rounded-lg hover:bg-white/90 transition text-sm sm:text-base"
            >
              Get Started
            </Link>
            <Link
              to="/teach"
              className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white/20 transition text-sm sm:text-base"
            >
              Become an Instructor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
