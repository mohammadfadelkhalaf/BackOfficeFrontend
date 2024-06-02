"use client";
import React, { useEffect, useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import store from "@/stores/store.js";
import { setResponse, setNotification } from "@/actions/chatAction.js";
import { Provider, connect } from "react-redux";
import { CoursesProvider } from "@/ApiProviders/CourseProvider";
import { OrdersProvider } from "@/ApiProviders/OrdersProvider";
import jwtDecode from "jwt-decode";
import { parseJwt } from "@/utils/parseJWT";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClientProvider = ({ children }) => {
  const [newMessageResponse, setNewMessageResponse] = useState();
  const [connection, setConnection] = useState();
  const [userId, setUserId] = useState("");
  const [newNotificationResponse, setNewNotificationResponse] = useState();

  const joinChat = async (props) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl(`https://localhost:7098/SignalR-hub`)
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("NewChat", (message) => {
        console.log(message);
        if (typeof message === "object") {
          setNewMessageResponse(message);
        }
      });

      connection.on("GetNotification", (notification) => {
        if (typeof notification === "object") {
          setNewNotificationResponse(notification);
        } else {
        }
      });

      await connection.start();
      await connection.invoke(
        "NewConnectionToGroupWithMethodName",
        props,
        "NewChat"
      );

      await connection.invoke(
        "NewConnectionToGroupWithMethodName",
        props,
        "GetNotification"
      );

      setConnection(connection);
    } catch (e) {
      console.log("connection error");
      console.log(e);
    }
  };

  //   function parseJwt(token: string) {
  //     if (!token) { return; }
  //     const base64Url = token.split('.')[1];
  //     const base64 = base64Url.replace('-', '+').replace('_', '/');
  //     return JSON.parse(window.atob(base64));
  // }

  useEffect(() => {
    let decoded = {};
    const token = localStorage.getItem("token");

    if (token != null) {
      try {
        decoded = parseJwt(token);
      } catch (error) {
        console.log(error);
      }
    }

    if (decoded != null) {
      console.log("join-chat" + decoded.UserId);
      setUserId(decoded.UserId);
      joinChat(decoded.UserId);
      // getUserChatPreview(decoded.UserId);
    }

    // setUserId("e34b83be-8c1e-4683-b921-60e819b655ab");
    // joinChat("e34b83be-8c1e-4683-b921-60e819b655ab");
  }, []);

  useEffect(() => {
    if (newMessageResponse) {
      store.dispatch(setResponse(newMessageResponse));
    }
  }, [newMessageResponse]);

  useEffect(() => {
    if (newNotificationResponse) {
      toast.success(newNotificationResponse.descriptions);
      store.dispatch(setNotification(newNotificationResponse));
    }
  }, [newNotificationResponse]);

  return (
    <Provider store={store}>
      <ToastContainer />
      <CoursesProvider>
        <OrdersProvider>{children}</OrdersProvider>
      </CoursesProvider>
    </Provider>
  );
};

export default ClientProvider;
// const mapStateToProps = (state) => ({
//     chat: state.chatReducer,
// });
// export default connect(mapStateToProps)(ClientProvider);
