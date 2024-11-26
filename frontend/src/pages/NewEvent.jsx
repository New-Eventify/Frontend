import { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";
import { GoBack } from "../hooks/GoBack";
import Dropdown from "../components/Dropdown";

const NewEvent = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [preview, setPreview] = useState(null);

  // Steps array
  const steps = ["Edit", "Banner", "Ticketing", "Review"];

  // Initial Values for all steps
  const initialValues = {
    edit: {
      title: "",
      category: "",
      type: "",
      sessions: [
        {
          date: "",
          startTime: "",
          endTime: "",
        },
      ],
      location: "",
      description: "",
    },
    banner: null,
    ticketing: {
      type: "",
      tickets: [
        {
          name: "",
          price: "",
          available: "",
        },
      ],
    },
  };

  // Validation schemas for each step
  const validationSchemas = [
    Yup.object({
      edit: Yup.object({
        title: Yup.string().required("Title is required"),
        category: Yup.string().required("Category is required"),
        type: Yup.string().required("Please select an event type"),
        sessions: Yup.array().of(
          Yup.object({
            date: Yup.string().required("Please set a date"),
            startTime: Yup.string().required("Set a start time"),
            endTime: Yup.string().required("Set an end time"),
          })
        ),
        location: Yup.string().required("Set a location for your event"),
        description: Yup.string().required(
          "Describe what the event is all about"
        ),
      }),
    }),
    Yup.object({
      banner: Yup.mixed()
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
    }),
    Yup.object({
      ticketing: Yup.object({
        tickets: Yup.array().of(
          Yup.object({
            name: Yup.string().required("Name of Ticket"),
            price: Yup.string().required("Price is required"),
            available: Yup.number().positive("Must be a positive number"),
          })
        ),
      }),
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
      setFieldValue("image", file); // Set the file in Formik's state
      setPreview(URL.createObjectURL(file)); // Generate preview
    }
  };

  // Submission handler
  const onSubmit = (values) => {
    console.log("Final Form Data: ", values);
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

  const popularCitiesInNigeria = [
    "Online",
    "Lagos",
    "Abuja",
    "Kano",
    "Ibadan",
    "Port Harcourt",
    "Benin City",
    "Jos",
    "Enugu",
    "Kaduna",
    "Abeokuta",
    "Onitsha",
    "Maiduguri",
    "Calabar",
    "Owerri",
    "Ilorin",
    "Uyo",
    "Warri",
    "Akure",
    "Asaba",
    "Ekiti",
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen p-8 text-appNavyBlue">
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
                className="relative z-10 flex flex-col items-center"
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
            onSubmit={onSubmit}
          >
            {({ values, isSubmitting, setFieldValue, errors, touched }) => (
              <Form className="mt-8 w-full">
                {currentStep === 0 && (
                  <div className="grid gap-6 max-w-3xl">
                    <div>
                      <p className="text-xl w-2/6 font-semibold text-end">
                        Event Details
                      </p>
                      <div className="flex mt-2 gap-4 items-start">
                        <label
                          className="flex justify-end w-2/6"
                          htmlFor="edit.title"
                        >
                          Event Title{" "}
                          <span className="text-red-600 font-semibold">*</span>
                        </label>
                        <div className="w-4/6">
                          <Field
                            name="edit.title"
                            placeholder="Enter the name of your event"
                            className={`block w-full p-2 border ${
                              errors.edit?.title && touched.edit?.title
                                ? "border-red-400 border-2"
                                : "border-placeholderGray"
                            } rounded`}
                          />
                        </div>
                      </div>

                      <div className="flex mt-2 gap-4 items-start">
                        <label
                          className="flex justify-end w-2/6"
                          htmlFor="edit.category"
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
                              setFieldValue("category", selectedOption.value);
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
                          htmlFor="edit.type"
                        >
                          Event Type
                          <span className="text-red-600 font-semibold">*</span>
                        </label>
                        <div className="accent-appNavyBlue flex items-center gap-4">
                          <label className="flex items-center gap-1">
                            <Field
                              type="radio"
                              name="edit.type"
                              value="one-time"
                            />
                            <span>One-time</span>
                          </label>

                          <label className="flex items-center gap-1">
                            <Field
                              type="radio"
                              name="edit.type"
                              value="recurring"
                            />
                            <span>Recurring Event</span>
                          </label>
                        </div>
                      </div>

                      <div className="flex mt-2 gap-4 items-start">
                        <label
                          className="flex justify-end w-2/6"
                          htmlFor="edit.sessions"
                        >
                          Session(s)
                          <span className="text-red-600 font-semibold">*</span>
                        </label>
                        <div className="w-4/6">
                          <FieldArray name="edit.sessions">
                            {({ remove, push }) => (
                              <>
                                <div className="grid gap-2">
                                  {values.edit?.sessions?.map((_, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center w-full gap-4 "
                                    >
                                      <div className="w-1/3">
                                        <Field
                                          name={`edit.sessions[${index}].date`}
                                          type="date"
                                          placeholder="DD/MM/YYYY"
                                          className={`block p-2 w-full accent-appNavyBlue cursor-pointer border ${
                                            errors.edit?.sessions?.[index]
                                              ?.date &&
                                            touched.edit?.sessions?.[index]
                                              ?.date
                                              ? "border-red-400 border-2"
                                              : "border-placeholderGray"
                                          } rounded`}
                                        />
                                      </div>
                                      <div className="w-1/3">
                                        <Field
                                          name={`edit.sessions[${index}].startTime`}
                                          type="time"
                                          placeholder="Start Time"
                                          className={`block p-2 w-full accent-appNavyBlue cursor-pointer border ${
                                            errors.edit?.sessions?.[index]
                                              ?.startTime &&
                                            touched.edit?.sessions?.[index]
                                              ?.startTime
                                              ? "border-red-400 border-2"
                                              : "border-placeholderGray"
                                          } rounded`}
                                        />
                                      </div>
                                      <div className="w-1/3">
                                        <Field
                                          name={`edit.sessions[${index}].endTime`}
                                          type="time"
                                          placeholder="End Time"
                                          className={`block p-2 w-full accent-appNavyBlue cursor-pointer border ${
                                            errors.edit?.sessions?.[index]
                                              ?.endTime &&
                                            touched.edit?.sessions?.[index]
                                              ?.endTime
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
                                      date: "",
                                      startTime: "",
                                      endTime: "",
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
                      <div className="flex mt-2 gap-4 items-start">
                        <label
                          className="flex justify-end w-2/6"
                          htmlFor="edit.location"
                        >
                          Where will your event take place?
                          <span className="text-red-600 font-semibold">*</span>
                        </label>
                        <div className="w-4/6">
                          <Dropdown
                            placeholder="Please select an option"
                            options={popularCitiesInNigeria}
                            onChange={(selectedOption) => {
                              // Manually setting Formik field value when dropdown selection changes
                              setFieldValue("location", selectedOption.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-xl w-2/6 font-semibold text-end">
                        Additional Information
                      </p>
                      <div className="flex gap-4 items-start">
                        <label
                          className="flex justify-end w-2/6"
                          htmlFor="edit.description"
                        >
                          Event Description{" "}
                          <span className="text-red-600 font-semibold">*</span>
                        </label>
                        <div className="w-4/6">
                          <Field
                            as="textarea"
                            rows="8"
                            name="edit.description"
                            placeholder="Describe what's special about your event & other important details."
                            className={`block w-full resize-none text-sm p-2 border  ${
                              errors.edit?.description &&
                              touched.edit?.description
                                ? "border-red-400 border-2"
                                : "border-placeholderGray"
                            } rounded`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="flex gap-8 mx-auto max-w-3xl justify-between">
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
                          errors.banner && touched.banner
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
                )}

                {currentStep === 2 && (
                  <div>
                    <h2 className="text-lg font-bold">Ticketing</h2>
                    <Field
                      name="ticketing.tickets"
                      type="number"
                      placeholder="Number of Tickets"
                      className="block w-full p-2 mt-4 border border-placeholderGray rounded"
                    />
                    <ErrorMessage
                      name="ticketing.tickets"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                )}

                {currentStep === 3 && (
                  <div>
                    <h2 className="text-lg font-bold">Review</h2>
                    <pre className="p-4 bg-gray-100 rounded">
                      {JSON.stringify(values, null, 2)}
                    </pre>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  {currentStep === steps.length - 1 ? (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 bg-appNavyBlue  text-white rounded"
                    >
                      Submit
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-4 py-2 bg-appNavyBlue  text-white rounded"
                    >
                      Save & Continue
                    </button>
                  )}
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
