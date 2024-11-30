import React from "react";
import { ThemeContext } from "../../context/Theme";
import { useContext, useState, useEffect, useRef } from "react";
import { AlertsContext } from "../../context/Alerts";
import { SuccessContext } from "../../context/Success";
import jsPDF from "jspdf";
import * as htmlToImage from "html-to-image";
import API from "../../service/API";

export const Receipt = ({ setSelected, transactionSelected }) => {
  const [theme] = useContext(ThemeContext);
  const [transaction, setTransaction] = useState([]);
  const [success, setSuccess] = useContext(SuccessContext);
  const [errors, setErrors] = useContext(AlertsContext);
  const authToken = localStorage.getItem("authToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [isloading, setIsloading] = useState(true);

  const onButtonClick = () => {
    let domElement = document.getElementById("custom-receipt");

    // Use htmlToImage to generate the image
    htmlToImage
      .toPng(domElement)
      .then(function (dataUrl) {
        console.log(dataUrl);

        // Create a new jsPDF instance
        const pdf = new jsPDF();

        // Adjust the image size and position based on the page dimensions
        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth() - 10;
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // Adjust the scaling if the content is too large for the page
        const ratio = Math.min(
          pdfWidth / imgProps.width,
          pdfHeight / imgProps.height
        );
        const scaledWidth = imgProps.width * ratio;
        const scaledHeight = imgProps.height * ratio;

        // Add the image to the PDF
        pdf.addImage(dataUrl, "PNG", 5, 20, scaledWidth, scaledHeight);

        // Save the generated PDF
        pdf.save("download.pdf");
      })
      .catch(function (error) {
        console.error("Oops, something went wrong!", error);
      });
  };

  useEffect(() => {
    const handleViewReceipt = async () => {
      setErrors([]);
      setSuccess(false);
      const config = {
        url: `${serverUrl}/transaction/viewreceipt`,
        method: "POST",
        data: { his_id: transactionSelected },
      };

      const { res, error } = await API(config);
      if (res) {
        setTransaction(res.data.transaction);
        setIsloading(false);
      }
      if (error) console.log(error);
    };
    handleViewReceipt();
  }, [transactionSelected]);

  return (
    <>
      <button
        onClick={onButtonClick}
        type="button"
        className="fixed bottom-5 right-5 z-10 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        <i className="fa-regular fa-circle-down"></i> Download
      </button>
      <div
        id="custom-receipt"
        className="relative bg-white border rounded-lg shadow-lg px-6 py-8 flex-grow min-w-20 mx-auto mt-8"
      >
        {/* Upper left button */}
        <button
          id="btn_back"
          onClick={() => {
            setSelected("Transactions");
          }}
          className="rounded-lg px-1"
        >
          <i className="fa-solid fa-circle-chevron-left text-3xl"></i>
        </button>

        <h1 className="font-bold text-2xl my-4 text-center text-blue-600">
          Pugad Maharlika
        </h1>
        <hr className="mb-2" />

        <div className="flex justify-between mb-6">
          <h1 className="text-lg font-bold">Invoice</h1>
          <div className="text-gray-700">
            <div>
              Date:
              {new Date(
                transaction && transaction.date_created
              ).toLocaleString()}
            </div>
            <div>Invoice #: {transaction && transaction.his_id}</div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">Bill To:</h2>
          <div className="text-gray-700 mb-2">
            {transaction && transaction.acc_username}
          </div>
          <div className="text-gray-700">
            {transaction && transaction.acc_email}
          </div>
        </div>

        <table className="w-full mb-8">
          <thead>
            <tr>
              <th className="text-left font-bold text-gray-700">Description</th>
              <th className="text-right font-bold text-gray-700">Amount</th>
            </tr>
          </thead>
          <tr>
            <td className="text-left text-gray-700">
              {transaction.his_type === "O"
                ? transaction.ofr_name
                : transaction.item_name}
            </td>
            <td className="text-right text-gray-700">
              ₱
              {transaction.his_type === "O"
                ? transaction.ofr_price
                : transaction.item_value}
            </td>
          </tr>
          <br />
          <tfoot>
            <tr>
              <td className="text-left font-bold text-gray-700">SubTotal</td>
              <td className="text-right font-bold text-gray-700">
                ₱
                {transaction.his_type === "O"
                  ? transaction.ofr_price -
                    transaction.ofr_price * 0.12 -
                    transaction.ofr_price * 0.025
                  : transaction.item_value * 0.12}
              </td>
            </tr>
            <tr>
              <td className="text-left font-bold text-gray-700">Vat 12%</td>
              <td className="text-right font-bold text-gray-700">
                ₱
                {transaction.his_type === "O"
                  ? transaction.ofr_price * 0.12
                  : transaction.item_value * 0.12}
              </td>
            </tr>
            <tr>
              <td className="text-left font-bold text-gray-700">
                Transaction Fee 2.5%
              </td>
              <td className="text-right font-bold text-gray-700">
                ₱
                {transaction.his_type === "O"
                  ? transaction.ofr_price * 0.025
                  : transaction.item_value * 0.025}
              </td>
            </tr>
            <tr>
              <td className="text-left font-bold text-gray-700">Total</td>
              <td className="text-right font-bold text-gray-700">
                ₱
                {transaction.his_type === "O"
                  ? transaction.ofr_price
                  : transaction.item_value}
              </td>
            </tr>
          </tfoot>
        </table>

        <div className="text-gray-700 mb-2">Thank you for your support!</div>
      </div>
    </>
  );
};

export default Receipt;
