"use client";
import Header from "./components/Header";
import CertificationVerify from "./components/CertificationVerify.json";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function Home() {
  const mycontract = "0xFCa3A60762Ced92A1389b2347e52f761Ea5F41ca";
  const [address, setAddress] = useState(null);
  const [contract, setContract] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showForm2, setShowForm2] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [wrongMessage, setwrongMessage] = useState("");
  const [show, setShow] = useState(false);
  const [certificateDetails, setCertificateDetails] = useState(null);
  const [formdata, setFormdata] = useState({
    certificateID: "",
    certificateName: "",
    CertificateRecepient: "",
    cgpaObtained: "",
    cgpaMaximum: "",
    institution: "",
  });
  const [formdataa, setFormdataa] = useState({
    certificateID: "",
  });

  useEffect(() => {
    async function initialize() {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAddress(address);
        const contract = new ethers.Contract(
          mycontract,
          CertificationVerify,
          signer
        );
        setContract(contract);
        console.log("Ethereum provider:", provider);
      }
    }
    initialize();
  }, []);

  function toggleFormVisibility() {
    setShowForm(!false);
    setShowForm2(false);
    setShow(false);
    setSuccessMessage(false);
    setCertificateDetails(false);
    setwrongMessage(false);
  }
  function toggleFormVisibility2() {
    setShowForm(false);
    setShowForm2(!false);
    setShow(false);
    setSuccessMessage(false);
    setCertificateDetails(false);
    setwrongMessage(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setFormdata((data) => ({ ...data, [name]: value }));
  }
  function handleSubmit2(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setFormdataa((data) => ({ ...data, [name]: value }));
  }

  // function handleSubmit2(e) {
  //   e.preventDefault();
  //   const { name, value } = e.target;
  //   setFormdata((data) => ({ ...data, [name]: value }));
  // }
  async function submittingFormData() {
    const data1 = formdata.certificateID;
    const data2 = formdata.certificateName;
    const data3 = formdata.CertificateRecepient;
    const data4 = formdata.cgpaObtained;
    const data5 = formdata.cgpaMaximum;
    const data6 = formdata.institution;

    try {
      // Make sure to pass all six arguments to the contract function
      const mydeporesult = await contract?.addNewCertificates(
        data1,
        data2,
        data3,
        data4,
        data5,
        data6
      );

      console.log(mydeporesult);
      setSuccessMessage(
        "Congratulations! Your data has been successfully received."
      );
      setwrongMessage(false);
      setShowForm(false);
      setShowForm2(false);
    } catch (error) {
      console.error("Error submitting data to the contract:", error);
    }
  }

  async function retrievingFormData() {
    console.log("Retrieving form data function called");
    const mydeporesult = await contract?.getCertificateDetails(
      formdataa.certificateID
    );
    console.log("hello:", mydeporesult.certificateName);
    // if () {
    //   console.log("data not found man");
    // } else {
    //   console.log("data found");
    // }
    console.log("output", mydeporesult);
    setCertificateDetails(mydeporesult);
    console.log("output certificate", certificateDetails);
    if (mydeporesult.certificateName === "") {
      console.log("its first loop");
      setwrongMessage("Not Verified!!");
      setCertificateDetails(false);
      setShowForm(false);
      setShowForm2(false);
    } else {
      setShowForm(false);
      setShowForm2(false);
      setSuccessMessage("Verification Successfull!!");
    }
  }

  const certificateForm = (
    <form className="mt-4">
      <div className="mb-4">
        <label htmlFor="certificateID" className="block font-bold">
          Certificate ID:
        </label>
        <input
          type="number"
          id="certificateID"
          name="certificateID"
          placeholder=" i.e. 123456"
          className="border rounded p-2"
          onChange={handleSubmit}
          value={formdata.certificateID}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="certificateName" className="block font-bold">
          Certificate Completed:
        </label>
        <input
          type="text"
          id="certificateName"
          name="certificateName"
          placeholder=" i.e. SSC or HSC or BSC"
          className="border rounded p-2"
          onChange={handleSubmit}
          value={formdata.certificateName}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="CertificateRecepient" className="block font-bold">
          Certificate Recipient:
        </label>
        <input
          type="text"
          id="CertificateRecepient"
          name="CertificateRecepient"
          placeholder=" i.e. Abid Adnan"
          className="border rounded p-2"
          onChange={handleSubmit}
          value={formdata.CertificateRecepient}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="cgpaObtained" className="block font-bold">
          CGPA Obtained:
        </label>
        <input
          type="number"
          id="cgpaObtained"
          name="cgpaObtained"
          placeholder=" i.e. for 3.98 write 398"
          className="border rounded p-2"
          onChange={handleSubmit}
          value={formdata.cgpaObtained}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="cgpaMaximum" className="block font-bold">
          Maximum CGPA:
        </label>
        <input
          type="number"
          id="cgpaMaximum"
          name="cgpaMaximum"
          placeholder=" i.e. 4"
          className="border rounded p-2"
          onChange={handleSubmit}
          value={formdata.cgpaMaximum}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="institution" className="block font-bold">
          Institution Name:
        </label>
        <input
          type="text"
          id="institution"
          name="institution"
          placeholder=" i.e. Harvard University"
          className="border rounded p-2"
          onChange={handleSubmit}
          value={formdata.institution}
          required
        />
      </div>
      <button
        type="button"
        className="flex justify-center bg-blue-500 hover:bg-blue-400 mb-20 text-white font-bold py-2 px-4 rounded"
        onClick={submittingFormData}
      >
        Submit
      </button>
    </form>
  );
  const certificateForm2 = (
    <form onSubmit={handleSubmit2} className="mt-4">
      <div className="mb-4">
        <label htmlFor="certificateID" className="block font-bold">
          Certificate ID:
        </label>
        <input
          type="number"
          id="certificateID"
          name="certificateID"
          placeholder=" i.e. 123456"
          className="border rounded p-2"
          value={formdataa.certificateID}
          onChange={handleSubmit2}
          required
        />
      </div>
      <button
        type="button"
        className="flex justify-center bg-blue-500 hover:bg-blue-400 mb-20 text-white font-bold py-2 px-4 rounded"
        onClick={retrievingFormData}
      >
        CHECK
      </button>
    </form>
  );

  return (
    <div className=" h-screen ">
      <Header></Header>
      <div className="flex flex-col items-center py-10  mt-10 mb-10">
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-orange-100 mb-10">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-center">
              Welcome to our cutting-edge Secured Verification System, where
              trust meets technology, ensuring the utmost security and
              authenticity in every interaction.
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <button
            class=" bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            onClick={toggleFormVisibility}
          >
            Add Certificate
          </button>
          <button
            class=" bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            onClick={toggleFormVisibility2}
          >
            Verify
          </button>
        </div>
        {showForm ? certificateForm : showForm2 && certificateForm2}
        {successMessage && (
          <div className="text-green-500 text-xl mt-11 font-bold mb-4">
            {successMessage}
          </div>
        )}
        {certificateDetails ? (
          <div className="mt-4 mb-10">
            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-green-100 mb-10">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-center">
                  <h3>Certificate Details</h3>
                  <p>Certificate ID: {certificateDetails[0].toNumber()}</p>
                  <p>Certificate Name: {certificateDetails[1]}</p>
                  <p>Recipient: {certificateDetails[2]}</p>
                  <p>CGPA Obtained: {certificateDetails[3].toNumber()}</p>
                  <p>Maximum CGPA: {certificateDetails[4].toNumber()}</p>
                  <p>Institution: {certificateDetails[5]}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-red-500 text-xl mt-11 font-bold mb-4">
            {wrongMessage}
          </div>
        )}
      </div>
    </div>
  );
}
