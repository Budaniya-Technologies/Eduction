// components/TeachingMode.js
import Image from 'next/image';

const features = [
  {
    title: 'Obscure Latin words, consectetur, from a Lorem',
    desc: 'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.',
  },
  {
    title: 'Obscure Latin words, consectetur, from a Lorem',
    desc: 'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.',
  },
  {
    title: 'Obscure Latin words, consectetur, from a Lorem',
    desc: 'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.',
  },
];

export default function TeachingMode() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen flex flex-col lg:flex-row gap-10">
      {/* Left Side */}
      <div className="lg:w-1/2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-700">PRATHAM</h1>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-4 leading-tight">
          Innovative <br /> Online Teaching <br /> Mode
        </h2>
        <p className="text-lg sm:text-xl text-blue-600 mt-4">Lorem Ipsum available</p>

        {/* Feature List */}
        <div className="mt-6 space-y-6">
          {features.map((f, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="text-green-600 text-2xl sm:text-3xl">✅</div>
              <div>
                <p className="font-semibold sm:font-bold text-base sm:text-lg">{f.title}</p>
                <p className="text-gray-600 text-sm sm:text-base">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side (Image Layout) */}
      <div className="lg:w-1/2 flex flex-col gap-4">
        {/* Top row: Two images */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/2 rounded-xl overflow-hidden">
            <Image
              src="/assets/news1.jpeg"
              width={400}
              height={250}
              alt="Classroom 1"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="w-full sm:w-1/2 rounded-xl overflow-hidden">
            <Image
              src="/assets/news.jpeg"
              width={400}
              height={250}
              alt="Classroom 2"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Middle row: Tall image */}
        <div className="rounded-xl overflow-hidden h-[200px] sm:h-[260px]">
          <Image
            src="/assets/teacherAbout.jpeg"
            width={400}
            height={500}
            alt="Classroom 3"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* Bottom row: Two small images side by side */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/2 rounded-xl overflow-hidden">
            <Image
              src="/assets/studentAbout.jpeg"
              width={400}
              height={250}
              alt="Classroom 4"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="w-full sm:w-1/2 rounded-xl overflow-hidden">
            <Image
              src="/assets/student1.avif"
              width={400}
              height={250}
              alt="Classroom 5"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
