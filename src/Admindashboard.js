import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./admin.css";
import ChartDataLabels from "chartjs-plugin-datalabels";
const AdminDashboard = ({ token }) => {
  const [data, setData] = useState(null);
  const [customSongRequestAmount, setCustomSongRequestAmount] = useState(0);
  const [regularSongRequestAmounts, setRegularSongRequestAmounts] = useState({
    category_7: 0,
    category_8: 0,
    category_9: 0,
    category_10: 0,
  });
  const [chargeCustomers, setChargeCustomers] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://stg.dhunjam.in/account/admin/4`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status === 200) {
          const responseData = response.data.data;
          setData(responseData);
          setChargeCustomers(responseData.charge_customers);
          setCustomSongRequestAmount(responseData.amount.category_6);
          setRegularSongRequestAmounts({
            category_7: responseData.amount.category_7,
            category_8: responseData.amount.category_8,
            category_9: responseData.amount.category_9,
            category_10: responseData.amount.category_10,
          });
        } else {
          // Handle API error
          console.error("API Error:", response.data.server_err_msg);
        }
      } catch (error) {
        // Handle API error
        console.error("API Error:", error.message);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `https://stg.dhunjam.in/account/admin/4`,
        {
          amount: {
            category_6: customSongRequestAmount,
            category_7: regularSongRequestAmounts.category_7,
            category_8: regularSongRequestAmounts.category_8,
            category_9: regularSongRequestAmounts.category_9,
            category_10: regularSongRequestAmounts.category_10,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === 200) {
        // Data updated successfully
        console.log("Data updated successfully");

        // Fetch the updated data
        const updatedResponse = await axios.get(
          `https://stg.dhunjam.in/account/admin/4`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (updatedResponse.data.status === 200) {
          // Update the state with the new data
          const updatedData = updatedResponse.data.data;
          setData(updatedData);
          setCustomSongRequestAmount(updatedData.amount.category_6);
          setRegularSongRequestAmounts({
            category_7: updatedData.amount.category_7,
            category_8: updatedData.amount.category_8,
            category_9: updatedData.amount.category_9,
            category_10: updatedData.amount.category_10,
          });
        } else {
          // Handle API error when fetching updated data
          console.error("API Error:", updatedResponse.data.server_err_msg);
        }
      } else {
        // Handle API error
        console.error("API Error:", response.data.server_err_msg);
      }
    } catch (error) {
      // Handle API error
      console.error("API Error:", error.message);
    }
  };
  const handleRadioChange = (event) => {
    setChargeCustomers(event.target.value === "true");
  };

  // Chart data
  const chartData = {
    labels: [
      "Category 6",
      "Category 7",
      "Category 8",
      "Category 9",
      "Category 10",
    ],
    datasets: [
      {
        label: "Song Request Amounts",
        backgroundColor: "#f0c3f1",
        borderColor: "#ffffff",
        borderWidth: 1,
        hoverBackgroundColor: "#f0c3f1",
        hoverBorderColor: "#ffffff",
        borderRadius: 5, // Adjust this value to control the curve
        data: [
          customSongRequestAmount,
          regularSongRequestAmounts.category_7,
          regularSongRequestAmounts.category_8,
          regularSongRequestAmounts.category_9,
          regularSongRequestAmounts.category_10,
        ],
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
          drawTicks: false,
          drawOnChartArea: false,
        },
        ticks: {
          color: "#030303",
        },
        axis: {
          color: "#ffffff",
          borderWidth: 2,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "transparent",
        },
        ticks: {
          color: "#030303",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      datalabels: {
        anchor: "end",
        align: "end",
        color: "#ffffff", // Color of the data labels
        font: {
          weight: "bold",
        },
        formatter: function (value) {
          return "$" + value; // Customize the format of the data labels as needed
        },
      },
    },
    layout: {
      padding: {
        left: 50, // Adjust the left padding to set the x-coordinate for the first bar
        right: 10,
        top: 20,
        bottom: 5,
      },
    },
    barPercentage: 0.3,
  };

  return (
    <div className="dashboard-container">
      {data ? (
        <div>
          <h1>
            {data.name} ,{data.location} on Dhun Jam
          </h1>

          <div className="charge-customers">
            <label>
              {" "}
              Do you want to charge your
              <br />
              customers for requesting songs?
            </label>
            <input
              type="radio"
              name="chargeCustomers"
              value="true"
              className="radio-button1"
              checked={chargeCustomers}
              onChange={handleRadioChange}
            />
            <label>Yes</label>

            <input
              type="radio"
              name="chargeCustomers"
              value="false"
              className="radio-button2"
              checked={!chargeCustomers}
              onChange={handleRadioChange}
            />
            <label>No</label>
          </div>

          {data.charge_customers ? (
            <div>
              <label htmlFor="customAmount">Custom Song Request Amount:</label>
              <input
                type="number"
                id="customAmount"
                value={customSongRequestAmount}
                onChange={(e) =>
                  setCustomSongRequestAmount(Math.max(99, e.target.value))
                }
              />
              <br />
              <label htmlFor="regularAmount7">
                Regular song request amounts,
                <br /> from high to low :
              </label>
              <div className="spacebtw">
                <input
                  type="number"
                  id="regularAmount7"
                  value={regularSongRequestAmounts.category_7}
                  onChange={(e) =>
                    setRegularSongRequestAmounts({
                      ...regularSongRequestAmounts,
                      category_7: Math.max(79, e.target.value),
                    })
                  }
                />

                <input
                  type="number"
                  id="regularAmount8"
                  value={regularSongRequestAmounts.category_8}
                  onChange={(e) =>
                    setRegularSongRequestAmounts({
                      ...regularSongRequestAmounts,
                      category_8: Math.max(59, e.target.value),
                    })
                  }
                />
                <input
                  type="number"
                  id="regularAmount9"
                  value={regularSongRequestAmounts.category_9}
                  onChange={(e) =>
                    setRegularSongRequestAmounts({
                      ...regularSongRequestAmounts,
                      category_9: Math.max(39, e.target.value),
                    })
                  }
                />

                <input
                  type="number"
                  id="regularAmount10"
                  value={regularSongRequestAmounts.category_10}
                  onChange={(e) =>
                    setRegularSongRequestAmounts({
                      ...regularSongRequestAmounts,
                      category_10: Math.max(19, e.target.value),
                    })
                  }
                />
              </div>
              <br />
              {/* Additional UI elements based on the requirements */}
              <h3>₹</h3>
              <div>
                {chargeCustomers && (
                  <Bar
                    data={chartData}
                    options={chartOptions}
                    plugins={[ChartDataLabels]}
                    key={Math.random()} // Add a key to force chart re-render
                  />
                )}
              </div>
            </div>
          ) : (
            <div>
              {/* Grey out the fields when chargeCustomers is "No" */}
              <input
                type="text"
                placeholder="Custom Song Request Amount"
                value={customSongRequestAmount}
                onChange={(e) => setCustomSongRequestAmount(e.target.value)}
                disabled={!chargeCustomers}
              />

              {/* Add similar input fields for category 7, 8, 9, and 10 here, and disable them */}
              <input
                type="text"
                placeholder="Category 7 Amount"
                value={regularSongRequestAmounts.category_7}
                disabled={!chargeCustomers}
              />
              <input
                type="text"
                placeholder="Category 8 Amount"
                value={regularSongRequestAmounts.category_8}
                disabled={!chargeCustomers}
              />
              <input
                type="text"
                placeholder="Category 9 Amount"
                value={regularSongRequestAmounts.category_9}
                disabled={!chargeCustomers}
              />
              <input
                type="text"
                placeholder="Category 10 Amount"
                value={regularSongRequestAmounts.category_10}
                disabled={!chargeCustomers}
              />

              {/* Disable the Save button when chargeCustomers is "No" */}
              <button onClick={handleSave} disabled={!chargeCustomers}>
                Save
              </button>

              {/* Remove the graph when chargeCustomers is "No" */}
              {chargeCustomers && (
                <div>
                  <p>Graph:</p>
                  <Bar
                    data={chartData}
                    options={chartOptions}
                    key={Math.random()} // Add a key to force chart re-render
                  />
                </div>
              )}
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={
              !data.charge_customers ||
              customSongRequestAmount <= 99 ||
              regularSongRequestAmounts.category_7 <= 79 ||
              regularSongRequestAmounts.category_8 <= 59 ||
              regularSongRequestAmounts.category_9 <= 39 ||
              regularSongRequestAmounts.category_10 <= 19
            }
            className="rounded-button"
          >
            Save
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AdminDashboard;
