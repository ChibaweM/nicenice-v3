import React from "react";
import styles from "../../styles";
import phone1 from "../../assets/mobile.png";

const Home = () => {
  const stats = [
    {
      id: "stats-1",
      title: "User Active",
      value: "3800+",
    },
    {
      id: "stats-2",
      title: "Trusted by Company",
      value: "230+",
    },
    {
      id: "stats-3",
      title: "Transaction",
      value: "$230M+",
    },
  ];

  const handleLink = () => {
    console.log("lets gooo");
  };
  return (
    <section>
      <div className="bg-blackpink-gradient w-full flex py-12 justify-between items-center">
        <div
          className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 mx-6 px-6 pt-10`}
        >
          <div className="flex flex-row justify-between items-center w-full">
            <h2 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-gradient ss:leading-[100.8px] leading-[75px]">
              NiceNice
              <br className="sm:block hidden" />
            </h2>
          </div>
          <p className={`${styles.paragraph} max-w-[470px] mt-5 text-white`}>
            Helping provide communication between drivers and owner's of cars.
            The app is designed to ease you into renting out your car or if you
            are looking for a car, it will help you find the best cars availabe
            in your area.
          </p>
          <button
            class="bg-fuchsia-700 hover:bg-red text-white mt-5 py-4 px-6 rounded"
            onClick={() => handleLink()}
          >
            Android Download
          </button>
        </div>

        <div
          className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}
        >
          <img src={phone1} alt="billing" width="300px" />
        </div>

        {/*  <div
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
        </div> */}
      </div>
    </section>
  );
};

export default Home;
