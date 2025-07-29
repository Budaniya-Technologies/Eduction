"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { apiGet } from "../../Utils/http";
import { motion } from "framer-motion";

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

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      className="bg-gray-100 px-4 pt-[100px]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: 0.2 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          className="flex justify-between items-center mb-6"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          <h2 className="Heading text-sm md:text-xl font-bold text-black px-5 py-1 rounded-full shadow-lg border-4 border-white inline-block mb-4">
            🔔 News & Notification
          </h2>
        </motion.div>

        {/* Title + Explore Button */}
        <motion.div
          className="flex justify-between items-center mb-4"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-base md:text-xl lg:text-3xl font-bold text-black Heading">
            Latest Updates <br /> Announcements
          </h2>
          <Link
            href="/newBlogs"
            className="bg-orange-500 text-white font-semibold px-6 py-1 rounded-full shadow hover:bg-orange-600 kodchasan-extralight"
          >
            Explore All
          </Link>
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-1">
          {/* Left Main News */}
          {mainPost && (
            <motion.div
              className="bg-white rounded-xl shadow overflow-hidden"
              variants={fadeUp}
              transition={{ duration: 0.6 }}
            >
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
            </motion.div>
          )}

          {/* Center Side Posts */}
          <motion.div
            className="flex flex-col gap-6"
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            {sidePosts.map((post) => (
              <motion.div
                key={post.id}
                className="flex gap-4"
                variants={fadeUp}
                transition={{ duration: 0.5 }}
              >
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
              </motion.div>
            ))}
          </motion.div>

          {/* Right News Card */}
          {rightPost && (
            <motion.div
              className="bg-white rounded-xl shadow overflow-hidden"
              variants={fadeUp}
              transition={{ duration: 0.6 }}
            >
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
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
