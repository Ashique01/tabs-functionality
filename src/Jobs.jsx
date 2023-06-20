import React, { useEffect, useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import "./index.css";

const url = "https://course-api.com/react-tabs-project";
function Jobs() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          setIsError(true);
          setIsLoading(false);
          return;
        }
        const newJobs = await res.json();
        setJobs(newJobs);
      } catch (error) {
        setIsError(error);
      }
      setIsLoading(false);
    };
    fetchJobs();
  }, []);
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  if (isError) {
    return (
      <div class="alert alert-danger d-flex align-items-center" role="alert">
        <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Danger:">
          <use xlink:href="#exclamation-triangle-fill" />
        </svg>
        <div>An example danger alert with an icon</div>
      </div>
    );
  }
  const { company, dates, duties, title } = jobs[value];
  return (
    <div className="container text-center mt-5">
      <div className="row align-items-center">
        <div className="col-12 col-lg-12 col-md-12 col-sm-12">
          <h3 className="text-center mt-4 mb-4 fw-bolder fs-3">
            <span className="border-bottom border-primary fw-bolder">
              My Experience
            </span>
          </h3>
        </div>
        <div className="col-12 col-lg-12 col-md-12 col-sm-12">
          <div className="container mt-5">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-4 col-lg-4">
                {jobs.map((job, index) => {
                  return (
                    <div className="container mb-4 hover-style">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="d-flex mb-4 ">
                            <div className="vr"></div>
                            <div>
                              <button
                                className="btn "
                                key={index}
                                onClick={() => setValue(index)}
                              >
                                {job.company}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="col-12 col-sm-12 col-md-8 col-lg-8 text-start">
                <h3 className="fs-5">{title}</h3>
                <h4 className="fs-6 bg-secondary badge text-wrap">{company}</h4>
                <p className="fw-bold text-secondary">{dates}</p>
                {duties.map((duty, index) => {
                  return (
                    <div className="d-flex" key={index}>
                      <span className="icon-container">
                        <FaAngleDoubleRight className="icon-style" />
                      </span>
                      <p className="mx-3 font-monospace text-secondary fw-normal">
                        {duty}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
