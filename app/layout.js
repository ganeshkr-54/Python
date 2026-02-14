import './globals.css';

export const metadata = {
  title: 'Bharath Icons Puzzle Tribute',
  description: 'Educational tribute puzzle games for Indian personalities.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 min-h-screen">{children}</body>
    </html>
  );
}
