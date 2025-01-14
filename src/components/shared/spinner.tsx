import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader'; // Importing the ClipLoader component from react-spinners

// CSS override object to customize the loader's display style
const override = {
  display: 'block',
};

/**
 * Spinner component that displays a loading spinner.
 * @param {boolean} loading - Indicates whether the spinner should be displayed.
 * @param {string} alignStyle - Tailwind CSS classes for aligning the spinner.
 */
interface SpinnerProps {
  loading: boolean;
  alignStyle: string; // Typing the alignStyle as a string for Tailwind CSS classes
}

const Spinner: React.FC<SpinnerProps> = ({ loading, alignStyle }) => {
  return (
    loading && ( // Render the spinner only if loading is true
      <div className={alignStyle}>
        {/* Apply alignment styles */}
        <ClipLoader color="#4338ca" loading={true} cssOverride={override} size={70} /> {/* Spinner component */}
      </div>
    )
  );
};

export default Spinner; // Export the Spinner component as the default export.
