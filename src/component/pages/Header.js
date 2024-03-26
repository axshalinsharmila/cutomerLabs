import React, {useState} from "react";
import { Outlet } from "react-router-dom";
import Button from "../reusable/Button";
import Modal from "react-modal";
import ReactModal from "../reusable/ReactModal";
import Segment from "./Segment";



const Header = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white h-screen">
      <div className="w-full border-spacing-5 bg-teal-400">
        <div className="p-5 flex items-center">
        <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 font-bold"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </div>
          <p className="pl-3">
           
            View Segment
          </p>
        </div>
      </div>
      <div className="container mx-auto max-w-5xl  text-gray-700">
        <Button onClick={()=>setIsOpen(!modalIsOpen)}>Save Segment</Button>
        <ReactModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
          <Segment modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}/>
        </ReactModal>
        <Outlet />
      </div>
    </div>
  );
};

export default Header;
