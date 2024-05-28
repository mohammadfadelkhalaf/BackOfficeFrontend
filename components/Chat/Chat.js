// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import "./chat.css";
// import chatImg from "/public/Images/chat.png";
// // import messageSend from "./../../Assets/Icons/Send.jpeg";
// // import { Link, useNavigate } from "react-router-dom";
// import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
// import axios from "axios";
// // import { set } from "lodash";
// // import jwtDecode from "jwt-decode";
// import { connect } from "react-redux";
// import { useRouter } from 'next/navigation';
// import loadingGif from "/public/Images/loading.gif";
// const Chat = ({ chat }) => {
//   const [userId, setUserId] = useState();
//   const [newMessage, setNewMessage] = useState();
//   const [friends, setFriends] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [activeChatUser, setActiveChatUser] = useState();
//   const [newMessageResponse, setNewMessageResponse] = useState();
//   const [loading, setLoading] = useState(true);

//   const messageRef = useRef();
//   // const navigate = useNavigate();
//   const router = useRouter();

//   useEffect(() => {
//     setUserId("2e528a48-2121-48bd-97d4-b6ec8865bff2");
//     // joinChat(decoded.UserId);
//     getUserChatPreview("2e528a48-2121-48bd-97d4-b6ec8865bff2");
//   }, []);

//   // chat
//   useEffect(() => {
//     setNewMessageResponse(chat.newResponse);
//   }, [chat.newResponse]);

//   const getUserChatPreview = (props) => {
//     axios
//       .get(
//         `https://localhost:7098/api/Chatting/chatpreview?id=${props}`
//       )
//       .then((res) => {
//         setFriends(res.data);
//         setLoading(false);
//       })
//       .catch();
//   };

//   //active chat handler
//   useEffect(() => {
//     if (activeChatUser) {
//       // get the chats
//       axios
//         .get(
//           `https://localhost:7098/api/Chatting/getallchattinglistbyuserid?toUserId=${activeChatUser.toUserId}&fromUserId=${activeChatUser.fromUserId}`
//         )
//         .then((res) => {
//           setMessages(res.data);
//         })
//         .catch();
//     }
//   }, [activeChatUser]);

//   console.log("active: ", activeChatUser)
//   //   friendHandler
//   const activeFriendHandler = (friend) => {
//     // check and unread all message

//     if (friend.ureadCount > 0) {
//       let userIdData =
//         userId === friend.fromUserId ? friend.toUserId : friend.fromUserId;
//       axios
//         .put(
//           `https://localhost:7098/api/Chatting/updateunreadmessage?fromUserId=${friend.fromUserId}&toUserId=${friend.toUserId}&userid=${userIdData}`
//         )
//         .then((res) => {
//           let newFriends = friends.map((fnd) => {
//             if (fnd.friendUserId === friend.friendUserId) {
//               fnd.ureadCount = 0;
//               return fnd;
//             } else {
//               return fnd;
//             }
//           });
//         })
//         .catch();
//     }
//     router.push(`/chat/${friend.toUserId}/${friend.fromUserId}`);
//   };
//   // send message handler
//   const sendMessaageHandler = () => {
//     axios
//       .post(`https://localhost:7098/api/Chatting`, {
//         id: "string",
//         message: newMessage,
//         creationTimestamp: "2023-09-03T04:55:56.412Z",
//         lastUpdated: "2023-09-03T04:55:56.412Z",
//         fromUserId: activeChatUser.fromUserId,
//         toUserId: activeChatUser.toUserId,
//         userId: userId,
//         edited: true,
//         unread: true,
//         reportChatFromUserId: "string",
//         reportChatReportId: "string",
//         reportChatToUserId: "string",
//         deleted: true,
//       })
//       .then((res) => {
//         // add the new message to list
//         setMessages((oldArray) => [
//           ...oldArray,
//           {
//             id: "string",
//             message: newMessage,
//             creationTimestamp: "2023-09-03T04:55:56.412Z",
//             lastUpdated: "2023-09-03T04:55:56.412Z",
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
//         // empty message box
//         setNewMessage("");
//         getUserChatPreview(userId);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   // new response
//   useEffect(() => {
//     if (newMessageResponse && activeChatUser) {
//       if (newMessageResponse.userId === activeChatUser.friendUserId) {
//         setMessages((oldArray) => [...oldArray, newMessageResponse]);
//         getUserChatPreview(userId);
//       } else {
//         // let indx;
//         let newFriendsArray = friends.map((fnd, index) => {
//           if (fnd.friendUserId === newMessageResponse.userId) {
//             fnd.lastMessage = newMessageResponse.message;
//             fnd.ureadCount = fnd.ureadCount + 1;
//             // indx = index;
//             return fnd;
//           } else {
//             return fnd;
//           }
//         });
//         getUserChatPreview(userId);
//         setFriends(newFriendsArray);
//       }
//     }
//   }, [newMessageResponse]);
//   // scroll
//   useEffect(() => {
//     if (messageRef && messageRef.current) {
//       const { scrollHeight, clientHeight } = messageRef.current;
//       messageRef.current.scrollTo({
//         left: 0,
//         top: scrollHeight - clientHeight,
//         behavior: "smooth",
//       });
//     }
//   }, [messages]);

