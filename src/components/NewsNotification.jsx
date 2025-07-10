"use client";
import Image from "next/image";

const mainPost = {
  image: "/assets/news.jpeg",
  tag: "Exam & Result",
  title:
    "their duty through weakness of will, which is the same as saying through shrinking from toil and pain.",
  description:
    "Indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will.",
};

const sidePosts = [
  {
    date: "18 Aug",
    image: "/assets/news1.jpeg",
    title: "indignation and dislike men who are so beguiled",
    text: "In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided.",
  },
  {
    date: "18 Aug",
    image: "/assets/news1.jpeg",
    title: "indignation and dislike men who are so beguiled",
    text: "In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided.",
  },
  {
    date: "18 Aug",
    image: "/assets/news1.jpeg",
    title: "indignation and dislike men who are so beguiled",
    text: "In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided.",
  },
];

export default function NewsNotification() {
  return (
    <section className="bg-gray-100 px-4 py-12">
        
      <div className="max-w-7xl mx-auto">
         <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold border-b-4 border-black text-blue-800">News & Events</h2>
          <a
            href="#"
            className="text-black font-semibold text-sm hover:underline flex items-center gap-1"
          >
            See All →
          </a>
        </div>
        {/* Title Row */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-4xl font-bold text-black leading-tight">
            News & <br /> Notification
          </h2>
          <button className="bg-orange-500 text-white font-semibold px-6 py-2 rounded-full shadow hover:bg-orange-600">
            Explore All
          </button>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Left Featured News */}
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <Image
              src={mainPost.image}
              alt="main-post"
              width={600}
              height={400}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <p className="text-sm text-blue-700 font-semibold mb-1">
                {mainPost.tag}
              </p>
              <h3 className="font-bold text-md text-black mb-1 leading-snug">
                {mainPost.title}
              </h3>
              <p className="text-sm text-gray-600">{mainPost.description}</p>
            </div>
          </div>

          {/* Center Stack Posts */}
          <div className="flex flex-col gap-6">
            {sidePosts.map((post, index) => (
              <div key={index} className="flex gap-4">
                <Image
                  src={post.image}
                  alt="side-post"
                  width={100}
                  height={80}
                  className="w-32 h-24 object-cover rounded-md"
                />
                <div className="flex flex-col justify-start">
                  <p className="text-sm text-gray-500">{post.date}</p>
                  <h4 className="text-sm font-semibold text-black leading-snug">
                    {post.title}
                  </h4>
                  <p className="text-xs text-gray-600">{post.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Featured News */}
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <Image
              src={mainPost.image}
              alt="right-post"
              width={600}
              height={400}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <p className="text-sm text-blue-700 font-semibold mb-1">
                {mainPost.tag}
              </p>
              <h3 className="font-bold text-md text-black mb-1 leading-snug">
                their duty through weakness of will, which is the same as saying.
              </h3>
              <p className="text-sm text-gray-600">{mainPost.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
