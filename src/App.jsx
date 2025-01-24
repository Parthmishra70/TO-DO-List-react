import { useEffect, useRef, useState } from "react";
import "./App.css";
import edit from "./assets/edit.svg";
import dust from "./assets/dust.svg";
import uuid4 from "uuid4";

function App() {
  const [EnableEdit, setEnableEdit] = useState(null);
  const [allcheckbox, setallcheckbox] = useState(false);
  const [completeTask, setcompleteTask] = useState(true);
  const [dataV, setDataV] = useState(() => {
    const value = localStorage.getItem("dataV");
    return value ? JSON.parse(value) : [];
  });

  // When Any change occurs so it will update
  useEffect(() => {
    localStorage.setItem("dataV", JSON.stringify(dataV));
    console.log("Data has been changed", dataV);
  }, [dataV]);

  // Here is the Table Heading
  const header = ["Title", "Description", "Edit", "Delete"];

  // ToDo Data
  const titleref = useRef(null);
  const descref = useRef(null);
  const currentDate = new Date();
  const data = JSON.parse(localStorage.getItem("dataV"));

  const handleAdd = () => {
    const title = titleref.current.value;
    const description = descref.current.value;
    const formattedDate = currentDate.toLocaleDateString("en-GB"); // Format: DD/MM/YYYY
    if (EnableEdit != null) {
      data.map((items) => {
        if (EnableEdit == items.id) {
          console.log("EnableEdit:", EnableEdit);
          items.title = titleref.current.value;
          items.description = descref.current.value;
          localStorage.setItem("dataV", JSON.stringify(data));
        }
      });
    } else {
      if (titleref.current.value != null && descref.current.value != null) {
        let vol = {
          id: uuid4(),
          title: title,
          description: description,
          date: formattedDate,
          complete: false, // Add the complete property
        };

        console.log(vol);

        setDataV((prevData) => [...prevData, vol]);
      } else {
        console.log("All filed can not be empty");
      }
    }
  };

  async function handleEdit(id) {
    titleref.current.value = data[0].title;
    descref.current.value = data[0].description;
    setEnableEdit(`${id}`);
  }

  async function handleDelete(id) {
    console.log("handleDelete", id);
    let value = dataV.filter((items) => items.id !== id);
    setDataV(value);
  }

  const handleCheckbox = (id) => {
    console.log("in checkbox id::", id);
    const val = dataV.map((items) => {
      if (items.id === id) {
        console.log("this is matched", id);
        return { ...items, complete: !items.complete };
      } else {
        return { ...items, complete: items.complete };
      }
    });
    setDataV(val);
  };

  const selectAll = () => {
    if (!allcheckbox) {
      console.log("selectALL:::", true);
      setallcheckbox(true);
      setDataV(
        dataV.map((items) => {
          return items ? { ...items, complete: true } : items;
        })
      );
    } else {
      setallcheckbox(false);
      setDataV(
        data.map((items) => {
          return items ? { ...items, complete: false } : items;
        })
      );
    }
  };

  return (
    <>
      {/* Form */}
      <div className=" bg-white  py-24 sm:py-10 p-5 md:p-4 mt-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            ToDo Task
          </h2>
          <p className="mt-2 text-lg/8 text-gray-600">
            Add the data and Delete the data
          </p>
        </div>

        <form className="mx-auto mt-10 max-w-xl sm:mt-10">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                htmlFor="title"
                className="block text-sm/6 font-semibold text-gray-900"
              >
                Title
              </label>
              <div className="mt-2.5">
                <input
                  id="title"
                  name="title"
                  ref={titleref}
                  type="text"
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm/6 font-semibold text-gray-900"
              >
                Description{" "}
              </label>
              <div className="mt-2.5">
                <textarea
                  id="message"
                  name="message"
                  ref={descref}
                  rows={4}
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              onClick={handleAdd}
              className="block  md:w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit{" "}
            </button>
          </div>
        </form>
      </div>

      {/* Table  */}
      <div className="mb-5 mt-5  ">
        <div className=" pl-2 pr-2 md:pl-10 md:pr-10 mt-5">
          <input
            type="checkbox"
            className="mr-15"
            checked={completeTask}
            onClick={() => {
              setcompleteTask(!completeTask);
            }}
          />{" "}
          <span>Completed Task</span>
          <table className="w-full border border-gray-300 mt-5 ">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left border-b border-gray-300">
                  <input
                    type="checkbox"
                    onChange={() => {
                      selectAll();
                    }}
                  />
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
              {dataV.map((item, index) =>
                completeTask ? (
                  item.complete && (
                    <tr
                      key={index}
                      className={item.complete ? "line-through" : ""}
                    >
                      <td className="px-4 py-2 border-b border-gray-300">
                        <input
                          type="checkbox"
                          key={index}
                          checked={item.complete}
                          onChange={() => {
                            handleCheckbox(item.id);
                          }}
                        />
                      </td>
                      <td className="px-4 py-2 border-b border-gray-300">
                        {item.title}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-300">
                        {item.description.slice(0, 30)}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-300">
                        <div
                          className="hover:bg-green-400 cursor-pointer inline-block p-2 rounded "
                          onClick={() => {
                            handleEdit(item.id);
                          }}
                        >
                          <img src={edit} height="18" width="28" alt="Edit" />
                        </div>
                      </td>
                      <td className="px-4 py-2 border-b border-gray-300">
                        <div
                          className="hover:bg-red-400 cursor-pointer inline-block p-2 rounded"
                          onClick={() => {
                            handleDelete(item.id);
                          }}
                        >
                          <img src={dust} height="18" width="28" alt="Delete" />
                        </div>
                      </td>
                    </tr>
                  )
                ) : (
                  <tr
                    key={index}
                    className={item.complete ? "line-through" : ""}
                  >
                    <td className="px-4 py-2 border-b border-gray-300">
                      <input
                        type="checkbox"
                        key={index}
                        checked={item.complete}
                        onChange={() => {
                          handleCheckbox(item.id);
                        }}
                      />
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300">
                      {item.title.slice(0, 30)}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300">
                      {item.description.slice(0, 30)}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300">
                      <div
                        className="hover:bg-green-400 cursor-pointer inline-block p-2 rounded "
                        onClick={() => {
                          handleEdit(item.id);
                        }}
                      >
                        <img src={edit} height="18" width="28" alt="Edit" />
                      </div>
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300">
                      <div
                        className="hover:bg-red-400 cursor-pointer inline-block p-2 rounded"
                        onClick={() => {
                          handleDelete(item.id);
                        }}
                      >
                        <img src={dust} height="18" width="28" alt="Delete" />
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
