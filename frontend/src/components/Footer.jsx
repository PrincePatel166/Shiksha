const Footer = () => {
    return (
      <footer className="bg-primary text-white py-4">
        <div className="container mx-auto text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Shiksha. All rights reserved.</p>
          <p className="text-gray-300">
            Made with ❤️ for learning and growth.
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  