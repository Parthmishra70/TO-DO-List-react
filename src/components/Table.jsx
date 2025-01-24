import React, { useEffect, useState } from "react";
import edit from "../assets/edit.svg";
import data from "../assets/data.json";
import dust from "../assets/dust.svg";
import "../App.css";

const Table = (props) => {
  const [check, setcheck] = useState();
  const [fetch, setfetch] = useState(null);
  const [open, setopen] = useState(null);
  const header = ["ID", "Title", "Description", "Edit", "Delete"];

  useEffect(() => {
    if (fetch != null) {
      data.data.map((items) => {
        if (items.id == fetch) {
props.setShare(fetch);
        }
      });
    }
  }, [fetch]);

  return (
    <div>
      <div className=" pl-10 pr-10">
        <table className="w-full border border-gray-300 ">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left border-b border-gray-300">
                <input type="checkbox" />
              </th>
              {header.map((item, index) => (
                <th
                  key={`header-${index}`}
                  className="px-4 py-2 text-left border-b border-gray-300"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b border-gray-300">
                  <input type="checkbox" checked={check} />
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {item.title}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {item.description}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {item.date}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  <div className="hover:bg-green-400 cursor-pointer inline-block p-2 rounded ">
                    <img
                      src={edit}
                      height="18"
                      width="28"
                      alt="Edit"
                      onClick={() => {
                        setfetch(item.id);
                      }}
                    />
                  </div>
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  <div className="hover:bg-red-400 cursor-pointer inline-block p-2 rounded">
                    <img src={dust} height="18" width="28" alt="Delete" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
