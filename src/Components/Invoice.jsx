import React, { useContext, useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useFormContext } from "../Context/FormContext";
import { useNavigate } from "react-router-dom";
import logo from "../Images/Logo.png";

export const Invoice = () => {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const { formData, setFormData } = useFormContext();
  

  const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const nav = useNavigate();

  useEffect(() => {
    const part1 = generateRandomNumber(200, 299);
    const part2 = generateRandomNumber(1000, 1199);
    setInvoiceNumber(`${part1}/${part2}`);

    const today = new Date();
    setCurrentDate(today.toLocaleDateString());
  }, []);

  // SAme size invoice for all screens download

  const GenerateInvoice = () => {
    const invoiceElement = document.getElementById("invoiceCapture");
  
    html2canvas(invoiceElement, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
  
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
  
      // Calculate scaling factor to fit the canvas content into a single page
      const canvasAspectRatio = canvas.width / canvas.height;
      const pdfAspectRatio = pdfWidth / pdfHeight;
  
      let imgWidth, imgHeight;
      if (canvasAspectRatio > pdfAspectRatio) {
        // Scale to fit width
        imgWidth = pdfWidth;
        imgHeight = (canvas.height * pdfWidth) / canvas.width;
      } else {
        // Scale to fit height
        imgHeight = pdfHeight;
        imgWidth = (canvas.width * pdfHeight) / canvas.height;
      }
  
      const xOffset = (pdfWidth - imgWidth) / 6; // Center horizontally
      const yOffset = (pdfHeight - imgHeight) / 6; // Center vertically
  
      pdf.addImage(imgData, "PNG", xOffset, yOffset, imgWidth, imgHeight);
      pdf.save(`Invoice.pdf`);
    });
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${month}/${day}/${year}`;
  };
  

  return (
    <div>
      <div
        id="invoiceCapture"
        className="max-w-4xl mx-auto border border-gray-300 p-6 rounded-lg font-serif mt-8"
      >
        <div>
          <div className="flex flex-col items-center justify-center h-16 w-full mb-6 mt-2">
            <img src={logo} className="w-64" alt="" />
            <h1 className="text-2xl font-semibold text-gray-800 max-sm:text-sm">INVOICE</h1>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex justify-center items-center w-fit"></div>
            <div className="flex flex-col">
              <h2 className="text-md font-bold text-gray-800">
                Invoice #:{" "}
                <span className="font-normal">{formData?.invoiceNumber}</span>
              </h2>
              <p className="text-sm text-gray-500">Date: {currentDate}</p>
              <p className="text-sm text-gray-500">Taken By: {formData.orderTakenBy}</p>
            </div>
          </div>
          <header className="flex justify-between items-center border-b border-gray-300 pb-4 flex-wrap">
            <div>
              <p className="text-sm text-gray-500">Lajwanti Studio</p>
              <p className="text-sm text-gray-500">
                164-P, Gulberg 2, Mini Market, Lahore, Pakistan
              </p>
              <p className="text-sm text-gray-500">
                sales@lajwanti.com.pk | +92 309-7773181
              </p>
            </div>
          </header>

          <section className="mt-6 text-md">
            <h3 className="text-lg font-semibold text-gray-700 ">
              Client Details
            </h3>
            <div className="mt-2  text-gray-600">
              <p>
                <span className="font-medium">Name:</span>{" "}
                {formData?.customerName}
              </p>
              <p>
                <span className="font-medium">Contact:</span>{" "}
                {formData?.phoneNumber}
              </p>
              <p>
                <span className="font-medium">Email: </span>{" "}
                {formData?.email}
              </p>
              <p>
                <span className="font-medium">Address: </span>{" "}
                {formData?.address}
              </p>
            </div>
          </section>

          <section className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700">
              Order Details
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 mt-2 text-md text-gray-600">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="border border-gray-300 px-4 py-2">SR#</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Garment Code
                    </th>
                    <th className="border border-gray-300 px-4 py-2">Size</th>
                    <th className="border border-gray-300 px-4 py-2">Qty</th>
                    <th className="border border-gray-300 px-4 py-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">1</td>
                    <td className="border border-gray-300 px-4 py-2 ">
                      {formData?.items}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 ">
                      {formData?.size}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">1</td>
                    <td className="border border-gray-300 px-4 py-2">
                    {(parseInt(formData.advancePaid, 10) || 0) + (parseInt(formData.amountDue, 10) || 0)} PKR
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-6 flex justify-between items-center flex-wrap">
            <div>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Status:</span> {formData.status}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Delivery Date:</span> {formatDate(formData.deliveryDate)}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Handed To:</span> {formData.orderHandedTo}
              </p>
            </div>
            <div className="flex gap-2">
              <h3 className="text-lg font-semibold text-gray-700">
                Amount Paid:{" "}
              </h3>
              <p className="text-lg font-bold text-gray-700"> {formData?.advancePaid} PKR</p>
            </div>
          </section>
        </div>
      </div>
      <div className="mt-4 text-center flex items-center justify-center gap-2 font-serif">
        <button
          onClick={GenerateInvoice}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
        >
          Download Invoice
        </button>
        <button
          onClick={() => {
            nav("/");
            setFormData("");
          }}
          className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600"
        >
          Continue to shop
        </button>
      </div>
    </div>
  );
};