//   return (
//     <>
//       <div className="dextopChat">
//         <div className="flex">
//           <div className="w-1/4 cahtSidebar">
//             <div className="p-3">
//               <div className="p-3 fixedSearch">
//                 <h2 className="ChatHeader">Messages</h2>

//                 <div className="pb-4">
//                   <input
//                     type="email"
//                     className="form-control w-full p-2 border border-gray-300 rounded"
//                     id="email"
//                     placeholder="Search"
//                   />
//                 </div>
//               </div>

//               {loading === true ? (
//                 <div>
//                   <img
//                     src={"/Images/loading.gif"}
//                     alt="loading"
//                     className="img-fluid w-32 h-32 mx-auto"
//                   />
//                 </div>
//               ) : (
//                 <>
//                   {friends.length > 0 &&
//                     friends.map((friend, index) => (
//                       <div
//                         onClick={() => activeFriendHandler(friend)}
//                         key={index}
//                         role={"button"}
//                         className={`flex p-3 my-2 items-center ${activeChatUser &&
//                             friend.friendUserId === activeChatUser.friendUserId
//                             ? "selecedCht"
//                             : ""
//                           } cursor-pointer`}
//                       >
//                         <div className="mr-2">
//                           <img src={"/Images/chat.png"} alt="image" />
//                         </div>
//                         <div className="w-full">
//                           <h4 className="m-0 p-0 flex justify-between">
//                             <span>{friend.friendName}</span>

//                             {friend.ureadCount > 0 ? (
//                               <span className="unread-count">
//                                 {friend.ureadCount}
//                               </span>
//                             ) : (
//                               ""
//                             )}
//                           </h4>
//                           <p className="lastMessage">
//                             {friend.lastMessage.substring(0, 20)}{" "}
//                             <span className="font-bold">.</span>
//                             <span className="ml-1">{friend.creationTime}</span>
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                 </>
//               )}
//             </div>
//           </div>
//           <div className="w-3/4 p-0">
//             {!activeChatUser ? (
//               <div className="no-chat">Select A Chat Or Start A New Conversation.</div>
//             ) : (
//               <div ref={messageRef} className="chat">
//                 <div className="ChatName p-2 mb-3 flex items-center">
//                   <div className="flex items-center">
//                     <img src={"/Images/chat.png"} className="mr-3" alt="image" />
//                     <div className="">
//                       <h4 className="p-0 m-0">
//                         {activeChatUser && activeChatUser.friendName}
//                       </h4>
//                       <p className="p-0 m-0">Active</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="px-4">
//                   {messages.length > 0 &&
//                     messages.map((message, index) => {
//                       return (
//                         <>
//                           {message.userId === userId ? (
//                             <div className="flex m-2 items-center justify-end">
//                               <div>
//                                 <h5 className="sendMessage p-2 m-0 pl-3 ">
//                                   {message.message}
//                                 </h5>
//                               </div>
//                             </div>
//                           ) : (
//                             <div className="flex m-2 items-center">
//                               <div className="mr-2">
//                                 <img src={"/Images/chat.png"} alt="image" />
//                               </div>
//                               <div>
//                                 <h5 className="reciveMessage p-2 m-0 pl-3">
//                                   {message.message}
//                                 </h5>
//                               </div>
//                             </div>
//                           )}
//                         </>
//                       );
//                     })}
//                 </div>

