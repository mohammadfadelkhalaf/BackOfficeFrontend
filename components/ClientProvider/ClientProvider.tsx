"use client";
import React, { useEffect, useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import store from "@/stores/store.js";
import { setResponse, setNotification } from "@/actions/chatAction.js";
import { Provider, connect } from "react-redux";
import { CoursesProvider } from "@/ApiProviders/CourseProvider";
import { OrdersProvider } from "@/ApiProviders/OrdersProvider";

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

  useEffect(() => {
    setUserId("812bc424-2b5d-4636-9c46-10d1eb6108c0");
    joinChat("812bc424-2b5d-4636-9c46-10d1eb6108c0");
  }, []);

  useEffect(() => {
    if (newMessageResponse) {
      store.dispatch(setResponse(newMessageResponse));
    }
  }, [newMessageResponse]);

  useEffect(() => {
    if (newNotificationResponse) {
      store.dispatch(setNotification(newNotificationResponse));
    }
  }, [newNotificationResponse]);

  return (
    <Provider store={store}>
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
