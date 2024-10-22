import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

function Contact() {
  const { userInfo } = useSelector((state) => state.auth);

  const userName = userInfo?.username || "Guest";
  const userId = userInfo?._id || "N/A";
  const emailId = userInfo?.email || "N/A";

  const [query, setQuery] = useState("");
  const [compose, setCompose] = useState("");
  const [userEmail, setUserEmail] = useState(emailId);
  const [userFullName, setUserFullName] = useState(userName);

  const handleMailtoLink = () => {
    const encodedSubject = encodeURIComponent(query);
    const encodedBody = encodeURIComponent(`${compose}\n\nName: ${userFullName}\nEmail: ${userEmail}\nUser_Id: ${userId}`);
    return `mailto:azeemkh528@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
  };

  return (
    <div className="md:m-4 m-0">
      <div className="m-2">
        <h1 className="text-[4rem] mb-4 capitalize tracking-[-5px] font-[999] relative">Contact.</h1>
      </div>

      <div className="flex justify-center items-center">
        
        <form className="mx-4 mt-[1rem] rounded-xl w-[40rem]" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="Name">Full Name</label>
          <input
            id="Name"
            type="text"
            required
            disabled
            value={userFullName}
            className="my-2 p-2 border rounded w-full"
            onChange={(e) => setQuery(e.target.value)}
          />

          <label htmlFor="Email">Email(Optional)</label>
          <input
            id="Email"
            type="text"
            value={userEmail}
            className="my-2 p-2 border rounded w-full"
            onChange={(e) => setQuery(e.target.value)}
          />

          <label htmlFor="Query">Query</label>
          <input
            id="Query"
            type="text"
            required
            value={query}
            className="my-2 p-2 border rounded w-full"
            onChange={(e) => setQuery(e.target.value)}
          />

          <label htmlFor="comment">Comment</label>
          <textarea
            id="comment"
            rows="3"
            required
            value={compose}
            onChange={(e) => setCompose(e.target.value)}
            className="p-2 border rounded-lg w-full h-[10rem] text-black"
          ></textarea>

          <div className="mb-7">
            <button
              className="w-full border-4 mt-3 border-red-600 p-4 hover:bg-red-600 hover:rounded-xl transition"
              >

              {userInfo ? 
              <a className="uppercase italic font-bold " href={handleMailtoLink()} >
                Click here to send query
              </a> 
              :
              <a className="uppercase italic font-bold" href='/login' >
                login plz...
              </a>
              }
            </button>
            <span className="uppercase italic font-bold mt-4 py-4">
              OR USE SQL
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
