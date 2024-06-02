"use client";
import React, { useEffect, useState, useRef } from "react";
import "./chat.css";
import chatImg from "/public/Images/chat.png";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import axios from "axios";
import { connect } from "react-redux";
import { useRouter } from "next/navigation";
import loadingGif from "/public/Images/loading.gif";
import { parseJwt } from "@/utils/parseJWT";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const Chat = ({ chat }) => {
  const [fromValue, setFromValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [selectedUsers, setSelectedUsers] = useState();
  const [newMessage, setNewMessage] = useState("");
  const [friends, setFriends] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeChatUser, setActiveChatUser] = useState(null);
  const [newMessageResponse, setNewMessageResponse] = useState(null);
  const [loading, setLoading] = useState(true);

  const messageRef = useRef();
  const router = useRouter();
  const handleClose = () => {
    setOpen(false);
  };
  const descriptionElementRef = useRef(null);
  useEffect(() => {
    var decoded = {};
    const token = localStorage.getItem("token");

    if (token != null) {
      try {
        decoded = parseJwt(token);
        console.log("decoded: ", decoded);
      } catch (error) {
        console.log(error);
      }
    }

    if (decoded != null) {
      console.log(decoded.UserId);
      setUserId(decoded.UserId);
      // joinChat(decoded.UserId);
      getUserChatPreview(decoded.UserId);
    }
  }, []);

  useEffect(() => {
    // Initialize the SignalR connection
    const connection = new HubConnectionBuilder()
      .withUrl("https://localhost:7098/chatHub")
      .configureLogging(LogLevel.Information)
      .build();

    connection
      .start()
      .then(() => console.log("SignalR Connected"))
      .catch((err) => console.error("SignalR Connection Error: ", err));

    connection.on("ReceiveMessage", (message) => {
      setNewMessageResponse(message);
    });

    return () => {
      connection.stop();
    };
  }, []);

  useEffect(() => {
    getUserChatPreview(userId);
  }, [userId]);

  useEffect(() => {
    setNewMessageResponse(chat.newResponse);
  }, [chat.newResponse]);

  const getUserChatPreview = (userId) => {
    if (userId) {
      axios
        .get(`https://localhost:7098/api/Chatting/chatpreview?id=${userId}`)
        .then((res) => {
          setFriends(res.data);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    if (activeChatUser) {
      axios
        .get(
          `https://localhost:7098/api/Chatting/getallchattinglistbyuserid?toUserId=${inputValue}&fromUserId=${fromValue}`
        )
        .then((res) => {
          setMessages(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [activeChatUser]);

  const activeFriendHandler = (friend) => {
    if (friend.ureadCount > 0) {
      let userIdData = userId === fromValue ? inputValue : fromValue;
      axios
        .put(
          `https://localhost:7098/api/Chatting/updateunreadmessage?fromUserId=${fromValue}&toUserId=${inputValue}&userid=${userIdData}`
        )
        .then((res) => {
          let newFriends = friends.map((fnd) => {
            if (fnd.friendUserId === friend.friendUserId) {
              fnd.ureadCount = 0;
              return fnd;
            } else {
              return fnd;
            }
          });
          setFriends(newFriends);
        })
        .catch((err) => console.error(err));
    }
    router.push(`/chat/${friend.toUserId}/${friend.fromUserId}`);
    setActiveChatUser(friend);
  };

  const sendMessaageHandler = (textType) => {
    if (textType == "old") {
      axios
        .post("https://localhost:7098/api/Chatting", {
          id: 0,
          message: newMessage,
          creationTimestamp: new Date().toISOString(),
          lastUpdated: new Date().toISOString(),
          fromUserId: fromValue,
          toUserId: inputValue,
          userId: fromValue,
          edited: false,
          unread: true,
          reportChatFromUserId: "string",
          reportChatReportId: "string",
          reportChatToUserId: "string",
          deleted: false,
        })
        .then((res) => {
          setMessages((oldArray) => [
            ...oldArray,
            {
              id: 0,
              message: newMessage,
              creationTimestamp: res.data.creationTimestamp,
              lastUpdated: res.data.lastUpdated,
              fromUserId: fromValue,
              toUserId: inputValue,
              userId: fromValue,
              edited: false,
              unread: true,
              reportChatFromUserId: "string",
              reportChatReportId: "string",
              reportChatToUserId: "string",
              deleted: false,
            },
          ]);
          setNewMessage("");
          getUserChatPreview(userId);
        })
        .catch((err) => console.error(err));
    } else if (textType == "new") {
      console.log("else");
      axios
        .post(`https://localhost:7098/api/Chatting`, {
          id: 0,
          message: newMessage,
          creationTimestamp: "2023-09-03T04:55:56.412Z",
          lastUpdated: "2023-09-03T04:55:56.412Z",
          fromUserId: userId,
          toUserId: selectedUsers.code,
          userId: userId,
          edited: true,
          unread: true,
          reportChatFromUserId: "string",
          reportChatReportId: "string",
          reportChatToUserId: "string",
          deleted: true,
        })
        .then((res) => {
          window.location.href = window.location.href;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (newMessageResponse && activeChatUser) {
      if (newMessageResponse.userId === activeChatUser.friendUserId) {
        setMessages((oldArray) => [...oldArray, newMessageResponse]);
        getUserChatPreview(userId);
      } else {
        let newFriendsArray = friends.map((fnd) => {
          if (fnd.friendUserId === newMessageResponse.userId) {
            fnd.lastMessage = newMessageResponse.message;
            fnd.ureadCount += 1;
            return fnd;
          } else {
            return fnd;
          }
        });
        getUserChatPreview(userId);
        setFriends(newFriendsArray);
      }
    }
  }, [newMessageResponse]);

  useEffect(() => {
    if (messageRef.current) {
      const { scrollHeight, clientHeight } = messageRef.current;
      messageRef.current.scrollTo({
        left: 0,
        top: scrollHeight - clientHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // Function to handle input change
  const handleFromChange = (event) => {
    setFromValue(event.target.value); // Update the input value state
  };

  const handleToChange = (event) => {
    setInputValue(event.target.value); // Update the input value state
  };

  useEffect(() => {
    let decoded = {};
    const token = localStorage.getItem("token");
    console.log(token);
    if (token != null) {
      try {
        decoded = parseJwt(token);
      } catch (error) {
        console.log(error);
      }
    }
    console.log(decoded);
    if (decoded != null) {
      setUserId(decoded.UserId);
      getUserChatPreview(userId);
    }
    GetAllUsers(decoded.UserId);
  }, []);
  const [userList, setUserList] = useState([]);
  const GetAllUsers = (userID) => {
    axios
      .get(`https://localhost:7098/api/Users`)
      .then((res) => {
        console.log(userID);
        const list = res.data
          .filter((user) => user.id != userID)
          .map((dt) => ({
            code: dt.id,
            label: dt.userName,
          }));
        setUserList(list);
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error);
      });
  };

  return (
    <>
      <div className="dextopChat">
        <div className="flex">
          <div className="w-1/4 cahtSidebar">
            <div className="p-3">
              <div className="p-3 fixedSearch">
                <h2 className="ChatHeader">Messages</h2>
                <div className="pb-4">
                  <button
                    className="form-control w-full p-2 border border-gray-300 rounded"
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    {" "}
                    Start New Chatting
                  </button>
                </div>
              </div>
              {loading ? (
                <div>Loading chats....</div>
              ) : (
                <>
                  {friends.length > 0 &&
                    friends.map((friend, index) => (
                      <div
                        onClick={() => activeFriendHandler(friend)}
                        key={index}
                        role="button"
                        className={`flex p-3 my-2 items-center ${
                          activeChatUser &&
                          friend.friendUserId === activeChatUser.friendUserId
                            ? "selecedCht"
                            : ""
                        } cursor-pointer`}
                      >
                        <div className="mr-2">
                          <img src={"/Images/chat.png"} alt="image" />
                        </div>
                        <div className="w-full">
                          <h4 className="m-0 p-0 flex justify-between">
                            <span>{friend.friendName}</span>
                            {friend.ureadCount > 0 ? (
                              <span className="unread-count">
                                {friend.ureadCount}
                              </span>
                            ) : (
                              ""
                            )}
                          </h4>
                          <p className="lastMessage">
                            {friend.lastMessage.substring(0, 20)}{" "}
                            <span className="font-bold">.</span>
                            <span className="ml-1">{friend.creationTime}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                </>
              )}
            </div>
          </div>
          <div className="w-3/4 p-0">
            {!activeChatUser ? (
              <div className="no-chat">
                Select A Chat Or Start A New Conversation.
              </div>
            ) : (
              <div ref={messageRef} className="chat">
                <div className="ChatName p-2 mb-3 flex items-center">
                  <div className="flex items-center">
                    <img
                      src={"/Images/chat.png"}
                      className="mr-3"
                      alt="image"
                    />
                    <div>
                      <h4 className="p-0 m-0">{activeChatUser.friendName}</h4>
                      <p className="p-0 m-0">Active</p>
                    </div>
                  </div>
                </div>
                <div className="px-4">
                  {messages.length > 0 &&
                    messages.map((message, index) => (
                      <React.Fragment key={index}>
                        {message.userId === userId ? (
                          <div className="flex m-2 items-center justify-end">
                            <div>
                              <h5 className="sendMessage p-2 m-0 pl-3 ">
                                {message.message}
                              </h5>
                            </div>
                          </div>
                        ) : (
                          <div className="flex m-2 items-center">
                            <div className="mr-2">
                              <img src={"/Images/chat.png"} alt="image" />
                            </div>
                            <div>
                              <h5 className="reciveMessage p-2 m-0 pl-3">
                                {message.message}
                              </h5>
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                </div>
                <div className="messageSend">
                  <div className="input-group">
                    <textarea
                      className="form-control p-1 w-full border border-gray-300 rounded"
                      placeholder="Message"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button
                      onClick={() => {
                        sendMessaageHandler("old");
                      }}
                      className="btn sendbtn"
                      type="button"
                    >
                      <i className="fa-solid fa-paper-plane"></i>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mobileChat">
        <div className="flex flex-col">
          <div className="w-full cahtSidebar">
            <div className="p-3">
              <div className="p-3 fixedSearch">
                <h2 className="ChatHeader">Messages</h2>
                <div className="pb-4">
                  <input
                    type="email"
                    className="form-control w-full p-2 border border-gray-300 rounded"
                    id="email"
                    placeholder="Search"
                  />
                </div>
              </div>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <>
                  {friends.length > 0 &&
                    friends.map((friend, index) => (
                      <div
                        onClick={() => activeFriendHandler(friend)}
                        role="button"
                        key={index}
                        className={`flex p-3 my-2 items-center ${
                          activeChatUser &&
                          friend.friendUserId === activeChatUser.friendUserId
                            ? "selecedCht"
                            : ""
                        } cursor-pointer`}
                      >
                        <div className="mr-2">
                          <img src={"/Images/chat.png"} alt="image" />
                        </div>
                        <div className="w-full">
                          <h4 className="m-0 p-0 flex justify-between">
                            <span>{friend.friendName}</span>
                            {friend.ureadCount > 0 ? (
                              <span className="unread-count">
                                {friend.ureadCount}
                              </span>
                            ) : (
                              ""
                            )}
                          </h4>
                          <p className="lastMessage">
                            {friend.lastMessage.substring(0, 20)}
                            <span className="font-bold"> .</span>
                            <span className="ml-1">{friend.creationTime}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          id="scroll-dialog-title"
          className="!text-[2rem] !font-semibold"
        >
          Create new message
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            className="!text-[1.6rem]"
          >
            {userList.length > 0 && (
              <Autocomplete
                options={userList}
                getOptionLabel={(option) => option.label}
                onChange={(event, newValue) => {
                  setSelectedUsers(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Select Users"
                  />
                )}
                sx={{ marginTop: "20px" }}
              />
            )}
            <div className="flex  flex-col gap-6 mt-5">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="border-5"
                placeholder="Message"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
              />
            </div>
            <div className="flex flex-col w-full gap-6 mt-5 justify-end items-end">
              <button
                onClick={() => {
                  sendMessaageHandler("new");
                }}
                className="rounded-lg  px-8 py-3 text-xl text-white duration-300 active:scale-95 mt-5"
                type="button"
                id="button-addon2"
              >
                <img
                  className="img-fluid w-[2em]"
                  src={"/Icons/Send.jpeg"}
                  alt=""
                />
              </button>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className="!text-[1.6rem]" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => ({
  chat: state.chatReducer,
});

export default connect(mapStateToProps)(Chat);
