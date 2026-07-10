import { SVGProps } from 'react';

interface LogoProps extends SVGProps<SVGSVGElement> {
  variant?: 'light' | 'dark' | 'monochrome';
  className?: string;
}

export default function Logo({ variant = 'dark', className, ...props }: LogoProps) {
  const primaryColor = variant === 'light' ? '#FFFFFF' : variant === 'dark' ? '#0D47A1' : 'currentColor';
  const secondaryColor = variant === 'light' ? '#FFC107' : variant === 'dark' ? '#FFC107' : 'currentColor';

  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Shield Base */}
      <path 
        d="M50 95C50 95 15 80 15 40V15L50 5L85 15V40C85 80 50 95 50 95Z" 
        fill={primaryColor} 
        opacity={variant === 'monochrome' ? 0.8 : 1}
      />
      
      {/* Open Book */}
      <path 
        d="M25 45L50 55L75 45M25 45V65L50 75V55M75 45V65L50 75" 
        stroke={secondaryColor} 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* Torch Flame */}
      <path 
        d="M50 25C50 25 42 35 46 45C46 45 54 48 50 25Z" 
        fill={secondaryColor}
      />
      <path 
        d="M54 30C54 30 58 35 55 42C55 42 50 45 54 30Z" 
        fill={variant === 'light' ? '#FFFFFF' : '#FFFFFF'}
        opacity="0.8"
      />
      
      {/* Star */}
      <path 
        d="M50 15L52 20H57L53 23L54 28L50 25L46 28L47 23L43 20H48L50 15Z" 
        fill={secondaryColor}
      />
      
      {/* Laurel Leaves left */}
      <path 
        d="M20 70C20 70 10 55 15 40" 
        stroke={secondaryColor} 
        strokeWidth="3" 
        strokeLinecap="round"
      />
      <path 
        d="M80 70C80 70 90 55 85 40" 
        stroke={secondaryColor} 
        strokeWidth="3" 
        strokeLinecap="round"
      />
    </svg>
  );
}
