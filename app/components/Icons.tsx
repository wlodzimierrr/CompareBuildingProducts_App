import type { LucideProps } from 'lucide-react'

export const Icons = {
    Hammer: (props: LucideProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hammer" {...props}>
            <path d="m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9"/>
            <path d="m18 15 4-4"/>
            <path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172V7l-2.26-2.26a6 6 0 0 0-4.202-1.756L9 2.96l.92.82A6.18 6.18 0 0 1 12 8.4V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"/>
        </svg>
    ),
    
};

export const SvgBackground = () => (
    <svg
      className='absolute inset-0 -z-10 h-full w-full stroke-amber-600 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]'
      aria-hidden='true'
    >
      <defs>
        <pattern
          id='0787a7c5-978c-4f66-83c7-11c213f99cb7'
          width={200}
          height={200}
          x='50%'
          y={-1}
          patternUnits='userSpaceOnUse'
        >
          <path d='M.5 200V.5H200' fill='none' />
        </pattern>
      </defs>
      <rect
        width='100%'
        height='100%'
        strokeWidth={0}
        fill='url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)'
      />
    </svg>
  );