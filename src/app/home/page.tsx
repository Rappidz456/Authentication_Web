"use client";

import React, { Component } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import "../home/styles.css";
import { initializeApp } from "firebase/app";
import { LinearProgress } from "@mui/material";

const firebaseConfig = {
  apiKey: "AIzaSyDK1F0-WuNBPw1w86CBl44x3YpN2lXamtg",
  authDomain: "next-js-authentication-b53c5.firebaseapp.com",
  projectId: "next-js-authentication-b53c5",
  storageBucket: "next-js-authentication-b53c5.firebasestorage.app",
  messagingSenderId: "639937720626",
  appId: "1:639937720626:web:d9bf03ef53ac1d863ba72b",
  measurementId: "G-NL5Y25TYVG",
};

const app = initializeApp(firebaseConfig);

interface PageState {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zipCode: string;
  region: string;
  show: boolean;
  progress: number;
}

class Page extends Component<{}, PageState> {
  constructor(props: any) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      zipCode: "",
      region: "",
      show: false,
      progress: 0,
    };
  }

  startProgress = () => {
    this.setState({ progress: 0 });

    const progressInterval = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.progress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            this.setState({ show: false });
          }, 500);
          return { progress: 100 };
        }
        return { progress: prevState.progress + 5 };
      });
    }, 100); // Adjust the speed of progress increment
  };

  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const db = getFirestore(app);
    const docRef = collection(db, "usersContact");

    const payload = {
      name: `${this.state.firstName} ${this.state.lastName}`,
      address: this.state.address,
      city: this.state.city,
      zip: this.state.zipCode,
      region: this.state.region,
    };

    try {
      const doc = await addDoc(docRef, payload);
      console.log(payload);
      console.log("Document written with ID: ", doc.id);
      this.setState({ show: true }, this.startProgress); // Start the progress after showing the pop-up
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState({ [name]: value } as unknown as Pick<
      PageState,
      keyof PageState
    >);
  };

  render() {
    const { firstName, lastName, address, city, zipCode, region } = this.state;

    return (
      <div className="bodyHome">
        <div className="form-container">
          <div className="form-container-inside">
            <div className="form">
              <div className="form-inside">
                <div className="heading-container">
                  <p className="h1">1</p>
                </div>
                <h1 className="heading-content">Billing Address</h1>
              </div>
              <div className="form-input">
                <form
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "25px",
                  }}
                  onSubmit={this.handleSubmit}
                >
                  <div className="form-flex">
                    <div>
                      <label className="name">First name</label>
                      <input
                        type="text"
                        className="input-box"
                        name="firstName"
                        value={firstName}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div>
                      <label className="name">Last name</label>
                      <input
                        type="text"
                        className="input-box"
                        name="lastName"
                        value={lastName}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-flex">
                    <div>
                      <label className="name">Address</label>
                      <input
                        type="text"
                        className="input-box"
                        name="address"
                        value={address}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div>
                      <label className="name">City</label>
                      <input
                        type="text"
                        className="input-box"
                        name="city"
                        value={city}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-flex">
                    <div>
                      <label className="name">Zip Code</label>
                      <input
                        type="text"
                        className="input-box"
                        name="zipCode"
                        value={zipCode}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div>
                      <label className="name">Region/Province</label>
                      <input
                        type="text"
                        className="input-box"
                        name="region"
                        value={region}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <button className="button" type="submit">
                      Continue
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: this.state.show ? "20px" : "-220px", // Slide in from the left
            transition: "left 0.5s ease",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              width: 200,
              height: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              backgroundColor: "black",
              color: "white",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            <p>Data sent</p>
            <LinearProgress
              variant="determinate"
              value={this.state.progress}
              style={{ width: 100 }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Page;