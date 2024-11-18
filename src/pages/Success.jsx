import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const AnimatedCheckPage = () => {
  const circleRef = useRef(null);
  const checkRef = useRef(null);

  useEffect(() => {
    // Setting up the circle with a hidden stroke at first
    gsap.set(circleRef.current, { strokeDasharray: '283', strokeDashoffset: '282' });

    // Animate the circle drawing around
    gsap.to(circleRef.current, {
      strokeDashoffset: 0,
      duration: 0.8,
      ease: 'power1.inOut'
    });

    // Set up the check mark path to be "invisible" by using strokeDasharray and strokeDashoffset
    gsap.set(checkRef.current, { strokeDasharray: 100, strokeDashoffset: 100 });

    // Animate the check mark being drawn after the circle completes
    gsap.to(checkRef.current, {
      strokeDashoffset: 0,
      duration: 0.5,
      delay: 1, // Start after the circle finishes
      ease: 'power1.out'
    });
  }, []);

  return (
    <div className="h-[80vh]" style={styles.pageContainer}>
      <svg width="150" height="150" viewBox="0 0 100 100" style={styles.svgContainer}>
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="#0a1ed9"
          strokeWidth="4"
          fill="none"
          ref={circleRef}
        />
        <path
          d="M30 50 L45 65 L70 35"
          stroke="#0a1ed9"
          strokeWidth="4"
          fill="none"
          ref={checkRef}
          strokeLinecap="round"
        />
      </svg>
      <h2 style={styles.headerText}>Success</h2>
      <p style={styles.paragraphText}>Your ticket has been submitted
      successfully</p>
      <button style={styles.button}>Done</button>
    </div>
  );
};

// Styling for the page and elements
const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '88vh',
    width: '100%',
    backgroundColor: '#fff',
    fontFamily: 'Arial, sans-serif'
  },
  svgContainer: {
    marginBottom: '20px'
  },
  headerText: {
    color: '#0a1ed9',
    fontSize: '24px',
    margin: '10px 0'
  },
  paragraphText: {
    color: '#000',
    fontSize: '16px',
    textAlign: 'center',
    marginBottom: '20px',
    width: '254px',
    fontWeight: '400',
     lineHeight: '19px',
     paddingBottom: `10px`
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#0a1ed9',
    border: 'none',
    width: '254px',
    borderRadius: '5px',
    cursor: 'pointer',
  }
};

export default AnimatedCheckPage;
