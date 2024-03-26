import React, { useEffect, useState } from "react";
import Select from "react-select";
import TextField from "../reusable/TextField";
import Button from "../reusable/Button";
import axios from "axios";

const Segment = ({ ...props }) => {
  const options = [
    { label: "First Name", value: "first_name", type: "user" },
    { label: "Last name", value: "last_name", type: "user" },
    { label: "Gender", value: "gender", type: "user" },
    { label: "Age", value: "age", type: "user" },
    { label: "Account Name", value: "account_name", type: "group" },
    { label: "City", value: "city", type: "group" },
    { label: "State", value: "state", type: "group" },
  ];
  console.log("pros", props);
  const { setIsOpen, modalIsOpen } = props;
  const [values, setValues] = useState({
    name: "",
  });
  const [selectOption, setSelectOption] = useState(options);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectAddScheme, setSelectAddSchema] = useState([]);
  const [response, setResponse] = useState('');

  const handleChange = (selectedOption) => {
    console.log("PLACEVALUE", selectedOption, selectOption);
    setSelectedOption(selectedOption);
    setSelectOption(
      selectOption.filter((data) => data.value != selectedOption.value)
    );
  };

  const handleAdded = () => {
    console.log("selected", selectedOption, selectAddScheme);

    if (selectedOption != "") {
      setSelectedOption("");
      selectAddScheme.push(selectedOption);
    } 
  };
  const handleUpdated = (e, data) => {
    console.log("handleUpdated==>", data, e, selectOption);
    if (data.value !== e.value) {
      selectOption.push(data);
      let result = selectOption.filter((data) => data.value != e.value);
      setSelectOption(result);
    }
  };
  const sendWebhookAPI = async (payload) => {
    try {
      const url = 'https://webhook.site/ce5e300a-291d-4e27-8ab2-070073052e14'; 
      const response = await axios.post(url, payload);
      setResponse(response.data);
    } catch (error) {
      console.error('Error sending webhook:', error);
    }
  };
  const handleSave = () => {
    const object = selectAddScheme.reduce((acc, { label, value }) => {
      acc[value] = label;
      return acc;
    }, {});
    const payload = {
      segment_name: "last_10_days_blog_visits",
      schema: [
        { first_name: object.first_name ? object.first_name : "" },
        { last_name: object.last_name ? object.last_name : "" },
        { gender: object.gender ? object.gender : "" },
        { age: object.age ? object.age : "" },
        { account_name: object.account_name ? object.account_name : "" },
        { city: object.city ? object.city : "" },
        { state: object.state ? object.state : "" },
      ],
    };
    sendWebhookAPI(payload)
  };
  return (
    <>
      <div className="w-full border-spacing-5 bg-teal-400">
        <div className="p-5 flex items-center">
          <div
            className="cursor-pointer"
            onClick={() => setIsOpen(!modalIsOpen)}
          >
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
          <p className="pl-3">Saving Segment</p>
        </div>
      </div>

      <div className="p-5 h-screen">
        <TextField
          label="Enter the Name of the Segment"
          value={values.name}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
          inputProps={{ type: "text", placeholder: "Name of the segment" }}
        />

        <div className="">
          <p>
            To Save your segment, you need to add the schemas to build the query
          </p>
        </div>
        <div className="flex justify-end items-center p-5 ">
          <div className="flex items-center mx-2">
            <div className="relative bg-green-500 w-3 h-3 rounded-full"></div>

            <p className="ml-2"> -User Traits</p>
          </div>
          <div className="flex items-center mx-2">
            <div className="relative bg-red-500 w-3 h-3 rounded-full"></div>

            <p className="ml-2"> -Group Traits</p>
          </div>
        </div>
        {selectAddScheme.length > 0 &&
          selectAddScheme.map((data, index) => (
            <div className="flex items-center py-2" key={index}>
              <div
                className={`relative  w-3 h-3 rounded-full ${
                  data.type == "group" ? "bg-red-500" : "bg-green-500"
                }`}
              ></div>
              <div className="w-full ml-4 ">
                <Select
                  placeholder="Add Schema to segment"
                  defaultValue={data}
                  onChange={(e) => handleUpdated(e, data)}
                  options={selectOption}
                />
              </div>
            </div>
          ))}
        <div className="flex items-center py-2">
          <div className="relative bg-gray-500 w-3 h-3 rounded-full"></div>
          <div className="w-full ml-4">
            <Select
              placeholder="Add Schema to segment"
              value={selectedOption}
              onChange={handleChange}
              options={selectOption}
            />
          </div>
        </div>
        <div className="flex items-center  text-emerald-500 py-5">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
          <button className="relative p-2 text-green-500" onClick={handleAdded}>
            Add New Schema
            <hr className="border-t-2 border-green-500 " />
          </button>
        </div>
      </div>
      <div className="relative m-5">
        <div className="absolute inset-x-0 bottom-0 ">
          <button
            className="text-white px-4 py-2 my-5 rounded  bg-teal-400"
            onClick={handleSave}
          >
            Save the Segment
          </button>
          <button
            className="text-red-400 bg-white px-4 py-2 my-5 rounded ml-4"
            onClick={() => setIsOpen(!modalIsOpen)}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default Segment;
