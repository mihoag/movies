import { Link } from 'react-router-dom'; // Importing Link component from react-router-dom for navigation
import { FaExclamationTriangle } from 'react-icons/fa'; // Importing the Exclamation Triangle icon from react-icons

/**
 * NotFoundPage component that displays a 404 error message.
 * It includes an icon, a heading, a message, and a link to navigate back to the home page.
 */
const NotFoundPage: React.FC = () => {
  return (
    <section className="text-center flex flex-col justify-center items-center h-96">
      {/* Exclamation Triangle Icon */}
      <FaExclamationTriangle className="text-yellow-400 text-6xl mb-4" />

      {/* 404 Not Found Heading */}
      <h1 className="text-6xl font-bold mb-4">404 Not Found</h1>

      {/* Error Message */}
      <p className="text-xl mb-5">This page does not exist</p>

      {/* Link to Home Page */}
      <Link to="/" className="text-white rounded-[10px] bg-indigo-700 hover:bg-indigo-900 px-3 py-2 mt-4">
        Go Back
      </Link>
    </section>
  );
};

export default NotFoundPage; // Export the NotFoundPage component as the default export
