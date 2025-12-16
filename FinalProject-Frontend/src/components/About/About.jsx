import "./About.css";
import jb from "../../assets/jb-author-img_resize.jpg";

function About() {
  return (
    <>
      <div className="about-page">
        <div className="about-page__content">
          <div className="author-img__container">
            <img
              src={jb}
              alt="Image of Jonathan Brandt"
              className="author__image"
            />
          </div>
          <div className="about-page__text-container">
            <h1 className="about-page__header">About the author</h1>
            <p className="about-page__subtext">
              My name is Jonathan Brandt, and I am an aspiring Fullstack
              Software Engineer. I fell in love with the field after committing
              time to cyber security due to the creative freedom I have, and the
              technical skill required to execute. I aspire to grow these skills
              and create a stable career, and I have been able to do it with
              Triple Ten. My time at Triple Ten has been long, but fulfilling as
              I have been able to dedicate my time to growing practical and job
              ready skills. I have become proficient with React Frameworks such
              as Vite to create fully functional web applications
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
