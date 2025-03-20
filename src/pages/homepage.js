
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import './homepage.css';

const workoutData = [
  { name: 'Cardio', value: 30 },
  { name: 'Strength', value: 25 },
  { name: 'Flexibility', value: 20 },
  { name: 'Balance', value: 15 },
  { name: 'Others', value: 10 }
];

const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#0088FE', '#FF4560'];

const progressData = [
  { name: 'Week 1', calories: 1200, workouts: 5 },
  { name: 'Week 2', calories: 1500, workouts: 6 },
  { name: 'Week 3', calories: 1800, workouts: 7 },
  { name: 'Week 4', calories: 2000, workouts: 8 }
];

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-heading">Unlock Your Potential, One Step at a Time</h1>
          <p className="hero-text">
            Your fitness journey starts now. Stay motivated with powerful insights 
            and smart tracking designed to help you succeed.
          </p>
          {/* <a href="/signup" className="btn hero-btn">Take the First Step</a> */}
        </div>
        <div className="hero-image"></div>
      </div>
      
      {/* About Us Section */}
      <div className="about-section">
        <div className="container">
          <h2 className="section-heading">About Our Platform</h2>
          <p className="about-text">
            We started this journey with one mission: to empower people to live healthier lives.
            Our platform combines cutting-edge technology with expert guidance to help you
            reach your fitness goals efficiently and sustainably.
          </p>
          <p className="about-text">
            Whether you're looking to build muscle, lose weight, or simply stay active,
            our all-in-one platform provides the tools and motivation you need to succeed.
          </p>
        </div>
      </div>

      {/* Workout Breakdown Section (Pie Chart) */}
  

      {/* Progress Section (Bar Chart) */}
  

      {/* Success Stories Section */}
      <div className="success-stories-section">
        <div className="container">
          <h2 className="section-heading">Success Stories</h2>
          <div className="success-grid">
            <div className="success-card">
              {/* <img src="/images/success1.jpg" alt="Success" /> */}
              <h4 className="success-title">John’s Transformation</h4>
              <p className="success-text">
                "In just 3 months, I’ve lost 20 pounds and gained confidence! The personalized insights were game-changing."
              </p>
            </div>
            <div className="success-card">
              {/* <img src="/images/success2.jpg" alt="Success" /> */}
              <h4 className="success-title">Emily’s Fitness Journey</h4>
              <p className="success-text">
                "I finally found a platform that works for me. The tracking and motivation have helped me stay consistent."
              </p>
            </div>
            <div className="success-card">
              {/* <img src="/images/success3.jpg" alt="Success" /> */}
              <h4 className="success-title">Mike’s Strength Gains</h4>
              <p className="success-text">
                "I’ve never felt stronger! The strength training programs are top-notch and easy to follow."
              </p>
            </div>
            <div className="success-card">
              {/* <img src="/images/success4.jpg" alt="Success" /> */}
              <h4 className="success-title">Sarah’s Flexibility Improvement</h4>
              <p className="success-text">
                "My flexibility has improved dramatically thanks to the guided stretching routines."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="container">
          <h2 className="section-heading">Our Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h4 className="feature-title">Personalized Workouts</h4>
              <p className="feature-text">
                Get workouts tailored to your fitness level, goals, and preferences.
              </p>
            </div>
            <div className="feature-card">
              <h4 className="feature-title">Progress Tracking</h4>
              <p className="feature-text">
                Track your progress with detailed analytics and visual reports.
              </p>
            </div>
            <div className="feature-card">
              <h4 className="feature-title">Expert Guidance</h4>
              <p className="feature-text">
                Access expert advice and tips from certified fitness trainers.
              </p>
            </div>
            <div className="feature-card">
              <h4 className="feature-title">Community Support</h4>
              <p className="feature-text">
                Join a supportive community of like-minded individuals on the same journey.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <div className="container">
          <h2 className="section-heading">Frequently Asked Questions</h2>
          <div className="faq-item">
            <h4 className="faq-question">How do I track my workouts?</h4>
            <p className="faq-answer">Simply log in to your account, go to the tracking section, and enter your workout details.</p>
          </div>
          <div className="faq-item">
            <h4 className="faq-question">Is there a free trial?</h4>
            <p className="faq-answer">Yes! You can try our Pro plan for 7 days completely free.</p>
          </div>
          <div className="faq-item">
            <h4 className="faq-question">Can I cancel anytime?</h4>
            <p className="faq-answer">Yes, you can cancel your subscription anytime without any hidden fees.</p>
          </div>
          <div className="faq-item">
            <h4 className="faq-question">Do you offer nutrition plans?</h4>
            <p className="faq-answer">Yes, we offer personalized nutrition plans to complement your fitness routine.</p>
          </div>
          <div className="faq-item">
            <h4 className="faq-question">Is the platform suitable for beginners?</h4>
            <p className="faq-answer">Absolutely! Our platform is designed to cater to all fitness levels, from beginners to advanced.</p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section">
        <div className="container">
          <h2 className="section-heading">What Our Users Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-text">
                "This platform has completely transformed my approach to fitness. I’ve never felt better!"
              </p>
              <h4 className="testimonial-author">- Jane Doe</h4>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">
                "The progress tracking is amazing. It keeps me motivated to push harder every day."
              </p>
              <h4 className="testimonial-author">- John Smith</h4>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">
                "I love the community aspect. It’s great to connect with others who share similar goals."
              </p>
              <h4 className="testimonial-author">- Emily Johnson</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta-section">
        <h2 className="cta-heading">Start Your Fitness Journey Today</h2>
        <p className="cta-text">
          Join thousands of users achieving their health goals.
        </p>
      </div>
    </div>
  );
};

export default Home;