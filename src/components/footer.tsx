'use client';

import { useState, useEffect } from 'react';

export function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="py-6 border-t">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>&copy; {year} Aswan AI Portfolio. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
