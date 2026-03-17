import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Cooking Lab | Professional Culinary Intelligence',
  description: 'A minimalist platform for professional-grade recipe generation and culinary productivity.',
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground selection:bg-primary/10">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <FirebaseClientProvider>
            <Header />
            <div className="pt-16 min-h-screen flex flex-col">
              <main className="flex-1">{children}</main>
              <footer className="border-t border-border bg-background py-12 mt-auto">
                <div className="max-content px-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Cooking Lab</h3>
                      <p className="text-muted-foreground text-sm">
                        Minimalist culinary intelligence for professionals.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Platform</h4>
                      <ul className="space-y-2 text-sm">
                        <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Recipes</a></li>
                        <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Courses</a></li>
                        <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Docs</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Company</h4>
                      <ul className="space-y-2 text-sm">
                        <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About</a></li>
                        <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
                        <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Legal</h4>
                      <ul className="space-y-2 text-sm">
                        <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</a></li>
                        <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                    <div>&copy; {new Date().getFullYear()} Cooking Lab. Built for efficiency.</div>
                    <div className="flex gap-6">
                      <span className="cursor-pointer hover:text-foreground">Twitter</span>
                      <span className="cursor-pointer hover:text-foreground">GitHub</span>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
            <Toaster />
          </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}