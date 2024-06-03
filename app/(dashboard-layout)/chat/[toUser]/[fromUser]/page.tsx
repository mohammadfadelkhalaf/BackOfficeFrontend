"use client";
import React, { useEffect, useState, useRef } from "react";
// import { useParams } from "react-router-dom";
import { useRouter } from "next/navigation";
import "../../../../../components/Chat/chat.css";
// import messageSend from "./../../Assets/Icons/Send.jpeg";
// import { Link } from "react-router-dom";
import axios from "axios";
// import jwtDecode from "jwt-decode";
import { connect } from "react-redux";
// import MobileChat from "./MobileChat";

// import backButton from "./../../Assets/Icons/back-button.png";
// import loadingGif from "./../../Assets/Image/loading.gif";
import Link from "next/link";
import { parseJwt } from "@/utils/parseJWT";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const Chat = ({ chat, params }) => {
  const [userId, setUserId] = useState("");
  const [open, setOpen] = useState<boolean>(false);
  const [connection, setConnection] = useState();
  const [newMessage, setNewMessage] = useState();
  const [selectedUsers, setSelectedUsers] = useState();
  const [userList, setUserList] = useState([]);
  const [friends, setFriends] = useState([]);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeChatUser, setActiveChatUser] = useState();
  const [newMessageResponse, setNewMessageResponse] = useState();
  const [loading, setLoading] = useState(true);
  const [msgFlag, setMsgFlag] = useState(true);
  const [moreLoadingFlag, setMoreLoadingFlag] = useState(false);
  const [page, setPage] = useState(2);
  const [scroll, setScroll] = useState(true);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const messageRef = useRef();
  const mMessageRef = useRef();
  const buttonRef = useRef();
  //   let { toUser, fromUser } = useParams();
  //   let navigate = useNavigate();
  const { toUser, fromUser } = params;
  const router = useRouter();
  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
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
      setUserId(decoded.UserId);
      getUserChatPreview(userId);
    }
  }, [userId]);

  const handleTemDataLoad = () => {};

  // chat
  useEffect(() => {
    setNewMessageResponse(chat.newResponse);
  }, [chat.newResponse]);
  const getUserChatPreview = (props) => {
    if (props) {
      axios
        .get(
          `https://coursesmanagementsapi.azurewebsites.net/api/Chatting/chatpreview?id=${props}`
        )
        .then((res) => {
          // console.log(res.data);
          setFriends(res.data);
          setLoading(false);
          // setActiveChatUser(res.data[0]);
        })
        .catch();
    }
  };

  //active chat handler
  useEffect(() => {
    if (activeChatUser) {
      // get the chats
      // axios
      //   .get(
      //     `${process.env.REACT_APP_SECRET}/api/Chatting/getallchattinglistbyuserid?toUserId=${activeChatUser.toUserId}&fromUserId=${activeChatUser.fromUserId}`
      //   )
      //   .then((res) => {
      //     setMessages(res.data);
      //   })
      //   .catch();

      // new api with pagination
      axios
        .get(
          `https://coursesmanagementsapi.azurewebsites.net/api/Chatting/getallchattinglistbyuseridwithpagination?toUserId=${activeChatUser.toUserId}&fromUserId=${activeChatUser.fromUserId}&pageNumber=1&noOfRowsPerPage=20`
        )
        .then((res) => {
          setMessages(res.data.chats.reverse());
        })
        .catch();
    }
  }, [activeChatUser]);

  useEffect(() => {
    if (friends) {
      let newItem = friends.filter(
        (friend) => friend.toUserId === toUser && friend.fromUserId === fromUser
      );
      // console.log("new Item");
      if (newItem.length > 0) {
        setActiveChatUser(newItem[0]);
      }
    }
  }, [toUser, fromUser, friends]);

  //   friendHandler
  const activeFriendHandler = (friend) => {
    // check and unread all message

    if (friend.ureadCount > 0) {
      let userIdData =
        userId === friend.fromUserId ? friend.toUserId : friend.fromUserId;
      axios
        .put(
          `${process.env.REACT_APP_SECRET}/api/Chatting/updateunreadmessage?fromUserId=${friend.fromUserId}&toUserId=${friend.toUserId}&userid=${userIdData}`
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
        })
        .catch((err) => {
          console.log(err);
        });
    }
    router.push(`/chat/${friend.toUserId}/${friend.fromUserId}`);
  };
  // send message handler
  const sendMessaageHandler = (textType) => {
    console.log(textType);
    if (newMessage && msgFlag && textType == "old") {
      console.log("if");
      setMsgFlag(false);
      axios
        .post(`https://coursesmanagementsapi.azurewebsites.net/api/Chatting`, {
          id: 0,
          message: newMessage,
          creationTimestamp: "2023-09-03T04:55:56.412Z",
          lastUpdated: "2023-09-03T04:55:56.412Z",
          fromUserId: activeChatUser.fromUserId,
          toUserId: activeChatUser.toUserId,
          userId: userId,
          edited: true,
          unread: true,
          reportChatFromUserId: "string",
          reportChatReportId: "string",
          reportChatToUserId: "string",
          deleted: true,
        })
        .then((res) => {
          // add the new message to list
          setMessages((oldArray) => [
            ...oldArray,
            {
              id: 0,
              message: newMessage,
              creationTimestamp: "2023-09-03T04:55:56.412Z",
              lastUpdated: "2023-09-03T04:55:56.412Z",
              fromUserId: activeChatUser.fromUserId,
              toUserId: activeChatUser.toUserId,
              userId: userId,
              edited: true,
              unread: true,
              reportChatFromUserId: "string",
              reportChatReportId: "string",
              reportChatToUserId: "string",
              deleted: true,
            },
          ]);
          // empty message box
          setNewMessage("");
          setMsgFlag(true);
          getUserChatPreview(userId);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (textType == "new") {
      console.log("else");
      axios
        .post(`https://coursesmanagementsapi.azurewebsites.net/api/Chatting`, {
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
  // new response
  useEffect(() => {
    if (newMessageResponse && activeChatUser) {
      if (newMessageResponse.userId === activeChatUser.friendUserId) {
        setMessages((oldArray) => [...oldArray, newMessageResponse]);
        getUserChatPreview(userId);
        // read all msg
        let userIdData =
          userId === activeChatUser.fromUserId
            ? activeChatUser.toUserId
            : activeChatUser.fromUserId;
        axios
          .put(
            `https://coursesmanagementsapi.azurewebsites.net/api/Chatting/updateunreadmessage?fromUserId=${activeChatUser.fromUserId}&toUserId=${activeChatUser.toUserId}&userid=${userIdData}`
          )
          .then((res) => {
            let newFriends = friends.map((fnd) => {
              if (fnd.friendUserId === activeChatUser.friendUserId) {
                fnd.ureadCount = 0;
                return fnd;
              } else {
                return fnd;
              }
            });
            getUserChatPreview(userId);
          })
          .catch((err) => {
            console.log(err);
          });
        // read all msg
      } else {
        // let indx;
        let newFriendsArray = friends.map((fnd, index) => {
          if (fnd.friendUserId === newMessageResponse.userId) {
            fnd.lastMessage = newMessageResponse.message;
            fnd.ureadCount = fnd.ureadCount + 1;
            // indx = index;
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
  // scroll
  useEffect(() => {
    setIsButtonVisible(true);
    if (messageRef && messageRef.current && scroll) {
      const { scrollHeight, clientHeight } = messageRef.current;
      console.log(scrollHeight - clientHeight);
      messageRef.current.scrollTo({
        left: 0,
        top: scrollHeight - clientHeight,
        behavior: "smooth",
      });
      // messageRef.scrollTop = messageRef.scrollHeight;
      // mMessageRef.scrollTop = messageRef.scrollHeight;
      if (mMessageRef && mMessageRef.current) {
        const { scrollHeight, clientHeight } = mMessageRef.current;
        mMessageRef.current.scrollTo({
          left: 0,
          top: scrollHeight - clientHeight,
          behavior: "smooth",
        });
      }
    }
  }, [messages]);
  // load more handler
  const loadMoreHandler = () => {
    setScroll(false);
    setPage(page + 1);
    setMoreLoadingFlag(true);

    axios
      .get(
        `https://coursesmanagementsapi.azurewebsites.net/api/Chatting/getallchattinglistbyuseridwithpagination?toUserId=${activeChatUser.toUserId}&fromUserId=${activeChatUser.fromUserId}&pageNumber=${page}&noOfRowsPerPage=10`
      )
      .then((res) => {
        if (res.data.chats.length > 0) {
          setMoreLoadingFlag(false);
          setMessages((oldArray) => [...res.data.chats.reverse(), ...oldArray]);
        } else {
          setMoreLoadingFlag(false);
          setIsButtonVisible(false);
          setPage(2);
        }
      })
      .catch();
  };
  const handleFromChange = (event) => {
    setUserId(event.target.value); // Update the input value state
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

    if (decoded != null) {
      setUserId(decoded.UserId);
      getUserChatPreview(decoded.UserId);
    }
    GetAllUsers(decoded.UserId);
  }, []);

  const GetAllUsers = (userID) => {
    console.log(userID);
    axios
      .get(`https://coursesmanagementsapi.azurewebsites.net/api/Users`)
      .then((res) => {
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

  console.log(userList);
  return (
    <>
      <div className="dextopChat">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-3 cahtSidebar">
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
                    Start New Chatting
                  </button>
                </div>
              </div>
              {loading === true ? (
                <div className="flex justify-center">Loading</div>
              ) : (
                <>
                  {friends.length > 0 &&
                    friends.map((friend, index) => (
                      <div
                        key={index}
                        to={`/chat/${friend.toUserId}/${friend.fromUserId}`}
                        onClick={() => activeFriendHandler(friend)}
                        role={"button"}
                        className={`flex items-center p-3 my-2 ${
                          activeChatUser &&
                          friend.friendUserId === activeChatUser.friendUserId
                            ? "selecedCht"
                            : ""
                        } cursor-pointer`}
                      >
                        <div className="me-2">
                          <img src={"/Images/chat.png"} alt="" />
                        </div>
                        <div className="w-full">
                          <h4 className="m-0 p-0 flex justify-between">
                            <span>{friend.friendName}</span>
                            {friend.ureadCount > 0 && (
                              <span className="unread-count">
                                {friend.ureadCount}
                              </span>
                            )}
                          </h4>
                          <p className="lastMessage">
                            {friend.lastMessage.substring(0, 20)}{" "}
                            <span className="fw-bold">.</span>
                            <span className="ms-1">
                              {friend.creationTime === ""
                                ? "now"
                                : friend.creationTime}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}
                </>
              )}
            </div>
          </div>
          <div className="col-span-9 p-0">
            {!activeChatUser ? (
              <div className="no-chat">
                Select A Chat Or Start A New Conversation.
              </div>
            ) : (
              <div ref={messageRef} className="chat">
                <div className="ChatName p-2 mb-3 flex items-center">
                  <div className="flex items-center">
                    <img src={"/Images/chat.png"} className="me-3" alt="" />
                    <div className="">
                      <h4 className="p-0 m-0">
                        {activeChatUser && activeChatUser.friendName}
                      </h4>
                      <p className="p-0 m-0">Active</p>
                    </div>
                  </div>
                </div>
                <div className="px-4">
                  {moreLoadingFlag ? (
                    <div className="flex justify-center">
                      <img
                        src={"/Images/loading.gif"}
                        alt=""
                        className="img-fluid w-32 h-32"
                      />
                    </div>
                  ) : (
                    <>
                      {isButtonVisible && messages.length > 9 && (
                        <button
                          ref={buttonRef}
                          onClick={loadMoreHandler}
                          className="load_btn"
                        >
                          load more
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-4 h-4 ml-1 inline-block"
                          >
                            <path d="M18.5374 19.5674C16.7844 21.0831 14.4993 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 14.1361 21.3302 16.1158 20.1892 17.7406L17 12H20C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C14.1502 20 16.1022 19.1517 17.5398 17.7716L18.5374 19.5674Z"></path>
                          </svg>
                        </button>
                      )}
                    </>
                  )}

                  {messages.length > 0 &&
                    messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex m-2 ${
                          message.userId === userId ? "justify-end" : ""
                        } align-items-center`}
                      >
                        {message.userId !== userId && (
                          <div className="me-2">
                            <img src={"/Images/chat.png"} alt="" />
                          </div>
                        )}
                        <div>
                          <h5
                            className={`${
                              message.userId === userId
                                ? "sendMessage"
                                : "reciveMessage"
                            } p-2 m-0 ps-3`}
                          >
                            {message.message}
                          </h5>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="messageSend">
                  <div className="input-group flex">
                    <textarea
                      type="text"
                      className="w-full form-control p-1"
                      placeholder="Message"
                      aria-label="Recipient's username"
                      aria-describedby="button-addon2"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button
                      onClick={() => {
                        sendMessaageHandler("old");
                      }}
                      className="btn sendbtn"
                      type="button"
                      id="button-addon2"
                    >
                      <img
                        className="img-fluid "
                        src={"/Icons/Send.jpeg"}
                        alt=""
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* for Mobile */}
      <div className="mobileChat">
        <div className="col-12 p-0">
          <div ref={mMessageRef} className="chat">
            <div className="ChatName p-3 mb-3 flex items-center">
              <Link href="/chat">
                <img
                  className="backButton img-fuild"
                  src={"/Icons/back-button.png"}
                  alt=""
                />
              </Link>
              <h3 className="p-0 m-0">
                {activeChatUser && activeChatUser.friendName}
              </h3>
            </div>
            <div className="msg_container">
              <div className="px-2">
                {moreLoadingFlag ? (
                  <div className="flex justify-center">
                    <img
                      src={"/Images/loading.gif"}
                      alt=""
                      className="img-fluid w-32 h-32"
                    />
                  </div>
                ) : (
                  <>
                    {isButtonVisible && messages.length > 9 && (
                      <button
                        ref={buttonRef}
                        onClick={loadMoreHandler}
                        className="load_btn"
                      >
                        load more
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-4 h-4 ml-1 inline-block"
                        >
                          <path d="M18.5374 19.5674C16.7844 21.0831 14.4993 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 14.1361 21.3302 16.1158 20.1892 17.7406L17 12H20C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C14.1502 20 16.1022 19.1517 17.5398 17.7716L18.5374 19.5674Z"></path>
                        </svg>
                      </button>
                    )}
                  </>
                )}
                {messages.length > 0 &&
                  messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex m-2 ${
                        message.userId === userId ? "justify-end" : ""
                      } align-items-center`}
                    >
                      {message.userId !== userId && (
                        <div className="me-2">
                          <img src={"/Images/chat.png"} alt="" />
                        </div>
                      )}
                      <div>
                        <h6
                          className={`${
                            message.userId === userId
                              ? "sendMessage"
                              : "reciveMessage"
                          } p-2 m-0 ps-3`}
                        >
                          {message.message}
                        </h6>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="messageSend">
              <div className="input-group">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="form-control"
                  placeholder="Message"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                />
                <button
                  onClick={() => {
                    sendMessaageHandler("old");
                  }}
                  className="rounded-lg bg-sky-500 px-8 py-3 text-xl text-white duration-300 active:scale-95"
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
const mapStateToProps = (state: any) => ({
  chat: state.chatReducer,
});
export default connect(mapStateToProps)(Chat);

// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import Link from "next/link";
// import { parseJwt } from "@/utils/parseJWT";
// import {
//   DialogTitle,
//   Dialog,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   Button,
//   Autocomplete,
//   TextField
// } from "@mui/material";
// import "../../../../../components/Chat/chat.css";

// const axiosInstance = axios.create({
//   baseURL: 'https://coursesmanagementsapi.azurewebsites.net/api',
// });

// const Chat = ({ chat, params }) => {
//   const [userId, setUserId] = useState("");
//   const [open, setOpen] = useState(false);
//   const [newMessage, setNewMessage] = useState("");
//   const [selectedUsers, setSelectedUsers] = useState(null);
//   const [userList, setUserList] = useState([]);
//   const [friends, setFriends] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [activeChatUser, setActiveChatUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [msgFlag, setMsgFlag] = useState(true);
//   const [moreLoadingFlag, setMoreLoadingFlag] = useState(false);
//   const [page, setPage] = useState(2);
//   const [isButtonVisible, setIsButtonVisible] = useState(true);
//   const messageRef = useRef();
//   const mMessageRef = useRef();
//   const buttonRef = useRef();
//   const { toUser, fromUser } = params;
//   const router = useRouter();

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const descriptionElementRef = useRef(null);

//   function async getUserChatPreview(userId) {
//     try {
//       const res = await axiosInstance.get(`/Chatting/chatpreview?id=${userId}`);
//       setFriends(res.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching chat preview:", error);
//     }
//   };

//   function async activeFriendHandler(friend) {
//     if (friend.ureadCount > 0) {
//       const userIdData =
//         userId === friend.fromUserId ? friend.toUserId : friend.fromUserId;
//       try {
//         await axiosInstance.put(
//           `/Chatting/updateunreadmessage?fromUserId=${friend.fromUserId}&toUserId=${friend.toUserId}&userid=${userIdData}`
//         );
//         setFriends(friends.map((fnd) => {
//           if (fnd.friendUserId === friend.friendUserId) {
//             fnd.ureadCount = 0;
//           }
//           return fnd;
//         }));
//       } catch (error) {
//         console.error("Error updating unread message:", error);
//       }
//     }
//     router.push(`/chat/${friend.toUserId}/${friend.fromUserId}`);
//   };

//   function async sendMessaageHandler(textType) {
//     if (newMessage && msgFlag && textType === "old") {
//       setMsgFlag(false);
//       try {
//         await axiosInstance.post(`/Chatting`, {
//           id: 0,
//           message: newMessage,
//           creationTimestamp: new Date().toISOString(),
//           lastUpdated: new Date().toISOString(),
//           fromUserId: activeChatUser.fromUserId,
//           toUserId: activeChatUser.toUserId,
//           userId: userId,
//           edited: true,
//           unread: true,
//           reportChatFromUserId: "string",
//           reportChatReportId: "string",
//           reportChatToUserId: "string",
//           deleted: true,
//         });
//         setMessages((prev) => [
//           ...prev,
//           {
//             id: 0,
//             message: newMessage,
//             creationTimestamp: new Date().toISOString(),
//             lastUpdated: new Date().toISOString(),
//             fromUserId: activeChatUser.fromUserId,
//             toUserId: activeChatUser.toUserId,
//             userId: userId,
//             edited: true,
//             unread: true,
//             reportChatFromUserId: "string",
//             reportChatReportId: "string",
//             reportChatToUserId: "string",
//             deleted: true,
//           },
//         ]);
//         setNewMessage("");
//         setMsgFlag(true);
//         getUserChatPreview(userId);
//       } catch (error) {
//         console.error("Error sending message:", error);
//       }
//     } else if (textType === "new") {
//       try {
//         await axiosInstance.post(`/Chatting`, {
//           id: 0,
//           message: newMessage,
//           creationTimestamp: new Date().toISOString(),
//           lastUpdated: new Date().toISOString(),
//           fromUserId: userId,
//           toUserId: selectedUsers.code,
//           userId: userId,
//           edited: true,
//           unread: true,
//           reportChatFromUserId: "string",
//           reportChatReportId: "string",
//           reportChatToUserId: "string",
//           deleted: true,
//         });
//         window.location.reload();
//       } catch (error) {
//         console.error("Error sending new message:", error);
//       }
//     }
//   };

//   function async loadMessages(pageNumber, rowsPerPage) {
//     try {
//       const res = await axiosInstance.get(
//         `/Chatting/getallchattinglistbyuseridwithpagination?toUserId=${activeChatUser.toUserId}&fromUserId=${activeChatUser.fromUserId}&pageNumber=${pageNumber}&noOfRowsPerPage=${rowsPerPage}`
//       );
//       if (pageNumber === 1) {
//         setMessages(res.data.chats.reverse());
//       } else {
//         setMessages((prev) => [...res.data.chats.reverse(), ...prev]);
//         setIsButtonVisible(res.data.chats.length > 0);
//       }
//       setMoreLoadingFlag(false);
//     } catch (error) {
//       console.error("Error loading messages:", error);
//       setMoreLoadingFlag(false);
//     }
//   };

//   function async GetAllUsers(userID) {
//     try {
//       const res = await axiosInstance.get(`/User/getalluser?userID=${userID}`);
//       setUserList(res.data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   useEffect(() => {
//     if (open) {
//       descriptionElementRef.current?.focus();
//     }
//   }, [open]);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decoded = parseJwt(token);
//         setUserId(decoded.UserId);
//         getUserChatPreview(decoded.UserId);
//         GetAllUsers(decoded.UserId);
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     if (chat.newResponse) {
//       setNewMessageResponse(chat.newResponse);
//     }
//   }, [chat.newResponse]);

//   useEffect(() => {
//     if (activeChatUser) {
//       loadMessages(1, 20);
//     }
//   }, [activeChatUser]);

//   useEffect(() => {
//     if (friends.length > 0) {
//       const newItem = friends.find(
//         (friend) => friend.toUserId === toUser && friend.fromUserId === fromUser
//       );
//       if (newItem) {
//         setActiveChatUser(newItem);
//       }
//     }
//   }, [toUser, fromUser, friends]);

//   const loadMoreHandler = () => {
//     setPage((prev) => {
//       const newPage = prev + 1;
//       loadMessages(newPage, 10);
//       return newPage;
//     });
//   };

//   const renderMessage = (message, user) => {
//     return (
//       <div key={message.id} className={`message ${message.fromUserId === userId ? 'outgoing' : 'incoming'}`}>
//         <div className="message-content">
//           {message.message}
//         </div>
//         <div className="message-timestamp">
//           {new Date(message.creationTimestamp).toLocaleTimeString()}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-sidebar">
//         {friends.map((friend) => (
//           <div key={friend.friendUserId} className="friend" onClick={() => activeFriendHandler(friend)}>
//             <div className="friend-name">{friend.friendUserName}</div>
//             {friend.ureadCount > 0 && <div className="unread-count">{friend.ureadCount}</div>}
//           </div>
//         ))}
//       </div>
//       <div className="chat-main">
//         <div className="chat-messages">
//           {messages.map((message) => renderMessage(message, activeChatUser))}
//         </div>
//         <div className="chat-input">
//           <TextField
//             label="Type a message"
//             fullWidth
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             onKeyPress={(e) => e.key === 'Enter' && sendMessaageHandler('old')}
//           />
//           <Button variant="contained" color="primary" onClick={() => sendMessaageHandler('old')}>
//             Send
//           </Button>
//         </div>
//       </div>
//       {isButtonVisible && (
//         <div className="load-more" ref={buttonRef} onClick={loadMoreHandler}>
//           {moreLoadingFlag ? "Loading..." : "Load More"}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chat;
