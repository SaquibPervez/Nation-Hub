import './globals.css'
import ThemeRegistry from './components/ThemeRegistry';
import { Nunito_Sans } from 'next/font/google'; 
import Navbar from './components/Navbar';

const nunitoSans = Nunito_Sans({
  weight: ['300', '400', '500', '600', '700'], 
  subsets: ['latin'], 
  display: 'swap', 
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunitoSans.className}> 
        <ThemeRegistry>
          <Navbar />
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