//                 <div className="messageSend">
//                   <div className="input-group">
//                     <textarea
//                       type="text"
//                       className="form-control p-1 w-full border border-gray-300 rounded"
//                       placeholder="Message"
//                       aria-label="Recipient's username"
//                       aria-describedby="button-addon2"
//                       value={newMessage}
//                       onChange={(e) => setNewMessage(e.target.value)}
//                     />
//                     <button
//                       onClick={sendMessaageHandler}
//                       className="btn sendbtn"
//                       type="button"
//                       id="button-addon2"
//                     >
//                       <i className="fa-solid fa-paper-plane"></i>
//                       {/* <img className='img-fluid ' src={messageSend} alt="" /> */}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <div className="mobileChat">
//         <div className="flex flex-col">
//           <div className="w-full cahtSidebar">
//             <div className="p-3">
//               <div className="p-3 fixedSearch">
//                 <h2 className="ChatHeader">Messages</h2>

//                 <div className="pb-4">
//                   <input
//                     type="email"
//                     className="form-control w-full p-2 border border-gray-300 rounded"
//                     id="email"
//                     placeholder="Search"
//                   />
//                 </div>
//               </div>

//               {loading == true ? (
//                 <div>
//                   <img
//                     src={"/Images/loading.gif"}
//                     alt="loading"
//                     className="img-fluid w-32 h-32 mx-auto"
//                   />
//                 </div>
//               ) : (
//                 <>
//                   {friends.length > 0 &&
//                     friends.map((friend, index) => (
//                       <div
//                         onClick={() => activeFriendHandler(friend)}
//                         role="button"
//                         className="no-underline"
//                       >
//                         <div
//                           key={index}
//                           className={`flex p-3 my-2 items-center ${activeChatUser &&
//                               friend.friendUserId === activeChatUser.friendUserId
//                               ? "selecedCht"
//                               : ""
//                             } cursor-pointer`}
//                         >
//                           <div className="mr-2">
//                             <img src={"/Images/chat.png"} alt="image" />
//                           </div>
//                           <div className="w-full">
//                             <h4 className="m-0 p-0 flex justify-between">
//                               <span>{friend.friendName}</span>
//                               {friend.ureadCount > 0 ? (
//                                 <span className="unread-count">
//                                   {friend.ureadCount}
//                                 </span>
//                               ) : (
//                                 ""
//                               )}
//                             </h4>
//                             <p className="lastMessage">
//                               {friend.lastMessage.substring(0, 20)}
//                               <span className="font-bold"> .</span>
//                               <span className="ml-1">{friend.creationTime}</span>
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// const mapStateToProps = (state) => ({
//   chat: state.chatReducer,
// });
// export default connect(mapStateToProps)(Chat);

"use client";
import React, { useEffect, useState, useRef } from "react";
import "./chat.css";
import chatImg from "/public/Images/chat.png";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import axios from "axios";
import { connect } from "react-redux";
import { useRouter } from "next/navigation";
import loadingGif from "/public/Images/loading.gif";

const Chat = ({ chat }) => {
  const [fromValue, setFromValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  const [userId, setUserId] = useState("812bc424-2b5d-4636-9c46-10d1eb6108c0");
  const [newMessage, setNewMessage] = useState("");
  const [friends, setFriends] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeChatUser, setActiveChatUser] = useState(null);
  const [newMessageResponse, setNewMessageResponse] = useState(null);
  const [loading, setLoading] = useState(true);

  const messageRef = useRef();
  const router = useRouter();

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
    axios
      .get(`https://localhost:7098/api/Chatting/chatpreview?id=${userId}`)
      .then((res) => {
        setFriends(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
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

  const sendMessaageHandler = () => {
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
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <input
          placeholder="from Chat"
          value={fromValue} // Bind input value to state
          onChange={handleFromChange} // Call handleInputChange function on change
        />
        <input
          placeholder="To Chat"
          value={inputValue} // Bind input value to state
          onChange={handleToChange} // Call handleInputChange function on change
        />
        <div className="input-group">
          <textarea
            className="form-control p-1 w-full border border-gray-300 rounded"
            placeholder="Message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            onClick={sendMessaageHandler}
            className="btn sendbtn"
            type="button"
          >
            <i className="fa-solid fa-paper-plane"></i>Send
          </button>
        </div>
      </div>
      <div className="dextopChat">
        <div className="flex">
          <div className="w-1/4 cahtSidebar">
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
                <div>
                  <img
                    src={"/Images/loading.gif"}
                    alt="loading"
                    className="img-fluid w-32 h-32 mx-auto"
                  />
                </div>
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
                      onClick={sendMessaageHandler}
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
                <div>
                  <img
                    src={"/Images/loading.gif"}
                    alt="loading"
                    className="img-fluid w-32 h-32 mx-auto"
                  />
                </div>
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
    </>
  );
};

const mapStateToProps = (state) => ({
  chat: state.chatReducer,
});

export default connect(mapStateToProps)(Chat);
