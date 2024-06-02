"use client";
import "./Navbar.css";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useEffect, useRef, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [inboxOpen, setInboxOpen] = useState(false);
  const [scroll, setScroll] = useState<DialogProps["scroll"]>("paper");

  const router = useRouter();

  const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleInboxOpen = (scrollType: DialogProps["scroll"]) => () => {
    setInboxOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInboxClose = () => {
    setInboxOpen(false);
  };

  const descriptionElementRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (open || inboxOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handleLogOut = async () => {
    localStorage.removeItem("token");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/");
  };

  // const toggleDrawer = (newOpen: boolean) => () => {
  //     setOpen(newOpen);
  // };

  // const DrawerList = (
  //     <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
  //         <List>
  //             {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
  //                 <ListItem key={text} disablePadding>
  //                     <ListItemButton>
  //                         <ListItemIcon>
  //                             {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
  //                         </ListItemIcon>
  //                         <ListItemText primary={text} />
  //                     </ListItemButton>
  //                 </ListItem>
  //             ))}
  //         </List>
  //         <Divider />
  //         <List>
  //             {['All mail', 'Trash', 'Spam'].map((text, index) => (
  //                 <ListItem key={text} disablePadding>
  //                     <ListItemButton>
  //                         <ListItemIcon>
  //                             {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
  //                         </ListItemIcon>
  //                         <ListItemText primary={text} />
  //                     </ListItemButton>
  //                 </ListItem>
  //             ))}
  //         </List>
  //     </Box>
  // );

  return (
    <nav className="navigation">
      <div className="py-6 flex-between max-w-screen-xl mx-auto">
        <div className="flex items-center">
          {/* <div className="bars cursor-pointer flex-center" onClick={toggleDrawer(true)}>
                        <div className="bar"></div>
                    </div> */}

          <div className="font-bold text-[2rem] ml-8 logo">Back Office</div>
        </div>

        <div className="flex-center">
          {/* <button className="mx-4 nav-btn" title="Notification" onClick={handleClickOpen('paper')}>
                        <NotificationsIcon></NotificationsIcon>
                    </button> */}
          <Link className="mx-4 nav-btn" title="Inbox" href="/chat">
            <MarkunreadIcon></MarkunreadIcon>
          </Link>

          {/* <div className="avatar">
                        <img src="" alt="no image" />
                    </div>
                    <div>user name</div> */}
          <button
            className="log-btn px-8 py-4 rounded-lg ml-2"
            onClick={handleLogOut}
          >
            Log Out
          </button>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          id="scroll-dialog-title"
          className="!text-[2rem] !font-semibold"
        >
          Notifications
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            className="!text-[1.6rem]"
          >
            {/* {[...new Array(50)].map(() => (
              <div className="my-7">
                <div className="text-black text-[1.6rem] font-semibold">
                  Notification title
                </div>
                <div>Some description about the notification...</div>
              </div>
            ))} */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className="!text-[1.6rem]" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={inboxOpen}
        onClose={handleInboxClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          id="scroll-dialog-title"
          className="!text-[2rem] !font-semibold"
        >
          Messages
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            className="!text-[1.6rem]"
          >
            {/* {[...new Array(50)].map(() => (
              <div className="my-7">
                <div className="text-black text-[1.6rem] font-semibold">
                  Users name
                </div>
                <div>Some description about the notification...</div>
              </div>
            ))} */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className="!text-[1.6rem]" onClick={handleInboxClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer> */}
    </nav>
  );
};

export default Navbar;
