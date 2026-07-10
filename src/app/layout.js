import './globals.css';
import Navbar from '../components/ui/Navbar.jsx';

export const metadata = {
  title: 'PDF Converter',
  description: 'Convert your PDF files easily',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}