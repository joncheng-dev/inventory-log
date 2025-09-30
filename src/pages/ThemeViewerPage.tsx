import ThemeDebug from '../components/ThemeDebug';

export default function ThemeViewerPage() {
  return (
    <div className="min-h-screen bg-theme text-theme-primary">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Theme Viewer</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Theme Debug Panel</h2>
          <p className="text-theme-secondary mb-4">
            Use the debug panel below to test and manage theme settings.
          </p>
          
          {/* Render the ThemeDebug component */}
          <ThemeDebug />
        </div>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Theme Information</h2>
            <div className="bg-theme-surface p-4 rounded-lg border border-theme">
              <p className="text-theme-secondary">
                This page demonstrates the theme system in action. The ThemeDebug component 
                provides real-time theme information and controls for testing different theme states.
              </p>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Available Themes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-theme-surface p-4 rounded-lg border border-theme">
                <h3 className="font-semibold text-primary-500 mb-2">Light Theme</h3>
                <p className="text-theme-secondary text-sm">
                  Clean, bright interface optimized for daytime use.
                </p>
              </div>
              <div className="bg-theme-surface p-4 rounded-lg border border-theme">
                <h3 className="font-semibold text-primary-500 mb-2">Dark Theme</h3>
                <p className="text-theme-secondary text-sm">
                  Easy on the eyes, perfect for low-light environments.
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Theme Colors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-theme-surface p-4 rounded-lg border border-theme">
                <h3 className="font-semibold text-primary-500 mb-2">Primary Colors</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-primary-500 rounded"></div>
                    <span className="text-theme-secondary text-sm">Primary 500</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-primary-600 rounded"></div>
                    <span className="text-theme-secondary text-sm">Primary 600</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-primary-700 rounded"></div>
                    <span className="text-theme-secondary text-sm">Primary 700</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-theme-surface p-4 rounded-lg border border-theme">
                <h3 className="font-semibold text-primary-500 mb-2">Text Colors</h3>
                <div className="space-y-2">
                  <div className="text-theme-primary">Primary Text</div>
                  <div className="text-theme-secondary">Secondary Text</div>
                  <div className="text-theme-muted">Muted Text</div>
                </div>
              </div>
              
              <div className="bg-theme-surface p-4 rounded-lg border border-theme">
                <h3 className="font-semibold text-primary-500 mb-2">Surface Colors</h3>
                <div className="space-y-2">
                  <div className="bg-theme p-2 rounded text-theme-primary text-sm">Background</div>
                  <div className="bg-theme-surface p-2 rounded text-theme-primary text-sm">Surface</div>
                  <div className="border border-theme p-2 rounded text-theme-primary text-sm">Border</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
