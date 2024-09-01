import React, { useEffect, useState } from 'react'
import Jobs from "../Data/JobsDataAvl"
import { selectUser } from '../../Feature/Userslice'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import "./job.css"
import axios from 'axios'


function JobDetail() {
  const user = useSelector(selectUser)
  const [isDivVisible, setDivVisible] = useState(false)
  const [isResume, setResume] = useState(false)
  const [textarea, setTextare] = useState("")
  const [company, setCompany] = useState("")
  const [category, setCategory] = useState("")
  const navigate = useNavigate();
  let search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get("q")
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://internbackend-i2jk.onrender.com/api/job/${id}`)

      const { company, category } = response.data;
      setCompany(company)
      setCategory(category)
      setData(response.data)
    }
    fetchData()
  })
  const show = () => {
    setDivVisible(true)
  }
  const hide = () => {
    setDivVisible(false)
  }
  const showResume = () => {
    setResume(true)
  }
  const hideResume = () => {
    setResume(false)
  }

  const submitApplication = async () => {
    const text = document.getElementById("text")
    if (text.value === "") {
      alert("Fill the mendetory fildes")
    }
    else {
      const bodyJson = {
        coverLetter: textarea,
        category: category,
        company: company,
        user: user,
        Application: id
      }

      await axios.post("https://internbackend-i2jk.onrender.com/api/application", bodyJson).then((res) => {



      }).catch((err) => {
        alert("error happend")
      })
      alert("Done")
      navigate("/Jobs")
    }
  }

  // this is for the resume uploadation
  const [formData, setFormData] = useState({
    name: '',
    qualification: '',
    experience: '',
    details: ''
  });
  const [photo, setPhoto] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = e => {
    setPhoto(e.target.files[0]);
  };

  //payment and resume creation 
  const handlePaymentAndSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Step 1: Create an order on your backend
      const response = await axios.post('https://internbackend-i2jk.onrender.com/api/rasorpay/checkout', {
        amount: 5000, // Example amount; replace with actual amount
      });
      const { order } = response.data;
  
      // Step 2: Initialize Razorpay
      const options = {
        key: 'rzp_test_I8kBWsdqnITvmI', // Replace with your Razorpay key
        amount: order.amount, // Amount is in paise (1 INR = 100 paise)
        currency: 'INR',
        name: 'Your Company',
        description: 'Test Transaction',
        order_id: order.id,
        handler: async (response) => {
          try {
            // Step 3: Verify payment on the backend
            const verificationResponse = await axios.post('https://internbackend-i2jk.onrender.com/api/rasorpay/paymentverification', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
  
            if (verificationResponse.data.success) {
              // Show success message and handle success
              alert('Payment verification successful!');
            } else {
              console.error('Payment verification failed');
              alert('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification failed', error);
            alert('Payment verification failed');
          }
  
          // Step 4: Submit the resume data
          try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('qualification', formData.qualification);
            data.append('experience', formData.experience);
            data.append('details', formData.details);
            if (photo) data.append('photo', photo);
  
            await axios.post('https://internbackend-i2jk.onrender.com/api/resume', data);
            alert('Resume created successfully!');
            setFormData({ name: '', qualification: '', experience: '', details: '' });
            setPhoto(null);
            hideResume(false);
          } catch (error) {
            console.error('Resume submission failed', error);
            alert('Error creating resume');
          }
        },
        prefill: {
          name: formData.name,
          email: 'example@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
      };
  
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Failed to create order', error);
      alert('Failed to create order');
    }
  };
  





  return (
    <div>

      <div className="details-app">

        <h1 className='font-bold text-3xl'>{data.title}</h1>
        <div className="m-14 shadow-sm rounded-md border">
          <p className='mb-4 mt-3' id='boxer'> <i className='bi bi-arrow-up-right text-blue-500' ></i> Actively Hiring</p>
          <div className="main-info align-baseline mr-96 mt-7">


            <p className='text-xl font-bold mt-4'> {data.title}</p>
            <p className='text-sm text-slate-300 font-bold'>{data.title}</p>
            <p> <i class="bi bi-geo-alt-fill"></i> {data.location}</p>
          </div>
          <div className="flex tedxt-sm justify-between">
            <p className='mt-3 text-slate-400'> <i class="bi bi-play-circle-fill"></i>   Start Date  <br />  {data.StartDate}</p>


            <p className='mt-3 text-slate-400' > <i class="bi bi-calendar-check-fill"></i>  Experience  <br />
              {data.Experience}</p>

            <p className='mt-3 text-slate-400'>  <i class="bi bi-cash"></i>   Salary <br /> {data.CTC}</p>
          </div>
          <div className="flex">
            <p className='bg-green-100 rounded-md ml-4 text-green-300'> <i class="bi bi-clock"></i> 12/12/2012</p>
          </div>
          <hr />
          <div className="aboutCompany flex justify-start">
            <p className='mt-3 text-xl font-bold text-start'> About {data.company}</p>
            <br />
          </div>
          <div className="flex">

            <p className='text-blue-500'> instagram page  <i className='bi bi-arrow-up-right-square'></i></p>

          </div>
          <p className='mt-4'> {data.aboutCompany}</p>
          <div className="about-Job">
            <p className='mt-3 text-xl font-bold text-start'> about Job</p>
            <p>{data.aboutJob}</p>
          </div>
          <p className='text-blue-500 justify-start'> Learn Business Communication</p>

          <div className="whocan">
            <p className='mt-3 text-xl font-bold text-start'>Who can apply</p>
            <p>{data.Whocanapply}</p>
          </div>

          <p className='mt-3 text-xl font-bold text-start'>Perks</p>
          <p>{data.perks}</p>

          <p className='mt-3 text-xl font-bold text-start'> Additional information</p>
          <p>{data.AdditionalInfo}</p>

          <p className='mt-3 text-xl font-bold text-start'> Number of opening</p>
          <p className='text-start'>{data.numberOfopning}</p>
          <div className='flex justify-center mt-6 bg-blue-500 w-40 text-center text-white font-bold '>
            <button className='flex justify-center align-middle' onClick={show}>Apply</button>

          </div>

        </div>


      </div>
      {isDivVisible && (
        <>
          <div className="application-page">
            <div className="bg">
              <button className='close2' onClick={hide} ><i className='bi-bi-x'></i> Close</button>
              <p>Applyion for Company {data.company}</p>
              <p className='mt-3 text-sm font-bold text-start mb-3'>{data.aboutCompany}</p>

            </div>
            <div className="moreSteps">
              <p className='font-semibold text-xl'>Your resume</p>
              <small>your current resume will be submitted along with the application <a onClick={showResume} style={{ color: 'blue', fontWeight: 'bold', cursor: 'pointer' }}>Create</a>
              </small>

              <p className='mt-5 font-semibold text-xl'>Cover letter</p>
              <br />
              <p>why should we hire for this role?</p>
              <textarea name="coverLetter" placeholder='' id="text" value={textarea} onChange={(e) => setTextare(e.target.value)}></textarea>
              <p className='mt-5 font-semibold text-xl'>your availiblity</p>
              <p>confirme your availiblity</p>

            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="Yes, I am available to join immediately"


                />
                Yes, I am available to join immediately
              </label>
            </div>

            <div>
              <label>
                <input
                  type="radio"
                  value="No, I am currently on notice period"


                />
                No, I am currently on notice period
              </label>
            </div>

            <div>
              <label>
                <input
                  type="radio"
                  value="No, I will have to serve notice period"


                />
                No, I will have to serve notice period
              </label>
            </div>

            <div>
              <label>
                <input
                  type="radio"
                  value="Other"


                />
                Other <span className='text-slate-500'>
                  (Please specify your availability)  </span>
              </label>
            </div>
            <p className='mt-5 font-semibold text-xl'>Custom resume <span className='text-slate-500'>(Optional)</span></p>
            <small className='text-slate-500'>Employer can download and view this resume</small>


            <div className="submit flex justify-center">
              {user ? (
                <button className='submit-btn' onClick={submitApplication}  >Submit application</button>
              ) : (
                <Link to={"/register"}>
                  <button className='submit-btn' >Submit application</button>
                </Link>
              )

              }
            </div>
          </div>
        </>
      )

      }

      {isResume && (
        <>
          <div className="application-page">

            <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
              <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', maxWidth: '500px', width: '100%' }}>
                <div className="bg">
                  <button className='close2' onClick={hideResume} ><i className='bi-bi-x'></i> close</button>
                  <h1 style={{ marginBottom: '1.5rem', color: '#333' }}>Resume Generator</h1>
                </div>

                <form onSubmit={handlePaymentAndSubmit}>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', color: '#555' }}>Name:</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '1rem', fontSize: '1rem' }} /><br />

                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', color: '#555' }}>Qualification:</label>
                  <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '1rem', fontSize: '1rem' }} /><br />

                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', color: '#555' }}>Experience:</label>
                  <textarea name="experience" value={formData.experience} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '1rem', fontSize: '1rem', minHeight: '100px' }}></textarea><br />

                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', color: '#555' }}>Personal Details:</label>
                  <textarea name="details" value={formData.details} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '1rem', fontSize: '1rem', minHeight: '100px' }}></textarea><br />

                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', color: '#555' }}>Upload Photo:</label>
                  <input type="file" name="photo" onChange={handleFileChange} style={{ width: '100%', marginBottom: '1rem' }} /><br />

                  {user ? (
                    <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '4px', fontSize: '1rem', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>
                      Pay & Generate Resume
                    </button>
                  ) : (
                    <Link to={"/register"}>
                      <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '4px', fontSize: '1rem', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>
                        Pay & Generate Resume
                      </button>
                    </Link>
                  )

                  }
                </form>
              </div>
            </div>
          </div>
        </>
      )
      }
    </div>
  )
}

export default JobDetail