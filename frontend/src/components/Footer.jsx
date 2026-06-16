function Footer() {
  const appName = import.meta.env.VITE_APP_NAME || "Acadex";
  const appVersion = import.meta.env.VITE_APP_VERSION || "1.0.0";

  return (
    <footer className="bg-dark text-white text-center p-3 mt-4">
      {appName} - v{appVersion} © {new Date().getFullYear()}
    </footer>
  );
}

export default Footer;
