import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
const CustomBreadcrumb = ({ pageName }: { pageName: string }) => {
  return (
    <div
      role="presentation"
      className="flex justify-end max-w-screen-xl mx-auto  my-4"
    >
      <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: "1.5rem" }}>
        <Link className="underline underline-offset-2" href="/dashboard">
          Dashboard
        </Link>

        <Typography
          className="underline underline-offset-2"
          color="text.primary"
          sx={{ fontSize: "1.5rem" }}
        >
          {pageName}
        </Typography>
      </Breadcrumbs>
    </div>
  );
};

export default CustomBreadcrumb;
