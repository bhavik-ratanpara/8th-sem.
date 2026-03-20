'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { RadarFeatures } from '@/components/RadarFeatures';

const words = [
  'Not Harder.',
  'Eat Better.',
  'Save Time.',
  'Impress Everyone.',
  'Like a Chef.',
];

export function TypewriterHero() {
  const [currentWord, setCurrentWord] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const blink = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(blink);
  }, []);

  useEffect(() => {
    const fullWord = words[wordIndex];

    if (!isDeleting && currentWord === fullWord) {
      const pause = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(pause);
    }

    if (isDeleting && currentWord === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const speed = isDeleting ? 35 : 60;

    const timer = setTimeout(() => {
      setCurrentWord((prev) =>
        isDeleting
          ? fullWord.slice(0, prev.length - 1)
          : fullWord.slice(0, prev.length + 1)
      );
    }, speed);

    return () => clearTimeout(timer);
  }, [currentWord, isDeleting, wordIndex]);

  const handleScrollToForm = () => {
    document.getElementById('recipe-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="w-full flex flex-col min-[480px]:flex-row items-center justify-center gap-2 md:gap-12 min-h-fit md:min-h-[520px] px-5 md:px-[60px] py-4 md:py-20 bg-background overflow-hidden">
      {/* Right Side (Above on Mobile) — Radar */}
      <div className="order-1 min-[480px]:order-2 w-[min(260px,75vw)] h-[min(260px,75vw)] min-[480px]:w-[min(200px,40vw)] min-[480px]:h-[min(200px,40vw)] md:w-[420px] md:h-[420px] flex items-center justify-center flex-shrink-0 p-0 m-0">
        <RadarFeatures />
      </div>

      {/* Left Side (Below on Mobile) - Content */}
      <div className="order-2 min-[480px]:order-1 w-full min-[480px]:w-[55%] flex flex-col items-center min-[480px]:items-start text-center min-[480px]:text-left px-0 mt-2 min-[480px]:mt-0">
        <h1 
          className="font-extrabold leading-[1.08] tracking-[-0.04em] mb-0" 
          style={{ 
            fontFamily: "'Cal Sans', Inter, sans-serif", 
            fontSize: 'clamp(28px, 7vw, 56px)' 
          }}
        >
          <span className="block text-foreground">Cook Smarter,</span>
          <span className="block min-h-[1.2em] text-primary">
            {currentWord}
            <span className={cn(
              "inline-block ml-1 font-light transition-opacity duration-100", 
              showCursor ? "opacity-100" : "opacity-0"
            )}>|</span>
          </span>
        </h1>

        <p 
          className="mt-2 md:mt-4 text-[14px] md:text-[22px] font-normal leading-[1.6] md:leading-[1.8] text-muted-foreground max-w-full md:max-w-[420px]"
          style={{ fontFamily: "'Crustaceans Signature', cursive" }}
        >
          Get accurate recipes, exact quantities, and step-by-step guidance — powered by AI.
        </p>

        <div className="mt-4 md:mt-8 flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-[10px]">
          <Button 
            onClick={user ? handleScrollToForm : undefined}
            asChild={!user}
            className="h-10 md:h-12 px-6 md:px-7 text-sm font-semibold rounded-lg bg-primary hover:bg-primary/90 text-white border-none shadow-sm transition-all"
          >
            {user ? (
              <span>Generate a Recipe</span>
            ) : (
              <Link href="/signup">Generate a Recipe</Link>
            )}
          </Button>
          <Button 
            variant="outline" 
            className="h-10 md:h-12 px-6 md:px-7 text-sm font-medium rounded-lg border-border bg-transparent text-muted-foreground hover:text-foreground hover:border-foreground transition-all"
          >
            See How It Works
          </Button>
        </div>
      </div>
    </section>
  );
}