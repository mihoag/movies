import { Link } from 'react-router-dom'; // Importing Link component from react-router-dom for navigation
import { FaExclamationTriangle } from 'react-icons/fa'; // Importing the Exclamation Triangle icon from react-icons

/**
 * ServerErrorPage component that displays a 500 error message.
 * It includes an icon, a heading, a message, and a link to navigate back to the home page.
 */
const ServerErrorPage: React.FC = () => {
  return (
    <section className="text-center flex flex-col justify-center items-center h-96">
      {/* Exclamation Triangle Icon */}
      <FaExclamationTriangle className="text-yellow-400 text-6xl mb-4" />

      {/* 500 Internal Server Error */}
      <h1 className="text-6xl font-bold mb-4">500 Internal Server Error</h1>

      {/* Error Message */}
      <p className="text-xl mb-5"> The server is error </p>

      {/* Link to Home Page */}
      <Link to="/" className="text-white bg-indigo-700 hover:bg-indigo-900 rounded-md px-3 py-2 mt-4">
        Go Back
      </Link>
    </section>
  );
};

export default ServerErrorPage; // Export the NotFoundPage component as the default export
