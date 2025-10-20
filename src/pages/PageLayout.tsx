import Header from '../components/Header';

export default function PageLayout({children}: { children: React.ReactNode}) {
  return (
    <div className="flex flex-col min-h-screen w-full bg-theme text-theme-primary transition-colors duration-200">
      <Header />
      {children}
    </div>
  )
}