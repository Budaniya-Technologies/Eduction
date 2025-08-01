"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { apiGet } from "../../Utils/http";

export default function NewsNotification() {
  const [newsEvents, setNewsEvents] = useState([]);

  useEffect(() => {
    const fetchNewsEvents = async () => {
      try {
        const res = await apiGet("api/news-events/");
        const activeNews = res.data?.filter((n) => n.is_active) || [];
        setNewsEvents(activeNews);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };
    fetchNewsEvents();
  }, []);

  const mainPost = newsEvents[0] || null;
  const sidePosts = newsEvents.length > 1 ? newsEvents.slice(1, 4) : [];
  const rightPost = newsEvents[4] || null;

  return (
    <section className="bg-gray-100 px-4 pt-[100px]">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="flex justify-between items-center mb-6">
          <h2
            className="text-sm md:text-xl font-bold text-black px-5 py-1 rounded-full shadow-lg border-4 border-white inline-block mb-4"
            style={{
              fontFamily: '"Palatino Linotype", "Book Antiqua", Palatino, serif',
              letterSpacing: '1px',
              wordSpacing: '-3px',
              fontWeight: 400,
            }}
          >
            🔔 News & Notification
          </h2>
        </div>

        {/* Heading + Explore Button */}
        <div className="flex justify-between items-center mb-4">
          <h2
            className="text-base md:text-xl lg:text-3xl font-bold text-black"
            style={{
              fontFamily: '"Palatino Linotype", "Book Antiqua", Palatino, serif',
              letterSpacing: '1px',
              wordSpacing: '-3px',
              fontWeight: 400,
            }}
          >
            Latest Updates <br /> Announcements
          </h2>
          <Link
            href="/newBlogs"
            className="bg-orange-500 text-white font-semibold px-6 py-1 rounded-full shadow hover:bg-orange-600"
          >
            Explore All
          </Link>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-1">
          {/* Left: Main News Post */}
          {mainPost && (
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <img
                src={mainPost.image || "/default.jpg"}
                alt={mainPost.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-blue-700 font-semibold mb-1">
                  {mainPost.event_type}
                </p>
                <h3 className="font-bold text-md text-black mb-1 leading-snug">
                  {mainPost.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {mainPost.content}
                </p>
              </div>
            </div>
          )}

          {/* Center: Side Posts */}
          <div className="flex flex-col gap-6">
            {sidePosts.map((post) => (
              <div key={post.id || post._id} className="flex gap-4">
                <img
                  src={post.image || "/default.jpg"}
                  alt={post.title}
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

          {/* Right: Last News Post */}
          {rightPost && (
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <img
                src={rightPost.image || "/default.jpg"}
                alt={rightPost.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-blue-700 font-semibold mb-1">
                  {rightPost.event_type}
                </p>
                <h3 className="font-bold text-md text-black mb-1 leading-snug">
                  {rightPost.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {rightPost.content}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
