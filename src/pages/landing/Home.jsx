import React from "react";
import styles from "../../styles";
import phone1 from "../../assets/mobile.png";

{/* <link rel="stylesheet" href="index.css"> */}
<script src="https://kit.fontawesome.com/a076d05399.js"></script>


const Home = () => {
  const stats = [
    {
      id: "stats-1",
      title: "FIND THE BEST CARS AND DRIVERS AVAILABLE",
      value: " ",
    },
    {
      id: "stats-2",
      title: "FIND A CAR TO START DRIVING ON THE LARGEST NETWORK OF E-HAILING PLATFORM",
      value: " ",
    },
    {
      id: "stats-3",
      title: "LIST YOUR CAR AND FIND A RESPONSIBLE DRIVER LISTED ON THE LARGEST NETWORK OF E-HAILING",
      value: " ",
    },
  ];

  const url2 =
    "https://apkfab.com/nicenice/com.blueconnectionz.nicenice/apk?h=d7174f291b6ef8f914c7a42e60640d10708d5a116f49beb2b1731dc3ef46d3e0";
  const handleLink = () => {
    console.log("lets gooo");
  };
  return (
    <section>
      <header>
        {/* <a href="#" class="logo">NiceNice</a> */}
        <a href="#" class="logo"><img src="src/assets/NiceNiceLogo.png" alt="hoobank" width="150px" height="50px"></img></a>
        <nav>
        <input type="checkbox" id="check"></input>  
        <label for="check" class="checkbtn">
        <i class="fas fa-bars"></i>
        </label> 
          <ul>
          <li class="nav_item"><a href="#home" class="active">Home</a></li>
          {/* <li class="nav_item"><a href="#about">About</a></li> */}
          <li class="nav_item"><a href="#drivers">Drivers</a></li>
          <li class="nav_item"><a href="#vehicles">Vehicles</a></li>
          <li class="nav_item"><a href="#signin">Sign-In</a></li>
          <li class="nav_item"><a href="#register">Register</a></li>
          </ul>
        </nav>
      </header> 

      <section id="home" class="section">
        <p className={`${styles.paragraph} max-w-[1000px] mt-5 text-white`}>
          <center>
            Helping provide communication between drivers and owner's of cars.
            The app is designed to ease you into renting out your car or if you
            are looking for a car, it will help you find the best cars availabe
            in your area.
            <p></p>
            <a href={url2} target="_blank">
              <button
              class="bg-fuchsia-700 hover:bg-red text-white mt-5 py-4 px-6 rounded"
              onClick={() => handleLink()}
              >
              Android Download
              </button>
             </a> 
           </center>
          </p>
       </section>

      {/* <section id="about" class="section">About</section> */}

      <section id="drivers" class="section">
          <div class="image">
              <img src="src/assets/photo-1449965408869-eaa3f722e40d.jpg"></img>
          </div>
          <div class="text">
              DRIVER PORTAL
              <p className={`${styles.paragraph}  mt-5 py-4 px-6 rounded max-w-[1000px] mt-5 text-black`}>
                 *Find the best driver on the largest e-hailing platform
                 <p></p>
                 *Register as a driver on the largest e-hailing platform
              </p>
            </div>                 
       </section>


      <section id="vehicles" class="section">
        <div class="images">
           <img src="src/assets/istockphoto-car.jpg">
           </img>
         </div>
       <div class="text">
          VEHICLE PORTAL
            <p className={`${styles.paragraph}  mt-5 py-4 px-6 rounded max-w-[1000px] text-black`}>
              *Find the best vehicle on the largest e-hailing platform
               <p></p>
                *Register your on the largest e-hailing platform
           </p>                              
        </div>
      </section>

      <section id="signin" class="section">
      <p className={`${styles.paragraph} max-w-[1000px] mt-100 text-black`}>
          <center>
            Register on the biggest car-hailing platform
            <p></p>
            <a href="/Signup">
              <button
              class="bg-fuchsia-700 hover:bg-red text-white mt-5 py-4 px-6 rounded"
              onClick={() => handleLink()}
              >
              Register Now
              </button>
             </a> 
           </center>
          </p>      
      </section>

      <section id="register" class="section">
      <p className={`${styles.paragraph} max-w-[1000px] mt-100 text-whites`}>
          <center>
            Already have an account?
            <p></p>
            <a href="/Login">
              <button
              class="bg-fuchsia-700 hover:bg-red text-white mt-5 py-4 px-6 rounded"
              onClick={() => handleLink()}
              >
              Signup
              </button>
             </a> 
           </center>
          </p>    
          </section> 



{/*     
      <section id="hero" class="d-flex flex-column justify-content-center align-items-center">
    <div class="container text-center " data-aos="fade-up">
        <h1>Search for available cars or drivers</h1>
        <h2>Find legit cars or drivers for UBER | BOLT | DIDI in seconds</h2>
        <a href="/Home/mainsearch" class="btn-get-started scrollto">Search Now</a>
    </div>
</section> */}

       {/* <div className="bg-blackpink-gradient w-full flex py-12 justify-between items-center">
        <div
          className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 mx-6 px-6 pt-10`}
        > */}
          {/* <div
          className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}
        >
          <img src={phone1} alt="billing" width="300px" />
        </div> */}
          {/* <div className="flex flex-row justify-between items-center w-full">
            <h2 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-gradient ss:leading-[100.8px] leading-[75px]">
              NiceNice
              <br className="sm:block hidden" />
            </h2>
          </div> */}
          
          {/* <p className={`${styles.paragraph} max-w-[470px] mt-5 text-white`}>
            Helping provide communication between drivers and owner's of cars.
            The app is designed to ease you into renting out your car or if you
            are looking for a car, it will help you find the best cars availabe
            in your area.
          </p>
          <a href={url2} target="_blank">
            <button
              class="bg-fuchsia-700 hover:bg-red text-white mt-5 py-4 px-6 rounded"
              onClick={() => handleLink()}
            >
              Android Download
            </button>
          </a> */}
        {/* </div>  */}
        {/* <div
          className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}
        >
          <img src={phone1} alt="billing" width="300px" />
        </div> */}

        {/* <div
          className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}
        >
          <img src={phone1} alt="billing" width="300px" />
        </div>    */}

        {/* <div
          className={`${styles.flexCenter} flex-row flex-wrap sm:mb-20 mb-6`}
        >
          {stats.map((stat) => (
            <div
              key={stat.id}
              className={`flex-1 flex justify-start items-center flex-row m-3`}
            >
              <h4 className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-white">
                {stat.value}
              </h4>
              <p className="font-poppins font-normal xs:text-[20.45px] text-[15.45px] xs:leading-[26.58px] leading-[21.58px] text-gradient uppercase ml-3">
                {stat.title}
              </p>
            </div>
            
          ))}
        </div>  */}
       {/* </div>   */}
    </section>
  );
};

export default Home;
      
       {/* <input type="checkbox" id="check"></input>  */}
      {/* <label class="logo">NiceNice</label> */}
         {/* <label for="check" class="checkbtn">
        <i class="fas fa-bars"></i>
        </label> */}
        // <ul>
        {/* <li class="nav_item"><a class="active" href="#">Home</a></li>
        <li class="nav_item"><a href="/Drivers" onclick="Drivers()" class="nav_link">Drivers</a></li>
        <li class="nav_item"><a href="/Cars" onclick="Cars()" class="nav_link">Vehicles</a></li>
        <li class="nav_item"><a href="/Login" onclick="Login()" class="nav_link" >Sign-in</a></li> 
        <li class="nav_item"><a href="/Signup" onclick="Signup()" class="nav_link" >Register</a></li>  */}