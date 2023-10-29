"use client";
import React, { useState } from "react";

type Props = {
  description: string;
};

const Tabs = ({ description }: Props) => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <>
      <div className="flex mb-4 font-semibold">
        <button
          className={`flex-1 py-2 px-4 text-center focus:outline-none ${
            activeTab === "description"
              ? "bg-black text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("description")}
        >
          DESCRIPTION
        </button>
        <button
          className={`flex-1 py-2 px-4 text-center focus:outline-none ${
            activeTab === "attachments"
              ? "bg-black text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("attachments")}
        >
          ATTACHMENTS
        </button>
      </div>
      {/* Content */}
      <div className=" mb-4">
        {activeTab === "description" && (
          <div
            id="tab-description"
            className="prose prose-lg "
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        )}
        {activeTab === "attachments" && (
          <div id="tab-attachments">{/* Attachments content goes here */}</div>
        )}
      </div>
    </>
  );
};

export default Tabs;
