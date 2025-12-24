
interface LoadingScreenProps {
  pageType?: string;
}

export default function LoadingScreen({ pageType }: LoadingScreenProps) {

  const text = pageType ? `Loading ${pageType}` : 'Loading..';
  
  return (
    <div className="flex items-center justify-center flex-1 w-full p-8">
      <div className="flex flex-col items-center gap-4">
        {/* Animated spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-theme rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-theme-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        
        {/* Loading text with subtle animation */}
        <div className="flex items-center justify-center gap-2">
          <span className="text-lg font-medium text-theme-primary">{text}</span>
        </div>

      </div>
    </div>
  );
}