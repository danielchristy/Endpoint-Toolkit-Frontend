// src/components/Features/FeaturesSection.js
import React from 'react';
import './FeaturesSection.css';
import '../TestimonialsCarousel/TestimonialsCarousel';
import TestimonialsCarousel from '../TestimonialsCarousel/TestimonialsCarousel';

import { gradImages } from '../../static/people/grad-testimonials/gradImages';

function FeaturesSection() {
  const testimonials = [
    { 
      name: 'Ryan Ramola',
      image: gradImages.ryan,
      gradYear: '2024',
      text: '"Before attending Base Camp Graduate Institute, I spent 11 years working as an automotive technician. While the job gave me valuable experience, it came with limited benefits and few opportunities for long-term growth. I knew I wasn’t happy, and I needed a change. That’s when I found Base Camp. Going through this program was one of the best decisions I’ve ever made. It opened doors I never thought possible and gave me the tools and confidence to transition into the tech industry. Today, I work at mTrade, where I’ve begun a fulfilling career in technology with incredible benefits and room for growth—including the opportunity to eventually move into a development role within the company. Base Camp also gave me the skills and experience to take on freelance work. After graduation, my team and I continued developing our capstone client’s project and successfully turned it into a completed product. She’s now a paying client, which has been an incredibly rewarding outcome. We’re also in talks with a new client to build a career coaching website that will replace their outdated Excel-based system. This project has the potential to evolve into a subscription service for similar programs across the state—and even the country.The journey wasn’t easy. Balancing a full-time job and life’s challenges while going through an intensive program required a lot of determination. But now, I’m pursuing a career I’ve always been passionate about, and I owe that to Base Camp."'
    },
    {
      name: 'Ashley Glasz',
      image: gradImages.ashley,
      gradYear: '2023',
      text: '"What can I say? Attending Base Camp Coding Academy (BCCA)has completely changed my life. Before BCCA, I was in a job that, while I loved it, had no room for professional growth. The Base Camp opportunity came to my attention by chance and, because I had dabbled in web design in the past, my husband encouraged me to apply. Being a student at BCCA was the most rewarding as well as the hardest thing I have ever done in my professional life. I’ll never forget the people I got to learn alongside, and the memories made there. During the final weeks of Base Camp, I applied for and accepted a job with Hat Boy Software, a small Oxford based software development company. My first year with them I worked part time, fully remote, and was able to learn and grown my development skills. I am now full time with Hat Boy and really enjoy being fully emersed in the software development world. I’ll forever be thankful for the opportunity to attend BCCA and the skillsets I learned while there!"'
    }
  ];

  return (
    <section className="features-section">
      <div className="features-container">
        <div className="feature-card">
          <h4>Enduring Partnerships</h4>
          <p>
            Imagine us in the trenches with you offering warm, rigorous,
            and ambitious collaboration for your high-stakes mission.
          </p>
        </div>

        <div className="feature-card">
          <h4>Domain Expertise</h4>
          <p>
            We can’t predict what you need next, but we can bring our years
            of workforce technology insights to help you uncover elegant
            solutions that last.
          </p>
        </div>

        <div className="feature-card">
          <h4>Full-Stack Solutions</h4>
          <p>
            A 12-person powerhouse skilled to discover, design, develop,
            and deploy transformative user experiences with emerging
            technologies—on time, every time.
          </p>
        </div>
      </div>

      <div className='testimonials-section'>
        <h4>What BCCA Grads Have To Say</h4>
        <TestimonialsCarousel testimonials={testimonials} />
      </div>
    </section>
  );
}
 
 export default FeaturesSection;


