"use client";
import React, { useEffect, useState, useRef } from "react";
// import { useParams } from "react-router-dom";
import { useRouter } from "next/navigation";
import "../../../../components/Chat/chat.css";
// import messageSend from "./../../Assets/Icons/Send.jpeg";
// import { Link } from "react-router-dom";
import axios from "axios";
// import jwtDecode from "jwt-decode";
import { connect } from "react-redux";
import MobileChat from "./MobileChat";

// import backButton from "./../../Assets/Icons/back-button.png";
// import loadingGif from "./../../Assets/Image/loading.gif";
import Link from "next/link";

const Chat = ({ chat, params }) => {
  const [userId, setUserId] = useState("e34b83be-8c1e-4683-b921-60e819b655ab");
  const [connection, setConnection] = useState();
  const [newMessage, setNewMessage] = useState();
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

  useEffect(() => {
    // console.log(decoded.UserId);
    // setUserId("2e528a48-2121-48bd-97d4-b6ec8865bff2");
    // joinChat(decoded.UserId);
    getUserChatPreview(userId);
  }, [userId]);

  const handleTemDataLoad = () => {};

  // chat
  useEffect(() => {
    setNewMessageResponse(chat.newResponse);
  }, [chat.newResponse]);
  const getUserChatPreview = (props) => {
    console.log("api props: ", props);
    axios
      .get(`https://localhost:7098/api/Chatting/chatpreview?id=${props}`)
      .then((res) => {
        // console.log(res.data);
        setFriends(res.data);
        setLoading(false);
        // setActiveChatUser(res.data[0]);
      })
      .catch();
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
          `https://localhost:7098/api/Chatting/getallchattinglistbyuseridwithpagination?toUserId=${activeChatUser.toUserId}&fromUserId=${activeChatUser.fromUserId}&pageNumber=1&noOfRowsPerPage=20`
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
  const sendMessaageHandler = () => {
    if (newMessage && msgFlag) {
      setMsgFlag(false);
      axios
        .post(`https://localhost:7098/api/Chatting`, {
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
            `https://localhost:7098/api/Chatting/updateunreadmessage?fromUserId=${activeChatUser.fromUserId}&toUserId=${activeChatUser.toUserId}&userid=${userIdData}`
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
        `https://localhost:7098/api/Chatting/getallchattinglistbyuseridwithpagination?toUserId=${activeChatUser.toUserId}&fromUserId=${activeChatUser.fromUserId}&pageNumber=${page}&noOfRowsPerPage=10`
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
  return (
    <>
      <input
        placeholder="UserId Chat"
        value={userId} // Bind input value to state
        onChange={handleFromChange} // Call handleInputChange function on change
      />
      <div className="dextopChat">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-3 cahtSidebar">
            <div className="p-3">
              <div className="p-3 fixedSearch">
                <h2 className="ChatHeader">Messages</h2>
                <div className="pb-4">
                  <input
                    type="email"
                    className="form-control w-full border border-gray-300 rounded p-2"
                    id="email"
                    placeholder="Search"
                  />
                </div>
              </div>
              {loading === true ? (
                <div className="flex justify-center">
                  <img
                    src={"/Images/loading.gif"}
                    alt=""
                    className="img-fluid w-32 h-32"
                  />
                </div>
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
                      onClick={sendMessaageHandler}
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
                  type="text"
                  className="form-control"
                  placeholder="Message"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                />
                <button
                  onClick={sendMessaageHandler}
                  className="rounded-lg bg-sky-500 px-8 py-3 text-xl text-white duration-300 active:scale-95"
                  type="button"
                  id="button-addon2"
                >
                  <img className="img-fluid " src={"/Icons/Send.jpeg"} alt="" />
                </button>
              </div>
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
