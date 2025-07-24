// src/components/GurukulHero.jsx
import Image from "next/image";
import student from "/public/assets/studentGirl.png";
import bookIcon from "/public/assets/education.png"; 
import checkIcon from "/public/assets/check.png"; 

const GurukulHero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#f5f5f5] py-10">
      <div className="flex flex-col md:flex-row w-full min-h-[550px]">

        {/* Left Image Section with Yellow BG + Rounded Corner */}
        <div className="relative w-full md:w-1/2 bg-[#ffeb3b] flex items-center justify-center rounded-br-[80px]">
          <div className="relative w-[90%] max-w-sm h-auto z-10">
            <Image
              src={student}
              alt="student"
              width={500}
              height={600}
              className="object-cover w-full h-auto"
              priority
            />
          </div>

          {/* Circle background effects */}
          <div className="absolute w-40 h-40 bg-white rounded-full top-10 left-10 opacity-20 z-0" />
          <div className="absolute w-24 h-24 bg-white rounded-full bottom-10 right-10 opacity-30 z-0" />
        </div>

        {/* Right Content Section */}
        <div className="relative w-full md:w-1/2 px-6 md:px-16 py-10">
          {/* Purple dot */}
          <div className="absolute w-4 h-4 bg-purple-600 rounded-full left-4 top-20 md:left-[-10px]" />

          <h4 className="text-[#0d47a1] font-bold text-xl">GURUKUL</h4>
          <h1 className="text-4xl md:text-5xl font-extrabold text-black leading-tight mt-2">
            Innovative Online <br /> Teaching Mode
          </h1>
          <p className="text-lg text-[#1565c0] font-medium mt-4">
            Lorem Ipsum available
          </p>

          {/* Features List */}
          <div className="space-y-6 mt-8">
            {/* Feature 1 */}
            <div className="flex items-start gap-4">
              <Image src={bookIcon} alt="Book Icon" width={40} height={40} />
              <div>
                <h3 className="font-semibold text-black">
                  Obscure Latin words, consectetur, from a Lorem
                </h3>
                <p className="text-gray-700 text-sm mt-1">
                  All the Lorem Ipsum generators on the Internet tend to repeat
                  predefined chunks as necessary, making this the first true
                  generator on the Internet.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-4">
              <Image src={checkIcon} alt="Check Icon" width={40} height={40} />
              <div>
                <h3 className="font-semibold text-black">
                  Obscure Latin words, consectetur, from a Lorem
                </h3>
                <p className="text-gray-700 text-sm mt-1">
                  All the Lorem Ipsum generators on the Internet tend to repeat
                  predefined chunks as necessary, making this the first true
                  generator on the Internet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GurukulHero;
