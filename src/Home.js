import React from "react";
import "./Home.css";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import homeImage from "./images/home.jpeg";
import aboutImage from "./images/about.jpeg";
import quizImage from "./images/onlineQuiz.webp";
import ecommerceImage from "./images/ecommerce marketing.webp";
import newsifyImage from "./images/newsApp.jpg";
import resume from "./images/Arjun_Javer_Resume.pdf";

export default function Home() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });


  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value, 
    }));
  };

  const handleSubmit = async (e) => {
    Swal.fire({
      title: "Submitting...",
      text: "Please wait while we process your request.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(); 
      },
    });
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const mobileRegex = /^[0-9]{10}$/; 

   
    if (!emailRegex.test(formData.email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
        timer: 3000, 
        
      });
      return;
    }
  
    if (!mobileRegex.test(formData.mobile)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Mobile Number",
        text: "Please enter a valid 10-digit mobile number.",
        timer: 3000, 
        
      });
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: data.message,
          timer: 3000, 
          
        });
  
        setFormData({ fullName: "", email: "", mobile: "", subject: "", message: "" });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Something went wrong",
          timer: 3000, 
          
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Please try again later.",
        timer: 3000, 
        
      });
    }
  };

  useEffect(() => {
    let menuIcon = document.querySelector("#menu-icon");
    let navbar = document.querySelector(".navbar");

    if (menuIcon && navbar) {
      menuIcon.onclick = () => {
        menuIcon.classList.toggle("bx-x");
        navbar.classList.toggle("active");
      };
    }

    let sections = document.querySelectorAll("section");
    let navLinks = document.querySelectorAll("header nav a");

    const handleScroll = () => {
      let top = window.scrollY;
      sections.forEach((sec) => {
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");

        if (top >= offset && top < offset + height) {
          navLinks.forEach((link) => link.classList.remove("active"));
          let activeLink = document.querySelector(`header nav a[href*=${id}]`);
          if (activeLink) activeLink.classList.add("active");
          sec.classList.add("show-animate");
        } else {
          sec.classList.remove("show-animate");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <header className="header">
        <a href="#" className="logo">
          Portfolio<span className="animate" style={{ "--i": 1 }}></span>
        </a>

        <div className="bx bx-menu" id="menu-icon">
          <span className="animate" style={{ "--i": 2 }}></span>
        </div>

        <nav className="navbar">
          <a href="#home" className="active">
            Home
          </a>
          <a href="#about">About</a>
          <a href="#education">Education</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>

          <span className="active-nav"></span>
          <span className="animate" style={{ "--i": 2 }}></span>
        </nav>
      </header>

      <section className="home show-animate" id="home">
        <div className="home-content">
          <h1>
            Hi, I'm <span>Arjun Javer</span>
            <span className="animate" style={{ "--i": 2 }}></span>
          </h1>
          <div className="text-animate">
            <h3>Front-End Developer</h3>
            <span className="animate" style={{ "--i": 3 }}></span>
          </div>
          <p>
            Enthusiastic about contributing my technical skills and
            problem-solving abilities to a dynamic team in the realm of
            technology. Dedicated to driving innovation, optimizing performance,
            and collaborating effectively to achieve project goals. Eager to
            leverage a passion for cutting-edge advancements and continuous
            learning to make a positive impact.
            <span className="animate" style={{ "--i": 4 }}></span>
          </p>

          <div className="btn-box">
            <a href={resume} download className="btn">
              Download Resume
            </a>
            <span className="animate" style={{ "--i": 5 }}></span>
          </div>
        </div>

        <div className="home-sci">
          <a href="https://www.linkedin.com/in/arjun-javer-1a8400293">
            <i className="bx bxl-linkedin"></i>
          </a>
          <a href="https://x.com/ArjunJaver">
            <i className="bx bxl-twitter"></i>
          </a>
          <a href="https://github.com/arjunjaver">
            <i className="bx bxl-github"></i>
          </a>
          <a href="mailto:arjunjaver86@gmail.com">
            <i class='bx bxl-gmail'></i>
          </a>
          <span className="animate" style={{ "--i": 6 }}></span>
        </div>

        <div className="home-img">
          <div className="img-box">
            <div className="img-item">
              <img src={homeImage} alt="" />
            </div>
          </div>
        </div>

        <span className="animate home-img" style={{ "--i": 7 }}></span>
      </section>

      <section className="about" id="about">
        <h2 className="heading">
          About <span>Me</span>
          <span className="animate scroll" style={{ "--i": 1 }}></span>
        </h2>

        <div className="about-img">
          <img src={aboutImage} alt="" />
          <span className="circle-spin"></span>
          <span className="animate scroll" style={{ "--i": 2 }}></span>
        </div>

        <div className="about-content">
          <h3>
            Hi there! Glad to see you here.
            <span className="animate scroll" style={{ "--i": 3 }}></span>
          </h3>
          <p>
            Hi, I’m Arjun Javer, a passionate frontend developer with a strong
            foundation in web and mobile development. I specialize in crafting
            responsive, user-friendly, and visually appealing websites using
            modern technologies like React, Next.js, and Angular. My goal is to
            build seamless digital experiences that are both functional and
            aesthetically pleasing.
            <span className="animate scroll" style={{ "--i": 4 }}></span>
          </p>

          <div className="btn-box btns">
            <a href="#contact" className="btn">
              Contact Me
            </a>
            <span className="animate scroll" style={{ "--i": 5 }}></span>
          </div>
        </div>
      </section>

      <section className="education" id="education">
        <h2 className="heading">
          My <span>Journey</span>
          <span className="animate scroll" style={{ "--i": 1 }}></span>
        </h2>

        <div className="education-row">
          <div className="education-column">
            <h3 className="title">
              Education
              <span className="animate scroll" style={{ "--i": 2 }}></span>
            </h3>

            <div className="education-box">
              <div className="education-content">
                <div className="content">
                  <div className="year">
                    <i className="bx bxs-calendar"></i>Oct 2022 - Jun 2024
                  </div>
                  <h3>Master of Computer Applications</h3>
                  <p>
                    D. Y. Patil Institute of MCA and Management, Akurdi, Pune.
                    <br />
                    Savitribai Phule Pune University.
                    <br />
                    CGPA: <b>7.73</b>
                  </p>
                </div>
              </div>

              <div className="education-content">
                <div className="content">
                  <div className="year">
                    <i className="bx bxs-calendar"></i>Jul 2019 - Sep 2022
                  </div>
                  <h3>Bachelor of Computer Application (Science)</h3>
                  <p>
                    Pratibha College of Commerce & Computer Studies, Chinchwad,
                    Pune.
                    <br />
                    Savitribai Phule Pune University.
                    <br />
                    CGPA: <b>8.86</b>
                  </p>
                </div>
              </div>

              <div className="education-content">
                <div className="content">
                  <div className="year">
                    <i className="bx bxs-calendar"></i>May 2019
                  </div>
                  <h3>HSC (Science)</h3>
                  <p>
                    Pratibha Junior College, Chinchwad, Pune.
                    <br />
                    Maharashtra State Board.
                    <br />
                    Percentage: <b>47.54</b>
                  </p>
                </div>
              </div>

              <div className="education-content">
                <div className="content">
                  <div className="year">
                    <i className="bx bxs-calendar"></i>Jun 2017
                  </div>
                  <h3>SSC</h3>
                  <p>
                    Shri Shivchatrapati Shivaji Raje Madhyamik Vidyalaya,
                    Chinchwad, Pune.
                    <br />
                    Maharashtra State Board.
                    <br />
                    Percentage: <b>73.00</b>
                  </p>
                </div>
              </div>

              <span className="animate scroll" style={{ "--i": 3 }}></span>
            </div>
          </div>
        </div>
      </section>

      <section className="skills" id="skills">
        <h2 className="heading">
          My <span>Skills</span>
          <span className="animate scroll" style={{ "--i": 1 }}></span>
        </h2>

        <div className="skills-row">
          <div className="skills-column">
            <h3 className="title">
              Frontend
              <span className="animate scroll" style={{ "--i": 2 }}></span>
            </h3>

            <div className="skills-box">
              <div className="skills-content">
                <div className="progress">
                  <h3>
                    HTML5<span>90%</span>
                  </h3>
                  <div className="bar">
                    <span></span>
                  </div>
                </div>

                <div className="progress">
                  <h3>
                    CSS3<span>80%</span>
                  </h3>
                  <div className="bar">
                    <span></span>
                  </div>
                </div>

                <div className="progress">
                  <h3>
                    JavaScript<span>80%</span>
                  </h3>
                  <div className="bar">
                    <span></span>
                  </div>
                </div>

                <div className="progress">
                  <h3>
                    TypeScript<span>70%</span>
                  </h3>
                  <div className="bar">
                    <span></span>
                  </div>
                </div>

                <div className="progress">
                  <h3>
                    React.js<span>80%</span>
                  </h3>
                  <div className="bar">
                    <span></span>
                  </div>
                </div>

                <div className="progress">
                  <h3>
                    Next.js<span>70%</span>
                  </h3>
                  <div className="bar">
                    <span></span>
                  </div>
                </div>

                <div className="progress">
                  <h3>
                    Angular.js<span>70%</span>
                  </h3>
                  <div className="bar">
                    <span></span>
                  </div>
                </div>
              </div>

              <span className="animate scroll" style={{ "--i": 3 }}></span>
            </div>
          </div>

          <div className="skills-column">
            <h3 className="title">
              Backend
              <span className="animate scroll" style={{ "--i": 5 }}></span>
            </h3>

            <div className="skills-box">
              <div className="skills-content">
                <div className="progress">
                  <h3>
                    Node.js<span>80%</span>
                  </h3>
                  <div className="bar">
                    <span></span>
                  </div>
                </div>

                <div className="progress">
                  <h3>
                    Express.js<span>80%</span>
                  </h3>
                  <div className="bar">
                    <span></span>
                  </div>
                </div>

                <div className="progress">
                  <h3>
                    JavaScript<span>80%</span>
                  </h3>
                  <div className="bar">
                    <span></span>
                  </div>
                </div>

                <div className="progress">
                  <h3>
                    TypeScipt<span>70%</span>
                  </h3>
                  <div className="bar">
                    <span></span>
                  </div>
                </div>

                <div className="progress">
                  <h3>
                    PHP<span>70%</span>
                  </h3>
                  <div className="bar">
                    <span></span>
                  </div>
                </div>
              </div>

              <span className="animate scroll" style={{ "--i": 6 }}></span>
            </div>
          </div>

          <div className="skills-column">
            <h3 className="title">
              Database
              <span className="animate scroll" style={{ "--i": 5 }}></span>
            </h3>

            <div className="skills-box">
              <div className="skills-content">
                <div className="progress">
                  <h3>
                    MySQL<span>85%</span>
                  </h3>
                  <div className="bar">
                    <span></span>
                  </div>
                </div>

                <div className="progress">
                  <h3>
                    MongoDB<span>80%</span>
                  </h3>
                  <div className="bar">
                    <span></span>
                  </div>
                </div>

                <div className="progress">
                  <h3>
                    PostgreSQL<span>75%</span>
                  </h3>
                  <div className="bar">
                    <span></span>
                  </div>
                </div>
              </div>

              <span className="animate scroll" style={{ "--i": 6 }}></span>
            </div>
          </div>
        </div>
      </section>

      <section className="projects" id="projects">
        <h2 className="heading">
          My <span>Projects</span>
          <span className="animate scroll" style={{ "--i": 1 }}></span>
        </h2>

        <div className="projects-row">
          <div className="projects-column">
            <h3 className="title">
              StoreCraft
              <span className="animate scroll" style={{ "--i": 2 }}></span>
            </h3>

            <div className="projects-box">
              <div className="projects-content">
                <img src={ecommerceImage} />
                <div className="layer">
                  <h3>StoreCraft</h3>
                  <p>
                  A MERN-based product management system that allows CRUD operations on products,
                  categories, and brands, with filtering features.
                  </p>
                  <a href="https://store-craft-mern-stack-app.vercel.app">
                    <i className="bx bx-link-external"></i>
                  </a>
                </div>
              </div>

              <span className="animate scroll" style={{ "--i": 3 }}></span>
            </div>
          </div>

          <div className="projects-column">
            <h3 className="title">
              Newsify
              <span className="animate scroll" style={{ "--i": 2 }}></span>
            </h3>

            <div className="projects-box">
              <div className="projects-content">
                <img src={newsifyImage} />
                <div className="layer">
                  <h3>Newsify App</h3>
                  <p>
                    The app is a news platform that categorizes news into
                    sections like general, business, sports, entertainment,
                    science and technology for easy navigation.
                  </p>
                  <a href="https://newsify-indol.vercel.app">
                    <i className="bx bx-link-external"></i>
                  </a>
                </div>
              </div>

              <span className="animate scroll" style={{ "--i": 3 }}></span>
            </div>
          </div>

          <div className="projects-column">
            <h3 className="title">
              Quiz
              <span className="animate scroll" style={{ "--i": 2 }}></span>
            </h3>

            <div className="projects-box">
              <div className="projects-content">
                <img src={quizImage} />
                <div className="layer">
                  <h3>Quiz App</h3>
                  <p>
                    The app is a quiz platform that includes a timer for each
                    quiz and displays the final result after completion.
                  </p>
                  <a href="https://quiz-app-tau-rose-72.vercel.app">
                    <i className="bx bx-link-external"></i>
                  </a>
                </div>
              </div>

              <span className="animate scroll" style={{ "--i": 3 }}></span>
            </div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <h2 className="heading">
          Contact <span>Me</span>
          <span className="animate scroll" style={{ "--i": 1 }}></span>
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <div className="input-field">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                required
                value={formData.fullName}
                onChange={handleChange}
              />
              <span className="focus"></span>
            </div>
            <div className="input-field">
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email}
                required
                onChange={handleChange}
              />
              <span className="focus"></span>
            </div>

            <span className="animate scroll" style={{ "--i": 3 }}></span>
          </div>
          <div className="input-box">
            <div className="input-field">
              <input
                type="number"
                name="mobile"
                placeholder="Mobile Number"
                required
                value={formData.mobile}
                onChange={handleChange}
              />
              <span className="focus"></span>
            </div>
            <div className="input-field">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                value={formData.subject}
                onChange={handleChange}
              />
              <span className="focus"></span>
            </div>

            <span className="animate scroll" style={{ "--i": 5 }}></span>
          </div>

          <div className="textarea-field">
            <textarea
              name="message"
              cols="30"
              rows="10"
              placeholder="Message"
              required
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            <span className="focus"></span>

            <span className="animate scroll" style={{ "--i": 7 }}></span>
          </div>

          <div className="btn-box btns">
            <button type="submit" className="btn">
              Submit
            </button>

            <span className="animate scroll" style={{ "--i": 9 }}></span>
          </div>
        </form>
        
      </section>
    </div>
  );
}
