
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Cooking Lab Academy | Master Professional Cuisine',
  description: 'The world\'s premier digital kitchen. Professional-grade recipe generation and culinary intelligence.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground selection:bg-primary/20">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <FirebaseClientProvider>
            <Header />
            <main className="relative min-h-[calc(100vh-3.5rem)]">{children}</main>
            <Toaster />
            <footer className="border-t border-border/50 bg-card py-16">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                  <div className="space-y-4">
                    <h3 className="font-headline text-2xl font-bold text-primary italic">Cooking Lab</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Elevating domestic cooking to professional academy standards through artificial intelligence and precision.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-widest mb-6">Academy</h4>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li><a href="#" className="hover:text-primary transition-colors">Curriculum</a></li>
                      <li><a href="#" className="hover:text-primary transition-colors">Chef Instructors</a></li>
                      <li><a href="#" className="hover:text-primary transition-colors">Resources</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-widest mb-6">Account</h4>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li><a href="#" className="hover:text-primary transition-colors">Chef Profile</a></li>
                      <li><a href="#" className="hover:text-primary transition-colors">Saved Recipes</a></li>
                      <li><a href="#" className="hover:text-primary transition-colors">Preferences</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-widest mb-6">Follow</h4>
                    <div className="flex gap-6">
                      <span className="text-xs font-bold uppercase tracking-widest text-primary cursor-pointer">Instagram</span>
                      <span className="text-xs font-bold uppercase tracking-widest text-primary cursor-pointer">YouTube</span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                  <div>&copy; {new Date().getFullYear()} Cooking Lab Academy. All Rights Reserved.</div>
                  <div className="flex gap-8">
                    <span>Terms of Service</span>
                    <span>Privacy Policy</span>
                  </div>
                </div>
              </div>
            </footer>
          </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
