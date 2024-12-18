import { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";
import { GoBack } from "../hooks/GoBack";
import Dropdown from "../components/Dropdown";
import { useAuth } from "../context/AuthContext";
import { useSelector } from "react-redux";
import { selectMenu } from "../redux/reducers/userMenuSlice";
import UserMenu from "../components/UserMenu";
import { createEvent, uploadBanner } from "../services/eventApi";
import { toast } from "react-toastify";

const NewEvent = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [preview, setPreview] = useState(null);
  const { user } = useAuth();
  const menu = useSelector(selectMenu);

  // Steps array
  const steps = ["Edit", "Banner", "Ticketing", "Review"];

  // Initial Values for all steps
  // Initial Values for all steps
  const initialValues = {
    title: "",
    event_category: "",
    event_type: "",
    sessions: [
      {
        start_date: "",
        start_time: "",
        end_time: "",
      },
    ],
    venue: {
      location: "",
      meetingLink: "",
      address: "",
    },
    description: "",

    imageUrl: null | "",

    tickets: [
      {
        status: false,
        number_of_tickets: "",
        admissions: [
          {
            name: "",
            price: "",
          },
        ],
      },
    ],
  };

  // Validation schemas for each step
  const validationSchemas = [
    // Validation for event details
    Yup.object({
      title: Yup.string().required("Title is required"),
      event_category: Yup.string().required("Category is required"),
      event_type: Yup.string().required("Please select an event type"),
      sessions: Yup.array().of(
        Yup.object({
          start_date: Yup.string().required("Please set a start date"),
          start_time: Yup.string().required("Set a start time"),
          end_time: Yup.string().required("Set an end time"),
        })
      ),
      venue: Yup.object({
        location: Yup.string().required("Set a location for your event"),
        meetingLink: Yup.string().url("Must be a valid URL"),
        address: Yup.string().required(
          "An address is needed for in-person events"
        ),
      }),
      description: Yup.string().required(
        "Describe what the event is all about"
      ),

      imageUrl: Yup.mixed()
        .required("Image is required")
        .test("fileType", "Unsupported file format", (value) => {
          return (
            value &&
            ["image/jpeg", "image/png", "image/gif"].includes(value.type)
          );
        })
        .test("fileSize", "File is too large", (value) => {
          return value && value.size <= 2 * 1024 * 1024; // 2 MB limit
        }),

      tickets: Yup.array().of(
        Yup.object({
          status: Yup.boolean().required("Ticket status is required"),
          number_of_tickets: Yup.number()
            .positive("Must be a positive number")
            .integer("Must be an integer")
            .required("Number of tickets is required"),
          admissions: Yup.array().of(
            Yup.object({
              name: Yup.string().required("Name of Ticket"),
              price: Yup.number()
                .min(0, "Price cannot be negative")
                .required("Price is required"),
            })
          ),
        })
      ),
    }),
  ];

  // Handlers for navigation
  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setFieldValue("imageUrl", file); // Set the file in Formik's state
      setPreview(URL.createObjectURL(file)); // Generate preview
    }
  };

  // Submission handler
  const onSubmit = async (values, img, setFieldValue) => {
    const res = await uploadBanner(img);
    if (res) {
      setFieldValue("imgUrl", values.imageUrl);
    }
    console.log("Final Form Data: ", values);
    await createEvent(values);
    alert("Form submitted successfully!");
  };

  const eventCategories = [
    "Concerts",
    "Workshops",
    "Conferences",
    "Festivals",
    "Sports",
    "Networking",
    "Charity",
    "Theater",
    "Exhibitions",
    "Comedy Shows",
    "Webinars",
    "Family-Friendly",
    "Educational",
    "Nightlife",
    "Cultural Events",
    "Food & Drink",
    "Wellness & Fitness",
    "Technology",
    "Art & Design",
    "Business & Professional",
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen relative p-8 text-appNavyBlue">
        {menu && <UserMenu />}
        <div className="flex text-4xl font-semibold items-center gap-3 mb-12">
          <button onClick={GoBack}>
            <Icon icon={"ep:back"} />
          </button>
          <h4>Create a New Event</h4>
        </div>
        <div className="inner">
          <div className="relative flex items-center justify-between w-full max-w-3xl mx-auto mt-8">
            <motion.div className="absolute w-[99%] -translate-y-4 top-1/2 left-0 h-1 bg-gray-300 rounded-full">
              <motion.div
                className="absolute top-1/2 left-0 h-1 bg-appNavyBlue  rounded-full"
                style={{
                  width: `${(currentStep / (steps.length - 1)) * 100}%`,
                  transform: "translateY(-50%)",
                }}
                initial={{ width: 0 }}
                animate={{
                  width: `${(currentStep / (steps.length - 1)) * 100}%`,
                }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>

            {steps.map((step, index) => (
              <div
                key={index}
                onClick={() => setCurrentStep(index)}
                className="relative z-10 cursor-pointer flex flex-col items-center"
              >
                <motion.div
                  className={`w-8 h-8 rounded-full ${
                    index <= currentStep ? "bg-appNavyBlue  " : "bg-gray-300"
                  } flex items-center justify-center`}
                >
                  <span
                    className={`w-6 h-6 rounded-full ${
                      index === currentStep ? "bg-white" : ""
                    }`}
                  />
                </motion.div>
                <span
                  className={`mt-2 text-sm ${
                    index <= currentStep
                      ? "text-appbg-appNavyBlue "
                      : "text-gray-400"
                  }`}
                >
                  {step}
                </span>
              </div>
            ))}
          </div>

          {/* Formik Form */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchemas[currentStep]}
          >
            {({ values, setFieldValue, errors, touched }) => (
              <Form className="mt-8 w-full">
                {currentStep === 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: 150 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="grid gap-6 max-w-4xl"
                  >
                    <div>
                      <p className="text-xl w-2/6 font-semibold text-end">
                        Event Details
                      </p>
                      <div className="flex mt-2 gap-4 items-start">
                        <label
                          className="flex justify-end w-2/6"
                          htmlFor="title"
                        >
                          Event Title{" "}
                          <span className="text-red-600 font-semibold">*</span>
                        </label>
                        <div className="w-4/6">
                          <Field
                            name="title"
                            placeholder="Enter the name of your event"
                            className={`block w-full p-2 border ${
                              errors.title && touched.title
                                ? "border-red-400 border-2"
                                : "border-placeholderGray"
                            } rounded`}
                          />
                        </div>
                      </div>

                      <div className="flex mt-2 gap-4 items-start">
                        <label
                          className="flex justify-end w-2/6"
                          htmlFor="event_category"
                        >
                          Event Category{" "}
                          <span className="text-red-600 font-semibold">*</span>
                        </label>
                        <div className="w-4/6">
                          <Dropdown
                            placeholder="Please select an option"
                            options={eventCategories}
                            onChange={(selectedOption) => {
                              // Manually setting Formik field value when dropdown selection changes
                              setFieldValue("event_category", selectedOption);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-xl w-2/6 font-semibold text-end">
                        Date & Time
                      </p>

                      <div role="group" className="flex mt-2 gap-4 items-start">
                        <label
                          className="flex justify-end w-2/6"
                          htmlFor="event_type"
                        >
                          Event Type
                          <span className="text-red-600 font-semibold">*</span>
                        </label>
                        <div className="accent-appNavyBlue flex items-center gap-4">
                          <label className="flex items-center gap-1">
                            <Field
                              type="radio"
                              name="event_type"
                              value="one-time"
                            />
                            <span>One-time</span>
                          </label>

                          <label className="flex items-center gap-1">
                            <Field
                              type="radio"
                              name="event_type"
                              value="recurring"
                            />
                            <span>Recurring Event</span>
                          </label>
                        </div>
                      </div>

                      <div className="flex mt-2 gap-4 items-start">
                        <label
                          className="flex justify-end w-2/6"
                          htmlFor="sessions"
                        >
                          Session(s)
                          <span className="text-red-600 font-semibold">*</span>
                        </label>
                        <div className="w-4/6">
                          <FieldArray name="sessions">
                            {({ remove, push }) => (
                              <>
                                <div className="grid gap-2">
                                  {values.sessions?.map((_, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center w-full gap-4 "
                                    >
                                      <div className="w-1/3">
                                        <Field
                                          name={`sessions[${index}].start_date`}
                                          type="date"
                                          placeholder="DD/MM/YYYY"
                                          className={`block p-2 w-full accent-appNavyBlue cursor-pointer border ${
                                            errors.sessions?.[index]
                                              ?.start_date &&
                                            touched.sessions?.[index]
                                              ?.start_date
                                              ? "border-red-400 border-2"
                                              : "border-placeholderGray"
                                          } rounded`}
                                        />
                                      </div>
                                      <div className="w-1/3">
                                        <Field
                                          name={`sessions[${index}].start_time`}
                                          type="time"
                                          placeholder="Start Time"
                                          className={`block p-2 w-full accent-appNavyBlue cursor-pointer border ${
                                            errors.sessions?.[index]
                                              ?.start_time &&
                                            touched.sessions?.[index]
                                              ?.start_time
                                              ? "border-red-400 border-2"
                                              : "border-placeholderGray"
                                          } rounded`}
                                        />
                                      </div>
                                      <div className="w-1/3">
                                        <Field
                                          name={`sessions[${index}].end_time`}
                                          type="time"
                                          placeholder="End Time"
                                          className={`block p-2 w-full accent-appNavyBlue cursor-pointer border ${
                                            errors.sessions?.[index]
                                              ?.end_time &&
                                            touched.sessions?.[index]?.end_time
                                              ? "border-red-400 border-2"
                                              : "border-placeholderGray"
                                          } rounded`}
                                        />
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="text-red-600 text-xl"
                                      >
                                        <Icon icon={"gg:remove"} />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                                <button
                                  type="button"
                                  onClick={() =>
                                    push({
                                      start_date: "",
                                      start_time: "",
                                      end_time: "",
                                    })
                                  }
                                  className="text-white p-2 w-full bg-appDarkText flex justify-center gap-2 items-center rounded-md mt-2 text-sm"
                                >
                                  Add Session
                                  <Icon icon={"gg:add"} />
                                </button>
                              </>
                            )}
                          </FieldArray>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-xl w-2/6 font-semibold text-end">
                        Location
                      </p>
                      <div className="flex my-2 gap-4 items-start">
                        <label
                          className="flex justify-end w-2/6"
                          htmlFor="venue.location"
                        >
                          Where will your event take place?
                          <span className="text-red-600 font-semibold">*</span>
                        </label>
                        <div className="w-4/6">
                          <Dropdown
                            placeholder="Please select an option"
                            options={["on-site", "online"]}
                            onChange={(selectedOption) => {
                              // Manually setting Formik field value when dropdown selection changes
                              setFieldValue("venue.location", selectedOption);

                              console.log(selectedOption);
                            }}
                          />
                        </div>
                      </div>
                      {values.venue.location === "online" ? (
                        <div className=" flex gap-4 items-start">
                          <label
                            className="flex justify-end w-2/6"
                            htmlFor="venue.meetingLink"
                          >
                            Meeting Link
                            <span className="text-red-600 font-semibold">
                              *
                            </span>
                          </label>
                          <div className="w-4/6">
                            <Field
                              type="url"
                              id="venue.meetingLink"
                              name="meetingLink"
                              className={`border ${
                                errors.venue.meetingLink &&
                                touched.venue.meetingLink
                                  ? "border-red-400"
                                  : "border-placeholderGray"
                              } rounded w-full p-2`}
                              placeholder="Enter the meeting link"
                            />
                          </div>
                        </div>
                      ) : (
                        values.venue.location && (
                          <div className="mt-4 flex gap-4 items-start">
                            <label
                              className="flex justify-end w-2/6"
                              htmlFor="venue.address"
                            >
                              Address
                              <span className="text-red-600 font-semibold">
                                *
                              </span>
                            </label>
                            <div className="w-4/6">
                              <Field
                                type="text"
                                id="venue.address"
                                name="venue.address"
                                className={`border ${
                                  errors.venue?.address &&
                                  touched.venue?.address
                                    ? "border-red-400"
                                    : "border-placeholderGray"
                                } rounded w-full p-2`}
                                placeholder="Enter the event address"
                              />
                            </div>
                          </div>
                        )
                      )}
                    </div>

                    <div>
                      <p className="text-xl w-2/6 font-semibold text-end">
                        Additional Information
                      </p>
                      <div className="flex gap-4 items-start">
                        <label
                          className="flex justify-end w-2/6"
                          htmlFor="description"
                        >
                          Event Description{" "}
                          <span className="text-red-600 font-semibold">*</span>
                        </label>
                        <div className="w-4/6">
                          <Field
                            as="textarea"
                            rows="8"
                            name="description"
                            placeholder="Describe what's special about your event & other important details."
                            className={`block w-full resize-none text-sm p-2 border  ${
                              errors.description && touched.description
                                ? "border-red-400 border-2"
                                : "border-placeholderGray"
                            } rounded`}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 150 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className=" mx-auto max-w-4xl"
                  >
                    <div className="flex gap-8 justify-between">
                      <div>
                        <label htmlFor="image">
                          <p className="text-xl font-medium mb-2">
                            Upload Image
                          </p>
                        </label>
                        <input
                          id="image"
                          name="image"
                          type="file"
                          accept="image/*"
                          onChange={(event) =>
                            handleImageChange(event, setFieldValue)
                          }
                          className={`block cursor-pointer w-full p-2 border ${
                            errors.imageUrl && touched.imageUrl
                              ? "border-red-400 border-2"
                              : "border-placeholderGray"
                          } rounded`}
                        />
                        <ErrorMessage
                          name="image"
                          component="div"
                          className="error"
                        />
                      </div>

                      {/* Image Preview */}
                      {preview && (
                        <div className="preview-container max-w-96 overflow-hidden rounded-lg border-2 border-appNavyBlue aspect-video">
                          <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 150 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="max-w-4xl grid gap-8 mx-auto"
                  >
                    <div>
                      <p className="text-xl font-medium mb-4">
                        What type of event are you running?
                      </p>
                      <div className="flex gap-4">
                        <label
                          onClick={() => {
                            setFieldValue("tickets[0].status", true);
                          }}
                          className="aspect-video flex flex-col peer-checked:border-appNavyBlue peer-checked:ring-2 peer-checked:ring-appNavyBlue items-center justify-center gap-1 p-4 border rounded-md cursor-pointer w-72 text-center transition-colors hover:bg-gray-100 focus-within:ring-2 focus-within:ring-appNavyBlue"
                        >
                          <Field
                            type="radio"
                            name="tickets[0].status"
                            value={true}
                            className="peer sr-only"
                          />
                          <Icon
                            className="text-6xl"
                            icon={"ion:ticket-outline"}
                          />
                          <span className="font-medium text-gray-800">
                            Ticketed Event
                          </span>
                          <span className="text-sm text-gray-500">
                            My event requires tickets for entry
                          </span>
                        </label>

                        <label
                          onClick={() => {
                            setFieldValue("tickets[0].status", true);
                          }}
                          className="aspect-video flex flex-col peer-checked:border-appNavyBlue peer-checked:ring-2 peer-checked:ring-appNavyBlue items-center justify-center gap-1 p-4 border rounded-md cursor-pointer w-72 text-center transition-colors hover:bg-gray-100 focus-within:ring-2 focus-within:ring-appNavyBlue"
                        >
                          <Field
                            type="radio"
                            name="tickets[0].status"
                            value={true}
                            className="peer sr-only"
                          />
                          <Icon
                            className="text-6xl"
                            icon={"ion:ticket-outline"}
                          />
                          <span className="font-medium text-gray-800">
                            Hybrid Event
                          </span>
                          <span className="text-sm text-gray-500">
                            My event has free packages as well as paid
                          </span>
                        </label>

                        <label
                          onClick={() => {
                            setFieldValue("tickets[0].status", false);
                          }}
                          className="aspect-video flex flex-col peer-checked:border-appNavyBlue peer-checked:ring-2 peer-checked:ring-appNavyBlue items-center justify-center gap-1 p-4 border rounded-md cursor-pointer w-72 text-center transition-colors hover:bg-gray-100 focus-within:ring-2 focus-within:ring-appNavyBlue"
                        >
                          <Field
                            type="radio"
                            name="tickets[0].status"
                            value={false}
                            className="peer sr-only"
                          />
                          <Icon
                            className="text-6xl"
                            icon={"fluent-emoji-high-contrast:free-button"}
                          />
                          <span className="font-medium text-gray-800">
                            Free Event
                          </span>
                          <span className="text-sm text-gray-500">
                            I’m running a free event
                          </span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <p className="text-xl font-medium mb-4">
                        How many tickets are you selling?
                      </p>
                      <Field
                        name={`tickets[0].number_of_tickets`}
                        type="number"
                        min="1"
                        placeholder="10"
                        className={`block p-2 w-full accent-appNavyBlue cursor-pointer border ${
                          errors.tickets?.[0].number_of_tickets &&
                          touched.tickets?.[0].number_of_tickets
                            ? "border-red-400 border-2"
                            : "border-placeholderGray"
                        } rounded`}
                      />
                    </div>
                    {values.tickets[0].status == true && (
                      <div>
                        <p className="text-xl font-medium mb-4">
                          What tickets are you selling?
                        </p>
                        <FieldArray name="tickets[0].admissions">
                          {({ remove, push }) => (
                            <>
                              <div className="grid gap-2">
                                {values.tickets?.[0].admissions?.map(
                                  (_, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center w-full gap-4 "
                                    >
                                      <div className="w-1/2">
                                        <p className="text-sm font-medium">
                                          Ticket name
                                        </p>
                                        <Field
                                          name={`tickets[0].admissions?.[${index}].name`}
                                          type="text"
                                          placeholder="Ticket Name e.g. General Admission"
                                          className={`block p-2 w-full accent-appNavyBlue cursor-pointer border ${
                                            errors.tickets?.[0].admissions?.[
                                              index
                                            ]?.name &&
                                            touched.tickets?.[0].admissions?.[
                                              index
                                            ]?.name
                                              ? "border-red-400 border-2"
                                              : "border-placeholderGray"
                                          } rounded`}
                                        />
                                      </div>
                                      <div className="w-1/2">
                                        <p className="text-sm font-medium">
                                          Price
                                        </p>
                                        <Field
                                          name={`tickets[0].admissions[${index}].price`}
                                          type="text"
                                          placeholder="0.00"
                                          className={`block p-2 w-full accent-appNavyBlue cursor-pointer border ${
                                            errors.tickets?.[0].admissions?.[
                                              index
                                            ]?.price &&
                                            touched.tickets?.[0].admissions?.[
                                              index
                                            ]?.price
                                              ? "border-red-400 border-2"
                                              : "border-placeholderGray"
                                          } rounded`}
                                        />
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="text-red-600 text-xl"
                                      >
                                        <Icon icon={"gg:remove"} />
                                      </button>
                                    </div>
                                  )
                                )}
                              </div>
                              <button
                                type="button"
                                onClick={() =>
                                  push({
                                    name: "",
                                    price: "",
                                  })
                                }
                                className="text-white p-2 w-full bg-appDarkText flex justify-center gap-2 items-center rounded-md mt-2 text-sm"
                              >
                                New Ticket Type
                                <Icon icon={"gg:add"} />
                              </button>
                            </>
                          )}
                        </FieldArray>
                      </div>
                    )}
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="p-6 bg-white rounded-lg max-w-4xl mx-auto shadow-md"
                  >
                    {/* Event imageUrl */}
                    <div className="w-full h-72 bg-gray-300 rounded-lg overflow-hidden flex justify-center items-center">
                      <img
                        className="w-full h-full object-cover"
                        src={preview}
                        alt=""
                      />
                    </div>

                    {/* Event Title */}
                    <p className="mt-4 text-2xl font-bold">
                      {values.title || "Event Title"}
                    </p>

                    {/* Date and Time / Ticket Information */}
                    <div className="mt-4 flex flex-col md:flex-row justify-between">
                      {/* Date and Time */}
                      <div className="flex-1">
                        <p className="text-lg font-semibold">Date and Time</p>
                        <div className="mt-2">
                          {values.sessions && values.sessions.length > 0 ? (
                            values.sessions.map((session, index) => (
                              <div key={index} className="mb-4">
                                <div className="flex items-center space-x-2">
                                  <span className="text-gray-600">
                                    &#128197;
                                  </span>
                                  <p>{session.start_date || "Day, Date"}</p>
                                </div>
                                <div className="flex items-center space-x-2 mt-1">
                                  <span className="text-gray-600">
                                    &#128337;
                                  </span>
                                  <p>{session.start_time || "Time"}</p>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-600">&#128197;</span>
                                <p>Day, Date</p>
                              </div>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-gray-600">&#128337;</span>
                                <p>Time</p>
                              </div>
                            </div>
                          )}
                          <a href="#" className="text-blue-600 mt-2 block">
                            + Add to Calendar
                          </a>
                        </div>
                      </div>

                      {/* Ticket Information */}
                      <div className="flex-1 md:ml-6 mt-6 md:mt-0">
                        <p className="text-lg font-semibold">
                          Ticket Information
                        </p>
                        <div className="mt-2">
                          {values.ticketing && values.tickets[0].length > 0 ? (
                            values.tickets[0].map((ticket, index) => (
                              <div key={index} className="mb-4">
                                <div className="flex items-center space-x-2">
                                  <span className="text-gray-600">
                                    &#127903;
                                  </span>
                                  {values.tickets[0].status == false ? (
                                    <p>Free</p>
                                  ) : (
                                    <p>
                                      {ticket.name || "Type"}:{" "}
                                      {ticket.price
                                        ? `${ticket.price}/ticket`
                                        : "Price/ticket"}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))
                          ) : (
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-600">&#127903;</span>
                                <p>Ticket Type: Price /ticket</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="mt-6">
                      <p className="text-lg font-semibold">Location</p>
                      <div className="mt-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-600">&#128205;</span>
                          <p>
                            {values.venue.address || "Address"}
                          </p>
                        </div>
                        <div className="mt-4 w-full h-48 bg-gray-300 rounded-lg flex justify-center items-center">
                          <p className="text-gray-500">Map Placeholder</p>
                        </div>
                      </div>
                    </div>

                    {/* Hosted By */}
                    <div className="mt-6">
                      <p className="text-lg font-semibold">Hosted by</p>
                      <div className="mt-4 flex items-center">
                        <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0"></div>
                        <div className="ml-4">
                          <p className="font-semibold">
                            {user?.name || "Host name"}
                          </p>
                          <div className="flex mt-2 space-x-2">
                            <button className="px-4 py-1 text-sm bg-gray-200 rounded">
                              Contact
                            </button>
                            <button className="px-4 py-1 text-sm bg-blue-600 text-white rounded">
                              + Follow
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Event Description */}
                    <div className="mt-6">
                      <p className="text-lg font-semibold">Event Description</p>
                      <p className="mt-2 text-gray-700">
                        {values.description ||
                          "Lorem ipsum dolor sit amet consectetur. Eget vulputate sociis sit urna sit aliquet. Vivamus facilisis diam libero dolor volutpat diam eu. Quis a id posuere etiamat enim vivamus..."}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-end gap-4 mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="px-4 py-2 bg-appYellow rounded disabled:opacity-50"
                  >
                    Previous
                  </button>
                  {(() => {
                    switch (currentStep) {
                      case 0:
                        return (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              if (
                                values.sessions !== null &&
                                values.title !== "" &&
                                values.event_type !== "" &&
                                values.venue.location !== ""
                              ) {
                                nextStep();
                              } else {
                                toast.warning(
                                  "Please fill in all required fields"
                                );
                              }
                            }}
                            className="px-4 py-2 bg-appNavyBlue  text-white rounded"
                          >
                            Save & Continue
                          </button>
                        );
                      case 1:
                        return (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              if (values.imageUrl !== null) {
                                nextStep();
                              } else {
                                toast.warning("Please upload a imageUrl image");
                              }
                            }}
                            className="px-4 py-2 bg-appNavyBlue  text-white rounded"
                          >
                            Save & Continue
                          </button>
                        );
                      case 2:
                        return (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              if (
                                values.tickets[0].status !== null &&
                                values.tickets[0].number_of_tickets !== ""
                              ) {
                                nextStep();
                              } else {
                                toast.warning("Please fill in all ticket info");
                              }
                            }}
                            className="px-4 py-2 bg-appNavyBlue  text-white rounded"
                          >
                            Save & Continue
                          </button>
                        );
                      case 3:
                        return (
                          <button
                            type="submit"
                            onClick={() => {
                              onSubmit(values, values.imageUrl, setFieldValue);
                            }}
                            className="px-4 py-2 bg-appNavyBlue  text-white rounded"
                          >
                            Submit
                          </button>
                        );
                      default:
                        return null;
                    }
                  })()}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewEvent;
