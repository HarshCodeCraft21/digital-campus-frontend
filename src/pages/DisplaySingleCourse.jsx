import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCourse } from "../context/CourseContext"
import { Users, Lock, CheckCircle2, CheckCircleIcon, CheckCircle2Icon, Play } from 'lucide-react';
import Checkout from "../components/Checkout.jsx";
import { UserContext } from '../context/UserContext.js';

const DisplaySingleCourse = () => {
  const { id } = useParams();
  const { course } = useCourse();
  const courses = course.find(e => id === e._id);
  const { userValue } = useContext(UserContext);

  return (
    <div className='min-h-screen'>
      <div
        className='relative h-[400px] bg-cover bg-center'
        style={{ backgroundImage: `url(${courses.thumbnail})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40">
          <div className='container px-4 h-full flex items-center'>
            <div className='text-white max-w-3xl space-y-4'>
              <span className="badge badge-primary mb-2">{courses.category}</span>
              <h1 className="text-4xl md:text-5xl font-bold">{courses.title}</h1>
              <p className="text-xl">{courses.description}</p>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{courses.enrollments.length} students</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <h2 className="card-title">Course Preview</h2>
                <div className="aspect-video rounded-lg overflow-hidden bg-base-200">
                  <video width="640" height="360" controls>
                    <source src={courses.introURL} type="video/mp4"></source>
                    Your browser does not support the video tag.
                  </video>

                </div>
              </div>
            </div>
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <h2 className="card-title">Course Drive Link</h2>
                <div className="space-y-2">
                  <div className='flex items-center justify-between p-3 border rounded-lg hover:bg-base-200 transition'>
                    {
                      courses.enrollments.includes(userValue._id) ? (
                        <div className="flex items-center gap-3">
                          <CheckCircle2Icon className="h-5 w-5 opacity-60" />
                          <Link to={courses.driveLink} className='text-blue-500 underline'>{`click here for you ${courses.title} course.`}</Link>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <Lock className="h-5 w-5 opacity-60" />
                          <span className="font-medium">{courses.title}</span>
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow sticky top-20">
              <div className="card-body space-y-6">
                <div>
                  <div className="text-3xl font-bold text-primary">
                    ₹{courses.price.toLocaleString("en-IN")}
                  </div>
                  <p className="text-sm opacity-70 mt-1">One-time payment</p>
                </div>
                <Checkout courseId={courses._id} />
                <div className="space-y-3 pt-4 border-t">
                  <h3 className="font-semibold">This course includes:</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Play className="h-4 w-4 text-primary" />
                      <span>video lectures</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <CheckCircle2Icon className="h-4 w-4 text-primary" />
                      <span>Lifetime access</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DisplaySingleCourse
