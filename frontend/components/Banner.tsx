import React from 'react';
import { Link } from 'react-router-dom';

interface BannerProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  bgColorClasses: string;
}

const Banner: React.FC<BannerProps> = ({ title, subtitle, buttonText, buttonLink, bgColorClasses }) => {
  return (
    <div className={`w-full flex-shrink-0 h-80 ${bgColorClasses} text-white`}>
      <div className="h-full flex flex-col items-center justify-center text-center p-8 md:p-12">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3">{title}</h2>
        <p className="text-lg md:text-xl mb-6">{subtitle}</p>
        <Link to={buttonLink} className="bg-white text-primary font-bold py-3 px-8 rounded-full hover:bg-slate-100 transition-colors">
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

export default Banner;
