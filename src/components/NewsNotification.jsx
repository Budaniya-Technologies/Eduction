"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { apiGet } from "../../Utils/http";

export default function NewsNotification() {
  const [newsEvents, setNewsEvents] = useState([]);

  useEffect(() => {
    const fetchNewsEvents = async () => {
      try {
        const res = await apiGet("api/news-events/");
        const activeNews = res.data.filter((n) => n.is_active);
        setNewsEvents(activeNews);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };
    fetchNewsEvents();
  }, []);

  const mainPost = newsEvents[0];
  const sidePosts = newsEvents.slice(1, 4);
  const rightPost = newsEvents[4];

  return (
    <section className="bg-gray-100 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold border-b-4 border-black text-blue-800">
            News & Events
          </h2>
          <a
            href="#"
            className="text-black font-semibold text-sm hover:underline flex items-center gap-1"
          >
            See All →
          </a>
        </div>

        {/* Title + Explore Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-4xl font-bold text-black leading-tight">
            News & <br /> Notification
          </h2>
          <Link
            href="/newBlogs"
            className="bg-orange-500 text-white font-semibold px-6 py-2 rounded-full shadow hover:bg-orange-600"
          >
            Explore All
          </Link>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Left Main News */}
          {mainPost && (
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <img
                src={mainPost.image}
                alt={mainPost.title}
                width={600}
                height={400}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-blue-700 font-semibold mb-1">
                  {mainPost.event_type}
                </p>
                <h3 className="font-bold text-md text-black mb-1 leading-snug">
                  {mainPost.title}
                </h3>
                <p className="text-sm text-gray-600">{mainPost.content}</p>
              </div>
            </div>
          )}

          {/* Center Side Posts */}
          <div className="flex flex-col gap-6">
            {sidePosts.map((post) => (
              <div key={post.id} className="flex gap-4">
                <img
                  src={post.image}
                  alt={post.title}
                  width={100}
                  height={80}
                  className="w-32 h-24 object-cover rounded-md"
                />
                <div className="flex flex-col justify-start">
                  <p className="text-sm text-gray-500">
                    {new Date(post.date_posted).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                  <h4 className="text-sm font-semibold text-black leading-snug">
                    {post.title}
                  </h4>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {post.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right News Card */}
          {rightPost && (
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <img
                src={rightPost.image}
                alt={rightPost.title}
                width={600}
                height={400}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-blue-700 font-semibold mb-1">
                  {rightPost.event_type}
                </p>
                <h3 className="font-bold text-md text-black mb-1 leading-snug">
                  {rightPost.title}
                </h3>
                <p className="text-sm text-gray-600">{rightPost.content}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
