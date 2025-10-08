export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-white mt-auto">
      <div className="container mx-auto px-6 py-4 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between">
        <p>© {year} Guillaume Coquemont — Tous droits réservés.</p>

        <div className="flex gap-4 mt-2 sm:mt-0">
          <a
            href="mailto:contact@guillaumecoquemont.fr"
            className="hover:text-blue-600 transition-colors"
          >
            Contact
          </a>
          <a
            href="https://www.linkedin.com/in/guillaume-coquemont"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/GuillaumeCoquemont"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://guillaume-coquemont.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            Portfolio
          </a>
        </div>
      </div>
    </footer>
  );
}